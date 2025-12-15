import type {
  SignupData,
  LoginData,
  AuthResponse,
  UserProfile,
  ContactInfo,
  UserPreferences,
} from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

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
