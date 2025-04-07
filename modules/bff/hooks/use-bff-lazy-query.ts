import { useCallback, useState } from "react";
import { useBffClient } from "../../bff/context/bff-client-context";
import { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";

type BffQueryOptions<R> = {
  onError?: (response: AxiosResponse) => void;
  onSuccess?: (response: AxiosResponse<R>) => void | Promise<void>;
  params?: Record<string, unknown>;
};

type BffQueryReturn<R> = {
  execute: (params?: Record<string, unknown>) => Promise<R | null>;
  isLoading: boolean;
  result: R | null;
};

export const useBffLazyQuery = <R = unknown>(
  url: string,
  { onError, onSuccess }: Omit<BffQueryOptions<R>, "params"> = {
    onError: console.log,
  },
): BffQueryReturn<R> => {
  const bffClient = useBffClient();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<R | null>(null);

  const execute = useCallback(
    async (params?: AxiosRequestConfig["params"]) => {
      setIsLoading(true);

      try {
        const response = await bffClient.get<R>(url, { params });

        if (response.status !== 200) {
          onError?.(response);
          return null;
        }

        setResult(response.data);
        onSuccess?.(response);
        return response.data as R;
      } catch (e) {
        if (isAxiosError(e)) {
          console.log(e);
          onError?.(e.response!);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [url, onError, bffClient],
  );

  return {
    execute,
    isLoading,
    result,
  };
};
