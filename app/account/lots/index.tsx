import { OwnedLotsScreen } from "@/modules/lots/screens/owned-lots";
import { Stack } from "expo-router";

export default function OwnedLots() {
  return (
    <>
      <Stack.Screen options={{ title: "My Lots" }} />
      <OwnedLotsScreen />
    </>
  );
}
