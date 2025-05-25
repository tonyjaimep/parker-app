import React from "react";
import { Reservation } from "../../types";
import { BodyText } from "@/modules/ui/components/text/body";
import { MiniTitleText } from "@/modules/ui/components/text/mini-title";
import { View } from "react-native";
import { CurrentReservationExpiration } from "../reservation-expiration";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";

interface ReservationDetailProps {
  reservation: Reservation;
}

const ReservationDetail: React.FC<ReservationDetailProps> = ({
  reservation,
}) => {
  if (!reservation || !reservation.lot) {
    return (
      <BodyText>Reservation data or lot details not available.</BodyText>
    );
  }

  return (
    <View>
      <MiniTitleText className="mb-2">Reservation Details</MiniTitleText>
      <BodyText className="mb-2">Lot Name: {reservation.lot.name}</BodyText>
      <MicroTitleText className="mb-2">
        Lot Address: {reservation.lot.address}
      </MicroTitleText>
      {reservation.expiresAt ? (
        <CurrentReservationExpiration expiresAt={reservation.expiresAt} />
      ) : null}
    </View>
  );
};

export default ReservationDetail;
