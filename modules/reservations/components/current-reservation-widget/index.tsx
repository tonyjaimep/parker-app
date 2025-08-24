import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  ActionSheetIOS,
  AlertButton,
} from "react-native";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";

import {
  useCheckForReservation,
  useCurrentReservation,
  useIsLoadingCurrentReservation,
} from "../../context";
import { MiniTitleText } from "@/modules/ui/components/text/mini-title";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";
import { BodyText } from "@/modules/ui/components/text/body";
import { CurrentReservationExpiration } from "../reservation-expiration";
import Button from "@/modules/ui/components/button";
import { Countdown } from "@/modules/time/components/countdown";

const NAVIGATION_APPS = [
  ...(Platform.OS === "ios"
    ? [
        {
          id: "apple",
          name: "Apple Maps",
          url: (lat: number, lng: number) =>
            `maps://?saddr=&daddr=${lat},${lng}&dirflg=d`,
        },
      ]
    : []),
  {
    id: "google",
    name: "Google Maps",
    url: (lat: number, lng: number) =>
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`,
  },
  {
    id: "waze",
    name: "Waze",
    url: (lat: number, lng: number) =>
      `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
  },
];

const CurrentReservationWidget: React.FC = () => {
  const router = useRouter();
  const currentReservation = useCurrentReservation();
  const isLoading = useIsLoadingCurrentReservation();
  const checkForCurrentReservation = useCheckForReservation();

  useEffect(() => {
    checkForCurrentReservation();
  }, [checkForCurrentReservation]);

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

  const showNavigationOptions = () => {
    if (!currentReservation?.lot?.location) {
      Alert.alert(
        "Error",
        "Location information is not available for this parking lot.",
      );
      return;
    }

    const { latitude, longitude } = currentReservation.lot.location;

    // For iOS, use ActionSheetIOS
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...NAVIGATION_APPS.map((app) => app.name), "Cancel"],
          cancelButtonIndex: NAVIGATION_APPS.length,
          title: "Choose Navigation App",
        },
        async (buttonIndex) => {
          if (buttonIndex < NAVIGATION_APPS.length) {
            const url = NAVIGATION_APPS[buttonIndex].url(latitude, longitude);
            try {
              await Linking.openURL(url);
            } catch (error) {
              console.error("Error opening navigation app:", error);
              Alert.alert(
                "Error",
                "Could not open the selected navigation app.",
              );
            }
          }
        },
      );
    } else {
      // For Android, use a simple Alert with options
      const buttons: AlertButton[] = [
        ...NAVIGATION_APPS.map((app) => ({
          text: app.name,
          onPress: async () => {
            try {
              const url = app.url(latitude, longitude);
              await Linking.openURL(url);
            } catch (error) {
              console.error("Error opening navigation app:", error);
              Alert.alert(
                "Error",
                "Could not open the selected navigation app.",
              );
            }
          },
        })),
        {
          text: "Cancel",
          style: "cancel" as const,
        },
      ];

      Alert.alert("Choose Navigation App", "", buttons, { cancelable: true });
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        className="bg-neutral-100 p-4 rounded-xl shadow-md"
      >
        <View className="flex flex-row justify-between">
          <MicroTitleText className="mb-2">
            Tu Reservación Actual
          </MicroTitleText>
          <Text className="text-sm text-neutral-800">
            Toca para ver detalles
          </Text>
        </View>
        {currentReservation.expiresAt &&
        currentReservation.status === "pending" ? (
          <CurrentReservationExpiration
            expiresAt={currentReservation.expiresAt}
          />
        ) : null}
        <View className="mb-2">
          <MiniTitleText>{currentReservation.lot.address}</MiniTitleText>
          <BodyText>{currentReservation.lot.name}</BodyText>
        </View>
        {(currentReservation.status === "active" ||
          currentReservation.status === "check-out-initiated") &&
        currentReservation.checkInAt ? (
          <Countdown
            targetDate={new Date(currentReservation.checkInAt)}
            className="font-bold text-lg"
          />
        ) : null}
      </TouchableOpacity>
      {currentReservation.lot?.location ? (
        <Button
          label="Get directions"
          className="mt-2"
          onPress={showNavigationOptions}
        />
      ) : null}
    </View>
  );
};

export default CurrentReservationWidget;
