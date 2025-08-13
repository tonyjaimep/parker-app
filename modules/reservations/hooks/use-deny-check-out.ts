import { useBffAction } from "@/modules/bff/hooks/use-bff-action";
import { BffHookOptions } from "@/modules/bff/utils/types";
import { Reservation } from "../types";

export const useDenyCheckOut = (
  reservationId: number,
  options: BffHookOptions<Reservation>,
) => {
  const { isLoading, execute: denyCheckOut } = useBffAction(
    `/reservations/${reservationId}/deny-check-out`,
    options,
  );

  return {
    denyCheckOut,
    isLoading,
  };
};
