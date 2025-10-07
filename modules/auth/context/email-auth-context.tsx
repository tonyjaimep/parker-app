import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useBffClient } from "../../bff/context/bff-client-context";
import { getAuth, getIdToken } from "@react-native-firebase/auth";
import { Alert } from "react-native";

type EmailAuthContextValue = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  fullName: string;
  setFullName: Dispatch<SetStateAction<string>>;
  displayName: string;
  setDisplayName: Dispatch<SetStateAction<string>>;
  signIn: () => Promise<void>;
  register: () => Promise<void>;
  isLoading: boolean;
};

//@ts-expect-error -- initialized later jeez chill out ts
const EmailAuthContext = createContext<EmailAuthContextValue>();

export const useEmailAuth = () => useContext(EmailAuthContext);

type EmailAuthContextProviderProps = PropsWithChildren;

export const EmailAuthContextProvider = ({
  children,
}: EmailAuthContextProviderProps) => {
  const bffClient = useBffClient();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");

  const signIn = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const auth = getAuth();
        await auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        const firebaseError = error as { code: string };

        switch (firebaseError.code) {
          case "auth/user-disabled":
            Alert.alert("User disabled", "Cannot log in as this user");
            break;
          case "auth/user-not-found":
            Alert.alert(
              "User not found",
              "No user found with these credentials",
            );
            break;
          case "auth/invalid-credential":
            Alert.alert("Wrong credentials", "Wrong credentials");
            break;
          default:
            Alert.alert("Unknown error", "Unknown error");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [bffClient],
  );

  const register = useCallback(
    async (
      email: string,
      password: string,
      fullName: string,
      displayName: string,
    ) => {
      setIsLoading(true);
      const auth = getAuth();

      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );

        const token = await getIdToken(user);
        await bffClient.post(
          "/users/me",
          { fullName, displayName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        await auth.currentUser?.sendEmailVerification();
      } finally {
        setIsLoading(false);
      }
    },
    [bffClient],
  );

  const value = useMemo(
    () => ({
      email,
      setEmail,
      password,
      setPassword,
      fullName,
      setFullName,
      displayName,
      setDisplayName,
      signIn: () => signIn(email, password),
      register: () => register(email, password, fullName, displayName),
      isLoading,
    }),
    [
      email,
      setEmail,
      password,
      setPassword,
      fullName,
      setFullName,
      displayName,
      setDisplayName,
      signIn,
      register,
      isLoading,
    ],
  );

  return (
    <EmailAuthContext.Provider value={value}>
      {children}
    </EmailAuthContext.Provider>
  );
};
