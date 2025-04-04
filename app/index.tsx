import { LotDetail } from "@/modules/lots/components/detail";
import { useGetLotsWithAvailability } from "@/modules/lots/hooks/use-get-lots-with-availability";
import { LotWithAvailability } from "@/modules/lots/types";
import { BottomDrawer } from "@/modules/ui/components/bottom-drawer";
import Button from "@/modules/ui/components/button";
import { useCallback, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, MarkerPressEvent, Region } from "react-native-maps";
import { Screen } from "react-native-screens";

export default function HomeScreen() {
  const mapRef = useRef<MapView>(null);
  const { lots, getLotsWithAvailability } = useGetLotsWithAvailability();

  const [selectedLot, setSelectedLot] = useState<LotWithAvailability>();

  const handleRegionChange = useCallback(async () => {
    const boundaries = await mapRef.current?.getMapBoundaries();

    if (boundaries) {
      getLotsWithAvailability(boundaries);
    }
  }, []);

  const handleLotMarkerPressed = useCallback(
    async (event: MarkerPressEvent, lot: LotWithAvailability) => {
      console.log(event.nativeEvent.id);
      mapRef.current?.animateToRegion({
        ...event.nativeEvent.coordinate,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });

      setSelectedLot(lot);
    },
    [],
  );

  const unsetSelectedLot = useCallback(() => {
    setSelectedLot(undefined);
  }, []);

  return (
    <Screen style={styles.screen}>
      <MapView
        ref={mapRef}
        showsUserLocation
        followsUserLocation
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
        }}
        pitchEnabled={false}
        showsBuildings={false}
        onRegionChangeComplete={handleRegionChange}
        showsTraffic={false}
        showsPointsOfInterest={false}
      >
        {lots
          ? lots.map((lot) => (
              <Marker
                id={`lot-marker-${lot.id}`}
                tracksViewChanges={false}
                key={lot.id}
                coordinate={lot.location}
                onPress={(event) => handleLotMarkerPressed(event, lot)}
              />
            ))
          : null}
      </MapView>
      <BottomDrawer isVisible={!!selectedLot} onDismiss={unsetSelectedLot}>
        {selectedLot ? <LotDetail lot={selectedLot} /> : null}
      </BottomDrawer>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
