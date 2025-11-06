export type PlaceAutocompleteResponse = {
  suggestions: Array<{
    placePrediction: {
      place: string;
      placeId: string;
      text: {
        text: string;
        matches: Array<{
          endOffset: number;
        }>;
      };
    };
    queryPrediction: {
      text: {
        text: string;
        matches: Array<{
          endOffset: number;
        }>;
      };
    };
  }>;
};
