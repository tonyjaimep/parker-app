import axios from "axios";

export const fetchPlace = async (placeId: string) => {
  const endpoint = `https://places.googleapis.com/v1/places/${placeId}`;

  const result = await axios.get<{
    location: { latitude: number; longitude: number };
  }>(endpoint, {
    params: {
      fields: "location",
      key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
  });

  return result.data;
};
