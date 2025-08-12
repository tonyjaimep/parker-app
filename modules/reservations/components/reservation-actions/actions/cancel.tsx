import { useCancelReservation } from "@/modules/reservations/hooks/use-cancel-reservation";
import { ReservationActionBase } from "../base";
import { BaseReservationActionProps } from "./types";

export const CancelAction = ({ onPress }: BaseReservationActionProps) => {
  const { cancelReservation } = useCancelReservation();

  const perform = () => {
    cancelReservation();
    onPress();
  };

  return (
    <ReservationActionBase
      variant="negative"
      perform={cancelReservation}
      label="Cancelar"
    />
  );
};
