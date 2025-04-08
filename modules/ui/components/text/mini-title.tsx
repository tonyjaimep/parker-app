import { PropsWithChildren } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type MiniTitleTextProps = PropsWithChildren<{
  style?: StyleProp<TextStyle>;
}>;

export const MiniTitleText = ({ children, style }: MiniTitleTextProps) => {
  return (
    <Text className="font-bold text-xl" style={style}>
      {children}
    </Text>
  );
};
