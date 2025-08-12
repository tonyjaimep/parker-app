import { useCheckIn } from "@/modules/reservations/hooks/use-check-in";
import { ReservationActionBase } from "../base";
import { memo } from "react";
import { BaseReservationActionProps } from "./types";
import { Alert } from "react-native";

export const CheckInAction = memo(
  ({ onPerform }: BaseReservationActionProps) => {
    const { checkIn } = useCheckIn({ onSuccess: onPerform });

    const perform = () => {
      Alert.alert(
        "Check In",
        "Pressing 'Check In' will start the parking meter",
        [
          {
            text: "Check In",
            onPress: () => {
              checkIn();
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
        variant="primary"
        perform={perform}
        label="Check In"
      />
    );
  },
);
