interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">
          {currentStep}/{totalSteps}
        </span>
        <div className="flex space-x-1 ml-4">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`h-1 w-8 rounded-full transition-colors duration-200 ${
                index < currentStep ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
