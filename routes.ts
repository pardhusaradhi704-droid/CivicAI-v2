import { Router, Request, Response } from 'express';
import {
  getComplaints,
  getComplaintById,
  createComplaint,
  updateComplaintStatus,
  assignStaffToComplaint,
  uploadResolutionProof,
  verifyAndRateComplaint,
  departments,
  users,
  getAuditLogs,
  getAnalyticsSummary,
  addAuditLog,
} from './db';
import {
  classifyAndAnalyzeComplaint,
  checkDuplicateComplaint,
  translateText,
  verifyResolutionImage,
  civicBotChat,
} from './gemini';
import { LanguageCode } from '../types';

export const apiRouter = Router();

// Authentication Endpoints
apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { email, role, authKey } = req.body;
  const lowerEmail = (email || '').toLowerCase().trim();

  // Find user by email or phone
  let user = users.find((u) => u.email.toLowerCase() === lowerEmail || u.phone === email);

  // Fallback to role-based demo user if no matching email
  if (!user) {
    user = users.find((u) => u.role === role);
  }

  if (!user) {
    return res.status(401).json({ error: 'User account not found. Please register first.' });
  }

  // Enforce Role Access Control: Account role must match requested login mode
  if (user.role !== role) {
    return res.status(403).json({
      error: `Access Denied: Account "${user.name}" is registered as a ${user.role.toUpperCase()}, not an ${role.toUpperCase()}. Please select ${user.role.toUpperCase()} mode to sign in.`,
    });
  }

  // Authorization step for Official mode
  if (role === 'official') {
    const validKeys = ['GOVT2026', 'GOVT-HYD-9982', 'OFFICIAL2026', 'GOVT123', 'OFFICIAL', 'DEMO1234'];
    const key = (authKey || '').trim().toUpperCase();
    if (!validKeys.includes(key) && !user.verified) {
      return res.status(401).json({
        error: 'Authorization Failed: Official Mode requires a valid Government Badge ID or Official Passcode (e.g. GOVT2026).',
      });
    }
  }

  // Authorization step for Admin mode
  if (role === 'admin') {
    const validAdminKeys = ['ADMIN2026', 'ADMIN123', 'CIVIC_ADMIN', 'MASTER2026', 'ADMIN', 'DEMO1234'];
    const key = (authKey || '').trim().toUpperCase();
    if (!validAdminKeys.includes(key)) {
      return res.status(401).json({
        error: 'Authorization Failed: Administrator Mode requires Master Security Key (e.g. ADMIN2026).',
      });
    }
  }

  res.json({
    token: `jwt_simulated_token_${user.id}_${Date.now()}`,
    user,
  });
});

apiRouter.post('/auth/register', (req: Request, res: Response) => {
  const { name, email, phone, role, departmentName, designation, govtBadgeId, authKey } = req.body;

  // Authorization check on register if creating Official or Admin
  if (role === 'official') {
    const validKeys = ['GOVT2026', 'GOVT-HYD-9982', 'OFFICIAL2026', 'GOVT123', 'OFFICIAL'];
    const key = (authKey || govtBadgeId || '').trim().toUpperCase();
    if (key && !validKeys.includes(key) && !key.startsWith('GOVT')) {
      return res.status(401).json({
        error: 'Invalid Official Badge/Passcode. Enter "GOVT2026" or a valid Govt Badge ID for Official registration.',
      });
    }
  }

  if (role === 'admin') {
    const validAdminKeys = ['ADMIN2026', 'ADMIN123', 'CIVIC_ADMIN', 'MASTER2026', 'ADMIN'];
    const key = (authKey || '').trim().toUpperCase();
    if (!validAdminKeys.includes(key)) {
      return res.status(401).json({
        error: 'Invalid Master Admin Key. Enter "ADMIN2026" for Administrator registration.',
      });
    }
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: name || 'New User',
    email: email || `user_${Date.now()}@civicai.gov.in`,
    phone: phone || '+91 99000 00000',
    role: role || 'citizen',
    verified: role === 'citizen' || role === 'admin', // Official accounts require admin verification
    departmentName,
    designation,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser as any);

  addAuditLog({
    action: 'USER_REGISTERED',
    performedBy: newUser.name,
    role: newUser.role as any,
    target: newUser.email,
    details: `Registered as ${newUser.role}. Verified: ${newUser.verified}`,
  });

  res.json({
    token: `jwt_simulated_token_${newUser.id}_${Date.now()}`,
    user: newUser,
  });
});

// Complaints API
apiRouter.get('/complaints', (req: Request, res: Response) => {
  const { role, userId, department } = req.query;
  const list = getComplaints(role as string, userId as string, department as string);
  res.json({ complaints: list });
});

apiRouter.get('/complaints/:id', (req: Request, res: Response) => {
  const comp = getComplaintById(req.params.id);
  if (!comp) {
    return res.status(404).json({ error: 'Complaint not found' });
  }
  res.json({ complaint: comp });
});

apiRouter.post('/complaints', async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      category,
      department,
      location,
      citizenId,
      citizenName,
      citizenPhone,
      mediaUrls,
      audioUrl,
      audioTranscript,
      imageBase64,
      language,
    } = req.body;

    // Run AI Triage
    const aiAnalysis = await classifyAndAnalyzeComplaint(title, description, imageBase64);

    const activeList = getComplaints();
    const duplicateInfo = await checkDuplicateComplaint(
      title,
      description,
      location?.lat || 17.4483,
      location?.lng || 78.3915,
      activeList
    );

    const finalCategory = category || aiAnalysis.detectedCategory;
    const finalDepartment = department || aiAnalysis.suggestedDepartment;

    const newComp = createComplaint({
      title,
      description,
      category: finalCategory,
      department: finalDepartment,
      priority: aiAnalysis.priority,
      urgencyScore: aiAnalysis.urgencyScore,
      status: 'ai_verified',
      location: location || {
        lat: 17.4483,
        lng: 78.3915,
        address: 'Hitec City Ward 14, Hyderabad',
        ward: 'Ward 14',
        city: 'Hyderabad',
      },
      citizenId: citizenId || 'user-citizen-1',
      citizenName: citizenName || 'Rajesh Sharma',
      citizenPhone: citizenPhone || '+91 98765 43210',
      mediaUrls: mediaUrls || [],
      audioUrl,
      audioTranscript,
      language: (language as LanguageCode) || 'en',
      slaTargetHours: aiAnalysis.priority === 'critical' ? 12 : aiAnalysis.priority === 'high' ? 24 : 48,
      aiAnalysis,
      duplicateInfo,
    });

    res.status(201).json({ complaint: newComp });
  } catch (err: any) {
    console.error('Error creating complaint:', err);
    res.status(500).json({ error: 'Failed to create complaint', details: err.message });
  }
});

// Update Status (Accept / Reject)
apiRouter.post('/complaints/:id/status', (req: Request, res: Response) => {
  const { status, actorName, actorRole, note, rejectionReason } = req.body;
  const updated = updateComplaintStatus(
    req.params.id,
    status,
    actorName || 'Official',
    actorRole || 'official',
    note,
    rejectionReason
  );

  if (!updated) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  res.json({ complaint: updated });
});

// Assign Field Staff
apiRouter.post('/complaints/:id/assign', (req: Request, res: Response) => {
  const { staffName, staffPhone, officialName } = req.body;
  const updated = assignStaffToComplaint(
    req.params.id,
    staffName || 'Field Crew #1',
    staffPhone || '+91 98000 11122',
    officialName || 'Executive Engineer'
  );

  if (!updated) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  res.json({ complaint: updated });
});

// Upload Resolution Proof
apiRouter.post('/complaints/:id/resolution', async (req: Request, res: Response) => {
  const { imageUrl, notes, officialId, officialName, beforeImageUrl } = req.body;

  // Run AI Image verification check
  const aiCheck = await verifyResolutionImage(beforeImageUrl || '', imageUrl, notes);

  const updated = uploadResolutionProof(
    req.params.id,
    imageUrl || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    notes || 'Work completed successfully and inspected by site engineer.',
    officialId || 'user-official-1',
    officialName || 'Er. Anitha Reddy',
    aiCheck
  );

  if (!updated) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  res.json({ complaint: updated });
});

// Verify & Rate Complaint (Citizen)
apiRouter.post('/complaints/:id/verify-rate', (req: Request, res: Response) => {
  const { stars, feedback, citizenName } = req.body;
  const updated = verifyAndRateComplaint(
    req.params.id,
    stars || 5,
    feedback || 'Satisfied with resolution!',
    citizenName || 'Citizen'
  );

  if (!updated) {
    return res.status(404).json({ error: 'Complaint not found' });
  }

  res.json({ complaint: updated });
});

// AI Service Endpoints
apiRouter.post('/ai/analyze', async (req: Request, res: Response) => {
  const { title, description, imageBase64 } = req.body;
  const analysis = await classifyAndAnalyzeComplaint(title || '', description || '', imageBase64);
  res.json({ analysis });
});

apiRouter.post('/ai/chat', async (req: Request, res: Response) => {
  const { message, history, language } = req.body;
  const allComps = getComplaints();
  const reply = await civicBotChat(message || 'Hello', history || [], allComps, language || 'en');
  res.json(reply);
});

apiRouter.post('/ai/translate', async (req: Request, res: Response) => {
  const { text, targetLang } = req.body;
  const translated = await translateText(text, targetLang || 'te');
  res.json({ translatedText: translated, language: targetLang });
});

// Departments API
apiRouter.get('/departments', (_req: Request, res: Response) => {
  res.json({ departments });
});

// Admin API
apiRouter.get('/admin/users', (_req: Request, res: Response) => {
  res.json({ users });
});

apiRouter.patch('/admin/users/:id/verify', (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);
  if (user) {
    user.verified = true;
    addAuditLog({
      action: 'OFFICIAL_VERIFIED',
      performedBy: 'System Admin',
      role: 'admin',
      target: user.email,
      details: `Admin verified credentials for official ${user.name}`,
    });
    return res.json({ user });
  }
  res.status(404).json({ error: 'User not found' });
});

apiRouter.patch('/admin/users/:id/block', (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);
  if (user) {
    user.blocked = !user.blocked;
    addAuditLog({
      action: user.blocked ? 'USER_BLOCKED' : 'USER_UNBLOCKED',
      performedBy: 'System Admin',
      role: 'admin',
      target: user.email,
      details: `Admin changed block status to ${user.blocked}`,
    });
    return res.json({ user });
  }
  res.status(404).json({ error: 'User not found' });
});

apiRouter.get('/admin/audit-logs', (_req: Request, res: Response) => {
  res.json({ logs: getAuditLogs() });
});

apiRouter.get('/analytics', (_req: Request, res: Response) => {
  res.json({ analytics: getAnalyticsSummary() });
});
