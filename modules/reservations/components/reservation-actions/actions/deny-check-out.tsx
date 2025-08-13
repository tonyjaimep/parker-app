import { useDenyCheckOut } from "@/modules/reservations/hooks/use-deny-check-out";
import { ReservationActionBase } from "../base";
import { BaseReservationActionProps } from "./types";

type DenyCheckOutActionProps = BaseReservationActionProps & {
  reservationId: number;
};

export const DenyCheckOutAction = ({
  onPerform,
  reservationId,
}: DenyCheckOutActionProps) => {
  const { denyCheckOut } = useDenyCheckOut(reservationId, {
    onSuccess: onPerform,
  });

  return (
    <ReservationActionBase
      variant="outline"
      perform={denyCheckOut}
      label="Check Out"
    />
  );
};
