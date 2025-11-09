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
import { CurrentReservationProvider } from "@/modules/reservations/context";
import { RealtimeContextProvider } from "@/modules/realtime/context";

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
          <RealtimeContextProvider>
            <CurrentReservationProvider>
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <Stack>
                  <Stack.Screen name="index" options={{ title: "Mapa" }} />
                  <Stack.Screen name="auth/index" />
                  <Stack.Screen name="auth/forgot-password" />
                </Stack>
              </ThemeProvider>
            </CurrentReservationProvider>
          </RealtimeContextProvider>
        </AuthContextProvider>
      </BffClientProvider>
    </GestureHandlerRootView>
  );
}
