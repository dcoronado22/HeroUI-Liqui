import type { FormData } from "@/types/form-types";

import { Badge, Progress, Image } from "@heroui/react";
import React from "react";

import { CompanyDetails } from "@/components/form-steps/company-details";
import { DocumentsStep } from "@/components/form-steps/documents-step";
import { VideoStep } from "@/components/form-steps/video-step";
import { Header } from "@/components/header";
import { LoadingOverlay } from "@/components/loading-overlay";
import { NavigationDrawer } from "@/components/navigation-drawer";
import SupportCard from "@/components/support-card";
import VerticalSteps from "@/components/vertical-steps";

const INITIAL_FORM_DATA: FormData = {
    rfc: "",
    companyName: "",
    phone: "",
    whatsapp: "",
    firstName: "",
    lastName: "",
    secondLastName: "",
    privacyAccepted: false,
    documents: [],
};

const STEPS = [
    {
        title: "Datos de la empresa",
        description: "Información de la empresa y representante legal",
        icon: "lucide:building",
    },
    {
        title: "Video informativo",
        description: "Información importante sobre el proceso",
        icon: "lucide:play",
    },
    {
        title: "Documentos",
        description: "Carga de documentos requeridos",
        icon: "lucide:file-text",
    },
];

function App() {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [formData, setFormData] = React.useState<FormData>(INITIAL_FORM_DATA);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const progress = ((currentStep + 1) / STEPS.length) * 100;

    const handleChange = (key: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleNext = async () => {
        if (currentStep < STEPS.length - 1) {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            setCurrentStep((prev) => prev + 1);
            setIsLoading(false);
        }
    };

    const handlePrevious = async () => {
        if (currentStep > 0) {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            setCurrentStep((prev) => prev - 1);
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log("Form submitted:", formData);
        setIsLoading(false);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <CompanyDetails data={formData} onChange={handleChange} />;
            case 1:
                return <VideoStep />;
            case 2:
                return <DocumentsStep />;
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-default-50">
            {/* Left Sidebar - Steps */}
            <aside className="fixed left-0 top-0 z-40 hidden h-screen w-80 flex-shrink-0 flex-col border-r-small border-divider bg-background lg:flex">
                <div className="flex items-center gap-2 px-6 py-4 ml-4">
                    <div className="relative h-32 w-full rounded-medium">
                        <Image
                            alt="Welcome Banner"
                            className="h-full w-full object-cover"
                            src="/Logo2-removebg-preview.png"
                            width={300}
                        />
                    </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                    <VerticalSteps
                        color="primary"
                        currentStep={currentStep}

                        steps={STEPS}
                        onStepChange={setCurrentStep}
                    />
                    <SupportCard />
                </div>
            </aside>

            {/* Right Content */}
            <div className="flex w-full flex-1 flex-col lg:ml-80">
                <Header
                    currentStep={currentStep}
                    isMobileMenuOpen={isMobileMenuOpen}
                    totalSteps={STEPS.length}
                    onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
                <div className="relative">
                    <Progress
                        aria-label="Form progress"
                        className="h-1 rounded-none"
                        color="primary"
                        value={progress}
                    />
                    {/* Mobile Step Badge */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 lg:hidden">
                        <Badge
                            className="h-6 min-w-unit-16 px-unit-4"
                            color="primary"
                            content={`${currentStep + 1} / ${STEPS.length}`}
                            size="lg"
                            variant="solid"
                        />
                    </div>
                </div>

                {/* Main Content - Form */}
                <main className="relative flex-1 overflow-auto p-4 lg:p-6">
                    <div className="mx-auto max-w-[1200px] p-20">
                        {renderStep()}
                        {isLoading && <LoadingOverlay isOpen />}
                    </div>
                </main>

                {/* Right Side Navigation Drawer */}
                <NavigationDrawer
                    currentStep={currentStep}
                    isLoading={isLoading}
                    totalSteps={STEPS.length}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default App;