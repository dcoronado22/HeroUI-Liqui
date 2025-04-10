import type {FormData} from "../../types/form-types";

import {Divider} from "@heroui/react";
import {useDateFormatter} from "@react-aria/i18n";
import React from "react";

interface ReviewProps {
  data: FormData;
}

export function Review({data}: ReviewProps) {
  const dateFormatter = useDateFormatter({
    dateStyle: "long",
  });

  const formatDate = (date: any) => {
    if (!date) return "--";

    return dateFormatter.format(date.toDate("UTC"));
  };

  const InfoSection = ({
    items,
    title,
  }: {
    title: string;
    items: {label: string; value: string}[];
  }) => (
    <div className="space-y-3">
      <h3 className="text-large font-medium">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-1">
            <span className="text-default-500">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Review Your Information</h2>
        <p className="text-default-500 text-small">
          Please verify all information before submitting
        </p>
      </div>

      <InfoSection
        title="Personal Details"
        items={[
          {label: "First Name", value: data.firstName || "--"},
          {label: "Last Name", value: data.lastName || "--"},
          {label: "Date of Birth", value: formatDate(data.dateOfBirth)},
        ]}
      />

      <Divider />

      <InfoSection
        title="Contact Information"
        items={[
          {label: "Email", value: data.email || "--"},
          {label: "Phone", value: data.phone || "--"},
          {label: "Address", value: data.address || "--"},
        ]}
      />

      <Divider />

      <InfoSection
        title="Preferences"
        items={[
          {label: "Occupation", value: data.occupation || "--"},
          {label: "Newsletter", value: data.newsletter ? "Yes" : "No"},
        ]}
      />
    </div>
  );
}
