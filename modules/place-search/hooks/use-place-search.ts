import axios, { isAxiosError } from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { PlaceAutocompleteResponse } from "../types";

export const usePlaceSearch = (query: string) => {
  const [suggestions, setSuggestions] = useState<
    PlaceAutocompleteResponse["suggestions"]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const throttledPlaceSearch = useCallback(
    debounce(async (input: string) => {
      if (input.length < 3) {
        return;
      }

      const data = {
        input,
        regionCode: "mx",
      };

      setIsLoading(true);

      try {
        const result = await axios.post<PlaceAutocompleteResponse>(
          "https://places.googleapis.com/v1/places:autocomplete",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            },
          },
        );
        setSuggestions(result.data.suggestions);
      } catch (error) {
        if (isAxiosError(error)) {
          console.error(`${error.status}: ${error.message}.`);
        } else {
          console.error(error);
        }
      } finally {
        console.log("finallying");
        setIsLoading(false);
      }
    }, 700),
    [],
  );

  useEffect(() => {
    throttledPlaceSearch(query);
  }, [throttledPlaceSearch, query]);

  return {
    suggestions,
    isLoading,
  };
};
