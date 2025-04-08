import { createContext, PropsWithChildren, useEffect } from "react";
import { useGetCurrentReservation } from "./hooks/use-get-current-reservation";
import { Reservation } from "./types";

type ReservationContext = {
  checkForReservation: () => Promise<{} | Reservation | null>;
  isLoading: boolean;
};

const CurrentReservationContext = createContext<ReservationContext>({
  checkForReservation: async () => ({}),
  isLoading: false,
});

export const CurrentReservationProvider = ({ children }: PropsWithChildren) => {
  const { getCurrentReservation, isLoading } = useGetCurrentReservation();

  const value = {
    checkForReservation: getCurrentReservation,
    isLoading,
  };

  useEffect(() => {
    getCurrentReservation();
  }, [getCurrentReservation]);

  return (
    <CurrentReservationContext.Provider value={value}>
      {children}
    </CurrentReservationContext.Provider>
  );
};
