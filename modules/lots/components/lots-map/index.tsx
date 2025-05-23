import MapView, { Marker, MarkerPressEvent } from "react-native-maps"
import { Dimensions } from "react-native"
import { useCallback, useRef } from "react"
import { LotWithAvailability } from "../../types"
import { useGetLotsWithAvailability } from "../../hooks/use-get-lots-with-availability"

export const LotsMap = ({ style, onLotSelected }: { style: any, onLotSelected: (lot: any) => void }) => {
  const { lots, getLotsWithAvailability } = useGetLotsWithAvailability();

  const mapRef = useRef<MapView>(null);

  const handleRegionChange = useCallback(async () => {
    const boundaries = await mapRef.current?.getMapBoundaries();

    if (boundaries) {
      getLotsWithAvailability(boundaries);
    }
  }, [getLotsWithAvailability]);


  const handleLotMarkerPressed = useCallback(
    async (event: MarkerPressEvent, lot: LotWithAvailability) => {
      mapRef.current?.animateToRegion({
        ...event.nativeEvent.coordinate,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });

      onLotSelected(lot);
    },
    [],
  );

  return (
    <MapView
      ref={mapRef}
      showsUserLocation
      followsUserLocation
      style={style}
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
  )
}