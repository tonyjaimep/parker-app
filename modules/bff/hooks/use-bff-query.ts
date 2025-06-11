import { useCallback, useEffect, useState } from "react";
import { useBffClient } from "../../bff/context/bff-client-context";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";

export type BffQueryOptions = {
  onError?: (error?: AxiosError) => void;
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
    let message = `[GET ${url}]`;

    try {
      setIsLoading(true);
      const response = await bffClient.get(url, { params });

      console.log(`[${response.status}] [GET ${url}] - ${message}`);
      onSuccess?.(response);

      setResult(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(`[${error.status}] [GET ${url}] - ${error.message}`);
        onError?.(error);
      } else {
        console.error(`[${error}] [GET ${url}] - ${error}`);
      }
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
