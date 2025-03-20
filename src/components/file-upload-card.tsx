import React, { useState } from "react";
import { Card, Button, Badge, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { Icon } from "@iconify/react";
import { HeartIcon, ViewIcon } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';

interface FileCardProps {
    name: string;
    size: string;
    status: "pending" | "uploading" | "completed" | "error";
    progress?: number;
}

export function FileUploadCard({ name, size, status, progress }: FileCardProps) {
    const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
    ).toString();

    function changePage(offset: number) {
        setPageNumber(prevPageNumber => {
            const newPageNumber = prevPageNumber + offset;
            if (newPageNumber > 0 && newPageNumber <= (numPages || 1)) {
                return newPageNumber;
            }
            return prevPageNumber;
        });
    }

    const previousPage = () => changePage(-1);
    const nextPage = () => changePage(1);

    const statusColors: Record<"pending" | "uploading" | "completed" | "error", "default" | "primary" | "success" | "danger"> = {
        pending: "default",
        uploading: "primary",
        completed: "success",
        error: "danger",
    };

    const statusText = {
        pending: "Pending",
        uploading: "Uploading",
        completed: "Completed",
        error: "Error",
    };

    const demoUrl = "https://arxiv.org/pdf/2201.08239.pdf";

    return (
        <>
            <Card className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <div className="flex gap-4 items-center">
                            <p className="text-small font-medium">{name}</p>
                            <Button isIconOnly aria-label="Like" color="primary" variant="faded" size="sm"
                                onPress={() => setIsPdfPreviewOpen(true)}>
                                <ViewIcon />
                            </Button>
                        </div>
                        <p className="text-tiny text-default-400">{size}</p>
                    </div>
                    <Badge color={statusColors[status]} variant="flat">
                        {statusText[status]}
                    </Badge>
                </div>

                <div className="flex justify-between gap-2">
                    <Button size="sm" variant="flat" startContent={<Icon icon="lucide:upload" />}>
                        Upload
                    </Button>
                    <Button size="sm" variant="flat" startContent={<Icon icon="lucide:download" />}>
                        Download
                    </Button>
                    <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        startContent={<Icon icon="lucide:trash" />}
                    >
                        Delete
                    </Button>
                </div>
            </Card>
            <Modal isOpen={isPdfPreviewOpen} onClose={() => setIsPdfPreviewOpen(false)} size="5xl">
                <ModalContent>
                    <ModalHeader>
                        <div className="flex justify-between items-center w-full">
                            <h3>{name}</h3>
                            <Button
                                isIconOnly
                                variant="light"
                                onPress={() => setIsPdfPreviewOpen(true)}
                            >
                                <Icon icon="lucide:x" className="w-5 h-5" />
                            </Button>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col items-center">
                            <Document
                                file={demoUrl}
                            />


                            {numPages && (
                                <div className="flex items-center justify-center gap-4 mt-4">
                                    <Button
                                        isIconOnly
                                        variant="flat"
                                        onPress={previousPage}
                                        isDisabled={pageNumber <= 1}
                                    >
                                        <Icon icon="lucide:chevron-left" />
                                    </Button>

                                    <p className="text-small">
                                        Página {pageNumber} de {numPages}
                                    </p>

                                    <Button
                                        isIconOnly
                                        variant="flat"
                                        onPress={nextPage}
                                        isDisabled={pageNumber >= numPages}
                                    >
                                        <Icon icon="lucide:chevron-right" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            startContent={<Icon icon="lucide:download" />}
                            className="mr-2"
                        >
                            Descargar
                        </Button>
                        <Button
                            variant="light"
                            onPress={() => setIsPdfPreviewOpen(false)}
                        >
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
