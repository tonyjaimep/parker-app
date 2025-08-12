import { useCheckOut } from "@/modules/reservations/hooks/use-check-out";
import { ReservationActionBase } from "../base";
import { BaseReservationActionProps } from "./types";

type CheckOutActionProps = BaseReservationActionProps & {
  reservationId: number;
};

export const CheckOutAction = ({
  onPress,
  reservationId,
}: CheckOutActionProps) => {
  const { checkOut } = useCheckOut(reservationId);

  const perform = () => {
    onPress();
    checkOut();
  };

  return (
    <ReservationActionBase
      variant="negative"
      perform={perform}
      label="Check Out"
    />
  );
};
