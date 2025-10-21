'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Upload } from 'lucide-react';

interface WorkExperienceData {
  projectTitle: string;
  role: string;
  specialties: string;
  client: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  images?: File[];
}

interface AddWorkExperienceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (experience: WorkExperienceData, index?: number) => void;
  initialData?: WorkExperienceData;
  editIndex?: number;
}

export default function AddWorkExperienceForm({
  isOpen,
  onClose,
  onSave,
  initialData,
  editIndex,
}: AddWorkExperienceFormProps) {
  const [formData, setFormData] = useState<WorkExperienceData>({
    projectTitle: '',
    role: '',
    specialties: '',
    client: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    images: [],
  });

  const handleInputChange = (field: keyof WorkExperienceData, value: string | File[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...files],
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.projectTitle || !formData.role) {
      return;
    }

    onSave(formData, editIndex);
    // Reset form
    setFormData({
      projectTitle: '',
      role: '',
      specialties: '',
      client: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      images: [],
    });
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      projectTitle: '',
      role: '',
      specialties: '',
      client: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      images: [],
    });
    onClose();
  };

  // Update form data when modal opens with initial data
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    } else if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        projectTitle: '',
        role: '',
        specialties: '',
        client: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        images: [],
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editIndex !== undefined ? 'Edit' : 'Add'} Work Experience
            </h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectTitle" className="text-sm font-medium text-gray-700">
                Project Title
              </Label>
              <Input
                id="projectTitle"
                type="text"
                placeholder="Eg. 3-Bedroom House Foundation"
                value={formData.projectTitle}
                onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                Role/Trade
              </Label>
              <Input
                id="role"
                type="text"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="specialties" className="text-sm font-medium text-gray-700">
                Specialties involved
              </Label>
              <Input
                id="specialties"
                type="text"
                value={formData.specialties}
                onChange={(e) => handleInputChange('specialties', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="client" className="text-sm font-medium text-gray-700">
                Client/Contractor
              </Label>
              <Input
                id="client"
                type="text"
                value={formData.client}
                onChange={(e) => handleInputChange('client', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                Location
              </Label>
              <Input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-md h-24 resize-none"
                placeholder="Describe your role and responsibilities in this project..."
              />
            </div>

            {/* Upload Images/Portfolio */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Upload Images/Portfolio</Label>
              <div className="mt-1">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    id="images"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Upload Images</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 10MB each</p>
                  </label>
                </div>

                {/* Display uploaded images */}
                {formData.images && formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {formData.images.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="bg-gray-100 rounded-lg p-3 text-center">
                          <p className="text-sm text-gray-600 truncate">{file.name}</p>
                          <p className="text-xs text-gray-400">
                            {(file.size / 1024 / 1024).toFixed(1)}MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="px-6 py-2 border-primary text-primary hover:bg-primary/5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-primary text-white hover:bg-primary/90"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
