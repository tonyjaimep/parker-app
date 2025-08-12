import { useCheckOut } from "@/modules/reservations/hooks/use-check-out";
import { ReservationActionBase } from "../base";
import { BaseReservationActionProps } from "./types";

type CheckOutActionProps = BaseReservationActionProps & {
  reservationId: number;
};

export const CheckOutAction = ({
  onPerform,
  reservationId,
}: CheckOutActionProps) => {
  const { checkOut } = useCheckOut(reservationId, { onSuccess: onPerform });

  return (
    <ReservationActionBase
      variant="outline"
      perform={checkOut}
      label="Check Out"
    />
  );
};
