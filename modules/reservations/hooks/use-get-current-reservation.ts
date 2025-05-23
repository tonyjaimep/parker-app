import { AxiosResponse } from "axios";
import { Reservation } from "../types";
import { useBffLazyQuery } from "@/modules/bff/hooks/use-bff-lazy-query";

export const useGetCurrentReservation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (reservation: AxiosResponse<Reservation | {}>) => void;
  onError?: () => void;
} = {}) => {
  const {
    result: currentReservation,
    isLoading,
    execute: getCurrentReservation,
  } = useBffLazyQuery<Reservation | {}>("/reservations/current", {
    onError,
    onSuccess,
  });

  return {
    isLoading,
    getCurrentReservation,
    currentReservation,
  };
};
