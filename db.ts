import {
  User,
  Complaint,
  Department,
  AuditLog,
  AnalyticsSummary,
  ComplaintStatus,
  PriorityLevel,
  ComplaintCategory,
  LanguageCode,
} from '../types';

// Seed Departments
export const departments: Department[] = [
  {
    id: 'dept-roads',
    name: 'Roads & Municipal Infrastructure',
    code: 'RMI',
    categoryMatch: ['Roads', 'Street Lights'],
    leadName: 'Er. Anitha Reddy',
    leadEmail: 'anitha.reddy@gov.in',
    leadPhone: '+91 98480 12345',
    activeComplaints: 14,
    resolvedComplaints: 142,
    avgResolutionHours: 36,
    totalStaff: 28,
  },
  {
    id: 'dept-water',
    name: 'Water Supply & Sewerage Board',
    code: 'WSSB',
    categoryMatch: ['Water', 'Drainage'],
    leadName: 'Er. Suresh Kumar',
    leadEmail: 'suresh.kumar@gov.in',
    leadPhone: '+91 98480 23456',
    activeComplaints: 9,
    resolvedComplaints: 189,
    avgResolutionHours: 24,
    totalStaff: 32,
  },
  {
    id: 'dept-sanitation',
    name: 'Municipal Sanitation & Waste Mgmt',
    code: 'MSWM',
    categoryMatch: ['Garbage', 'Environment'],
    leadName: 'Dr. Srinivas Rao',
    leadEmail: 'srinivas.rao@gov.in',
    leadPhone: '+91 98480 34567',
    activeComplaints: 7,
    resolvedComplaints: 210,
    avgResolutionHours: 18,
    totalStaff: 45,
  },
  {
    id: 'dept-power',
    name: 'Power Grid Distribution',
    code: 'PGD',
    categoryMatch: ['Electricity', 'Street Lights'],
    leadName: 'Er. Vijay Bhaskar',
    leadEmail: 'vijay.bhaskar@gov.in',
    leadPhone: '+91 98480 45678',
    activeComplaints: 5,
    resolvedComplaints: 175,
    avgResolutionHours: 12,
    totalStaff: 20,
  },
  {
    id: 'dept-health',
    name: 'Public Health & Hospitals',
    code: 'PHH',
    categoryMatch: ['Hospitals', 'Schools'],
    leadName: 'Dr. Kavitha Lakshmi',
    leadEmail: 'kavitha.l@gov.in',
    leadPhone: '+91 98480 56789',
    activeComplaints: 3,
    resolvedComplaints: 98,
    avgResolutionHours: 48,
    totalStaff: 18,
  },
  {
    id: 'dept-safety',
    name: 'Public Safety & Transport Dept',
    code: 'PSTD',
    categoryMatch: ['Public Safety', 'Transport', 'Agriculture', 'Government Schemes', 'Other'],
    leadName: 'Inspector Rajesh Varma',
    leadEmail: 'rajesh.varma@gov.in',
    leadPhone: '+91 98480 67890',
    activeComplaints: 4,
    resolvedComplaints: 115,
    avgResolutionHours: 30,
    totalStaff: 25,
  },
];

// Seed Users
export const users: User[] = [
  {
    id: 'user-citizen-1',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@gmail.com',
    phone: '+91 98765 43210',
    role: 'citizen',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'user-citizen-2',
    name: 'Priyanka Das',
    email: 'priyanka.das@gmail.com',
    phone: '+91 91234 56789',
    role: 'citizen',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    createdAt: '2026-02-15T11:30:00Z',
  },
  {
    id: 'user-official-1',
    name: 'Er. Anitha Reddy',
    email: 'anitha.reddy@gov.in',
    phone: '+91 98480 12345',
    role: 'official',
    verified: true,
    departmentId: 'dept-roads',
    departmentName: 'Roads & Municipal Infrastructure',
    designation: 'Executive Engineer - Roads',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    createdAt: '2025-11-01T08:00:00Z',
  },
  {
    id: 'user-official-2',
    name: 'Er. Suresh Kumar',
    email: 'suresh.kumar@gov.in',
    phone: '+91 98480 23456',
    role: 'official',
    verified: true,
    departmentId: 'dept-water',
    departmentName: 'Water Supply & Sewerage Board',
    designation: 'Divisional Water Inspector',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    createdAt: '2025-11-05T09:00:00Z',
  },
  {
    id: 'user-admin-1',
    name: 'Vikramaditya Rao',
    email: 'admin.vikram@civicai.gov.in',
    phone: '+91 90000 11111',
    role: 'admin',
    verified: true,
    designation: 'Chief Governance Officer & System Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    createdAt: '2025-01-01T00:00:00Z',
  },
];

// Seed Complaints
export let complaints: Complaint[] = [
  {
    id: 'comp-101',
    trackingNumber: 'CIVIC-2026-8942',
    title: 'Severe Deep Pothole causing traffic hazards on Main Ring Road',
    description:
      'A huge 3-foot wide pothole near Ward 14 bus stop has damaged several two-wheelers during night hours. Water accumulation makes it invisible.',
    category: 'Roads',
    department: 'Roads & Municipal Infrastructure',
    priority: 'high',
    urgencyScore: 88,
    status: 'in_progress',
    location: {
      lat: 17.4483,
      lng: 78.3915,
      address: 'Main Ring Road, Ward 14, Near Metro Pillar 121, Hitec City',
      ward: 'Ward 14',
      city: 'Hyderabad',
      district: 'Ranga Reddy',
    },
    citizenId: 'user-citizen-1',
    citizenName: 'Rajesh Sharma',
    citizenPhone: '+91 98765 43210',
    mediaUrls: [
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800',
    ],
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/outdoor_rain.ogg',
    audioTranscript:
      'I am reporting a very dangerous pothole near pillar 121. Please fix this quickly before someone gets hurt.',
    language: 'en',
    assignedOfficialId: 'user-official-1',
    assignedOfficialName: 'Er. Anitha Reddy',
    assignedStaffName: 'Field Crew #4 (Led by K. Ramu)',
    assignedStaffPhone: '+91 98888 77766',
    slaTargetHours: 24,
    aiAnalysis: {
      detectedCategory: 'Roads',
      suggestedDepartment: 'Roads & Municipal Infrastructure',
      priority: 'high',
      urgencyScore: 88,
      safetyRisk: true,
      confidenceScore: 96,
      keyElements: ['pothole', 'traffic risk', '2-wheelers at risk', 'main road'],
      summary:
        'Dangerous asphalt crater detected on heavy traffic arterial road. Immediate asphalt resurfacing required.',
      recommendedAction: 'Deploy Quick Response Road Repair Van with cold-mix asphalt patch.',
    },
    timeline: [
      {
        id: 'tl-1',
        status: 'submitted',
        title: 'Grievance Filed',
        description: 'Citizen submitted grievance with photos & GPS tag',
        timestamp: '2026-07-21T09:15:00Z',
        actorName: 'Rajesh Sharma',
        actorRole: 'citizen',
      },
      {
        id: 'tl-2',
        status: 'ai_verified',
        title: 'AI Classification & Duplicate Scan',
        description:
          'AI verified issue: High Urgency (88/100). Auto-routed to Roads & Municipal Infrastructure.',
        timestamp: '2026-07-21T09:15:05Z',
        actorName: 'CivicAI Core Engine',
        actorRole: 'system_ai',
      },
      {
        id: 'tl-3',
        status: 'accepted',
        title: 'Official Accepted Ticket',
        description: 'Accepted by Executive Engineer Er. Anitha Reddy. Work Order #WO-492 issued.',
        timestamp: '2026-07-21T10:30:00Z',
        actorName: 'Er. Anitha Reddy',
        actorRole: 'official',
      },
      {
        id: 'tl-4',
        status: 'in_progress',
        title: 'Field Team Dispatched',
        description: 'Field Crew #4 (K. Ramu) reached site with asphalt cutter and roller.',
        timestamp: '2026-07-22T08:00:00Z',
        actorName: 'Er. Anitha Reddy',
        actorRole: 'official',
      },
    ],
    createdAt: '2026-07-21T09:15:00Z',
    updatedAt: '2026-07-22T08:00:00Z',
  },
  {
    id: 'comp-102',
    trackingNumber: 'CIVIC-2026-7310',
    title: 'Major Water Pipeline Leakage causing flooding on Street 4',
    description:
      'Drinking water main pipe cracked open. Thousands of liters of water wasting on street, flooding lower ground residences.',
    category: 'Water',
    department: 'Water Supply & Sewerage Board',
    priority: 'critical',
    urgencyScore: 95,
    status: 'resolved',
    location: {
      lat: 17.4399,
      lng: 78.4482,
      address: 'Street 4, Sector B, Jubilee Hills, Hyderabad',
      ward: 'Ward 8',
      city: 'Hyderabad',
      district: 'Hyderabad Central',
    },
    citizenId: 'user-citizen-2',
    citizenName: 'Priyanka Das',
    citizenPhone: '+91 91234 56789',
    mediaUrls: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800',
    ],
    language: 'en',
    assignedOfficialId: 'user-official-2',
    assignedOfficialName: 'Er. Suresh Kumar',
    assignedStaffName: 'Pipeline Repair Unit #2',
    assignedStaffPhone: '+91 97777 55544',
    slaTargetHours: 12,
    aiAnalysis: {
      detectedCategory: 'Water',
      suggestedDepartment: 'Water Supply & Sewerage Board',
      priority: 'critical',
      urgencyScore: 95,
      safetyRisk: true,
      confidenceScore: 98,
      keyElements: ['clean water waste', 'pipeline burst', 'flooding homes'],
      summary: 'High pressure drinking water pipe breach. Critical natural resource loss & property risk.',
      recommendedAction: 'Isolate Valve V-12 and dispatch emergency pipe welding squad.',
    },
    timeline: [
      {
        id: 'tl-10',
        status: 'submitted',
        title: 'Grievance Submitted',
        description: 'Citizen submitted high priority water leak complaint',
        timestamp: '2026-07-20T14:00:00Z',
        actorName: 'Priyanka Das',
        actorRole: 'citizen',
      },
      {
        id: 'tl-11',
        status: 'ai_verified',
        title: 'AI Priority Escalation',
        description: 'Flagged CRITICAL (95/100 urgency). Instant notification dispatched to Division Water Inspector.',
        timestamp: '2026-07-20T14:00:03Z',
        actorName: 'CivicAI Core Engine',
        actorRole: 'system_ai',
      },
      {
        id: 'tl-12',
        status: 'accepted',
        title: 'Emergency Response Initiated',
        description: 'Accepted by Suresh Kumar. Emergency valve isolated.',
        timestamp: '2026-07-20T14:20:00Z',
        actorName: 'Er. Suresh Kumar',
        actorRole: 'official',
      },
      {
        id: 'tl-13',
        status: 'resolved',
        title: 'Pipe Repaired & Pressure Tested',
        description: 'New 6-inch HDPE sleeve installed and tested under 8 bar pressure.',
        timestamp: '2026-07-21T06:30:00Z',
        actorName: 'Er. Suresh Kumar',
        actorRole: 'official',
        proofImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
      },
    ],
    resolutionProof: {
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
      notes: 'Successfully welded damaged section, replaced 2 meters of cast iron pipe with heavy-duty HDPE pipe.',
      completedAt: '2026-07-21T06:30:00Z',
      officialId: 'user-official-2',
      officialName: 'Er. Suresh Kumar',
      aiVerification: {
        verified: true,
        confidence: 94,
        notes: 'AI Image Verification confirmed pipeline repair completion and absence of water flow.',
      },
    },
    rating: {
      stars: 5,
      feedback: 'Incredible response speed! Pipe was fixed within 16 hours. Thank you CivicAI!',
      verifiedByCitizen: true,
      createdAt: '2026-07-21T10:00:00Z',
    },
    createdAt: '2026-07-20T14:00:00Z',
    updatedAt: '2026-07-21T10:00:00Z',
  },
  {
    id: 'comp-103',
    trackingNumber: 'CIVIC-2026-3391',
    title: 'Overflowing Garbage Dumpster & Odor in Market Zone',
    description:
      'Commercial waste has overflowed onto the sidewalk for 3 days. Stray animals scattering trash, creating severe unhygienic conditions.',
    category: 'Garbage',
    department: 'Municipal Sanitation & Waste Mgmt',
    priority: 'medium',
    urgencyScore: 65,
    status: 'submitted',
    location: {
      lat: 17.385,
      lng: 78.4867,
      address: 'Near Old City Fruit Market, Charminar Zone',
      ward: 'Ward 22',
      city: 'Hyderabad',
      district: 'Old City',
    },
    citizenId: 'user-citizen-1',
    citizenName: 'Rajesh Sharma',
    citizenPhone: '+91 98765 43210',
    mediaUrls: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800',
    ],
    language: 'en',
    slaTargetHours: 24,
    aiAnalysis: {
      detectedCategory: 'Garbage',
      suggestedDepartment: 'Municipal Sanitation & Waste Mgmt',
      priority: 'medium',
      urgencyScore: 65,
      safetyRisk: false,
      confidenceScore: 92,
      keyElements: ['overflowing bin', 'commercial trash', 'market zone'],
      summary: 'Solid waste accumulation requiring compactor truck pickup and disinfectant spray.',
      recommendedAction: 'Dispatch Sanitation Route Vehicle #12 for immediate clearing.',
    },
    timeline: [
      {
        id: 'tl-20',
        status: 'submitted',
        title: 'Grievance Submitted',
        description: 'Citizen logged overflow garbage issue.',
        timestamp: '2026-07-22T19:10:00Z',
        actorName: 'Rajesh Sharma',
        actorRole: 'citizen',
      },
      {
        id: 'tl-21',
        status: 'ai_verified',
        title: 'AI Smart Categorization',
        description: 'Assigned to Municipal Sanitation Dept. Urgency rated 65/100.',
        timestamp: '2026-07-22T19:10:04Z',
        actorName: 'CivicAI Core Engine',
        actorRole: 'system_ai',
      },
    ],
    createdAt: '2026-07-22T19:10:00Z',
    updatedAt: '2026-07-22T19:10:04Z',
  },
  {
    id: 'comp-104',
    trackingNumber: 'CIVIC-2026-1182',
    title: 'Street Lights Non-Functional on 2km Highway Stretch',
    description:
      'All 28 street lights on Madhapur Outer Road are dead for 4 nights. Dangerous for women commuters and pedestrians.',
    category: 'Street Lights',
    department: 'Power Grid Distribution',
    priority: 'high',
    urgencyScore: 82,
    status: 'accepted',
    location: {
      lat: 17.45,
      lng: 78.38,
      address: 'Madhapur Outer Connector Road, Ward 15',
      ward: 'Ward 15',
      city: 'Hyderabad',
      district: 'Ranga Reddy',
    },
    citizenId: 'user-citizen-2',
    citizenName: 'Priyanka Das',
    citizenPhone: '+91 91234 56789',
    mediaUrls: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800',
    ],
    language: 'en',
    assignedOfficialId: 'user-official-1',
    assignedOfficialName: 'Er. Anitha Reddy',
    slaTargetHours: 24,
    aiAnalysis: {
      detectedCategory: 'Street Lights',
      suggestedDepartment: 'Power Grid Distribution',
      priority: 'high',
      urgencyScore: 82,
      safetyRisk: true,
      confidenceScore: 95,
      keyElements: ['dark stretch', 'public safety risk', 'multiple poles'],
      summary: 'Substation breaker failure suspected affecting entire feeder line.',
      recommendedAction: 'Check Feeder Transformer T-8 and inspect cable jointing.',
    },
    timeline: [
      {
        id: 'tl-30',
        status: 'submitted',
        title: 'Grievance Submitted',
        description: 'Logged via CivicAI app with night photo.',
        timestamp: '2026-07-22T15:00:00Z',
        actorName: 'Priyanka Das',
        actorRole: 'citizen',
      },
      {
        id: 'tl-31',
        status: 'accepted',
        title: 'Official Accepted Ticket',
        description: 'Electrical engineer assigned to inspect feeder line.',
        timestamp: '2026-07-22T16:30:00Z',
        actorName: 'Er. Anitha Reddy',
        actorRole: 'official',
      },
    ],
    createdAt: '2026-07-22T15:00:00Z',
    updatedAt: '2026-07-22T16:30:00Z',
  },
];

// Seed Audit Logs
export let auditLogs: AuditLog[] = [
  {
    id: 'log-1',
    action: 'COMPLAINT_SUBMITTED',
    performedBy: 'Rajesh Sharma',
    role: 'citizen',
    target: 'CIVIC-2026-8942',
    details: 'Citizen registered new road pothole complaint with photo & GPS',
    timestamp: '2026-07-21T09:15:00Z',
  },
  {
    id: 'log-2',
    action: 'AI_CLASSIFICATION',
    performedBy: 'CivicAI Engine',
    role: 'system',
    target: 'CIVIC-2026-8942',
    details: 'AI auto-routed to Roads Dept, urgency score 88/100',
    timestamp: '2026-07-21T09:15:05Z',
  },
  {
    id: 'log-3',
    action: 'OFFICIAL_ACCEPTED',
    performedBy: 'Er. Anitha Reddy',
    role: 'official',
    target: 'CIVIC-2026-8942',
    details: 'Official accepted grievance and assigned Field Crew #4',
    timestamp: '2026-07-21T10:30:00Z',
  },
  {
    id: 'log-4',
    action: 'RESOLUTION_PROOF_UPLOADED',
    performedBy: 'Er. Suresh Kumar',
    role: 'official',
    target: 'CIVIC-2026-7310',
    details: 'Uploaded photo proof for water pipeline repair',
    timestamp: '2026-07-21T06:30:00Z',
  },
  {
    id: 'log-5',
    action: 'CITIZEN_RATED_RESOLUTION',
    performedBy: 'Priyanka Das',
    role: 'citizen',
    target: 'CIVIC-2026-7310',
    details: 'Citizen rated resolution 5 stars',
    timestamp: '2026-07-21T10:00:00Z',
  },
];

// Helper database functions
export function getComplaints(filterRole?: string, filterUserId?: string, deptName?: string) {
  let list = [...complaints];

  if (filterRole === 'citizen' && filterUserId) {
    list = list.filter((c) => c.citizenId === filterUserId);
  } else if (filterRole === 'official' && deptName) {
    // Return complaints assigned to official or in their department
    list = list.filter((c) => c.department.toLowerCase().includes(deptName.toLowerCase()) || deptName.toLowerCase().includes(c.department.toLowerCase()));
  }

  // Sort by newest first
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getComplaintById(id: string) {
  return complaints.find((c) => c.id === id || c.trackingNumber === id);
}

export function createComplaint(newComp: Omit<Complaint, 'id' | 'trackingNumber' | 'createdAt' | 'updatedAt' | 'timeline'>): Complaint {
  const count = complaints.length + 105;
  const id = `comp-${count}`;
  const trackingNumber = `CIVIC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  const fullComp: Complaint = {
    ...newComp,
    id,
    trackingNumber,
    createdAt: now,
    updatedAt: now,
    timeline: [
      {
        id: `tl-${Date.now()}-1`,
        status: 'submitted',
        title: 'Grievance Submitted',
        description: 'Grievance registered in CivicAI portal with location tag.',
        timestamp: now,
        actorName: newComp.citizenName,
        actorRole: 'citizen',
      },
      {
        id: `tl-${Date.now()}-2`,
        status: 'ai_verified',
        title: 'AI Smart Triage & Duplicate Scan',
        description: `AI routed to ${newComp.department}. Urgency score: ${newComp.urgencyScore}/100.`,
        timestamp: new Date(Date.now() + 2000).toISOString(),
        actorName: 'CivicAI Core Engine',
        actorRole: 'system_ai',
      },
    ],
  };

  complaints.unshift(fullComp);

  // Add audit log
  addAuditLog({
    action: 'COMPLAINT_SUBMITTED',
    performedBy: newComp.citizenName,
    role: 'citizen',
    target: trackingNumber,
    details: `New ${newComp.category} grievance logged in ${newComp.location.ward}`,
  });

  return fullComp;
}

export function updateComplaintStatus(
  id: string,
  status: ComplaintStatus,
  actorName: string,
  actorRole: 'official' | 'admin' | 'citizen',
  note?: string,
  rejectionReason?: string
) {
  const comp = complaints.find((c) => c.id === id);
  if (!comp) return null;

  comp.status = status;
  comp.updatedAt = new Date().toISOString();
  if (rejectionReason) {
    comp.rejectionReason = rejectionReason;
  }

  const statusTitles: Record<ComplaintStatus, string> = {
    submitted: 'Submitted',
    ai_verified: 'AI Verified',
    accepted: 'Accepted by Department',
    in_progress: 'Work in Progress',
    resolved: 'Resolution Completed',
    closed: 'Ticket Closed & Verified',
    rejected: 'Grievance Rejected',
  };

  comp.timeline.push({
    id: `tl-${Date.now()}`,
    status,
    title: statusTitles[status],
    description: note || `Status updated to ${statusTitles[status]}`,
    timestamp: new Date().toISOString(),
    actorName,
    actorRole,
  });

  addAuditLog({
    action: `STATUS_UPDATE_${status.toUpperCase()}`,
    performedBy: actorName,
    role: actorRole,
    target: comp.trackingNumber,
    details: note || `Status changed to ${status}`,
  });

  return comp;
}

export function assignStaffToComplaint(id: string, staffName: string, staffPhone: string, officialName: string) {
  const comp = complaints.find((c) => c.id === id);
  if (!comp) return null;

  comp.assignedStaffName = staffName;
  comp.assignedStaffPhone = staffPhone;
  comp.status = 'in_progress';
  comp.updatedAt = new Date().toISOString();

  comp.timeline.push({
    id: `tl-${Date.now()}`,
    status: 'in_progress',
    title: 'Field Team Assigned',
    description: `Assigned to ${staffName} (Contact: ${staffPhone})`,
    timestamp: new Date().toISOString(),
    actorName: officialName,
    actorRole: 'official',
  });

  addAuditLog({
    action: 'FIELD_STAFF_ASSIGNED',
    performedBy: officialName,
    role: 'official',
    target: comp.trackingNumber,
    details: `Field crew ${staffName} assigned to resolve grievance`,
  });

  return comp;
}

export function uploadResolutionProof(
  id: string,
  imageUrl: string,
  notes: string,
  officialId: string,
  officialName: string,
  aiVerification?: { verified: boolean; confidence: number; notes: string }
) {
  const comp = complaints.find((c) => c.id === id);
  if (!comp) return null;

  comp.status = 'resolved';
  comp.updatedAt = new Date().toISOString();
  comp.resolutionProof = {
    imageUrl,
    notes,
    completedAt: new Date().toISOString(),
    officialId,
    officialName,
    aiVerification,
  };

  comp.timeline.push({
    id: `tl-${Date.now()}`,
    status: 'resolved',
    title: 'Resolution Proof Uploaded',
    description: notes,
    timestamp: new Date().toISOString(),
    actorName: officialName,
    actorRole: 'official',
    proofImageUrl: imageUrl,
  });

  addAuditLog({
    action: 'RESOLUTION_PROOF_UPLOADED',
    performedBy: officialName,
    role: 'official',
    target: comp.trackingNumber,
    details: `Official uploaded resolution proof photo & notes`,
  });

  return comp;
}

export function verifyAndRateComplaint(id: string, stars: number, feedback: string, citizenName: string) {
  const comp = complaints.find((c) => c.id === id);
  if (!comp) return null;

  comp.status = 'closed';
  comp.updatedAt = new Date().toISOString();
  comp.rating = {
    stars,
    feedback,
    verifiedByCitizen: true,
    createdAt: new Date().toISOString(),
  };

  comp.timeline.push({
    id: `tl-${Date.now()}`,
    status: 'closed',
    title: 'Citizen Verification & Rating',
    description: `Citizen verified resolution and rated ${stars}/5 stars: "${feedback}"`,
    timestamp: new Date().toISOString(),
    actorName: citizenName,
    actorRole: 'citizen',
  });

  addAuditLog({
    action: 'CITIZEN_RATED_RESOLUTION',
    performedBy: citizenName,
    role: 'citizen',
    target: comp.trackingNumber,
    details: `Citizen rated ${stars} stars and confirmed closure`,
  });

  return comp;
}

export function addAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>) {
  auditLogs.unshift({
    ...log,
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
  });
}

export function getAuditLogs() {
  return auditLogs;
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const totalComplaints = complaints.length;
  const activeCount = complaints.filter((c) => ['submitted', 'ai_verified', 'accepted', 'in_progress'].includes(c.status)).length;
  const resolvedCount = complaints.filter((c) => ['resolved', 'closed'].includes(c.status)).length;
  const rejectedCount = complaints.filter((c) => c.status === 'rejected').length;
  const criticalCount = complaints.filter((c) => c.priority === 'critical' || c.priority === 'high').length;
  const duplicateCount = complaints.filter((c) => c.duplicateInfo?.isDuplicate).length;

  // Rating average
  const ratedComplaints = complaints.filter((c) => c.rating?.stars);
  const avgRating = ratedComplaints.length > 0 ? ratedComplaints.reduce((acc, c) => acc + (c.rating?.stars || 0), 0) / ratedComplaints.length : 4.8;
  const satisfactionRate = Math.round((avgRating / 5) * 100);

  const categoryBreakdown: Record<string, number> = {};
  const statusBreakdown: Record<string, number> = {};
  const wardBreakdown: Record<string, number> = {};

  complaints.forEach((c) => {
    categoryBreakdown[c.category] = (categoryBreakdown[c.category] || 0) + 1;
    statusBreakdown[c.status] = (statusBreakdown[c.status] || 0) + 1;
    if (c.location.ward) {
      wardBreakdown[c.location.ward] = (wardBreakdown[c.location.ward] || 0) + 1;
    }
  });

  return {
    totalComplaints,
    activeCount,
    resolvedCount,
    rejectedCount,
    criticalCount,
    duplicateCount,
    avgResolutionTimeHours: 22.4,
    citizenSatisfactionRate: satisfactionRate,
    categoryBreakdown,
    statusBreakdown,
    wardBreakdown,
    dailyTrends: [
      { date: '18 Jul', submitted: 12, resolved: 10 },
      { date: '19 Jul', submitted: 18, resolved: 15 },
      { date: '20 Jul', submitted: 14, resolved: 16 },
      { date: '21 Jul', submitted: 22, resolved: 18 },
      { date: '22 Jul', submitted: 28, resolved: 21 },
    ],
  };
}
