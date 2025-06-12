import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  PropsWithChildren,
  useEffect,
} from "react";
import axios, { AxiosInstance } from "axios";

type BffClientContextProps = PropsWithChildren;

interface BffClientProviderState {
  bffClient: AxiosInstance;
  setJwt: (token: string | null) => void;
  jwt: string | null;
}

const BffClientContext = createContext<BffClientProviderState | undefined>(
  undefined,
);

export const BffClientProvider = ({ children }: BffClientContextProps) => {
  const [jwt, setJwt] = useState<string | null>(null);

  const bffClient = useMemo(() => {
    const client = axios.create({
      baseURL: process.env.EXPO_PUBLIC_BFF_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    client.interceptors.response.use(
      (response) => {
        const { status, config } = response;
        const method = config.method?.toUpperCase();
        const url = config.url;

        console.log(`[${status}] [${method} ${url}]`);

        return response;
      },
      (error) => {
        // Handle error responses
        if (error.response) {
          // Server responded with error status
          const { status, config, statusText } = error.response;
          const method = config?.method?.toUpperCase();
          const url = config?.url;

          console.log(
            `[${status}] [${method} ${url}] | ${statusText || error.message}`,
          );
        } else if (error.request) {
          // Request was made but no response received
          const { config } = error;
          const method = config?.method?.toUpperCase();
          const url = config?.url;

          console.log(`[NETWORK ERROR] [${method} ${url}] | ${error.message}`);
        } else {
          // Something else happened
          console.log(`[REQUEST ERROR] | ${error.message}`);
        }

        return Promise.reject(error);
      },
    );

    return client;
  }, []);

  useEffect(() => {
    const jwtInterceptor = bffClient.interceptors.request.use((config) => {
      if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
      }
      return config;
    });

    return () => {
      bffClient.interceptors.request.eject(jwtInterceptor);
    };
  }, [bffClient, jwt]);

  const value = useMemo(
    () => ({ bffClient, jwt, setJwt }),
    [bffClient, jwt, setJwt],
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

export const useSetBffToken = () => {
  const context = useContext(BffClientContext);
  if (!context) {
    throw new Error("useSetBffToken must be used within an BffClientProvider");
  }
  return context.setJwt;
};

export const useBffToken = () => {
  const context = useContext(BffClientContext);
  if (!context) {
    throw new Error("useBffToken must be used within an BffClientProvider");
  }
  return context.jwt;
};
