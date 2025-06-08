import { Form } from "@/modules/forms/form";
import { FormFields, FormFieldType, FormValues } from "@/modules/forms/types";

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
} as FormFields;

type LotFormProps = {
  onSubmit: (values: FormValues<typeof lotFormFields>) => Promise<void>;
};

export const LotForm = ({ onSubmit }: LotFormProps) => {
  return <Form fields={lotFormFields} onSubmit={onSubmit} />;
};
