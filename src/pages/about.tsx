import { AppNavbar } from "@/components/navbar";
import StepperWizard from "@/components/stepper-wizard";

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-default-50">
      <AppNavbar />
      <div className="flex-1 p-6 ">
        <StepperWizard />
      </div>
    </div>
  );
}



