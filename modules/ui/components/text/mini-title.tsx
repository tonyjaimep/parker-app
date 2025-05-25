import { PropsWithChildren } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type MiniTitleTextProps = PropsWithChildren<{
  style?: StyleProp<TextStyle>;
  className?: string;
}>;

export const MiniTitleText = ({ children, style, className }: MiniTitleTextProps) => {
  return (
    <Text className={["font-bold text-xl", className].join(" ")} style={style}>
      {children}
    </Text>
  );
};
