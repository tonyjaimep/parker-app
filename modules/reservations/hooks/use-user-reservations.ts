import { useBffQuery } from "@/modules/bff/hooks/use-bff-query";
import { BffHookOptions } from "@/modules/bff/utils/types";
import { useMemo } from "react";
import { Reservation } from "../types";

export const useUserReservations = (
  options?: BffHookOptions<Reservation[]>,
) => {
  const queryOptions: BffHookOptions<Reservation[]> = useMemo(() => {
    return { ...options, params: { made_by: "me" } };
  }, [options]);

  const {
    result: userReservations,
    isLoading,
    refresh,
  } = useBffQuery<Reservation[]>("/reservations", queryOptions);

  return {
    userReservations,
    isLoading,
    refresh,
  };
};
