'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import NavigationButtons from '@/components/ui/NavigationButtons';
import { X } from 'lucide-react';

interface SkillsSelectionProps {
  onNext: () => void;
  onBack: () => void;
  currentStep?: number;
  totalSteps?: number;
  onSkillsChange?: (skills: string[]) => void;
  isSubmitting?: boolean;
}

const suggestedSkills = [
  'Surface preparation (cleaning, leveling)',
  'Accurate tile cutting & alignment',
  'Installing ceramic, porcelain, marble, mosaic tiles',
  'Applying waterproofing in wet areas',
  'Using spacers & grout correctly',
  'Finishing with trims & sealants',
];

export default function SkillsSelection({
  onNext,
  onBack,
  currentStep = 2,
  totalSteps = 3,
  onSkillsChange,
  isSubmitting = false,
}: SkillsSelectionProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addSkill = (skill: string) => {
    if (skill.trim() && !skills.includes(skill.trim()) && skills.length < 15) {
      const newSkills = [...skills, skill.trim()];
      setSkills(newSkills);
      onSkillsChange?.(newSkills);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(newSkills);
    onSkillsChange?.(newSkills);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(inputValue);
      setInputValue('');
    }
  };

  const handleSuggestedSkillClick = (skill: string) => {
    addSkill(skill);
  };

  const handleNext = () => {
    // Save skills to context or state management
    console.log('Selected skills:', skills);
    onNext();
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tell us what you do best!</h1>
          <p className="text-gray-600">
            The skills you select will help customers and contractors find you for the right jobs.
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

        {/* Skills Input */}
        <div className="mb-6">
          <Label htmlFor="skills" className="text-sm font-medium text-gray-700 mb-2 block">
            Your skills
          </Label>
          <div className="relative">
            <Input
              id="skills"
              type="text"
              placeholder="Enter your skillset"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleInputKeyPress}
              className="pr-10"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
              Max. 15 skills
            </div>
          </div>
        </div>

        {/* Selected Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Skills */}
        <div className="mb-8">
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Suggested skills</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestedSkills.map((skill, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleSuggestedSkillClick(skill)}
                disabled={skills.includes(skill) || skills.length >= 15}
                className="justify-start text-left h-auto p-3 border-gray-200 hover:border-primary hover:bg-primary/5"
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 border border-gray-300 rounded mr-3 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-sm" />
                  </div>
                  <span className="text-sm">{skill}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <NavigationButtons
          onBack={onBack}
          onNext={handleNext}
          nextDisabled={skills.length === 0 || isSubmitting}
          nextText={isSubmitting ? 'Submitting...' : 'Next'}
        />
      </div>
    </div>
  );
}
