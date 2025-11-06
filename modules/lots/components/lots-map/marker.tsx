import { BodyText } from "@/modules/ui/components/text/body";
import { useMemo } from "react";
import { View } from "react-native";

type LotsMapMarkerProps = {
  availability: number;
};

export const LotsMapMarker = ({ availability }: LotsMapMarkerProps) => {
  const backgroundColor = useMemo(() => {
    if (availability >= 10) {
      return "#28FF02";
    } else if (availability >= 5) {
      return "#FFEF00";
    } else {
      return "#FF0000";
    }
  }, [availability]);

  return (
    <View
      className="w-8 h-8 rounded-full items-center justify-center border border-2"
      style={{ backgroundColor }}
    >
      <BodyText className="font-bold">{availability}</BodyText>
    </View>
  );
};
