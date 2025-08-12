import { View } from "react-native";
import { useReservationActions } from "../../hooks/use-reservation-actions";
import { ReservationAction } from "./action";
import { SkeletonBone } from "@/modules/ui/components/skeleton-bone";

type ReservationActionsProps = {
  id: number;
};

export const ReservationActions = ({ id }: ReservationActionsProps) => {
  const { reservationActions, isLoading, refresh } = useReservationActions(id);

  if (isLoading) {
    return <SkeletonBone className="h-[48]" />;
  }

  if (!reservationActions || reservationActions.length === 0) return null;

  return (
    <View className="gap-2">
      {reservationActions.map((action) => (
        <ReservationAction action={action} reservationId={id} />
      ))}
    </View>
  );
};
