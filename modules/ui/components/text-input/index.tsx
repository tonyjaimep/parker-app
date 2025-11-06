import {
  TextInput as BtsTextInput,
  TextInputProps as BtsTextInputProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { forwardRef, ReactElement } from "react";
import { BodyText } from "../text/body";

type TextInputVariant = "neutral" | "primary" | "secondary";

type TextInputProps = {
  label?: string;
  variant?: TextInputVariant;
  LeftElement?: ReactElement;
  RightElement?: ReactElement;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
  inputClassName?: string;
} & BtsTextInputProps;

export const TextInput = forwardRef<BtsTextInput, TextInputProps>(
  (
    {
      label,
      style,
      LeftElement,
      RightElement,
      inputClassName,
      disabled = false,
      className = "",
      ...textInputProps
    },
    ref,
  ) => {
    return (
      <View className={["gap-2", className].join(" ")}>
        {label ? <BodyText>{label}</BodyText> : null}
        <View className="rounded-lg bg-neutral-200 flex-row gap-2 items-center">
          {LeftElement ? LeftElement : null}
          <BtsTextInput
            ref={ref}
            editable={!disabled}
            placeholderClassName="text-slate-400"
            className={inputClassName ?? "px-4 py-3 flex-grow"}
            {...textInputProps}
          />
          {RightElement ? RightElement : null}
        </View>
      </View>
    );
  },
);
