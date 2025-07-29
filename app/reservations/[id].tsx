import { ReservationStatusBadge } from "@/modules/reservations/components/reservation-thumbnail/status";
import { useReservation } from "@/modules/reservations/hooks/use-reservation";
import { Screen } from "@/modules/ui/components/screen";
import { BodyText } from "@/modules/ui/components/text/body";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";
import { TitleText } from "@/modules/ui/components/text/title";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export default function ReservationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const parsedId = Number(id);

  const { reservation, refresh, isLoading } = useReservation(parsedId);

  return (
    <Screen
      refreshControl={
        <RefreshControl onRefresh={refresh} refreshing={isLoading} />
      }
    >
      {reservation ? (
        <View>
          <MicroTitleText>Reservation Detail</MicroTitleText>
          <ReservationStatusBadge status={reservation.status} />
          <TitleText>{reservation.lot.name}</TitleText>
          <BodyText>{reservation.lot.address}</BodyText>
        </View>
      ) : null}
    </Screen>
  );
}
