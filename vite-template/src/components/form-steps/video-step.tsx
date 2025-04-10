import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";

export function VideoStep() {
    return (
        <div className="flex flex-col items-center gap-8">
            <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-large">
                <video
                    autoPlay
                    className="h-full w-full"
                    controls
                    playsInline
                    src="https://s3.amazonaws.com/public.cesione.com.co/Liquicapital/Liquicapital.mp4"
                />
            </div>
            <Button
                className="min-w-[200px]"
                color="primary"
                endContent={<Icon icon="lucide:arrow-right" width={20} />}
                size="lg"
            >
                Obtener clave CIEC
            </Button>
        </div>
    );
}