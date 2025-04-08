import { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";

type MicroTitleTextProps = PropsWithChildren<TextProps>;

export const MicroTitleText = ({
  className,
  ...props
}: MicroTitleTextProps) => {
  return (
    <Text
      className={[
        "font-bold uppercase text-xs text-neutral-700",
        className,
      ].join(" ")}
      {...props}
    />
  );
};
