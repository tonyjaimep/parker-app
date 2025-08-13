import { useForceCheckOut } from "@/modules/reservations/hooks/use-force-check-out";
import { ReservationActionBase } from "../base";
import { BaseReservationActionProps } from "./types";

type ForceCheckOutActionProps = BaseReservationActionProps & {
  reservationId: number;
};

export const ForceCheckOutAction = ({
  onPerform,
  reservationId,
}: ForceCheckOutActionProps) => {
  const { forceCheckOut } = useForceCheckOut(reservationId, {
    onSuccess: onPerform,
  });

  return (
    <ReservationActionBase
      variant="outline"
      perform={forceCheckOut}
      label="Check Out"
    />
  );
};
