import { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";

export function SubtitleText({
  className = "",
  ...props
}: PropsWithChildren<TextProps>) {
  return (
    <Text className={["text-2xl font-bold", className].join(" ")} {...props} />
  );
}
