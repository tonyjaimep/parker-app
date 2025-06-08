import { useBffAction } from "@/modules/bff/hooks/use-bff-action";
import { CreateLotRequestDto, Lot } from "../types";
import { BffHookOptions } from "@/modules/bff/utils/types";

export const useCreateLot = (options?: BffHookOptions<Lot>) => {
  const { execute: createLot, isLoading } = useBffAction<
    CreateLotRequestDto,
    Lot
  >("/lots", options);

  return { createLot, isLoading };
};
