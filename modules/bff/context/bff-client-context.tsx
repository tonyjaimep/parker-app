import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  PropsWithChildren,
} from "react";
import axios, { AxiosInstance } from "axios";

type BffClientContextProps = PropsWithChildren;

interface BffClientProviderState {
  bffClient: AxiosInstance;
  setJwt: (token: string | null) => void;
}

const BffClientContext = createContext<BffClientProviderState | undefined>(
  undefined,
);

export const BffClientProvider = ({ children }: BffClientContextProps) => {
  const [jwt, setJwt] = useState<string | null>(null);

  const bffClient = useMemo(() => {
    return axios.create({
      baseURL: process.env.EXPO_PUBLIC_BFF_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
      },
    });
  }, [jwt]);

  const value = useMemo(
    () => ({
      bffClient,
      setJwt,
    }),
    [bffClient],
  );

  return (
    <BffClientContext.Provider value={value}>
      {children}
    </BffClientContext.Provider>
  );
};

export const useBffClient = () => {
  const context = useContext(BffClientContext);
  if (!context) {
    throw new Error("useBffClient must be used within an BffClientProvider");
  }
  return context.bffClient;
};

export const useSetJwt = () => {
  const context = useContext(BffClientContext);
  if (!context) {
    throw new Error("useSetJwtToken must be used within an BffClientProvider");
  }
  return context.setJwt;
};
