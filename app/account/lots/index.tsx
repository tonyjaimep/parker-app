import OwnedLotsScreen from "@/modules/lots/screens/owned-lots";
import { Screen } from "@/modules/ui/components/screen";
import { Stack } from "expo-router";

export default function OwnedLots() {
  return (
    <Screen>
      <Stack.Screen options={{ title: "My Lots" }} />
      <OwnedLotsScreen />
    </Screen>
  );
}

