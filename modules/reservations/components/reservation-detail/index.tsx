import React from "react";
import { Reservation } from "../../types";
import { BodyText } from "@/modules/ui/components/text/body";
import { MiniTitleText } from "@/modules/ui/components/text/mini-title";
import { View } from "react-native";
import { CurrentReservationExpiration } from "../reservation-expiration";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";
import { useCheckForReservation } from "../../context";
import { ReservationStatus } from "../reservation-status";
import { ReservationActions } from "../reservation-actions";

interface ReservationDetailProps {
  reservation: Reservation;
}

const ReservationDetail: React.FC<ReservationDetailProps> = ({
  reservation,
}) => {
  const checkForReservation = useCheckForReservation();

  if (!reservation || !reservation.lot) {
    return <BodyText>Reservation data or lot details not available.</BodyText>;
  }

  return (
    <View>
      <MiniTitleText className="mb-2">Reservation Details</MiniTitleText>
      <BodyText className="mb-2">Lot Name: {reservation.lot.name}</BodyText>
      <MicroTitleText className="mb-2">
        Lot Address: {reservation.lot.address}
      </MicroTitleText>
      <MicroTitleText className="mb-2">
        Reserved Spot ID: {reservation.spotId}
      </MicroTitleText>
      {reservation.expiresAt ? (
        <CurrentReservationExpiration expiresAt={reservation.expiresAt} />
      ) : null}
      <ReservationStatus status={reservation.status} className="my-2" />
      <ReservationActions
        id={reservation.id}
        onActionPerformed={checkForReservation}
      />
    </View>
  );
};

export default ReservationDetail;
