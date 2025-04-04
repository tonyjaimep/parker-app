import { useCallback, useState } from "react";
import { Reservation } from "../types";

export const useGetCurrentReservation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (reservation: Reservation | null) => void;
  onError?: () => void;
} = {}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [currentReservation, setCurrentReservation] = useState<Reservation>();

  const getCurrentReservation = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      setCurrentReservation({
        id: 2,
        lot: {
          id: 1,
          name: "Test Reservation Lot",
          address: "Avenida Rio Nilo #829",
          location: {
            latitude: 20.658488,
            longitude: -103.328059,
          },
        },
      });
      onSuccess?.();
    } catch (error) {
      onError?.();
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    getCurrentReservation,
    currentReservation,
  };
};
