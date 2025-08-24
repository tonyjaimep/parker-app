import { ReservationStatus } from "../../types";
import { View } from "react-native";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";
import {
  reservationStatusBackgroundClassName,
  reservationStatusHeadingTextClassName,
  reservationStatusTitles,
} from "../../constants";

export const ReservationStatusBadge = ({
  status,
}: {
  status: ReservationStatus;
}) => {
  return (
    <View
      className={`${reservationStatusBackgroundClassName[status]} px-2 py-1 rounded-full`}
    >
      <MicroTitleText className={reservationStatusHeadingTextClassName[status]}>
        {reservationStatusTitles[status] || status}
      </MicroTitleText>
    </View>
  );
};
