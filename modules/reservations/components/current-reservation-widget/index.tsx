import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import {
  useCurrentReservation,
  useIsLoadingCurrentReservation,
} from "../../context";
import { MiniTitleText } from "@/modules/ui/components/text/mini-title";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";
import { BodyText } from "@/modules/ui/components/text/body";
import { format, formatDistanceToNow } from "date-fns";

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
      <View className="bg-neutral-100 p-4 mx-4 my-2 rounded-xl shadow-md items-center justify-center min-h-[100px]">
        <ActivityIndicator size="small" color="#3B82F6" />
      </View>
    );
  }

  if (!currentReservation) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-neutral-100 p-4 rounded-xl shadow-md"
    >
      <MicroTitleText className="mb-2">Active Reservation</MicroTitleText>
      <View className="mb-2">
        <MiniTitleText>{currentReservation.lot.address}</MiniTitleText>
        <BodyText>{currentReservation.lot.name}</BodyText>
      </View>
      <View>
        <MicroTitleText>Expires in</MicroTitleText>
        {currentReservation.expiresAt ? (
          <View className="flex flex-row justify-between gap-4">
            <BodyText className="mb-4">
              {formatDistanceToNow(currentReservation.expiresAt)} (
              {format(currentReservation.expiresAt, "MMM dd 'at' h:mm a")})
            </BodyText>
          </View>
        ) : null}
      </View>
      <Text className="text-sm text-center font-medium">
        Tap to view details
      </Text>
    </TouchableOpacity>
  );
};

export default CurrentReservationWidget;
