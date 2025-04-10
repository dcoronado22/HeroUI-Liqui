import type { FileInfo, FileStatus } from "../../types/form-types";

import { Badge, Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";

interface DocumentCardProps {
    file: FileInfo;
    onPreview: (file: FileInfo) => void;
    onUpload: (file: FileInfo) => void;
    onDownload: (file: FileInfo) => void;
    onDelete: (file: FileInfo) => void;
}

const statusConfig: Record<
    FileStatus,
    { label: string; color: "success" | "danger" | "warning" | "secondary" }
> = {
    valid: { label: "Válido", color: "success" },
    invalid: { label: "No válido", color: "danger" },
    reviewing: { label: "En revisión", color: "warning" },
    pending: { label: "Pendiente", color: "secondary" },
};

function DocumentCard({ file, onPreview, onUpload, onDownload, onDelete }: DocumentCardProps) {
    const status = statusConfig[file.status];

    return (
        <Card className="w-full">
            <CardHeader className="flex items-center justify-between">
                <h3 className="text-large font-medium">{file.name}</h3>
                <Badge color={status.color} variant="flat">
                    {status.label}
                </Badge>
            </CardHeader>
            <CardBody>
                <div className="flex items-center justify-center gap-2 p-4">
                    <Icon
                        className="text-default-400"
                        icon={file.type === "pdf" ? "lucide:file-text" : "lucide:image"}
                        width={48}
                    />
                </div>
            </CardBody>
            <CardFooter className="flex justify-between gap-2">
                <Button
                    isIconOnly
                    className="text-default-500"
                    radius="full"
                    variant="light"
                    onPress={() => onPreview(file)}
                >
                    <Icon icon="lucide:eye" width={20} />
                </Button>
                <Button
                    isIconOnly
                    className="text-default-500"
                    radius="full"
                    variant="light"
                    onPress={() => onUpload(file)}
                >
                    <Icon icon="lucide:upload" width={20} />
                </Button>
                <Button
                    isIconOnly
                    className="text-default-500"
                    radius="full"
                    variant="light"
                    onPress={() => onDownload(file)}
                >
                    <Icon icon="lucide:download" width={20} />
                </Button>
                <Button
                    isIconOnly
                    className="text-danger"
                    radius="full"
                    variant="light"
                    onPress={() => onDelete(file)}
                >
                    <Icon icon="lucide:trash-2" width={20} />
                </Button>
            </CardFooter>
        </Card>
    );
}

const SAMPLE_FILES: FileInfo[] = [
    {
        id: "1",
        name: "Identificación",
        type: "pdf",
        url: "#",
        status: "valid",
        uploadDate: new Date(),
    },
    {
        id: "2",
        name: "Comprobante de domicilio",
        type: "pdf",
        url: "#",
        status: "reviewing",
        uploadDate: new Date(),
    },
    {
        id: "3",
        name: "Acta constitutiva",
        type: "pdf",
        url: "#",
        status: "pending",
        uploadDate: new Date(),
    },
];

export function DocumentsStep() {
    const handlePreview = (file: FileInfo) => {
        console.log("Preview file:", file);
    };

    const handleUpload = (file: FileInfo) => {
        console.log("Upload file:", file);
    };

    const handleDownload = (file: FileInfo) => {
        console.log("Download file:", file);
    };

    const handleDelete = (file: FileInfo) => {
        console.log("Delete file:", file);
    };

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SAMPLE_FILES.map((file) => (
                <DocumentCard
                    key={file.id}
                    file={file}
                    onDelete={handleDelete}
                    onDownload={handleDownload}
                    onPreview={handlePreview}
                    onUpload={handleUpload}
                />
            ))}
        </div>
    );
}