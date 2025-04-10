import type { FormData } from "../../types/form-types";

import { DatePicker, Input } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";

interface PersonalDetailsProps {
  data: FormData;
  onChange: (key: keyof FormData, value: any) => void;
}

export function PersonalDetails({ data, onChange }: PersonalDetailsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Personal</h2>
        <p className="text-default-500 text-large">Let's start with your basic information</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          isRequired
          label="First Name"
          placeholder="Type your first name here"
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
          label="Last Name"
          placeholder="Type your last name here"
          radius="sm"
          value={data.lastName}
          variant="flat"
          classNames={{
            input: "bg-default-100",
            inputWrapper: "bg-default-100",
          }}
          onValueChange={(value) => onChange("lastName", value)}
        />
      </div>
      <div className="w-full">
        <DatePicker
          isRequired
          className="w-full"
          label="Date of Birth"
          // placeholder="Select your date of birth"
          radius="sm"
          value={data.dateOfBirth}
          variant="flat"
          classNames={{
            base: "w-full",
            input: "bg-default-100",
            inputWrapper: "bg-default-100 w-full",
          }}
          // formatOptions={{
          //   day: "numeric",
          //   month: "long",
          //   year: "numeric",
          // }}
          maxValue={
            new CalendarDate(
              new Date().getFullYear() - 18,
              new Date().getMonth(),
              new Date().getDate(),
            )
          }
          onChange={(date) => onChange("dateOfBirth", date)}
        />
      </div>
    </div>
  );
}
