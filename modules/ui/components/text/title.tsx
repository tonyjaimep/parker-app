import { Text, TextProps } from "react-native";

export const TitleText = ({ className, ...props }: TextProps) => {
  return (
    <Text className={["text-4xl font-bold", className].join(" ")} {...props} />
  );
};
