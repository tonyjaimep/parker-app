import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import "@/assets/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BffClientProvider } from "@/modules/bff/context/bff-client-context";
import { AuthContextProvider } from "@/modules/auth/context/auth-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView>
      <BffClientProvider>
        <AuthContextProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="auth/index" />
              <Stack.Screen name="auth/forgot-password" />
            </Stack>
          </ThemeProvider>
        </AuthContextProvider>
      </BffClientProvider>
    </GestureHandlerRootView>
  );
}
