'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HourlyRateData {
  rate: number;
  currency: string;
}

interface HourlyRateFormProps {
  onNext: () => void;
  onBack: () => void;
  onDataChange: (data: HourlyRateData) => void;
  initialData?: HourlyRateData;
}

export default function HourlyRateForm({
  onNext,
  onBack,
  onDataChange,
  initialData,
}: HourlyRateFormProps) {
  const [formData, setFormData] = useState<HourlyRateData>(
    initialData || {
      rate: 20,
      currency: 'GHS',
    }
  );

  const serviceFeeRate = 0.1; // 10% service fee

  // Calculate derived values
  const serviceFee = formData.rate * serviceFeeRate;
  const youllGet = formData.rate - serviceFee;

  const handleRateChange = (value: string) => {
    const numericValue = parseFloat(value) || 0;
    const updatedData = {
      ...formData,
      rate: numericValue,
    };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const handleCurrencyChange = (currency: string) => {
    const updatedData = {
      ...formData,
      currency,
    };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const handleNext = () => {
    if (formData.rate <= 0) {
      return;
    }
    onNext();
  };

  const formatCurrency = (amount: number) => {
    const symbol = formData.currency === 'GHS' ? 'GH₵' : formData.currency === 'USD' ? '$' : '€';
    return `${symbol} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-6">
        {/* Hourly Rate Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-8">
              <Label className="text-base font-medium text-gray-900">Hourly rate</Label>
              <p className="text-sm text-gray-600 mt-1">Total amount the client will see.</p>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <select
                  value={formData.currency}
                  onChange={(e) => handleCurrencyChange(e.target.value)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-gray-700 text-base font-medium focus:outline-none z-10"
                >
                  <option value="GHS">GH₵</option>
                  <option value="USD">$</option>
                  <option value="EUR">€</option>
                </select>
                <Input
                  type="number"
                  value={formData.rate}
                  onChange={(e) => handleRateChange(e.target.value)}
                  className="w-40 pl-12 pr-4 text-right text-lg font-medium border-gray-300 h-12"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <span className="ml-3 text-base text-gray-600 font-medium">/hr</span>
            </div>
          </div>
        </div>

        {/* Service Fee Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-8">
              <Label className="text-base font-medium text-gray-900">Service fee</Label>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                This helps us run the platform and provide services like payment protection and
                customer support. Fees vary and are shown before contract acceptance.
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-lg text-gray-900 font-medium">
                {formatCurrency(serviceFee)}
              </span>
              <span className="ml-3 text-base text-gray-600 font-medium">/hr</span>
            </div>
          </div>
        </div>

        {/* You'll Get Section */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-8">
              <Label className="text-base font-medium text-gray-900">You&apos;ll get</Label>
              <p className="text-sm text-gray-600 mt-1">
                The estimated amount you&apos;ll receive after service fees.
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-lg text-primary font-semibold">{formatCurrency(youllGet)}</span>
              <span className="ml-3 text-base text-gray-600 font-medium">/hr</span>
            </div>
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
