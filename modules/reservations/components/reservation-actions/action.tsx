import { ReservationActionType } from "../../types";
import { CancelAction } from "./actions/cancel";
import { CheckInAction } from "./actions/check-in";
import { CheckOutAction } from "./actions/check-out";

type ReservationActionProps = {
  action: ReservationActionType;
  reservationId: number;
};

export const ReservationAction = ({
  action,
  reservationId,
}: ReservationActionProps) => {
  switch (action) {
    case "check-in":
      return <CheckInAction />;
    case "check-out":
      return <CheckOutAction reservationId={reservationId} />;
    case "cancel":
      return <CancelAction />;
  }
};
