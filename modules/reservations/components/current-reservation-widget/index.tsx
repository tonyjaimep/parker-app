import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useCurrentReservation, useIsLoadingCurrentReservation } from '../../context';

const CurrentReservationWidget: React.FC = () => {
  const router = useRouter();
  const currentReservation = useCurrentReservation();
  const isLoading = useIsLoadingCurrentReservation();

  const handlePress = () => {
    if (currentReservation) {
      router.navigate(`/reservations/current`);
    }
  };

  if (isLoading) {
    return (
      <View className="bg-neutral-100 p-4 mx-4 my-2 rounded-xl border border-blue-500 shadow-md items-center justify-center min-h-[100px]">
        <ActivityIndicator size="small" color="#3B82F6" />
      </View>
    );
  }

  if (!currentReservation) {
    return null;
  }

  return (
    <TouchableOpacity onPress={handlePress} className="bg-neutral-100 p-4 mx-4 my-2 rounded-xl border border-blue-500 shadow-md">
      <Text className="text-lg font-bold mb-2">Active Reservation</Text>
      <Text className="text-base mb-1">{JSON.stringify(currentReservation)}</Text>
      <Text className="text-sm text-center mt-2 font-medium">Tap to view details</Text>
    </TouchableOpacity>
  );
};

export default CurrentReservationWidget;