import { Select } from "@/modules/ui/components/select";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";
import { Control, Controller, ControllerProps } from "react-hook-form";
import { View } from "react-native";
import { SelectFormFieldOption } from "../types";

type FormSelectProps<V = unknown> = {
  name: string;
  control: Control;
  options: Array<SelectFormFieldOption<V>>;
  title: string;
};

export const FormSelect = ({
  name,
  options,
  control,
  title,
}: FormSelectProps) => {
  const renderSelect: ControllerProps["render"] = ({ field }) => {
    return (
      <Select options={options} value={field.value} onChange={field.onChange} />
    );
  };

  return (
    <View>
      <MicroTitleText>{title}</MicroTitleText>
      <Controller control={control} name={name} render={renderSelect} />
    </View>
  );
};
