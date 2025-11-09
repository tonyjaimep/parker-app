import { ReservationThumbnail } from "@/modules/reservations/components/reservation-thumbnail";
import { useUserReservations } from "@/modules/reservations/hooks/use-user-reservations";
import { Reservation } from "@/modules/reservations/types";
import { Screen } from "@/modules/ui/components/screen";
import { TitleText } from "@/modules/ui/components/text/title";
import { Stack } from "expo-router";

export default function UserReservationsScreen() {
  const { userReservations, isLoading, refresh } = useUserReservations();
  return (
    <Screen
      list
      data={userReservations}
      refreshing={isLoading}
      onRefresh={refresh}
      renderItem={renderReservationThumbnail}
      contentContainerClassName="gap-3 py-3"
      ListHeaderComponent={<TitleText>Mis Reservaciones</TitleText>}
    >
      <Stack.Screen options={{ title: "Mis reservaciones" }} />
    </Screen>
  );
}

const renderReservationThumbnail = ({ item }: { item: Reservation }) => (
  <ReservationThumbnail reservation={item} />
);
