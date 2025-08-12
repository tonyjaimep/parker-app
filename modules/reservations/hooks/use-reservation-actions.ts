import { useBffQuery } from "@/modules/bff/hooks/use-bff-query";
import { ReservationActionType } from "../types";

export const useReservationActions = (reservationId: number) => {
  const {
    result: reservationActions,
    isLoading,
    refresh,
  } = useBffQuery<Array<ReservationActionType>>(
    `/reservations/${reservationId}/actions`,
  );

  return {
    reservationActions,
    isLoading,
    refresh,
  };
};
