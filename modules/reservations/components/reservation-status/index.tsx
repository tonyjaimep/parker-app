import { View, ViewProps } from "react-native";
import { ReservationStatus as ReservationStatusType } from "../../types";
import { BodyText } from "@/modules/ui/components/text/body";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";
import {
  reservationStatusBackgroundClassName,
  reservationStatusHeadingTextClassName,
  reservationStatusTitles,
  statusDescriptions,
} from "../../constants";

type ReservationStatusProps = ViewProps & {
  status: ReservationStatusType;
};

export const ReservationStatus = ({
  status,
  ...viewProps
}: ReservationStatusProps) => {
  return (
    <View
      {...viewProps}
      className={`${reservationStatusBackgroundClassName[status]} p-4 rounded-lg ${viewProps.className}`}
    >
      <MicroTitleText
        className={`${reservationStatusHeadingTextClassName[status]} mb-2`}
      >
        Estatus: {reservationStatusTitles[status]}
      </MicroTitleText>
      <BodyText className={reservationStatusHeadingTextClassName[status]}>
        {statusDescriptions[status]}
      </BodyText>
    </View>
  );
};
