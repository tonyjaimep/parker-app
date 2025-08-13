import { View } from "react-native";
import { useReservationActions } from "../../hooks/use-reservation-actions";
import { ReservationAction } from "./action";
import { SkeletonBone } from "@/modules/ui/components/skeleton-bone";
import { Reservation } from "../../types";

type ReservationActionsProps = {
  id: number;
  onActionPerformed?: () => Reservation | Promise<{} | null | Reservation>;
};

export const ReservationActions = ({
  id,
  onActionPerformed,
}: ReservationActionsProps) => {
  const { reservationActions, isLoading, refresh } = useReservationActions(id);

  if (isLoading) {
    return <SkeletonBone className="h-[48]" />;
  }

  const onPerform = async () => {
    await onActionPerformed?.();
    refresh();
  };

  if (!reservationActions || reservationActions.length === 0) return null;

  return (
    <View className="gap-2">
      {reservationActions.map((action) => (
        <ReservationAction
          key={action}
          action={action}
          reservationId={id}
          onPerform={onPerform}
        />
      ))}
    </View>
  );
};
