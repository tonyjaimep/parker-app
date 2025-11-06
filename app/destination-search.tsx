import { PlaceSearchWidget } from "@/modules/place-search/components/place-search-widget";
import { usePlaceSearch } from "@/modules/place-search/hooks/use-place-search";
import { fetchPlace } from "@/modules/place-search/utils/fetch-place";
import { Screen } from "@/modules/ui/components/screen";
import { BodyText } from "@/modules/ui/components/text/body";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function DestinationSearchScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { isLoading: isSearchingForPlaces, suggestions } =
    usePlaceSearch(searchTerm);

  const onPlacePressed = async (placeId: string, displayName: string) => {
    const place = await fetchPlace(placeId);
    router.dismissAll();
    router.replace(
      `/?focusName=${displayName}&focusLatitude=${place.location.latitude}&focusLongitude=${place.location.longitude}`,
    );
  };

  return (
    <Screen
      list
      contentContainerClassName="pt-4 gap-3"
      ListHeaderComponent={
        <PlaceSearchWidget autoFocus onSearchTermChange={setSearchTerm} />
      }
      data={suggestions}
      refreshing={isSearchingForPlaces}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="p-3 border border-neutral-200"
          onPress={() =>
            onPlacePressed(
              item.placePrediction.placeId,
              item.placePrediction.text.text,
            )
          }
        >
          <BodyText>{item.placePrediction.text.text}</BodyText>
        </TouchableOpacity>
      )}
    ></Screen>
  );
}
