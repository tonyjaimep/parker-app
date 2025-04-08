import { useCallback } from "react";
import { useGetCurrentReservation } from "./use-get-current-reservation";
import { Reservation, ReservationCreateDto } from "../types";
import { isEmpty } from "lodash";
import { useBffAction } from "@/modules/bff/hooks/use-bff-action";
import { BffHookOptions } from "@/modules/bff/utils/types";

export const useCreateReservation = (
  { lotId }: { lotId: number },
  options: BffHookOptions<Reservation>,
) => {
  const { execute, isLoading: isCreatingReservation } = useBffAction<
    ReservationCreateDto,
    Reservation
  >("/reservation", options);

  const onReservationFetched = useCallback(
    async (reservation: Reservation | {}) => {
      if (isEmpty(reservation)) {
        execute({
          lotId,
        });
      } else {
        return;
      }
    },
    [lotId],
  );

  const {
    getCurrentReservation: checkForCurrentReservation,
    isLoading: isLoadingCurrentReservation,
  } = useGetCurrentReservation({
    onSuccess: onReservationFetched,
  });

  const createReservation = useCallback(async () => {
    await checkForCurrentReservation();
  }, []);

  return {
    isLoading: isLoadingCurrentReservation || isCreatingReservation,
    createReservation,
  };
};
