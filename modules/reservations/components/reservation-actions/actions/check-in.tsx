import { useCheckIn } from "@/modules/reservations/hooks/use-check-in";
import { ReservationActionBase } from "../base";
import { memo } from "react";
import { BaseReservationActionProps } from "./types";

export const CheckInAction = memo(({ onPress }: BaseReservationActionProps) => {
  const { checkIn } = useCheckIn();

  const perform = () => {
    checkIn();
    onPress();
  };

  return (
    <ReservationActionBase
      variant="negative"
      perform={perform}
      label="Check Out"
    />
  );
});
