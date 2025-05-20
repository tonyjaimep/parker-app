import React from 'react';
import { View, Text } from 'react-native';
import { Reservation } from '../../types';

interface ReservationDetailProps {
  reservation: Reservation;
}

const ReservationDetail: React.FC<ReservationDetailProps> = ({ reservation }) => {
  if (!reservation || !reservation.spot || !reservation.spot.lot) {
    return (
      <View className="p-4 bg-white rounded-lg m-4 shadow-lg">
        <Text className="text-base text-red-600 text-center">Reservation data or lot details not available.</Text>
      </View>
    );
  }

  return (
    <View className="p-4 bg-white rounded-lg m-4 shadow-lg">
      <Text className="text-xl font-bold mb-3">Reservation Details</Text>
      <Text className="text-base mb-2">Reservation ID: {reservation.id}</Text>
      <Text className="text-base mb-2">Lot Name: {reservation.spot.lot.name}</Text>
      <Text className="text-base mb-2">Lot Address: {reservation.spot.lot.address}</Text>
      {/* Add more details from reservation.lot if needed */}
    </View>
  );
};

export default ReservationDetail;
