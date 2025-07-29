import {
  BffQueryOptions,
  useBffQuery,
} from "@/modules/bff/hooks/use-bff-query";
import { Reservation } from "../types";

export const useReservation = (id: number, options?: BffQueryOptions) => {
  const {
    result: reservation,
    isLoading,
    refresh,
  } = useBffQuery<Reservation>(`/reservations/${id}`, options);

  return {
    reservation,
    isLoading,
    refresh,
  };
};
