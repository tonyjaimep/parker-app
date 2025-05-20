import React, { useEffect } from 'react';
import ReservationDetail from '@/modules/reservations/components/reservation-detail';
import { Reservation } from '@/modules/reservations/types';
import { useGetCurrentReservation } from '@/modules/reservations/hooks/use-get-current-reservation';
import { Screen } from '@/modules/ui/components/screen';
import { BodyText } from '@/modules/ui/components/text/body';

export default function CurrentReservationDetailScreen() {
  const { currentReservation, getCurrentReservation, isLoading } = useGetCurrentReservation();

  useEffect(() => {
    getCurrentReservation();
  }, [getCurrentReservation]);

  return (
    <Screen refreshing={isLoading} onRefresh={getCurrentReservation}>
      {currentReservation ? (
        <ReservationDetail reservation={currentReservation as Reservation} />
      ) : (
        <BodyText>No reservation found</BodyText>
      )}
    </Screen>
  )
}