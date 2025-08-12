import { ReservationActions } from "@/modules/reservations/components/reservation-actions";
import { ReservationStatusBadge } from "@/modules/reservations/components/reservation-thumbnail/status";
import { useReservation } from "@/modules/reservations/hooks/use-reservation";
import { Countdown } from "@/modules/time/components/countdown";
import { Screen } from "@/modules/ui/components/screen";
import { BodyText } from "@/modules/ui/components/text/body";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";
import { TitleText } from "@/modules/ui/components/text/title";
import { format, formatDistanceToNow } from "date-fns";
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
      contentContainerClassName="py-3"
    >
      {reservation ? (
        <View className="gap-4">
          <View>
            <MicroTitleText>Reservation Detail</MicroTitleText>
            {reservation.createdAt ? (
              <BodyText>
                Created{" "}
                {format(
                  reservation.createdAt,
                  "MMMM do, yyyy 'at' h:mm a",
                )}{" "}
              </BodyText>
            ) : null}
          </View>
          <View className="flex items-start">
            <MicroTitleText>Status</MicroTitleText>
            <ReservationStatusBadge status={reservation.status} />
            {reservation.status === "expired" && reservation.expiresAt ? (
              <BodyText>
                Expired{" "}
                {formatDistanceToNow(reservation.expiresAt, {
                  addSuffix: true,
                })}
              </BodyText>
            ) : null}
          </View>
          <View>
            <MicroTitleText>Lot</MicroTitleText>
            <TitleText>{reservation.lot.name}</TitleText>
            <BodyText>{reservation.lot.address}</BodyText>
          </View>
          {reservation.status === "pending" && reservation.expiresAt ? (
            <View className="gap-2">
              <MicroTitleText>Expires in</MicroTitleText>
              <Countdown
                targetDate={reservation.expiresAt}
                className="font-bold text-6xl"
              />
            </View>
          ) : null}
          {reservation.status === "active" && reservation.checkInAt ? (
            <View className="gap-2">
              <MicroTitleText>Tiempo Transcurrido</MicroTitleText>
              <Countdown
                targetDate={reservation.checkInAt}
                className="font-bold text-6xl"
              />
            </View>
          ) : null}
          <ReservationActions id={parsedId} />
        </View>
      ) : null}
    </Screen>
  );
}
