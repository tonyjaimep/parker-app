import { View, ViewProps } from "react-native";

export const SkeletonBone = ({ className }: ViewProps) => {
  return (
    <View
      className={`bg-neutral-300 rounded animate-pulse ${className ?? ""}`}
    ></View>
  );
};
