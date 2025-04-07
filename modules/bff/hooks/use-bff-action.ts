import { useState, useCallback } from "react";
import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from "axios";
import { useBffClient } from "../context/bff-client-context";

type BffActionOptions<R = unknown> = {
  onSuccess?: (response: AxiosResponse<R>) => void;
  onError?: (error: AxiosError) => void;
};

export const useBffAction = <B, R = unknown>(
  url: string,
  { onSuccess, onError }: BffActionOptions<R> = {},
  config?: AxiosRequestConfig,
): {
  execute: (body?: B) => Promise<void>;
  isLoading: boolean;
} => {
  const bffClient = useBffClient();
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (requestBody?: B) => {
      setIsLoading(true);
      try {
        const response = await bffClient.post<R>(url, requestBody, config);
        onSuccess?.(response);
      } catch (error) {
        if (isAxiosError(error)) {
          onError?.(error);
        } else {
          throw error;
        }
      } finally {
        setIsLoading(false);
      }
    },
    [bffClient, url, onSuccess, onError],
  );

  return { execute, isLoading };
};
