import { ReservationThumbnail } from "@/modules/reservations/components/reservation-thumbnail";
import { useReservationsOnOwnedLots } from "@/modules/reservations/hooks/use-reservations-on-owned-lots";
import { Reservation } from "@/modules/reservations/types";
import { Screen } from "@/modules/ui/components/screen";
import { TitleText } from "@/modules/ui/components/text/title";

const renderReservation = ({ item }: { item: Reservation }) => {
  return <ReservationThumbnail reservation={item} />;
};

export default function ReservationsOnOwnedLotsScreen() {
  const { reservationsOnOwnedLots } = useReservationsOnOwnedLots();

  return (
    <Screen
      list
      ListHeaderComponent={<TitleText>Reservaciones para tus lotes</TitleText>}
      data={reservationsOnOwnedLots}
      renderItem={renderReservation}
      contentContainerClassName="gap-2"
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
