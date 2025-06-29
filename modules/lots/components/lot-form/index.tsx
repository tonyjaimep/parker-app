import { Form } from "@/modules/forms/form";
import { FormFieldType, FormValues } from "@/modules/forms/types";
import { Lot } from "../../types";
import { useMemo } from "react";

const lotFormFields = {
  name: {
    type: FormFieldType.Text,
    title: "Name",
  },
  address: {
    type: FormFieldType.Text,
    title: "Address",
  },
  latitude: {
    type: FormFieldType.Text,
    title: "Latitude",
  },
  longitude: {
    type: FormFieldType.Text,
    title: "Latitude",
  },
  spotsCount: {
    type: FormFieldType.Text,
    title: "Spots count",
  },
} as const;

type LotFormProps = {
  onSubmit: (values: FormValues<typeof lotFormFields>) => Promise<void>;
  lot?: Lot;
};

export const LotForm = ({ onSubmit, lot }: LotFormProps) => {
  const lotFormFields = useMemo(
    () =>
      ({
        name: {
          type: FormFieldType.Text,
          title: "Name",
          defaultValue: lot?.name,
        },
        address: {
          type: FormFieldType.Text,
          title: "Address",
          defaultValue: lot?.address,
        },
        latitude: {
          type: FormFieldType.Text,
          title: "Latitude",
          defaultValue: lot?.location.latitude.toString(),
        },
        longitude: {
          type: FormFieldType.Text,
          title: "Latitude",
          defaultValue: lot?.location.longitude.toString(),
        },
        spotsCount: {
          type: FormFieldType.Text,
          title: "Spots count",
          defaultValue: lot?.spotsCount?.toString(),
        },
      }) as const,
    [lot],
  );

  return <Form fields={lotFormFields} onSubmit={onSubmit} />;
};
