import type { ButtonProps } from "@heroui/react";

import { cn } from "@heroui/react";
import { domAnimation, LazyMotion, m } from "framer-motion";
import React, { ComponentProps } from "react";

export type VerticalStepProps = {
  className?: string;
  description?: React.ReactNode;
  title?: React.ReactNode;
};

export interface VerticalStepsProps extends React.HTMLAttributes<HTMLButtonElement> {
  steps?: VerticalStepProps[];
  color?: ButtonProps["color"];
  currentStep?: number;
  defaultStep?: number;
  hideProgressBars?: boolean;
  className?: string;
  stepClassName?: string;
  isDisabled?: boolean;
  onStepChange?: (stepIndex: number) => void;
}

function CheckIcon(props: ComponentProps<"svg">) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <m.path
        animate={{ pathLength: 1 }}
        d="M5 13l4 4L19 7"
        initial={{ pathLength: 0 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{
          delay: 0.2,
          duration: 0.3,
          ease: "easeOut",
          type: "tween",
        }}
      />
    </svg>
  );
}

const VerticalSteps = React.forwardRef<HTMLButtonElement, VerticalStepsProps>(
  (
    {
      className,
      color = "primary",
      currentStep: currentStepProp,
      defaultStep = 0,
      hideProgressBars = false,
      isDisabled = false,
      onStepChange,
      stepClassName,
      steps = [],
      ...props
    },
    ref,
  ) => {
    const [currentStep, setCurrentStep] = React.useState(currentStepProp ?? defaultStep);

    React.useEffect(() => {
      if (currentStepProp !== undefined && currentStepProp !== currentStep) {
        setCurrentStep(currentStepProp);
      }
    }, [currentStepProp]);

    const handleStepChange = (index: number) => {
      if (isDisabled) return;
      setCurrentStep(index);
      onStepChange?.(index);
    };

    const colors = React.useMemo(() => {
      let userColor;
      let fgColor;

      const colorsVars = [
        "[--active-fg-color:var(--step-fg-color)]",
        "[--active-border-color:var(--step-color)]",
        "[--active-color:var(--step-color)]",
        "[--complete-background-color:var(--step-color)]",
        "[--complete-border-color:var(--step-color)]",
        "[--inactive-border-color:hsl(var(--heroui-default-300))]",
        "[--inactive-color:hsl(var(--heroui-default-300))]",
      ];

      switch (color) {
        case "primary":
          userColor = "[--step-color:hsl(var(--heroui-primary))]";
          fgColor = "[--step-fg-color:hsl(var(--heroui-primary-foreground))]";
          break;
        case "secondary":
          userColor = "[--step-color:hsl(var(--heroui-secondary))]";
          fgColor = "[--step-fg-color:hsl(var(--heroui-secondary-foreground))]";
          break;
        case "success":
          userColor = "[--step-color:hsl(var(--heroui-success))]";
          fgColor = "[--step-fg-color:hsl(var(--heroui-success-foreground))]";
          break;
        case "warning":
          userColor = "[--step-color:hsl(var(--heroui-warning))]";
          fgColor = "[--step-fg-color:hsl(var(--heroui-warning-foreground))]";
          break;
        case "danger":
          userColor = "[--step-color:hsl(var(--heroui-error))]";
          fgColor = "[--step-fg-color:hsl(var(--heroui-error-foreground))]";
          break;
        case "default":
          userColor = "[--step-color:hsl(var(--heroui-default))]";
          fgColor = "[--step-fg-color:hsl(var(--heroui-default-foreground))]";
          break;
        default:
          userColor = "[--step-color:hsl(var(--heroui-primary))]";
          fgColor = "[--step-fg-color:hsl(var(--heroui-primary-foreground))]";
          break;
      }

      if (!className?.includes("--step-fg-color")) colorsVars.unshift(fgColor);
      if (!className?.includes("--step-color")) colorsVars.unshift(userColor);
      if (!className?.includes("--inactive-bar-color"))
        colorsVars.push("[--inactive-bar-color:hsl(var(--heroui-default-300))]");

      return colorsVars;
    }, [color, className]);

    return (
      <nav aria-label="Progress" className="max-w-fit ml-3">
        <ol className={cn("flex flex-col gap-y-8", colors, className)}>
          {steps?.map((step, stepIdx) => {
            const status =
              currentStep === stepIdx ? "active" : currentStep < stepIdx ? "inactive" : "complete";

            return (
              <li key={stepIdx} className="relative">
                <div className="flex w-full max-w-full items-center">
                  <button
                    ref={ref}
                    aria-current={status === "active" ? "step" : undefined}
                    className={cn(
                      "group flex w-full cursor-pointer items-center justify-center gap-4 rounded-large px-3 py-4",
                      {
                        "cursor-not-allowed opacity-50": isDisabled,
                      },
                      stepClassName,
                    )}
                    disabled={isDisabled}
                    onClick={() => handleStepChange(stepIdx)}
                    {...props}
                  >
                    <div className="flex h-full items-center">
                      <LazyMotion features={domAnimation}>
                        <div className="relative">
                          <m.div
                            animate={status}
                            className={cn(
                              "relative flex h-[40px] w-[40px] items-center justify-center rounded-full border-medium text-large font-semibold text-default-foreground",
                              {
                                "shadow-lg": status === "complete",
                              },
                            )}
                            data-status={status}
                            initial={false}
                            transition={{ duration: 0.25 }}
                            variants={{
                              inactive: {
                                backgroundColor: "transparent",
                                borderColor: "var(--inactive-border-color)",
                                color: "var(--inactive-color)",
                              },
                              active: {
                                backgroundColor: "transparent",
                                borderColor: "var(--active-border-color)",
                                color: "var(--active-color)",
                              },
                              complete: {
                                backgroundColor: "var(--complete-background-color)",
                                borderColor: "var(--complete-border-color)",
                              },
                            }}
                          >
                            <div className="flex items-center justify-center">
                              {status === "complete" ? (
                                <CheckIcon className="h-6 w-6 text-[var(--active-fg-color)]" />
                              ) : (
                                <span>{stepIdx + 1}</span>
                              )}
                            </div>
                          </m.div>
                        </div>
                      </LazyMotion>
                    </div>
                    <div className="flex-1 text-left">
                      <div>
                        <div
                          className={cn(
                            "text-medium font-medium text-default-foreground transition-[color,opacity] duration-300 group-active:opacity-70",
                            {
                              "text-default-500": status === "inactive",
                            },
                          )}
                        >
                          {step.title}
                        </div>
                        <div
                          className={cn(
                            "text-tiny text-default-600 transition-[color,opacity] duration-300 group-active:opacity-70 lg:text-small",
                            {
                              "text-default-500": status === "inactive",
                            },
                          )}
                        >
                          {step.description}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                {stepIdx < steps.length - 1 && !hideProgressBars && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-[calc(80px_*_var(--idx)_+_1)] flex h-1/2 -translate-y-1/3 items-center px-4"
                    style={{
                      // @ts-ignore
                      "--idx": stepIdx,
                    }}
                  >
                    <div
                      className={cn(
                        "relative h-full w-0.5 bg-[var(--inactive-bar-color)] transition-colors duration-300",
                        "after:absolute after:block after:h-0 after:w-full after:bg-[var(--active-border-color)] after:transition-[height] after:duration-300 after:content-['']",
                        {
                          "after:h-full": stepIdx < currentStep,
                        },
                      )}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

VerticalSteps.displayName = "VerticalSteps";

export default VerticalSteps;