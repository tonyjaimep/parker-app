import { ReservationActionType } from "../../types";
import { CancelAction } from "./actions/cancel";
import { CheckInAction } from "./actions/check-in";
import { ForceCheckOutAction } from "./actions/force-check-out";
import { InitiateCheckOutAction } from "./actions/initiate-check-out";
import { ConfirmCheckOutAction } from "./actions/confirm-check-out";
import { DenyCheckOutAction } from "./actions/deny-check-out";

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
    case "initiate-check-out":
      return (
        <InitiateCheckOutAction
          reservationId={reservationId}
          onPerform={onPerform}
        />
      );
    case "deny-check-out":
      return (
        <DenyCheckOutAction
          reservationId={reservationId}
          onPerform={onPerform}
        />
      );
    case "confirm-check-out":
      return (
        <ConfirmCheckOutAction
          reservationId={reservationId}
          onPerform={onPerform}
        />
      );
    case "force-check-out":
      return (
        <ForceCheckOutAction
          reservationId={reservationId}
          onPerform={onPerform}
        />
      );
    case "cancel":
      return (
        <CancelAction reservationId={reservationId} onPerform={onPerform} />
      );
  }
};
