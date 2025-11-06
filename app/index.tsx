import { LotDetail } from "@/modules/lots/components/detail";
import { LotWithAvailability } from "@/modules/lots/types";
import { BottomDrawer } from "@/modules/ui/components/bottom-drawer";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Screen } from "react-native-screens";
import CurrentReservationWidget from "@/modules/reservations/components/current-reservation-widget";
import AuthWidget from "@/modules/auth/components/AuthWidget";
import { LotsMap } from "@/modules/lots/components/lots-map";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { PlaceSearchWidget } from "@/modules/place-search/components/place-search-widget";
import { AvailabilitySelector } from "@/modules/availability/components/availability-selector";
import { useCurrentReservation } from "@/modules/reservations/context";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedLot, setSelectedLot] = useState<LotWithAvailability>();
  const currentReservation = useCurrentReservation();

  const [forecastDay, setForecastDay] = useState<number>();
  const [forecastHour, setForecastHour] = useState<number>();

  const handleForecastTimeSelected = (day: number, hour: number) => {
    setForecastDay(day);
    setForecastHour(hour);
  };

  const handleForecastTimeCleared = () => {
    setForecastDay(undefined);
    setForecastHour(undefined);
  };

  const unsetSelectedLot = useCallback(() => {
    setSelectedLot(undefined);
  }, []);

  const { focusName, focusLatitude, focusLongitude } = useGlobalSearchParams<{
    focusName?: string;
    focusLatitude?: string;
    focusLongitude?: string;
  }>();

  const focusLocation = useMemo(() => {
    if (!focusLatitude || !focusLongitude) return;

    return {
      latitude: Number(focusLatitude),
      longitude: Number(focusLongitude),
    };
  }, [focusLatitude, focusLongitude]);

  const onClearFocus = () => {
    router.setParams({ focusName: "", focusLatitude: "", focusLongitude: "" });
  };

  return (
    <Screen style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <LotsMap
        style={styles.map}
        onLotSelected={setSelectedLot}
        defaultPosition={focusLocation}
        availabilityForecastDay={forecastDay}
        availabilityForecastHour={forecastHour}
      />

      <View className="pt-safe px-4 gap-4">
        <View className="flex-row justify-between items-center">
          <AuthWidget />
        </View>
        <View>
          <CurrentReservationWidget />
          {currentReservation ? null : (
            <View className="gap-2">
              <PlaceSearchWidget
                defaultValue={focusName}
                onClear={onClearFocus}
              />
              <AvailabilitySelector
                onForecastTimeSelected={handleForecastTimeSelected}
                onForecastTimeCleared={handleForecastTimeCleared}
              />
            </View>
          )}
        </View>
      </View>

      <BottomDrawer isVisible={!!selectedLot} onDismiss={unsetSelectedLot}>
        {selectedLot ? (
          <LotDetail lot={selectedLot} onDismiss={unsetSelectedLot} />
        ) : null}
      </BottomDrawer>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
