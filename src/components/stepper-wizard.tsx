import React from "react";
import { Button, Card, Progress, Input, Divider, Checkbox } from "@heroui/react";
import { Icon } from "@iconify/react";
import { FileUploadCard } from "./file-upload-card";
import { NavigationDrawer } from "./navigation-drawer";

interface StepProps {
    title: string;
    description: string;
    icon: string;
}

const steps: StepProps[] = [
    {
        title: "Registro",
        description: "Por favor ingresa tus datos",
        icon: "lucide:user",
    },
    {
        title: "Captura Clave CIEC",
        description: "Autenticación con clave CIEC",
        icon: "lucide:key",
    },
    {
        title: "Documentos",
        description: "Sube tus documentos",
        icon: "lucide:file-plus",
    },
    {
        title: "Preferencias",
        description: "Configura tus preferencias",
        icon: "lucide:settings",
    },
    {
        title: "Seguridad",
        description: "Configura la seguridad",
        icon: "lucide:shield",
    },
    {
        title: "Confirmación",
        description: "Revisa y confirma",
        icon: "lucide:check-circle",
    },
];

interface FactoringFormData {
    // Persona o compañía con la que se tendrá el factoraje
    rfc: string;
    razonSocial: string;
    telefono: string;
    whatsapp: string;

    // Datos del representante legal
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    aceptaPrivacidad: boolean;
}

const mockFiles = [
    { name: "Acta Constitutiva.pdf", size: "2.4 MB", status: "completed" },
    { name: "RFC.pdf", size: "1.8 MB", status: "uploading" },
    { name: "Comprobante de Domicilio.pdf", size: "3.2 MB", status: "pending" },
    { name: "Identificación Oficial.pdf", size: "4.1 MB", status: "error" },
    { name: "Estado de Cuenta.pdf", size: "2.9 MB", status: "completed" },
    { name: "Declaración Anual.pdf", size: "1.5 MB", status: "pending" },
    { name: "CURP.pdf", size: "2.2 MB", status: "completed" },
    { name: "Poder Notarial.pdf", size: "3.7 MB", status: "uploading" },
] as const;

export default function StepperWizard() {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [formData, setFormData] = React.useState<FactoringFormData>({
        rfc: "",
        razonSocial: "",
        telefono: "",
        whatsapp: "",
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        aceptaPrivacidad: false
    });
    const [isCardBottomVisible, setIsCardBottomVisible] = React.useState(false);
    const cardBottomRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    const handleInputChange = (field: keyof FactoringFormData) => (value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    React.useEffect(() => {
        // Using IntersectionObserver to detect when the bottom of the card is visible
        if (!cardBottomRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update state based on whether bottom indicator is visible
                setIsCardBottomVisible(entry.isIntersecting);
            },
            {
                // This threshold means the callback will run when any portion of the target is visible
                threshold: 0,
                // This rootMargin adds a bit of buffer to trigger before the element is fully visible
                rootMargin: "0px 0px 50px 0px"
            }
        );

        observer.observe(cardBottomRef.current);

        return () => {
            if (cardBottomRef.current) {
                observer.unobserve(cardBottomRef.current);
            }
        };
    }, []);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            // Scroll to top when changing steps
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            // Scroll to top when changing steps
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleAuthenticate = () => {
        alert("Iniciando autenticación con clave CIEC");
        // Aquí iría la lógica para autenticar con CIEC
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Persona o compañía con la que se tendrá el factoraje</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="RFC"
                                    placeholder="Ingresa el RFC"
                                    value={formData.rfc}
                                    onValueChange={handleInputChange("rfc")}
                                />
                                <Input
                                    label="Razón Social"
                                    placeholder="Ingresa la razón social"
                                    value={formData.razonSocial}
                                    onValueChange={handleInputChange("razonSocial")}
                                />
                                <Input
                                    label="Teléfono"
                                    placeholder="Ingresa el teléfono"
                                    type="tel"
                                    value={formData.telefono}
                                    onValueChange={handleInputChange("telefono")}
                                />
                                <Input
                                    label="WhatsApp Oficial"
                                    placeholder="Ingresa el WhatsApp oficial"
                                    type="tel"
                                    value={formData.whatsapp}
                                    onValueChange={handleInputChange("whatsapp")}
                                />
                            </div>
                        </div>

                        <Divider />

                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Datos del representante legal</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Input
                                    label="Nombres"
                                    placeholder="Ingresa los nombres"
                                    value={formData.nombres}
                                    onValueChange={handleInputChange("nombres")}
                                />
                                <Input
                                    label="Apellido Paterno"
                                    placeholder="Ingresa el apellido paterno"
                                    value={formData.apellidoPaterno}
                                    onValueChange={handleInputChange("apellidoPaterno")}
                                />
                                <Input
                                    label="Apellido Materno"
                                    placeholder="Ingresa el apellido materno"
                                    value={formData.apellidoMaterno}
                                    onValueChange={handleInputChange("apellidoMaterno")}
                                />
                            </div>
                            <div className="mt-4">
                                <Checkbox
                                    isSelected={formData.aceptaPrivacidad}
                                    onValueChange={handleInputChange("aceptaPrivacidad")}
                                >
                                    He leído y acepto el <Button variant="light" className="p-0 m-0 h-auto" as="a" href="#aviso-privacidad">Aviso de Privacidad</Button>
                                </Checkbox>
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden bg-default-100">
                            <iframe
                                className="w-full h-full"
                                src="https://s3.amazonaws.com/public.cesione.com.co/Liquicapital/Liquicapital.mp4"
                                title="Introduction Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="flex justify-center">
                            <Button
                                size="lg"
                                color="primary"
                                startContent={<Icon icon="lucide:key" />}
                                onPress={handleAuthenticate}
                            >
                                Pulsa aquí para autenticarte con tu clave CIEC
                            </Button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {mockFiles.map((file, index) => (
                                <FileUploadCard
                                    key={index}
                                    name={file.name}
                                    size={file.size}
                                    status={file.status}
                                />
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-default-200 rounded-lg">
                        <span className="text-default-400">Contenido del paso {currentStep + 1}</span>
                    </div>
                );
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6 pb-24" ref={contentRef}>
            <Card className="p-6 w-full">
                {/* Keep the existing steps progress bar */}
                <div className="flex justify-between items-start gap-4">
                    {steps.map((step, index) => (
                        <div key={index} className="flex-1">
                            <div className="relative">
                                <div
                                    className={`w-full h-1 absolute top-4 -right-1/2 ${index < currentStep ? "bg-primary" : "bg-default-200"
                                        }`}
                                    style={{ width: "calc(100% - 2rem)" }}
                                />
                                <div className="relative flex flex-col items-center text-center">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? "bg-primary text-white" : "bg-default-200"
                                            }`}
                                    >
                                        <Icon icon={step.icon} className="w-4 h-4" />
                                    </div>
                                    <p className="mt-2 font-medium text-small">{step.title}</p>
                                    <p className="text-tiny text-default-500">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="p-6 space-y-6 w-full">
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">{steps[currentStep].title}</h2>
                    <p className="text-default-500">{steps[currentStep].description}</p>
                </div>

                <Divider />

                <div className="space-y-6">
                    {renderStepContent()}
                </div>

                {/* Card bottom observer element */}
                <div ref={cardBottomRef} className="h-px w-full" />

                {/* Navigation drawer in card - only shown when bottom is visible */}
                {isCardBottomVisible && (
                    <>
                        <Divider />
                        <NavigationDrawer
                            currentStep={currentStep}
                            totalSteps={steps.length}
                            onPrevious={handlePrevious}
                            onNext={handleNext}
                        />
                    </>
                )}
            </Card>

            {/* Fixed navigation drawer - only shown when bottom is not visible */}
            <div
                className={`fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-divider transition-transform duration-200 ${isCardBottomVisible ? "translate-y-full" : "translate-y-0"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <NavigationDrawer
                        currentStep={currentStep}
                        totalSteps={steps.length}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                    />
                </div>
            </div>
        </div>
    );
}