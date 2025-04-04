import { createContext, PropsWithChildren, useEffect } from "react";
import { useGetCurrentReservation } from "./hooks/use-get-current-reservation";

type ReservationContext = {
  checkForReservation: () => void | Promise<void>;
  isLoading: boolean;
};

const CurrentReservationContext = createContext<ReservationContext>({
  checkForReservation: () => {},
  isLoading: false,
});

export const CurrentReservationProvider = ({ children }: PropsWithChildren) => {
  const { getCurrentReservation, isLoading } = useGetCurrentReservation();

  const value = {
    checkForReservation: getCurrentReservation,
    isLoading,
  };

  useEffect(() => {
    if (!isLoading) {
      getCurrentReservation();
    }
  }, [isLoading, getCurrentReservation]);

  return (
    <CurrentReservationContext.Provider value={value}>
      {children}
    </CurrentReservationContext.Provider>
  );
};
