import type { FormData } from "../../types/form-types";

import { Checkbox, Input } from "@heroui/react";
import React from "react";

interface CompanyDetailsProps {
    data: FormData;
    onChange: (key: keyof FormData, value: any) => void;
}

export function CompanyDetails({ data, onChange }: CompanyDetailsProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold">Persona o compañía con la que se tendrá el factoraje</h2>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            isRequired
                            label="RFC"
                            placeholder="Ingrese el RFC"
                            radius="sm"
                            value={data.rfc}
                            variant="flat"
                            classNames={{
                                input: "bg-default-100",
                                inputWrapper: "bg-default-100",
                            }}
                            onValueChange={(value) => onChange("rfc", value)}
                        />
                        <Input
                            isRequired
                            label="Razón Social"
                            placeholder="Ingrese la razón social"
                            radius="sm"
                            value={data.companyName}
                            variant="flat"
                            classNames={{
                                input: "bg-default-100",
                                inputWrapper: "bg-default-100",
                            }}
                            onValueChange={(value) => onChange("companyName", value)}
                        />
                        <Input
                            isRequired
                            label="Teléfono"
                            placeholder="Ingrese el teléfono"
                            radius="sm"
                            type="tel"
                            value={data.phone}
                            variant="flat"
                            classNames={{
                                input: "bg-default-100",
                                inputWrapper: "bg-default-100",
                            }}
                            onValueChange={(value) => onChange("phone", value)}
                        />
                        <Input
                            isRequired
                            label="WhatsApp"
                            placeholder="Ingrese el WhatsApp"
                            radius="sm"
                            type="tel"
                            value={data.whatsapp}
                            variant="flat"
                            classNames={{
                                input: "bg-default-100",
                                inputWrapper: "bg-default-100",
                            }}
                            onValueChange={(value) => onChange("whatsapp", value)}
                        />
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold">Datos del representante legal</h2>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Input
                            isRequired
                            label="Nombres"
                            placeholder="Ingrese los nombres"
                            radius="sm"
                            value={data.firstName}
                            variant="flat"
                            classNames={{
                                input: "bg-default-100",
                                inputWrapper: "bg-default-100",
                            }}
                            onValueChange={(value) => onChange("firstName", value)}
                        />
                        <Input
                            isRequired
                            label="Apellido Paterno"
                            placeholder="Ingrese el apellido paterno"
                            radius="sm"
                            value={data.lastName}
                            variant="flat"
                            classNames={{
                                input: "bg-default-100",
                                inputWrapper: "bg-default-100",
                            }}
                            onValueChange={(value) => onChange("lastName", value)}
                        />
                        <Input
                            isRequired
                            label="Apellido Materno"
                            placeholder="Ingrese el apellido materno"
                            radius="sm"
                            value={data.secondLastName}
                            variant="flat"
                            classNames={{
                                input: "bg-default-100",
                                inputWrapper: "bg-default-100",
                            }}
                            onValueChange={(value) => onChange("secondLastName", value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <Checkbox
                    color="primary"
                    isSelected={data.privacyAccepted}
                    size="md"
                    onValueChange={(checked) => onChange("privacyAccepted", checked)}
                >
                    Acepto el Aviso de Privacidad
                </Checkbox>
            </div>
        </div>
    );
}