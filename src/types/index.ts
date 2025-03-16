// Application types
export type ApplicationStatus = 
  | 'interested' 
  | 'applied' 
  | 'phone_screen' 
  | 'interview' 
  | 'technical_assessment'
  | 'offer' 
  | 'negotiation'
  | 'accepted'
  | 'rejected'
  | 'withdrawn';

export type RemoteType = 'onsite' | 'hybrid' | 'remote';

export interface Application {
  id: string;
  company: string;
  position: string;
  location: string;
  remote: RemoteType;
  postingUrl?: string;
  jobDescription?: string;
  dateIdentified: string;
  dateApplied?: string;
  status: ApplicationStatus;
  resumeUsed: string; // ID of the resume used
  roleType: string; // ID of the role type
  salaryInfo?: {
    listed?: number;
    negotiated?: number;
    currency: string;
  };
  contacts: string[]; // IDs of networking contacts
  interviews: Interview[];
  tasks: Task[];
  notes: string;
  feedback?: string;
  keywordMatch?: {
    matched: string[];
    missing: string[];
    score: number;
  };
}

export interface Interview {
  id: string;
  round: number;
  type: string;
  date: string;
  notes: string;
  followUpSent: boolean;
}

export interface Task {
  id: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

// Experience types
export type ExperienceCategory = 'work' | 'project' | 'volunteer' | 'education';

export interface ExperienceEntry {
  id: string;
  title: string;
  company?: string;
  location?: string;
  dateStart: string;
  dateEnd: string | 'present';
  description: string[];
  achievements: string[];
  skills: string[];
  metrics: string[];
  keywords: string[];
  category: ExperienceCategory;
  url?: string;
  notes?: string;
}

// Resume types
export interface Resume {
  id: string;
  name: string;
  targetRole: string;
  targetIndustry?: string;
  createdAt: string;
  lastUpdated: string;
  selectedExperiences: string[]; // IDs from experience bank
  customSections: {
    [key: string]: any;
  };
  skills: string[];
  education: string[]; // IDs from experience bank (education type)
  customContent?: {
    summary?: string;
    additionalInfo?: string;
  };
  formatting: {
    template: string;
    fontSize: number;
    fontFamily: string;
    spacing: number;
  };
}

// Role Type
export interface RoleType {
  id: string;
  title: string;
  industry: string;
  description?: string;
  requiredSkills: string[];
  preferredSkills: string[];
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  targetCompanies: string[];
  jobBoards: string[];
  searchKeywords: string[];
  associatedResumes: string[]; // IDs of resumes targeted for this role
  notes?: string;
}

// Contact
export interface Contact {
  id: string;
  name: string;
  company?: string;
  position?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  relationship: string;
  source: string;
  firstContactDate: string;
  lastContactDate: string;
  communications: Communication[];
  jobReferrals: string[]; // IDs of applications
  notes: string;
}

export interface Communication {
  id: string;
  date: string;
  medium: string;
  notes: string;
  followUpNeeded: boolean;
  followUpDate?: string;
} 