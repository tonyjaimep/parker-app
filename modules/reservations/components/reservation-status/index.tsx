import { View, ViewProps } from "react-native";
import { ReservationStatus as ReservationStatusType } from "../../types";
import { BodyText } from "@/modules/ui/components/text/body";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";

const statusDescriptions: Record<ReservationStatusType, string> = {
  pending: "Arrive before the expiration time to check into your parking spot",
  active: "You're checked in. The parking meter is running.",
  completed: "Your parking reservation is complete. Thank you!",
  cancelled: "This parking reservation was cancelled.",
  expired: "You did not check in before the expiration time.",
};

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
      className={`bg-primary-200 p-4 rounded-lg ${viewProps.className}`}
    >
      <MicroTitleText className="text-primary-700 mb-2">
        Status: {status}
      </MicroTitleText>
      <BodyText className="text-primary-900">
        {statusDescriptions[status]}
      </BodyText>
    </View>
  );
};
