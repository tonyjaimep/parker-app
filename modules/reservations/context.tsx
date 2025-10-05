import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useGetCurrentReservation } from "./hooks/use-get-current-reservation";
import { Reservation } from "./types";
import { isEmpty } from "lodash";
import { useRealtimeUpdateHandler } from "../realtime/context";

type ReservationContext = {
  currentReservation: Reservation | null;
  checkForReservation: () => Promise<{} | Reservation | null>;
  isLoading: boolean;
};

const CurrentReservationContext = createContext<ReservationContext>({
  currentReservation: null,
  checkForReservation: async () => ({}),
  isLoading: false,
});

export const CurrentReservationProvider = ({ children }: PropsWithChildren) => {
  const { currentReservation, getCurrentReservation, isLoading } =
    useGetCurrentReservation();

  const value = {
    currentReservation: isEmpty(currentReservation) ? null : currentReservation,
    checkForReservation: getCurrentReservation,
    isLoading,
  };

  useEffect(() => {
    getCurrentReservation();
  }, [getCurrentReservation]);

  const handleReservationUpdated = useCallback(
    () => getCurrentReservation(),
    [],
  );

  useRealtimeUpdateHandler("reservation-updated", handleReservationUpdated);

  return (
    <CurrentReservationContext.Provider value={value}>
      {children}
    </CurrentReservationContext.Provider>
  );
};

export const useCheckForReservation = () => {
  const { checkForReservation } = useContext(CurrentReservationContext);
  return checkForReservation;
};

export const useCurrentReservation = () => {
  const { currentReservation } = useContext(CurrentReservationContext);
  return currentReservation;
};

export const useIsLoadingCurrentReservation = () => {
  const { isLoading } = useContext(CurrentReservationContext);
  return isLoading;
};
