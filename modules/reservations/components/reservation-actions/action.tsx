import { ReservationActionType } from "../../types";
import { CancelAction } from "./actions/cancel";
import { CheckInAction } from "./actions/check-in";
import { CheckOutAction } from "./actions/check-out";

type ReservationActionProps = {
  action: ReservationActionType;
  reservationId: number;
  onPress: () => {};
};

export const ReservationAction = ({
  action,
  reservationId,
  onPress,
}: ReservationActionProps) => {
  switch (action) {
    case "check-in":
      return <CheckInAction onPress={onPress} />;
    case "check-out":
      return <CheckOutAction reservationId={reservationId} onPress={onPress} />;
    case "cancel":
      return <CancelAction onPress={onPress} />;
  }
};
