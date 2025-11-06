import MapView, {
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import { Coordinates, LotWithAvailability } from "../../types";
import { useGetLotsWithAvailability } from "../../hooks/use-get-lots-with-availability";
import { debounce } from "lodash";

const mexicoRegion: Region = {
  latitude: 23.624813,
  longitude: -102.55,
  latitudeDelta: 30,
  longitudeDelta: 30,
};

type LotsMapProps = {
  style: any;
  onLotSelected: (lot: any) => void;
  defaultPosition?: Coordinates;
};

export const LotsMap = ({
  style,
  onLotSelected,
  defaultPosition,
}: LotsMapProps) => {
  const { lots, getLotsWithAvailability } = useGetLotsWithAvailability();
  const [isMapReady, setIsMapReady] = useState(false);

  const mapRef = useRef<MapView>(null);

  const throttledGetLotsWithAvailability = useCallback(
    debounce(async (boundaries: any) => {
      getLotsWithAvailability(boundaries);
    }, 500),
    [getLotsWithAvailability],
  );

  useEffect(() => {
    if (!isMapReady) return;

    mapRef.current?.getMapBoundaries().then((boundaries) => {
      if (boundaries) {
        throttledGetLotsWithAvailability(boundaries);
      }
    });
  }, [throttledGetLotsWithAvailability, isMapReady]);

  const handleRegionChange = useCallback(async () => {
    if (!isMapReady) return;

    const boundaries = await mapRef.current?.getMapBoundaries();

    if (boundaries) {
      throttledGetLotsWithAvailability(boundaries);
    }
  }, [getLotsWithAvailability, isMapReady]);

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

  const handleMapReady = useCallback(() => {
    setIsMapReady(true);
  }, []);

  useEffect(() => {
    if (!defaultPosition || !isMapReady) return;

    mapRef.current?.animateToRegion({
      ...defaultPosition,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    });

    handleRegionChange();
  }, [defaultPosition, isMapReady]);

  return (
    <MapView
      ref={mapRef}
      showsUserLocation
      followsUserLocation
      style={style}
      pitchEnabled={false}
      showsBuildings={false}
      onRegionChangeComplete={handleRegionChange}
      provider={PROVIDER_GOOGLE}
      onMapReady={handleMapReady}
      initialRegion={mexicoRegion}
    >
      {lots
        ? lots.map((lot) =>
            lot.location ? (
              <Marker
                id={`lot-marker-${lot.id}`}
                key={lot.id}
                coordinate={lot.location}
                onPress={(event) => handleLotMarkerPressed(event, lot)}
              />
            ) : null,
          )
        : []}
    </MapView>
  );
};
