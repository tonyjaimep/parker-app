import { useBffAction } from "@/modules/bff/hooks/use-bff-action";
import { BffHookOptions } from "@/modules/bff/utils/types";
import { Reservation } from "../types";

export const useCheckOut = (
  reservationId: number,
  options: BffHookOptions<Reservation>,
) => {
  const { isLoading, execute: checkOut } = useBffAction(
    `/reservations/${reservationId}/check-out`,
    options,
  );

  return {
    checkOut,
    isLoading,
  };
};
