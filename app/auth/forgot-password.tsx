import { useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { getAuth } from "@react-native-firebase/auth";
import { Screen } from "@/modules/ui/components/screen";
import { TitleText } from "@/modules/ui/components/text/title";
import { BodyText } from "@/modules/ui/components/text/body";
import { TextInput } from "@/modules/ui/components/text-input";
import Button from "@/modules/ui/components/button";

export default function ForgotPasswordScreen() {
  const { email: defaultEmail } = useGlobalSearchParams<{ email?: string }>();
  const [email, setEmail] = useState(defaultEmail || "");
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    try {
      const auth = getAuth();
      await auth.sendPasswordResetEmail(email);
      setEmailSent(true);
    } catch (error) {
      Alert.alert("Error", "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  return (
    <Screen contentContainerClassName="gap-4">
      <TitleText>Forgot your password?</TitleText>
      <BodyText>Password recovery</BodyText>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoComplete="email"
      />
      {emailSent ? (
        <BodyText>Email sent</BodyText>
      ) : (
        <Button
          onPress={onSubmit}
          label="Send recovery email"
          disabled={isLoading}
        />
      )}
    </Screen>
  );
}
