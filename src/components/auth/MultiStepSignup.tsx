'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RoleSelection from './RoleSelection';
import SkillsSelection from './SkillsSelection';
import SignupForm from './SignupForm';
import PersonalDetailsForm from './PersonalDetailsForm';
import HourlyRateForm from './HourlyRateForm';
import AddEducationForm from './AddEducationForm';
import AddWorkExperienceForm from './AddWorkExperienceForm';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import { authApi, type SignupData as APISignupData } from '@/lib/api/auth';
import { toast } from 'sonner';

type UserRole = 'contractor' | 'artisan';
type SignupStep =
  | 'role-selection'
  | 'signup-form'
  | 'professional-role'
  | 'education-history'
  | 'work-experience'
  | 'personal-details'
  | 'hourly-rate'
  | 'bio-overview'
  | 'trade-specialties';

interface SignupData {
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
  education: Array<{
    institution: string;
    qualification: string;
    specialization: string;
    startDate: string;
    endDate: string;
    description: string;
    certificate?: File;
  }>;
  workExperience: Array<{
    projectTitle: string;
    role: string;
    specialties: string;
    client: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  personalDetails: {
    dateOfBirth: string;
    gender: string;
    country: string;
    city: string;
    digitalAddress: string;
    phoneNumber: string;
    profilePicture?: File;
  };
  hourlyRate: {
    rate: number;
    currency: string;
  };
  bio: string;
  trade: string;
  specialties: string[];
}

export default function MultiStepSignup() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<SignupStep>('role-selection');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | undefined>(undefined);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | undefined>(
    undefined
  );
  const [signupData, setSignupData] = useState<SignupData>({
    role: null,
    skills: [],
    formData: {
      firstName: '',
      surname: '',
      email: '',
      password: '',
      emailUpdates: true,
      termsAccepted: false,
    },
    professionalRole: '',
    education: [],
    workExperience: [],
    personalDetails: {
      dateOfBirth: '',
      gender: '',
      country: '',
      city: '',
      digitalAddress: '',
      phoneNumber: '',
    },
    hourlyRate: {
      rate: 0,
      currency: 'GHS',
    },
    bio: '',
    trade: '',
    specialties: [],
  });

  const handleRoleSelect = (role: UserRole) => {
    setSignupData((prev) => ({ ...prev, role }));
  };

  const handleFormDataUpdate = (formData: SignupData['formData']) => {
    setSignupData((prev) => ({ ...prev, formData }));
  };

  const handleSkillsUpdate = (skills: string[]) => {
    setSignupData((prev) => ({ ...prev, skills }));
  };

  const handleAddEducation = (education: any, index?: number) => {
    setSignupData((prev) => {
      if (index !== undefined) {
        // Edit existing education
        const updatedEducation = [...prev.education];
        updatedEducation[index] = education;
        return { ...prev, education: updatedEducation };
      } else {
        // Add new education
        return { ...prev, education: [...prev.education, education] };
      }
    });
    setEditingEducationIndex(undefined);
  };

  const handleDeleteEducation = (index: number) => {
    setSignupData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleEditEducation = (index: number) => {
    setEditingEducationIndex(index);
    setIsEducationModalOpen(true);
  };

  const handleAddExperience = (experience: any, index?: number) => {
    setSignupData((prev) => {
      if (index !== undefined) {
        // Edit existing experience
        const updatedExperience = [...prev.workExperience];
        updatedExperience[index] = experience;
        return { ...prev, workExperience: updatedExperience };
      } else {
        // Add new experience
        return { ...prev, workExperience: [...prev.workExperience, experience] };
      }
    });
    setEditingExperienceIndex(undefined);
  };

  const handleDeleteExperience = (index: number) => {
    setSignupData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };

  const handleEditExperience = (index: number) => {
    setEditingExperienceIndex(index);
    setIsExperienceModalOpen(true);
  };

  const handlePersonalDetailsUpdate = (personalDetails: any) => {
    setSignupData((prev) => ({
      ...prev,
      personalDetails,
    }));
  };

  const handleHourlyRateUpdate = (hourlyRate: any) => {
    setSignupData((prev) => ({
      ...prev,
      hourlyRate,
    }));
  };

  const handleFinalSubmit = async () => {
    if (!signupData.role) {
      toast.error('Please select a role');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API
      const apiData: APISignupData = {
        email: signupData.formData.email,
        password: signupData.formData.password,
        userType: signupData.role,
        profile: {
          firstName: signupData.formData.firstName,
          surname: signupData.formData.surname,
          // For artisans, include all the collected data
          ...(signupData.role === 'artisan' && {
            professionalRole: signupData.professionalRole,
            education: signupData.education,
            workExperience: signupData.workExperience,
            personalDetails: signupData.personalDetails,
            hourlyRate: signupData.hourlyRate,
            bio: signupData.bio,
            trade: signupData.trade,
            specialties: signupData.specialties,
            skills: signupData.skills,
          }),
        },
        contactInfo: {
          email: signupData.formData.email,
        },
        preferences: {
          emailUpdates: signupData.formData.emailUpdates,
          termsAccepted: signupData.formData.termsAccepted,
        },
      };

      const response = await authApi.signup(apiData);

      if (response.success) {
        toast.success('Account created successfully! Welcome to CraftConnect.');

        // All users go to home page after account creation
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        toast.error(response.message || 'Signup failed. Please try again.');
        if (response.errors && response.errors.length > 0) {
          response.errors.forEach((err) => toast.error(err));
        }
      }
    } catch (err) {
      toast.error('An unexpected error occurred. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    switch (currentStep) {
      case 'role-selection':
        // Go to signup form first
        setCurrentStep('signup-form');
        break;
      case 'signup-form':
        // Route based on user type
        if (signupData.role === 'contractor') {
          // Contractors go directly to account creation
          handleFinalSubmit();
        } else if (signupData.role === 'artisan') {
          // Artisans go through additional steps
          setCurrentStep('professional-role');
        } else {
          // Fallback: if role is somehow not set, show error
          toast.error('Please select a role first');
          setCurrentStep('role-selection');
        }
        break;
      case 'professional-role':
        setCurrentStep('education-history');
        break;
      case 'education-history':
        setCurrentStep('work-experience');
        break;
      case 'work-experience':
        setCurrentStep('personal-details');
        break;
      case 'personal-details':
        setCurrentStep('hourly-rate');
        break;
      case 'hourly-rate':
        setCurrentStep('bio-overview');
        break;
      case 'bio-overview':
        setCurrentStep('trade-specialties');
        break;
      case 'trade-specialties':
        // Final step - create account with all data
        handleFinalSubmit();
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'signup-form':
        setCurrentStep('role-selection');
        break;
      case 'professional-role':
        setCurrentStep('signup-form');
        break;
      case 'education-history':
        setCurrentStep('professional-role');
        break;
      case 'work-experience':
        setCurrentStep('education-history');
        break;
      case 'personal-details':
        setCurrentStep('work-experience');
        break;
      case 'hourly-rate':
        setCurrentStep('personal-details');
        break;
      case 'bio-overview':
        setCurrentStep('hourly-rate');
        break;
      case 'trade-specialties':
        setCurrentStep('bio-overview');
        break;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'role-selection':
        return (
          <RoleSelection
            onRoleSelect={handleRoleSelect}
            onNext={handleNext}
            selectedRole={signupData.role}
          />
        );
      case 'signup-form':
        return (
          <SignupForm
            onNext={handleNext}
            onBack={handleBack}
            formData={signupData.formData}
            onFormDataChange={handleFormDataUpdate}
            isSubmitting={isSubmitting}
            userType={signupData.role}
          />
        );
      case 'professional-role':
        return (
          <div className="min-h-screen bg-white p-4">
            <div className="max-w-4xl mx-auto">
              {/* Progress Indicator */}
              <ProgressIndicator currentStep={3} totalSteps={9} />

              <h1 className="text-2xl font-semibold text-gray-900 mb-8">
                Got it. Now, add a title to tell the world what you do.
              </h1>
              <p className="text-gray-600 mb-8">
                It's the very first thing clients see, so make it count. Stand out by describing
                your expertise in your own words.
              </p>
              <div className="max-w-lg mx-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your professional role
                </label>
                <input
                  type="text"
                  placeholder="Enter your job title"
                  value={signupData.professionalRole}
                  onChange={(e) =>
                    setSignupData((prev) => ({ ...prev, professionalRole: e.target.value }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 border border-primary text-primary rounded-md"
                >
                  Back
                </button>
                <button onClick={handleNext} className="px-6 py-2 bg-primary text-white rounded-md">
                  Next
                </button>
              </div>
            </div>
          </div>
        );
      case 'education-history':
        return (
          <div className="min-h-screen bg-white p-4">
            <div className="max-w-4xl mx-auto">
              {/* Progress Indicator */}
              <ProgressIndicator currentStep={4} totalSteps={9} />

              <h1 className="text-2xl font-semibold text-gray-900 mb-8">
                Clients like to know what you know - add your education here.
              </h1>
              <p className="text-gray-600 mb-8">
                You don't have to have a degree. Adding any relevant education helps make your
                profile more visible.{' '}
                <span className="font-medium">You can skip this and add it later.</span>
              </p>
              <div className="max-w-lg mx-auto">
                <div
                  className="border-2 border-dashed border-primary rounded-lg p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors"
                  onClick={() => {
                    setEditingEducationIndex(undefined);
                    setIsEducationModalOpen(true);
                  }}
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl">+</span>
                  </div>
                  <p className="text-gray-700">Add education</p>
                </div>

                {/* Display added education entries */}
                {signupData.education.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {signupData.education.map((edu, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 relative group cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleEditEducation(index)}
                      >
                        <h4 className="font-medium text-gray-900">{edu.qualification}</h4>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                        <p className="text-sm text-gray-500">{edu.specialization}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEducation(index);
                          }}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 border border-primary text-primary rounded-md"
                >
                  Back
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Skip for now
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'work-experience':
        return (
          <div className="min-h-screen bg-white p-4">
            <div className="max-w-4xl mx-auto">
              {/* Progress Indicator */}
              <ProgressIndicator currentStep={5} totalSteps={9} />

              <h1 className="text-2xl font-semibold text-gray-900 mb-8">
                If you have relevant work experience, add it here.
              </h1>
              <p className="text-gray-600 mb-8">
                Freelancers who add their experience are twice as likely to win work. But if you're
                just starting out, you can still create a great profile.{' '}
                <span className="font-medium">You can skip this and add it later.</span>
              </p>
              <div className="max-w-lg mx-auto">
                <div
                  className="border-2 border-dashed border-primary rounded-lg p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors"
                  onClick={() => {
                    setEditingExperienceIndex(undefined);
                    setIsExperienceModalOpen(true);
                  }}
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl">+</span>
                  </div>
                  <p className="text-gray-700">Add work experience</p>
                </div>

                {/* Display added work experience entries */}
                {signupData.workExperience.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {signupData.workExperience.map((exp, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 relative group cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => handleEditExperience(index)}
                      >
                        <h4 className="font-medium text-gray-900">{exp.projectTitle}</h4>
                        <p className="text-sm text-gray-600">
                          {exp.role} • {exp.client}
                        </p>
                        <p className="text-sm text-gray-500">{exp.location}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteExperience(index);
                          }}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 border border-primary text-primary rounded-md"
                >
                  Back
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Skip for now
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'personal-details':
        return (
          <div className="min-h-screen bg-white p-4">
            <div className="max-w-4xl mx-auto">
              {/* Progress Indicator */}
              <ProgressIndicator currentStep={6} totalSteps={9} />

              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                  A few last details, then you can check and publish your profile.
                </h1>
                <p className="text-gray-600">
                  A professional photo helps you build trust with your clients. To keep things safe
                  and simple, they&apos;ll pay you through us - which is why we need your personal
                  information.
                </p>
              </div>

              <PersonalDetailsForm
                onNext={handleNext}
                onBack={handleBack}
                onDataChange={handlePersonalDetailsUpdate}
                initialData={signupData.personalDetails}
              />
            </div>
          </div>
        );
      case 'hourly-rate':
        return (
          <div className="min-h-screen bg-white p-4">
            <div className="max-w-4xl mx-auto">
              {/* Progress Indicator */}
              <ProgressIndicator currentStep={7} totalSteps={9} />

              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                  Now, let&apos;s set your hourly rate.
                </h1>
                <p className="text-gray-600">
                  Clients will see this rate on your profile and in search results once you publish
                  your profile. You can adjust your rate every time you submit a proposal.
                </p>
              </div>

              <HourlyRateForm
                onNext={handleNext}
                onBack={handleBack}
                onDataChange={handleHourlyRateUpdate}
                initialData={signupData.hourlyRate}
              />
            </div>
          </div>
        );
      case 'bio-overview':
        return (
          <div className="min-h-screen bg-white p-4">
            <div className="max-w-4xl mx-auto">
              {/* Progress Indicator */}
              <ProgressIndicator currentStep={8} totalSteps={9} />

              <h1 className="text-2xl font-semibold text-gray-900 mb-8">
                Great. Now write a bio to tell the world about yourself.
              </h1>
              <p className="text-gray-600 mb-8">
                Help people get to know you at a glance. What work do you do best? Tell them
                clearly, using paragraphs or bullet points. You can always edit later; just make
                sure you proofread now.
              </p>
              <div className="max-w-lg mx-auto">
                <textarea
                  placeholder="Enter your top skills, experiences, and interests. This is one of the first things clients will see on your profile."
                  value={signupData.bio}
                  onChange={(e) => setSignupData((prev) => ({ ...prev, bio: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-md h-32"
                />
              </div>
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="px-6 py-2 border border-primary text-primary rounded-md"
                >
                  Back
                </button>
                <button onClick={handleNext} className="px-6 py-2 bg-primary text-white rounded-md">
                  Next
                </button>
              </div>
            </div>
          </div>
        );
      case 'trade-specialties':
        return (
          <SkillsSelection
            onNext={handleNext}
            onBack={handleBack}
            currentStep={9}
            totalSteps={9}
            onSkillsChange={handleSkillsUpdate}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderCurrentStep()}

      {/* Modal Forms */}
      <AddEducationForm
        isOpen={isEducationModalOpen}
        onClose={() => {
          setIsEducationModalOpen(false);
          setEditingEducationIndex(undefined);
        }}
        onSave={handleAddEducation}
        initialData={
          editingEducationIndex !== undefined
            ? signupData.education[editingEducationIndex]
            : undefined
        }
        editIndex={editingEducationIndex}
      />

      <AddWorkExperienceForm
        isOpen={isExperienceModalOpen}
        onClose={() => {
          setIsExperienceModalOpen(false);
          setEditingExperienceIndex(undefined);
        }}
        onSave={handleAddExperience}
        initialData={
          editingExperienceIndex !== undefined
            ? signupData.workExperience[editingExperienceIndex]
            : undefined
        }
        editIndex={editingExperienceIndex}
      />
    </div>
  );
}
