import { useBffUpdate } from "@/modules/bff/hooks/use-bff-update";
import { BffHookOptions } from "@/modules/bff/utils/types";
import { Lot } from "../types";

export const useUpdateLot = (lotId: number, options?: BffHookOptions<Lot>) => {
  const { update: updateLot, isLoading } = useBffUpdate(
    `/lots/${lotId}`,
    options,
  );

  return { updateLot, isLoading };
};
