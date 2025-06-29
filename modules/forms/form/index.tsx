import { useForm } from "react-hook-form";
import { View } from "react-native";
import { FormTextInput } from "../text-input";
import { FormFields, FormFieldType, FormValues } from "../types";
import { FormSelect } from "../select";
import Button from "@/modules/ui/components/button";
import { useCallback } from "react";

type FormProps<T extends FormFields> = {
  fields: T;
  onSubmit: (values: FormValues<T>) => Promise<void>;
};

export const Form = <T extends FormFields = {}>({
  fields,
  onSubmit: onSubmitProp,
}: FormProps<T>) => {
  const { control, handleSubmit } = useForm({
    defaultValues: Object.fromEntries(
      Object.entries(fields).map(([name, config]) => [
        name,
        config.defaultValue,
      ]),
    ),
  });

  const onSubmit = useCallback(
    async (values: FormValues<T>) => {
      onSubmitProp(values);
    },
    [onSubmitProp],
  );

  return (
    <View className="flex flex-col gap-4">
      {Object.entries(fields).map(([name, config]) => {
        switch (config.type) {
          case FormFieldType.Text:
            return (
              <FormTextInput
                key={name}
                name={name}
                control={control}
                title={config.title}
              />
            );
          case FormFieldType.Select:
            return (
              <FormSelect
                key={name}
                name={name}
                control={control}
                options={config.options}
                title={config.title}
              />
            );
        }
      })}
      <Button
        className="mt-4"
        // @ts-expect-error -- generic submit handlers are a problem
        onPress={handleSubmit(onSubmit)}
        label="Save"
      />
    </View>
  );
};
