import { useBffAction } from "@/modules/bff/hooks/use-bff-action";
import { BffHookOptions } from "@/modules/bff/utils/types";
import { Reservation } from "../types";

export const useInitiateCheckOut = (
  reservationId: number,
  options: BffHookOptions<Reservation>,
) => {
  const { isLoading, execute: initiateCheckOut } = useBffAction(
    `/reservations/${reservationId}/initiate-check-out`,
    options,
  );

  return {
    initiateCheckOut,
    isLoading,
  };
};
