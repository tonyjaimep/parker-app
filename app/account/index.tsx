import { AccountProfile } from "@/modules/account/components/profile";
import { Screen } from "@/modules/ui/components/screen";
import { Stack } from "expo-router";
import { SignOutButton } from "@/modules/account/components/sign-out-button";
import { View } from "react-native";
import { AccountNavigationItems } from "@/modules/account/components/navigation-items";

const screenOptions = {
  headerTitle: "Mi cuenta",
};

export default function AccountScreen() {
  return (
    <Screen className="mt-4">
      <Stack.Screen options={screenOptions} />
      <View className="flex flex-col gap-4">
        <AccountProfile />
        <View className="flex flex-col gap-4">
          <AccountNavigationItems />
        </View>
        <SignOutButton />
      </View>
    </Screen>
  );
}

