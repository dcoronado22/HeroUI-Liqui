import type { FormData } from "../../types/form-types";

import { Input } from "@heroui/react";
interface ContactInformationProps {
  data: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}

export function ContactInformation({ data, onChange }: ContactInformationProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Contact Information</h2>
        <p className="text-default-500 text-large">How can we reach you?</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          isRequired
          label="Email"
          placeholder="john.doe@gmail.com"
          radius="sm"
          type="email"
          value={data.email}
          variant="flat"
          classNames={{
            input: "bg-default-100",
            inputWrapper: "bg-default-100",
          }}
          onValueChange={(value) => onChange("email", value)}
        />
        <Input
          isRequired
          label="Phone"
          placeholder="Enter your phone number"
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
      </div>
      <Input
        isRequired
        label="Address"
        placeholder="Enter your address"
        radius="sm"
        value={data.address}
        variant="flat"
        classNames={{
          input: "bg-default-100",
          inputWrapper: "bg-default-100",
        }}
        onValueChange={(value) => onChange("address", value)}
      />
    </div>
  );
}
