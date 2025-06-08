import { TextInput } from "@/modules/ui/components/text-input";
import { Control, Controller } from "react-hook-form";
import { View } from "react-native";

type FormTextInputProps = { name: string; title: string; control: Control };

export const FormTextInput = ({ name, title, control }: FormTextInputProps) => {
  return (
    <View className="flex flex-col gap-1/2">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={title}
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
          />
        )}
      />
    </View>
  );
};
