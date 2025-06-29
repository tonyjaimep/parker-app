import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { BottomDrawer } from "../bottom-drawer";
import { BodyText } from "../text/body";

type SelectOption<T> = {
  label: string;
  value: T;
};

type SelectProps<V = unknown> = {
  value: V;
  options: Array<SelectOption<V>>;
  onChange: (value: V) => void;
};

export const Select = <T,>({ value, options, onChange }: SelectProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);

  const selectedOptionLabel =
    options.find((o) => o.value === value)?.label || "";

  return (
    <View>
      <TouchableOpacity
        className="p-4 rounded-lg border border-neutral-400"
        onPress={() => setIsVisible(true)}
      >
        {selectedOptionLabel}
      </TouchableOpacity>
      <BottomDrawer isVisible={isVisible} onDismiss={() => setIsVisible(false)}>
        <View className="gap-2">
          {options.map((option) => (
            <TouchableOpacity
              className="p-4 rounde-lg border border-neutral-400"
              onPress={() => onChange(option.value)}
            >
              <BodyText>{option.label}</BodyText>
            </TouchableOpacity>
          ))}
        </View>
      </BottomDrawer>
    </View>
  );
};
