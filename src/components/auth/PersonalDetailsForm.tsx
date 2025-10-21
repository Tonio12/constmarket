'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, ChevronDown, Plus } from 'lucide-react';

interface PersonalDetailsData {
  dateOfBirth: string;
  gender: string;
  country: string;
  city: string;
  digitalAddress: string;
  phoneNumber: string;
  profilePicture?: File;
}

interface PersonalDetailsFormProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: PersonalDetailsData) => void;
  initialData?: PersonalDetailsData;
}

export default function PersonalDetailsForm({
  onNext,
  onBack,
  onDataChange,
  initialData,
}: PersonalDetailsFormProps) {
  const [formData, setFormData] = useState<PersonalDetailsData>(
    initialData || {
      dateOfBirth: '',
      gender: '',
      country: '',
      city: '',
      digitalAddress: '',
      phoneNumber: '',
    }
  );

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleInputChange = (field: keyof PersonalDetailsData, value: string | File) => {
    const updatedData = {
      ...formData,
      [field]: value,
    };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      handleInputChange('profilePicture', file);
    }
  };

  const handleNext = () => {
    // Basic validation
    if (
      !formData.dateOfBirth ||
      !formData.city ||
      !formData.digitalAddress ||
      !formData.phoneNumber
    ) {
      return;
    }
    onNext();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left Column - Profile Photo */}
      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-4 block">Profile Photo</Label>

          {/* Profile Picture Placeholder */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <div className="w-40 h-40 rounded-full bg-gradient-to-b from-primary to-blue-500 flex items-center justify-center relative overflow-hidden">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-primary to-blue-500 rounded-full" />
              )}

              {/* Add Photo Button Overlay */}
              <button
                type="button"
                onClick={() => document.getElementById('profile-upload')?.click()}
                className="absolute bottom-1 right-1 w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>

            <input
              id="profile-upload"
              type="file"
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('profile-upload')?.click()}
            className="w-full bg-primary text-white hover:bg-primary/90 border-primary rounded-md"
          >
            <Plus className="w-4 h-4 mr-2" />+ Upload Photo
          </Button>
        </div>
      </div>

      {/* Right Column - Personal Information */}
      <div className="space-y-6">
        {/* Date of Birth */}
        <div>
          <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
            Date of Birth <span className="text-red-500">*</span>
          </Label>
          <div className="relative mt-1">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="dateOfBirth"
              type="text"
              placeholder="mm/dd/yyyy"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
            Gender
          </Label>
          <div className="relative mt-1">
            <select
              id="gender"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md appearance-none bg-white"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Country */}
        <div>
          <Label htmlFor="country" className="text-sm font-medium text-gray-700">
            Country
          </Label>
          <Input
            id="country"
            type="text"
            placeholder="here"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="mt-1"
          />
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city" className="text-sm font-medium text-gray-700">
            City <span className="text-red-500">*</span>
          </Label>
          <Input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Digital Address */}
        <div>
          <Label htmlFor="digitalAddress" className="text-sm font-medium text-gray-700">
            Digital Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="digitalAddress"
            type="text"
            value={formData.digitalAddress}
            onChange={(e) => handleInputChange('digitalAddress', e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Phone Number */}
        <div>
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <div className="flex mt-1">
            {/* Country Code Dropdown */}
            <div className="relative mr-2">
              <select className="w-20 p-3 border border-gray-300 rounded-l-md appearance-none bg-white">
                <option value="+233">🇬🇭 +233</option>
                <option value="+234">🇳🇬 +234</option>
                <option value="+254">🇰🇪 +254</option>
                <option value="+256">🇺🇬 +256</option>
              </select>
              <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Phone Number Input */}
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Enter number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="flex-1 rounded-l-none rounded-r-md"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-16">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="px-6 py-3 border border-primary text-primary hover:bg-primary/5 rounded-md"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 bg-primary text-white hover:bg-primary/90 rounded-md"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
