import { useState, useEffect, useCallback } from 'react';
import { useBffClient } from '../../bff/context/bff-client-context';
import { Lot } from '../types'; // Assuming types.d.ts is in the parent 'lots' directory

interface UseGetOwnedLotsReturn {
  lots: Lot[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useGetOwnedLots = (): UseGetOwnedLotsReturn => {
  const bffClient = useBffClient();
  const [lots, setLots] = useState<Lot[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchOwnedLots = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Assuming the endpoint is /users/me/lots or similar
      // The bffClient already includes the auth token
      const response = await bffClient.get<{ data: Lot[] }>('/lots/owned');
      setLots(response.data.data); // Adjust if backend response structure is different
    } catch (e) {
      setError(e as Error);
      setLots(null);
    } finally {
      setIsLoading(false);
    }
  }, [bffClient]);

  useEffect(() => {
    fetchOwnedLots();
  }, [fetchOwnedLots]);

  return { lots, isLoading, error, refetch: fetchOwnedLots };
};
