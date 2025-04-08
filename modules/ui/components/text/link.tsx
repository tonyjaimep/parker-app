import { PropsWithChildren } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type LinkTextProps = PropsWithChildren<{
  style?: StyleProp<TextStyle>;
}>;

export const LinkText = ({ children, style }: LinkTextProps) => {
  return (
    <Text style={style} className="underline text-primary-500">
      {children}
    </Text>
  );
};
