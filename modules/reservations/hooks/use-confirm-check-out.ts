import { useBffAction } from "@/modules/bff/hooks/use-bff-action";
import { BffHookOptions } from "@/modules/bff/utils/types";
import { Reservation } from "../types";

export const useConfirmCheckOut = (
  reservationId: number,
  options: BffHookOptions<Reservation>,
) => {
  const { isLoading, execute: confirmCheckOut } = useBffAction(
    `/reservations/${reservationId}/confirm-check-out`,
    options,
  );

  return {
    confirmCheckOut,
    isLoading,
  };
};
