import { LotDetail } from "@/modules/lots/components/detail";
import { LotWithAvailability } from "@/modules/lots/types";
import { BottomDrawer } from "@/modules/ui/components/bottom-drawer";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Screen } from "react-native-screens";
import CurrentReservationWidget from "@/modules/reservations/components/current-reservation-widget";
import AuthWidget from "@/modules/auth/components/AuthWidget";
import { LotsMap } from "@/modules/lots/components/lots-map";
import { Stack } from "expo-router";

export default function HomeScreen() {
  const [selectedLot, setSelectedLot] = useState<LotWithAvailability>();

  const unsetSelectedLot = useCallback(() => {
    setSelectedLot(undefined);
  }, []);

  return (
    <Screen style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <LotsMap style={styles.map} onLotSelected={setSelectedLot} />

      <View className="pt-safe px-4 gap-4">
        <View className="flex-row justify-between items-center">
          <AuthWidget />
        </View>
        <View>
          <CurrentReservationWidget />
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
