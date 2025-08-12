import { useCheckIn } from "@/modules/reservations/hooks/use-check-in";
import { ReservationActionBase } from "../base";
import { memo } from "react";
import { BaseReservationActionProps } from "./types";
import { Alert } from "react-native";

export const CheckInAction = memo(({ onPress }: BaseReservationActionProps) => {
  const { checkIn } = useCheckIn();

  const perform = () => {
    Alert.alert(
      "Check In",
      "Pressing 'Check In' will start the parking meter",
      [
        {
          text: "Check In",
          onPress: () => {
            checkIn();
            onPress();
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  };

  return (
    <ReservationActionBase
      variant="negative"
      perform={perform}
      label="Check Out"
    />
  );
});
