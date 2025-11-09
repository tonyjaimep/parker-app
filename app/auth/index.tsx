import { useCallback, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { Href, Link, useGlobalSearchParams } from "expo-router";
import { useRedirectIfAuthenticated } from "@/modules/auth/hooks/use-redirect-if-authenticated";
import { useGetEmailAvailability } from "@/modules/auth/hooks/use-get-email-availability";
import {
  EmailAuthContextProvider,
  useEmailAuth,
} from "@/modules/auth/context/email-auth-context";
import { Screen } from "@/modules/ui/components/screen";
import { TextInput } from "@/modules/ui/components/text-input";
import Button from "@/modules/ui/components/button";
import { BodyText } from "@/modules/ui/components/text/body";
import { TitleText } from "@/modules/ui/components/text/title";

const EmailAuth = () => {
  const getEmailAvailability = useGetEmailAvailability();
  const [isEmailRegistered, setIsEmailRegistered] = useState<boolean>();
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [wasDisplayNameUpdated, setWasDisplayNameUpdated] = useState(false);
  const { target } = useGlobalSearchParams<{ target: string }>();
  useRedirectIfAuthenticated(target as Href);

  const {
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName: setFullNameBts,
    displayName,
    setDisplayName,
    signIn,
    register,
    isLoading,
  } = useEmailAuth();

  const handleSubmitEmailPress = useCallback(async () => {
    const cleanEmail = email.trim().toLowerCase();
    setIsCheckingEmail(true);
    try {
      const { isAvailable } = await getEmailAvailability(cleanEmail);
      setIsEmailRegistered(!isAvailable);
    } finally {
      setIsCheckingEmail(false);
      setEmail(cleanEmail);
    }
  }, [email]);

  const isEmailValid = email.includes("@") && email.length > 5;

  const resetEmail = useCallback(() => {
    setIsEmailRegistered(undefined);
  }, []);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((wasVisible) => !wasVisible);

  const submit = useCallback(() => {
    if (isEmailRegistered) {
      signIn();
    } else {
      register();
    }
  }, [isEmailRegistered, signIn, register]);

  const setFullName = useCallback(
    (fullName: string) => {
      setFullNameBts(fullName);
      if (!wasDisplayNameUpdated) {
        setDisplayName(fullName.trim().split(" ")[0]);
      }
    },
    [setFullNameBts, setDisplayName, wasDisplayNameUpdated],
  );

  const handleDisplayNameChange = useCallback(() => {
    setWasDisplayNameUpdated(true);
  }, []);

  return (
    <Screen className="pb-safe pt-3">
      <TitleText className="mb-1">Entrar</TitleText>
      <BodyText className="mb-2">
        Introduce tu correo electrónico para registrarte o iniciar sesión.
      </BodyText>
      <View className="gap-2 flex flex-row items-end mb-4">
        <View className="flex flex-1">
          <TextInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            inputMode="email"
            textContentType="emailAddress"
            autoCapitalize="none"
            disabled={isCheckingEmail || isEmailRegistered !== undefined}
          />
        </View>
        {isEmailRegistered === undefined ? null : (
          <Button
            onPress={resetEmail}
            label="Limpiar"
            variant="outline"
            size="sm"
          />
        )}
      </View>
      {isEmailRegistered !== undefined ? (
        <View>
          <TextInput
            placeholder="contraseña"
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            className="mb-4"
            autoComplete={
              Platform.OS === "ios" ? "current-password" : "password"
            }
            keyboardType={
              Platform.OS === "android" && isPasswordVisible
                ? "visible-password"
                : "default"
            }
            secureTextEntry={!isPasswordVisible}
            RightElement={
              <TouchableOpacity
                onPress={togglePasswordVisibility}
              ></TouchableOpacity>
            }
          />
          {isEmailRegistered === true ? (
            <Link
              href={`/auth/forgot-password?email=${encodeURIComponent(email)}`}
              className="mb-3"
            >
              <BodyText className="underline text-primary-700">
                ¿Olvidaste tu contraseña?
              </BodyText>
            </Link>
          ) : null}
        </View>
      ) : null}
      {isEmailRegistered === false ? (
        <>
          <TextInput
            label="Nombre completo"
            value={fullName}
            onChangeText={setFullName}
            className="mb-4"
          />
          <TextInput
            label="¿Cómo te decimos?"
            onChange={handleDisplayNameChange}
            value={displayName}
            onChangeText={setDisplayName}
            className="mb-8"
          />
        </>
      ) : null}
      {isEmailRegistered === undefined ? (
        <Button
          onPress={handleSubmitEmailPress}
          label="Continuar"
          disabled={isCheckingEmail || !isEmailValid}
        />
      ) : (
        <Button
          onPress={submit}
          label={isEmailRegistered ? "Iniciar sesión" : "Registrarse"}
          disabled={isLoading}
        />
      )}
    </Screen>
  );
};

export default function Page() {
  return (
    <EmailAuthContextProvider>
      <EmailAuth />
    </EmailAuthContextProvider>
  );
}
