import { ReservationActionType } from "../../types";
import { CancelAction } from "./actions/cancel";
import { CheckInAction } from "./actions/check-in";
import { CheckOutAction } from "./actions/check-out";

type ReservationActionProps = {
  action: ReservationActionType;
  reservationId: number;
  onPerform: () => void;
};

export const ReservationAction = ({
  action,
  reservationId,
  onPerform,
}: ReservationActionProps) => {
  switch (action) {
    case "check-in":
      return <CheckInAction onPerform={onPerform} />;
    case "check-out":
      return (
        <CheckOutAction reservationId={reservationId} onPerform={onPerform} />
      );
    case "cancel":
      return <CancelAction onPerform={onPerform} />;
  }
};
