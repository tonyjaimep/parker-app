import MapView, { Marker, MarkerPressEvent } from "react-native-maps";
import { useCallback, useEffect, useRef } from "react";
import { LotWithAvailability } from "../../types";
import { useGetLotsWithAvailability } from "../../hooks/use-get-lots-with-availability";
import { throttle } from "lodash";

export const LotsMap = ({
  style,
  onLotSelected,
}: {
  style: any;
  onLotSelected: (lot: any) => void;
}) => {
  const { lots, getLotsWithAvailability } = useGetLotsWithAvailability();

  const mapRef = useRef<MapView>(null);

  const throttledGetLotsWithAvailability = useCallback(
    throttle(async (boundaries: any) => {
      getLotsWithAvailability(boundaries);
    }, 500),
    [getLotsWithAvailability],
  );

  useEffect(() => {
    mapRef.current?.getMapBoundaries().then((boundaries) => {
      if (boundaries) {
        throttledGetLotsWithAvailability(boundaries);
      }
    });
  }, [throttledGetLotsWithAvailability]);

  const handleRegionChange = useCallback(async () => {
    const boundaries = await mapRef.current?.getMapBoundaries();

    if (boundaries) {
      throttledGetLotsWithAvailability(boundaries);
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
  );
};

