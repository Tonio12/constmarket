import type { UserProfile, ContactInfo, UserPreferences } from './user';

export interface SignupData {
  email: string;
  password: string;
  userType: 'contractor' | 'artisan';
  profile: {
    firstName: string;
    surname: string;
    company?: string;
    specialties?: string[];
    skills?: string[];
    experience?: number;
    bio?: string;
    // Artisan-specific fields
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
  };
  contactInfo: {
    phone?: string;
    email: string;
    location?: string;
  };
  preferences: {
    emailUpdates: boolean;
    termsAccepted: boolean;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: number;
      email: string;
      userType: string;
      profile: UserProfile;
      contactInfo: ContactInfo;
      preferences: UserPreferences;
      isVerified: boolean;
      isActive: boolean;
      createdAt: string;
    };
    token: string;
  };
  errors?: string[];
}

