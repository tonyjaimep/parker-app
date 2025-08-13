import { useConfirmCheckOut } from "@/modules/reservations/hooks/use-confirm-check-out";
import { ReservationActionBase } from "../base";
import { BaseReservationActionProps } from "./types";

type ConfirmCheckOutActionProps = BaseReservationActionProps & {
  reservationId: number;
};

export const ConfirmCheckOutAction = ({
  onPerform,
  reservationId,
}: ConfirmCheckOutActionProps) => {
  const { confirmCheckOut } = useConfirmCheckOut(reservationId, {
    onSuccess: onPerform,
  });

  return (
    <ReservationActionBase
      variant="primary"
      perform={confirmCheckOut}
      label="Confirm Check Out"
    />
  );
};
