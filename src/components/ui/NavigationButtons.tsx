import { Button } from '@/components/ui/button';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  showBack?: boolean;
  showNext?: boolean;
  nextText?: string;
  backText?: string;
  nextDisabled?: boolean;
}

export default function NavigationButtons({
  onBack,
  onNext,
  showBack = true,
  showNext = true,
  nextText = 'Next',
  backText = 'Back',
  nextDisabled = false,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-8">
      <div>
        {showBack && onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            {backText}
          </Button>
        )}
      </div>

      <div>
        {showNext && onNext && (
          <Button
            onClick={onNext}
            disabled={nextDisabled}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {nextText}
          </Button>
        )}
      </div>
    </div>
  );
}
