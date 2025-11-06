import { useCallback } from "react";
import { LotWithAvailability } from "../types";
import { useBffLazyQuery } from "@/modules/bff/hooks/use-bff-lazy-query";

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

export const useGetLotsWithAvailability = (
  availabilityForecastDay?: number,
  availabilityForecastHour?: number,
) => {
  const {
    execute,
    isLoading,
    result: lots,
  } = useBffLazyQuery<LotWithAvailability[]>("/lots");

  const getLotsWithAvailability = useCallback(
    async (bounds: Bounds) => {
      await execute({
        with_availability: true,
        bounds,
        availability_forecast_day: availabilityForecastDay,
        availability_forecast_hour: availabilityForecastHour,
      });
    },
    [execute],
  );

  return {
    getLotsWithAvailability,
    lots,
    isLoading,
  };
};
