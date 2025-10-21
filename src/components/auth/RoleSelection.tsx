'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Wrench } from 'lucide-react';
import ProgressIndicator from '@/components/ui/ProgressIndicator';

interface RoleSelectionProps {
  onRoleSelect: (role: 'contractor' | 'artisan') => void;
  onNext: () => void;
  selectedRole?: 'contractor' | 'artisan' | null;
}

export default function RoleSelection({
  onRoleSelect,
  onNext,
  selectedRole: propSelectedRole,
}: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<'contractor' | 'artisan'>(
    propSelectedRole || 'artisan'
  );

  // Set the default role when component mounts
  useEffect(() => {
    if (!propSelectedRole) {
      onRoleSelect('artisan');
    }
  }, [propSelectedRole, onRoleSelect]);

  const handleRoleSelect = (role: 'contractor' | 'artisan') => {
    setSelectedRole(role);
    onRoleSelect(role);
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={1} totalSteps={9} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Join as a contractor or artisan
          </h1>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Contractor Card */}
          <Card
            className={`cursor-pointer transition-all duration-200 ${
              selectedRole === 'contractor'
                ? 'ring-2 ring-primary border-primary'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleRoleSelect('contractor')}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <User className="w-8 h-8 text-gray-600 mb-4" />
                  <p className="text-gray-900 font-medium">
                    I&apos;m a contractor hiring for a project
                  </p>
                </div>
                <div className="ml-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedRole === 'contractor'
                        ? 'border-primary bg-primary'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedRole === 'contractor' && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Artisan Card */}
          <Card
            className={`cursor-pointer transition-all duration-200 ${
              selectedRole === 'artisan'
                ? 'ring-2 ring-primary border-primary'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleRoleSelect('artisan')}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Wrench className="w-8 h-8 text-gray-600 mb-4" />
                  <p className="text-gray-900 font-medium">I&apos;m an artisan looking for work</p>
                </div>
                <div className="ml-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedRole === 'artisan' ? 'border-primary bg-primary' : 'border-gray-300'
                    }`}
                  >
                    {selectedRole === 'artisan' && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="text-center mb-6">
          <Button
            onClick={handleNext}
            className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium"
          >
            Apply as an {selectedRole}
          </Button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="#" className="text-primary hover:underline font-medium">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
