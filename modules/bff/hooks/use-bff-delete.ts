import { useCallback, useState } from "react";
import { useBffClient } from "../../bff/context/bff-client-context";
import { AxiosResponse } from "axios";

type BffQueryOptions = {
  onError?: (response: AxiosResponse) => unknown;
  onSuccess?: (response: AxiosResponse) => unknown;
  params?: Record<string, unknown>;
};

type BffQueryState = {
  executeDelete: () => Promise<void>;
  isLoading: boolean;
};

export const useBffDelete = (
  url: string,
  { onError, onSuccess, params }: BffQueryOptions = {},
): BffQueryState => {
  const bffClient = useBffClient();
  const [isLoading, setIsLoading] = useState(false);

  const executeDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await bffClient.delete(url, { params });

      if (response.status !== 200) {
        onError?.(response);
      } else {
        onSuccess?.(response);
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, params]);

  return {
    isLoading,
    executeDelete,
  };
};
