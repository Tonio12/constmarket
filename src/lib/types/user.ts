export interface UserProfile {
  firstName: string;
  surname: string;
  company?: string;
  specialties?: string[];
  skills?: string[];
  experience?: number;
  bio?: string;
  professionalRole?: string;
  education?: Array<{
    institution: string;
    qualification: string;
    specialization: string;
    startDate: string;
    endDate: string;
    description: string;
    certificate?: string;
  }>;
  workExperience?: Array<{
    projectTitle: string;
    role: string;
    specialties: string;
    client: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    images?: string[];
  }>;
  personalDetails?: {
    dateOfBirth: string;
    gender: string;
    country: string;
    city: string;
    digitalAddress: string;
    phoneNumber: string;
    profilePicture?: string;
  };
  hourlyRate?: {
    rate: number;
    currency: string;
  };
  trade?: string;
}

export interface ContactInfo {
  phone?: string;
  email: string;
  location?: string;
}

export interface UserPreferences {
  emailUpdates: boolean;
  termsAccepted: boolean;
}

