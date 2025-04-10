import type {FormData} from "../../types/form-types";

import {Checkbox, Select, SelectItem} from "@heroui/react";
import React from "react";

interface PreferencesProps {
  data: FormData;
  onChange: (key: keyof FormData, value: any) => void;
}

const occupations = ["Student", "Employed", "Self-Employed", "Unemployed", "Retired"];

export function Preferences({data, onChange}: PreferencesProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Preferences</h2>
        <p className="text-default-500 text-large">Tell us more about yourself</p>
      </div>
      <Select
        label="Occupation"
        placeholder="Select your occupation"
        selectedKeys={data.occupation ? [data.occupation] : []}
        onChange={(e) => onChange("occupation", e.target.value)}
      >
        {occupations.map((occupation) => (
          <SelectItem key={occupation} value={occupation}>
            {occupation}
          </SelectItem>
        ))}
      </Select>
      <div className="pt-2">
        <Checkbox
          color="primary"
          isSelected={data.newsletter}
          size="md"
          onValueChange={(checked) => onChange("newsletter", checked)}
        >
          Subscribe to newsletter
        </Checkbox>
      </div>
    </div>
  );
}
