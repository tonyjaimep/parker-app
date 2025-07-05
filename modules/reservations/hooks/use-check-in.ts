import { useBffAction } from "@/modules/bff/hooks/use-bff-action";
import { BffHookOptions } from "@/modules/bff/utils/types";

export const useCheckIn = (options: BffHookOptions<never>) => {
  const { execute: checkIn, isLoading } = useBffAction(
    "/reservations/current/check-in",
    options,
  );

  return {
    checkIn,
    isLoading,
  };
};
