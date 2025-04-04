import { useCallback, useState } from "react";
import { useGetCurrentReservation } from "./use-get-current-reservation";
import { Reservation } from "../types";

export const useCreateReservation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onReservationFetched = useCallback(
    async (reservation: Reservation | null) => {
      if (reservation) {
        return;
      } else {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      }
    },
    [],
  );

  const { getCurrentReservation: checkForCurrentReservation } =
    useGetCurrentReservation({
      onSuccess: onReservationFetched,
    });

  const createReservation = useCallback(async () => {
    await checkForCurrentReservation();
  }, []);

  return {
    isLoading,
    createReservation,
  };
};
