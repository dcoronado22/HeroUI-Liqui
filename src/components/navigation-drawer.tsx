import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface NavigationDrawerProps {
    currentStep: number;
    totalSteps: number;
    onPrevious: () => void;
    onNext: () => void;
    className?: string;
}

export function NavigationDrawer({
    currentStep,
    totalSteps,
    onPrevious,
    onNext,
    className = "",
}: NavigationDrawerProps) {
    return (
        <div className={`flex justify-between items-center gap-4 w-full ${className}`}>
            <Button
                variant="flat"
                onPress={onPrevious}
                isDisabled={currentStep === 0}
                startContent={<Icon icon="lucide:arrow-left" />}
                className="flex-1 sm:flex-none"
            >
                Anterior
            </Button>
            <Button
                color="primary"
                onPress={onNext}
                isDisabled={currentStep === totalSteps - 1}
                endContent={<Icon icon="lucide:arrow-right" />}
                className="flex-1 sm:flex-none"
            >
                {currentStep === totalSteps - 1 ? "Finish" : "Siguiente"}
            </Button>
        </div>
    );
}