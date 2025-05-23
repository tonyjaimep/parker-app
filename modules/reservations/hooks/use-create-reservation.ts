import { useCallback } from "react";
import { useGetCurrentReservation } from "./use-get-current-reservation";
import { Reservation, ReservationCreateDto } from "../types";
import { isEmpty } from "lodash";
import { useBffAction } from "@/modules/bff/hooks/use-bff-action";
import { BffHookOptions } from "@/modules/bff/utils/types";
import { AxiosResponse } from "axios";

export const useCreateReservation = (
  { lotId }: { lotId: number },
  options: BffHookOptions<Reservation>,
) => {
  const { execute, isLoading: isCreatingReservation } = useBffAction<
    ReservationCreateDto,
    Reservation
  >("/reservations", options);

  const onReservationFetched = useCallback(
    async (response: AxiosResponse<Reservation | {}>) => {
      const reservation = response.data;

      if (response.status === 200 && isEmpty(reservation)) {
        await execute({
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
