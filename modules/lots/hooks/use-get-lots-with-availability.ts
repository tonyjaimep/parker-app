import { useCallback, useState } from "react";
import { LotWithAvailability } from "../types";

type Bounds = {
  southWest: {
    latitude: number;
    longitude: number;
  };
  northEast: {
    latitude: number;
    longitude: number;
  };
};

const mockedResponse: LotWithAvailability[] = [
  {
    id: 1,
    name: "Lote Olímpica",
    address: "Av. Olímpica #1234",
    availability: 10,
    location: {
      latitude: 20.658488,
      longitude: -103.328059,
    },
  },
  {
    id: 2,
    name: "Lote Rolón",
    address: "Calz. Revolución #1234",
    availability: 20,
    location: {
      latitude: 20.654721,
      longitude: -103.321779,
    },
  },
];

export const useGetLotsWithAvailability = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lots, setLots] = useState<LotWithAvailability[]>();

  const getLotsWithAvailability = useCallback(async (_bounds: Bounds) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setLots(mockedResponse);
  }, []);

  return {
    getLotsWithAvailability,
    lots,
    isLoading,
  };
};
