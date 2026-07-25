export type UserRole = 'citizen' | 'official' | 'admin';

export type LanguageCode = 'en' | 'te' | 'hi';

export type ComplaintCategory =
  | 'Roads'
  | 'Water'
  | 'Drainage'
  | 'Garbage'
  | 'Electricity'
  | 'Street Lights'
  | 'Hospitals'
  | 'Schools'
  | 'Agriculture'
  | 'Government Schemes'
  | 'Environment'
  | 'Public Safety'
  | 'Transport'
  | 'Other';

export type ComplaintStatus =
  | 'submitted'
  | 'ai_verified'
  | 'accepted'
  | 'in_progress'
  | 'resolved'
  | 'closed'
  | 'rejected';

export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  verified: boolean;
  departmentId?: string;
  departmentName?: string;
  designation?: string;
  avatar?: string;
  blocked?: boolean;
  createdAt: string;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
  ward: string;
  city: string;
  district?: string;
}

export interface ComplaintTimelineEvent {
  id: string;
  status: ComplaintStatus;
  title: string;
  description: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole | 'system_ai';
  proofImageUrl?: string;
}

export interface DuplicateInfo {
  isDuplicate: boolean;
  originalComplaintId?: string;
  originalTrackingNumber?: string;
  similarityScore?: number; // 0 to 100
  reason?: string;
}

export interface AIAnalysis {
  detectedCategory: ComplaintCategory;
  suggestedDepartment: string;
  priority: PriorityLevel;
  urgencyScore: number; // 0 to 100
  safetyRisk: boolean;
  confidenceScore: number; // 0 to 100
  keyElements: string[];
  summary: string;
  recommendedAction: string;
}

export interface ResolutionProof {
  imageUrl: string;
  notes: string;
  completedAt: string;
  officialId: string;
  officialName: string;
  aiVerification?: {
    verified: boolean;
    confidence: number;
    notes: string;
  };
}

export interface CitizenRating {
  stars: number; // 1 to 5
  feedback: string;
  verifiedByCitizen: boolean;
  createdAt: string;
}

export interface Complaint {
  id: string;
  trackingNumber: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  department: string;
  priority: PriorityLevel;
  urgencyScore: number;
  status: ComplaintStatus;
  location: Location;
  citizenId: string;
  citizenName: string;
  citizenPhone: string;
  mediaUrls: string[];
  audioUrl?: string;
  audioTranscript?: string;
  language: LanguageCode;
  assignedOfficialId?: string;
  assignedOfficialName?: string;
  assignedStaffName?: string;
  assignedStaffPhone?: string;
  duplicateInfo?: DuplicateInfo;
  aiAnalysis?: AIAnalysis;
  timeline: ComplaintTimelineEvent[];
  resolutionProof?: ResolutionProof;
  rating?: CitizenRating;
  rejectionReason?: string;
  slaTargetHours: number;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  categoryMatch: ComplaintCategory[];
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  activeComplaints: number;
  resolvedComplaints: number;
  avgResolutionHours: number;
  totalStaff: number;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  role: UserRole | 'system';
  target: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface AnalyticsSummary {
  totalComplaints: number;
  activeCount: number;
  resolvedCount: number;
  rejectedCount: number;
  criticalCount: number;
  duplicateCount: number;
  avgResolutionTimeHours: number;
  citizenSatisfactionRate: number; // 0 to 100
  categoryBreakdown: Record<string, number>;
  statusBreakdown: Record<string, number>;
  wardBreakdown: Record<string, number>;
  dailyTrends: Array<{ date: string; submitted: number; resolved: number }>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  complaintRef?: {
    id: string;
    trackingNumber: string;
    title: string;
    status: ComplaintStatus;
  };
}
