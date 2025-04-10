import {Icon} from "@iconify/react";
import React from "react";

interface StepDescriptionProps {
  title: string;
  description: string;
  icon: string;
}

export function StepDescription({description, icon, title}: StepDescriptionProps) {
  return (
    <div className="mt-8 space-y-4 border-t-small border-divider pt-6">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <Icon icon={icon} width={24} />
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-default-500">{description}</p>
    </div>
  );
}