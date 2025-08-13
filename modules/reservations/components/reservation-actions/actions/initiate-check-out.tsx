import { useInitiateCheckOut } from "@/modules/reservations/hooks/use-initiate-check-out";
import { ReservationActionBase } from "../base";
import { BaseReservationActionProps } from "./types";
import { Alert } from "react-native";

type InitiateCheckOutActionProps = BaseReservationActionProps & {
  reservationId: number;
};

export const InitiateCheckOutAction = ({
  onPerform,
  reservationId,
}: InitiateCheckOutActionProps) => {
  const { initiateCheckOut } = useInitiateCheckOut(reservationId, {
    onSuccess: onPerform,
  });

  const perform = () => {
    Alert.alert(
      "Check Out",
      'After you press "Check Out" we\'ll wait for confirmation from the lot owner.',
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Check Out",
          onPress: () => {
            initiateCheckOut();
          },
        },
      ],
    );
  };

  return (
    <ReservationActionBase
      variant="outline"
      perform={perform}
      label="Check Out"
    />
  );
};
