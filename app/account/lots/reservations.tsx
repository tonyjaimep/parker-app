import { ReservationThumbnail } from "@/modules/reservations/components/reservation-thumbnail";
import { useReservationsOnOwnedLots } from "@/modules/reservations/hooks/use-reservations-on-owned-lots";
import { Reservation } from "@/modules/reservations/types";
import { Screen } from "@/modules/ui/components/screen";
import { TitleText } from "@/modules/ui/components/text/title";
import { Stack } from "expo-router";

const renderReservation = ({ item }: { item: Reservation }) => {
  return <ReservationThumbnail reservation={item} />;
};

const title = "Reservaciones en mis estacionamientos";

export default function ReservationsOnOwnedLotsScreen() {
  const { reservationsOnOwnedLots } = useReservationsOnOwnedLots();

  return (
    <Screen
      list
      ListHeaderComponent={<TitleText>{title}</TitleText>}
      data={reservationsOnOwnedLots}
      renderItem={renderReservation}
      contentContainerClassName="pt-3 gap-2"
      keyExtractor={(item) => item.id.toString()}
    >
      <Stack.Screen name={title} options={{ title }} />
    </Screen>
  );
}
