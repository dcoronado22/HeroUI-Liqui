import { CircularProgress, Image } from "@heroui/react";

interface LoadingOverlayProps {
    isOpen: boolean;
}

export function LoadingOverlay({ isOpen }: LoadingOverlayProps) {
    if (!isOpen) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                {/* <CircularProgress
                    aria-label="Loading..."
                    classNames={{
                        svg: "w-16 h-16",
                    }}
                    color="primary"
                    size="lg"
                /> */}
                <Image
                    className="pl-2"
                    src="/loading.gif"
                    width={250}
                />
                <p className="text-medium font-medium text-default-600">Cargando...</p>
            </div>
        </div>
    );
}