import { useState, useCallback } from "react";
import { AxiosResponse } from "axios";
import { useBffClient } from "../context/bff-client-context";

type BffUpdateOptions = {
  onSuccess?: (response: AxiosResponse) => void;
  onError?: (error: unknown) => void;
};

export const useBffUpdate = <B>(
  url: string,
  { onSuccess, onError }: BffUpdateOptions = {},
): {
  update: (body: B) => Promise<void>;
  isLoading: boolean;
} => {
  const client = useBffClient();
  const [isLoading, setIsLoading] = useState(false);

  const update = useCallback(
    async (requestBody: B) => {
      setIsLoading(true);
      try {
        const response = await client.patch(url, requestBody);
        onSuccess?.(response);
      } catch (error) {
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    },
    [client, url, onSuccess, onError],
  );

  return { update, isLoading };
};
