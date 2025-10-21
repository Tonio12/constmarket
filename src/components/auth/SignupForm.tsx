'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import { toast } from 'sonner';

interface SignupFormProps {
  onNext: () => void;
  onBack: () => void;
  formData: {
    firstName: string;
    surname: string;
    email: string;
    password: string;
    emailUpdates: boolean;
    termsAccepted: boolean;
  };
  onFormDataChange: (data: SignupFormProps['formData']) => void;
  isSubmitting?: boolean;
  userType?: 'contractor' | 'artisan';
}

export default function SignupForm({
  onNext,
  onBack,
  formData,
  onFormDataChange,
  isSubmitting = false,
  userType,
}: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [localFormData, setLocalFormData] = useState(formData);

  // Sync local state with parent state
  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleInputChange = (field: string, value: string | boolean) => {
    const updated = {
      ...localFormData,
      [field]: value,
    };
    setLocalFormData(updated);
    onFormDataChange(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !localFormData.firstName ||
      !localFormData.surname ||
      !localFormData.email ||
      !localFormData.password
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!localFormData.termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    if (localFormData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    onNext();
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={2} totalSteps={userType === 'contractor' ? 2 : 9} />

        <div className="w-full max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              {userType === 'contractor'
                ? 'Sign up to hire talents'
                : 'Sign up to showcase your skills'}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 bg-black text-white hover:bg-gray-800 border-black"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Continue with Apple
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={localFormData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="surname" className="text-sm font-medium text-gray-700">
                    Surname
                  </Label>
                  <Input
                    id="surname"
                    type="text"
                    value={localFormData.surname}
                    onChange={(e) => handleInputChange('surname', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={localFormData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={localFormData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Password (8 or more characters)"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="emailUpdates"
                  checked={localFormData.emailUpdates}
                  onCheckedChange={(checked) =>
                    handleInputChange('emailUpdates', checked as boolean)
                  }
                  className="mt-1"
                />
                <Label htmlFor="emailUpdates" className="text-sm text-gray-600 leading-normal">
                  Send me helpful emails to find rewarding work and job leads
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="termsAccepted"
                  checked={localFormData.termsAccepted}
                  onCheckedChange={(checked) =>
                    handleInputChange('termsAccepted', checked as boolean)
                  }
                  className="mt-1"
                />
                <Label htmlFor="termsAccepted" className="text-sm text-gray-600 leading-normal">
                  Yes, I understand and agree to the{' '}
                  <a href="#" className="text-primary hover:underline font-medium">
                    Constket Terms of Service
                  </a>
                  , including the{' '}
                  <a href="#" className="text-primary hover:underline font-medium">
                    User Agreement
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline font-medium">
                    Privacy Policy
                  </a>
                  .
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Creating account...'
                : userType === 'contractor'
                  ? 'Create contractor account'
                  : 'Create artisan account'}
            </Button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="#" className="text-primary hover:underline font-medium">
                  Log in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
