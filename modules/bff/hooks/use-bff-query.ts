import { useCallback, useEffect, useState } from "react";
import { useBffClient } from "../../bff/context/bff-client-context";
import { AxiosResponse } from "axios";

export type BffQueryOptions = {
  onError?: (response: AxiosResponse) => void;
  onSuccess?: (response: AxiosResponse) => unknown;
  params?: Record<string, unknown>;
};

type BffQueryState<R> = {
  isLoading: boolean;
  result: R | null;
  refresh: () => Promise<void>;
};

export const useBffQuery = <R = unknown>(
  url: string,
  { onError, onSuccess, params }: BffQueryOptions = {},
): BffQueryState<R> => {
  const bffClient = useBffClient();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<R | null>(null);

  const fetchResult = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await bffClient.get(url, { params });

      if (response.status !== 200) {
        onError?.(response);
      } else {
        onSuccess?.(response);
      }

      setResult(response.data);
    } finally {
      setIsLoading(false);
    }
  }, [url, params, bffClient]);

  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  return {
    isLoading,
    result,
    refresh: fetchResult,
  };
};
