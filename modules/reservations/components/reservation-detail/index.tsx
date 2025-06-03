import React, { useCallback, useMemo } from "react";
import { Reservation } from "../../types";
import { BodyText } from "@/modules/ui/components/text/body";
import { MiniTitleText } from "@/modules/ui/components/text/mini-title";
import { Alert, View } from "react-native";
import { CurrentReservationExpiration } from "../reservation-expiration";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";
import Button from "@/modules/ui/components/button";
import { useCancelReservation } from "../../hooks/use-cancel-reservation";
import { useCheckForReservation } from "../../context";
import { useRouter } from "expo-router";
import { useCheckIn } from "../../hooks/use-check-in";
import { ReservationStatus } from "../reservation-status";

interface ReservationDetailProps {
  reservation: Reservation;
}

const ReservationDetail: React.FC<ReservationDetailProps> = ({
  reservation,
}) => {
  const router = useRouter();
  const checkForReservation = useCheckForReservation();

  const onCheckIn = useCallback(() => {
    checkForReservation();
  }, [checkForReservation]);

  const { checkIn, isLoading: isCheckingIn } = useCheckIn({
    onSuccess: onCheckIn,
  });

  const canCheckIn = useMemo(() => {
    const isPending = reservation.status === "pending";
    const isInCheckInRange = true;

    return isPending && isInCheckInRange && !isCheckingIn;
  }, [reservation, isCheckingIn]);

  const onReservationCanceled = useCallback(async () => {
    await checkForReservation();
    router.back();
  }, [checkForReservation, router]);

  const { cancelReservation, isLoading: isCancelingReservation } =
    useCancelReservation({
      onSuccess: onReservationCanceled,
      onError: console.log,
    });

  const onCheckInPressed = useCallback(async () => {
    Alert.alert(
      "Check In",
      "Pressing 'Check In' will start the parking meter",
      [
        {
          text: "Check In",
          onPress: () => checkIn(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  }, [reservation.id, router]);

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
      {reservation.expiresAt ? (
        <CurrentReservationExpiration expiresAt={reservation.expiresAt} />
      ) : null}
      <ReservationStatus status={reservation.status} className="my-2" />
      {canCheckIn ? (
        <Button onPress={() => onCheckInPressed()} label="Check In" />
      ) : null}
      <Button
        variant="negative"
        onPress={() => cancelReservation()}
        disabled={isCancelingReservation}
        label="Cancel Reservation"
        className="mt-32 rounded-full"
      />
    </View>
  );
};

export default ReservationDetail;
