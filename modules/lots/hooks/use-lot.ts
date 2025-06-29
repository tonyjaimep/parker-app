import { useBffQuery } from "@/modules/bff/hooks/use-bff-query";
import { Lot } from "../types";

export const useLot = (lotId: number) => {
  const { result: lot, isLoading } = useBffQuery<Lot>(`/lots/${lotId}`);

  return { lot, isLoading };
};
