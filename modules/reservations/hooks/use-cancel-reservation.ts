import { useBffAction } from "@/modules/bff/hooks/use-bff-action";
import { BffHookOptions } from "@/modules/bff/utils/types";
import { Reservation } from "../types";

export const useCancelReservation = (
  reservationId: number,
  { onSuccess, onError }: BffHookOptions<Reservation> = {},
) => {
  const { execute, isLoading } = useBffAction(
    `/reservations/${reservationId}/cancel`,
    {
      onSuccess,
      onError,
    },
  );

  return {
    cancelReservation: execute,
    isLoading,
  };
};

