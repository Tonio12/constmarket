export type UserRole = 'contractor' | 'artisan';

export type SignupStep =
  | 'role-selection'
  | 'signup-form'
  | 'professional-role'
  | 'education-history'
  | 'work-experience'
  | 'personal-details'
  | 'hourly-rate'
  | 'bio-overview'
  | 'trade-specialties';

export interface EducationData {
  institution: string;
  qualification: string;
  specialization: string;
  startDate: string;
  endDate: string;
  description: string;
  certificate?: File;
}

export interface WorkExperienceData {
  projectTitle: string;
  role: string;
  specialties: string;
  client: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface PersonalDetailsData {
  dateOfBirth: string;
  gender: string;
  country: string;
  city: string;
  digitalAddress: string;
  phoneNumber: string;
  profilePicture?: File;
}

export interface HourlyRateData {
  rate: number;
  currency: string;
}

export interface FormSignupData {
  role: UserRole | null;
  skills: string[];
  formData: {
    firstName: string;
    surname: string;
    email: string;
    password: string;
    emailUpdates: boolean;
    termsAccepted: boolean;
  };
  professionalRole: string;
  education: EducationData[];
  workExperience: WorkExperienceData[];
  personalDetails: PersonalDetailsData;
  hourlyRate: HourlyRateData;
  bio: string;
  trade: string;
  specialties: string[];
}

