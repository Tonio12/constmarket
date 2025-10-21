'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Upload, ChevronDown } from 'lucide-react';

interface EducationData {
  institution: string;
  qualification: string;
  specialization: string;
  startDate: string;
  endDate: string;
  description: string;
  certificate?: File;
}

interface AddEducationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (education: EducationData, index?: number) => void;
  initialData?: EducationData;
  editIndex?: number;
}

export default function AddEducationForm({
  isOpen,
  onClose,
  onSave,
  initialData,
  editIndex,
}: AddEducationFormProps) {
  const [formData, setFormData] = useState<EducationData>({
    institution: '',
    qualification: '',
    specialization: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleInputChange = (field: keyof EducationData, value: string | File) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange('certificate', file);
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.institution || !formData.qualification) {
      return;
    }

    onSave(formData, editIndex);
    // Reset form
    setFormData({
      institution: '',
      qualification: '',
      specialization: '',
      startDate: '',
      endDate: '',
      description: '',
    });
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      institution: '',
      qualification: '',
      specialization: '',
      startDate: '',
      endDate: '',
      description: '',
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
        institution: '',
        qualification: '',
        specialization: '',
        startDate: '',
        endDate: '',
        description: '',
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
              {editIndex !== undefined ? 'Edit' : 'Add'} Education/Training History
            </h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="institution" className="text-sm font-medium text-gray-700">
                Institution / Training Center
              </Label>
              <Input
                id="institution"
                type="text"
                placeholder="Eg. Accra Technical Training Centre"
                value={formData.institution}
                onChange={(e) => handleInputChange('institution', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="qualification" className="text-sm font-medium text-gray-700">
                Qualification / Certification
              </Label>
              <Input
                id="qualification"
                type="text"
                value={formData.qualification}
                onChange={(e) => handleInputChange('qualification', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="specialization" className="text-sm font-medium text-gray-700">
                Trade / Specialization
              </Label>
              <div className="relative mt-1">
                <Input
                  id="specialization"
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  className="pr-8"
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
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
                placeholder="Describe your education or training experience..."
              />
            </div>

            {/* Upload Certificate */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Upload Certificate</Label>
              <div className="mt-1">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    id="certificate"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label htmlFor="certificate" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Upload File</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
                  </label>
                </div>
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
