import { useRouter } from "expo-router";
import { Reservation } from "../../types";
import { TouchableOpacity, View } from "react-native";
import { BodyText } from "@/modules/ui/components/text/body";
import { ReservationStatusBadge } from "./status";
import { formatReservationDate } from "../../utils/format-reservation-date";
import { format, formatDistanceToNow } from "date-fns";

type ReservationThumbnailProps = {
  reservation: Reservation;
};

export const ReservationThumbnail = ({
  reservation,
}: ReservationThumbnailProps) => {
  const router = useRouter();

  const goToReservationDetail = () => {
    router.navigate(`/reservations/${reservation.id}`);
  };
  return (
    <TouchableOpacity
      className="p-2 border border-neutral-400 rounded gap-2"
      onPress={goToReservationDetail}
    >
      <View className="flex flex-row">
        <ReservationStatusBadge status={reservation.status} />
      </View>
      <View>
        <BodyText>{reservation.lot.name}</BodyText>
        {reservation.checkInAt &&
        (reservation.status === "active" ||
          reservation.status === "completed") ? (
          <BodyText>
            Entrada a las{" "}
            {formatReservationDate(new Date(reservation.checkInAt))}
          </BodyText>
        ) : null}
        {reservation.status === "pending" && reservation.expiresAt !== null ? (
          <BodyText>
            Expira {formatDistanceToNow(reservation.expiresAt)}
          </BodyText>
        ) : null}
        {reservation.checkOutAt && reservation.status === "completed" ? (
          <BodyText>
            Salida a las {format(reservation.checkOutAt, "HH:mm dd MMM yyyy")}
          </BodyText>
        ) : null}
        {reservation.status === "expired" && reservation.expiresAt !== null ? (
          <BodyText>
            Expiró {format(reservation.expiresAt, "HH:mm dd MMM yyyy")}
          </BodyText>
        ) : null}
        {reservation.updatedAt && reservation.status === "cancelled" ? (
          <BodyText>
            Última actualización {formatDistanceToNow(reservation.updatedAt)}
          </BodyText>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
