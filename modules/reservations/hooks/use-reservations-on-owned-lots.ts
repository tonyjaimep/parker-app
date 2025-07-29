import { useBffQuery } from "@/modules/bff/hooks/use-bff-query";
import { BffHookOptions } from "@/modules/bff/utils/types";
import { Reservation } from "../types";

export const useReservationsOnOwnedLots = (
  options?: BffHookOptions<Reservation[]>,
) => {
  const {
    result: reservationsOnOwnedLots,
    isLoading,
    refresh,
  } = useBffQuery<Reservation[]>("/lots/owned/reservations", options);

  return {
    reservationsOnOwnedLots,
    isLoading,
    refresh,
  };
};
