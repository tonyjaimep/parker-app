import { useBffAction } from "@/modules/bff/hooks/use-bff-action";
import { BffHookOptions } from "@/modules/bff/utils/types";
import { Reservation } from "../types";

export const useForceCheckOut = (
  reservationId: number,
  options: BffHookOptions<Reservation>,
) => {
  const { isLoading, execute: forceCheckOut } = useBffAction(
    `/reservations/${reservationId}/force-check-out`,
    options,
  );

  return {
    forceCheckOut,
    isLoading,
  };
};
