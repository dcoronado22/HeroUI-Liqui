import { Button, Spinner } from "@heroui/react";

interface NavigationDrawerProps {
  currentStep: number;
  totalSteps: number;
  isLoading?: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function NavigationDrawer({
  currentStep,
  isLoading,
  onNext,
  onPrevious,
  onSubmit,
  totalSteps,
}: NavigationDrawerProps) {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="sticky bottom-0 border-t-small border-divider bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <Button
          className="min-w-[120px]"
          isDisabled={isFirstStep || isLoading}
          isLoading={isLoading}
          spinner={<Spinner color="current" size="sm" />}
          variant="flat"
          onPress={onPrevious}
        >
          Anterior
        </Button>
        <Button
          className="min-w-[120px]"
          color="primary"
          isDisabled={isLoading}
          isLoading={isLoading}
          spinner={<Spinner color="current" size="sm" />}
          onPress={isLastStep ? onSubmit : onNext}
        >
          {isLastStep ? "Submit" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
}