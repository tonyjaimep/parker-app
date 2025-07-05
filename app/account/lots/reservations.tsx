import { ReservationThumbnail } from "@/modules/reservations/components/reservation-thumbnail";
import { Reservation, ReservationStatus } from "@/modules/reservations/types";
import { Screen } from "@/modules/ui/components/screen";
import { TitleText } from "@/modules/ui/components/text/title";

const renderReservation = ({ item }: { item: Reservation }) => {
  return <ReservationThumbnail reservation={item} />;
};

const makeMockReservation = (id: number, status: ReservationStatus) => {
  return {
    id,
    expiresAt:
      status === "expired" || status === "pending"
        ? new Date().toISOString()
        : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    checkInAt:
      status === "active" || status === "completed"
        ? new Date().toISOString()
        : null,
    checkOutAt: status === "completed" ? new Date().toISOString() : null,
    status,
    spotId: 1,
    lot: {
      id: 1,
      name: "Lote test",
      address: "Address #123",
      location: { latitude: 1, longitude: 2 },
    },
  };
};

const mockData: Reservation[] = [
  makeMockReservation(1, "expired"),
  makeMockReservation(2, "pending"),
  makeMockReservation(3, "active"),
  makeMockReservation(4, "completed"),
  makeMockReservation(5, "cancelled"),
  makeMockReservation(6, "cancelled"),
  makeMockReservation(7, "cancelled"),
  makeMockReservation(8, "cancelled"),
];

export default function ReservationsOnOwnedLotsScreen() {
  return (
    <Screen
      list
      ListHeaderComponent={<TitleText>Reservaciones para tus lotes</TitleText>}
      data={mockData}
      renderItem={renderReservation}
      contentContainerClassName="gap-2"
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
