const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

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

interface UserProfile {
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

interface ContactInfo {
  phone?: string;
  email: string;
  location?: string;
}

interface UserPreferences {
  emailUpdates: boolean;
  termsAccepted: boolean;
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

export const authApi = {
  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Signup failed',
          errors: result.errors,
        };
      }

      // Store token in localStorage
      if (result.data?.token) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }

      return result;
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'An error occurred during signup. Please try again.',
      };
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Login failed',
          errors: result.errors,
        };
      }

      // Store token in localStorage
      if (result.data?.token) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }

      return result;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login. Please try again.',
      };
    }
  },

  async getProfile(): Promise<AuthResponse> {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return {
          success: false,
          message: 'No authentication token found',
        };
      }

      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Failed to fetch profile',
        };
      }

      return result;
    } catch (error) {
      console.error('Profile fetch error:', error);
      return {
        success: false,
        message: 'An error occurred while fetching profile. Please try again.',
      };
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getUser(): {
    id: number;
    email: string;
    userType: string;
    profile: UserProfile;
    contactInfo: ContactInfo;
    preferences: UserPreferences;
    isVerified: boolean;
    isActive: boolean;
    createdAt: string;
  } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  async updateSkills(skills: string[]): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/api/user/skills`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getToken()}`,
        },
        body: JSON.stringify({ skills }),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Failed to update skills',
        };
      }

      return result;
    } catch (error) {
      console.error('Update skills error:', error);
      return {
        success: false,
        message: 'An error occurred while updating skills. Please try again.',
      };
    }
  },
};
