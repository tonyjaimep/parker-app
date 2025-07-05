import {
  BffQueryOptions,
  useBffQuery,
} from "@/modules/bff/hooks/use-bff-query";
import { Lot } from "../types";

export const useOwnedLots = (options?: BffQueryOptions) => {
  const {
    result: ownedLots,
    isLoading,
    refresh,
  } = useBffQuery<Array<Lot>>("/lots/owned", options);

  return {
    ownedLots,
    refresh,
    isLoading,
  };
};
