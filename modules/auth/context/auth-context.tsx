import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useBffClient,
  useSetBffToken,
} from "../../bff/context/bff-client-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";
import { isAxiosError } from "axios";
import auth, {
  FirebaseAuthTypes,
  getIdToken,
} from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { isAppInitialized } from "../../firebase/utils/is-app-initialized";

type AuthContextValue = {
  setAccountData: (data: Pick<User, "displayName" | "fullName">) => void;
  signOut: () => void;
  user: User | null;
};

const ASYNC_STORAGE_TOKEN_KEY = "FirebaseToken";

const AuthContext = createContext<AuthContextValue>({
  setAccountData: () => {},
  signOut: () => {},
  user: null,
});

type AuthContextProviderProps = PropsWithChildren<{
  onReady?: () => void;
}>;

export const AuthContextProvider = ({
  children,
  onReady,
}: AuthContextProviderProps) => {
  const router = useRouter();
  const setBffToken = useSetBffToken();
  const bffClient = useBffClient();
  const [user, setUser] = useState<User | null>(null);

  const setAccountData = useCallback(
    (data: Pick<User, "displayName" | "fullName">) => {
      setUser((previousUser) =>
        previousUser
          ? {
              ...previousUser,
              ...data,
            }
          : null,
      );
    },
    [],
  );

  const signOut = useCallback(async () => {
    if (!isAppInitialized()) {
      return;
    }

    if (auth().currentUser) {
      await auth().signOut();
    }

    while (router.canGoBack()) {
      router.back();
    }
    setUser(null);
  }, [router]);

  const loadAuth = useCallback(async () => {
    const token = await AsyncStorage.getItem(ASYNC_STORAGE_TOKEN_KEY);

    console.log("token", token)

    if (token) {
      try {
        const response = await bffClient.get<User>(`/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBffToken(token);
        setUser(response.data);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          signOut();
        }
      }
    } else {
      signOut();
    }
    onReady?.();
  }, [bffClient, setBffToken, signOut]);

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  const handleFirebaseTokenChange = useCallback(
    async (token: string | null) => {
      if (!token) {
        await AsyncStorage.removeItem(ASYNC_STORAGE_TOKEN_KEY);
      } else {
        await AsyncStorage.setItem(ASYNC_STORAGE_TOKEN_KEY, token);
      }

      // setBffToken updates bffClient, updating loadAuth,
      // calling the effect above this definition
      setBffToken(token);
    },
    [setBffToken],
  );

  useEffect(() => {
    if (!isAppInitialized()) {
      return;
    }

    const handleFirebaseUserChange = async (
      firebaseUser: FirebaseAuthTypes.User | null,
    ) => {
      if (!firebaseUser) {
        handleFirebaseTokenChange(null);
      } else {
        const idToken = await getIdToken(firebaseUser, true);
        handleFirebaseTokenChange(idToken);
      }
    };

    const unsubscribeFromAuthStateChanges = auth().onAuthStateChanged(
      handleFirebaseUserChange,
    );

    const unsubscribeFromIdTokenChanges = auth().onIdTokenChanged(
      handleFirebaseUserChange,
    );

    return () => {
      unsubscribeFromAuthStateChanges();
      unsubscribeFromIdTokenChanges();
    };
  }, [handleFirebaseTokenChange]);

  const value = useMemo(
    () => ({
      setAccountData,
      signOut,
      user,
    }),
    [user, signOut, setAccountData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUserId = () => {
  return useContext(AuthContext).user?.id;
};

export const useUserDisplayName = () => {
  return useContext(AuthContext).user?.displayName;
};

export const useUserFullName = () => {
  return useContext(AuthContext).user?.fullName;
};

export const useSetAccountData = () => {
  return useContext(AuthContext).setAccountData;
};

export const useIsAuthenticated = () => {
  const userId = useUserId();
  return !!userId;
};

export const useSignOut = () => useContext(AuthContext).signOut;
