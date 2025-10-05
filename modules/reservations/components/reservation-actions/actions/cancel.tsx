import { useCancelReservation } from "@/modules/reservations/hooks/use-cancel-reservation";
import { ReservationActionBase } from "../base";
import { BaseReservationActionProps } from "./types";
import { Alert } from "react-native";

type CancelActionProps = BaseReservationActionProps & {
  reservationId: number
}
 
export const CancelAction = ({ onPerform, reservationId }: CancelActionProps) => {
  const { cancelReservation } = useCancelReservation(reservationId, { onSuccess: onPerform });

  const perform = () => {
    Alert.alert("Cancel", "Do you want to cancel your reservation?", [
      {
        text: "Yes, Cancel Reservation",
        onPress: () => {
          cancelReservation();
        },
        style: "destructive",
      },
      {
        text: "No, Keep Reservation Pending",
        style: "cancel",
        isPreferred: true,
      },
    ]);
  };

  return (
    <ReservationActionBase
      variant="negative-outline"
      perform={perform}
      label="Cancelar"
    />
  );
};
