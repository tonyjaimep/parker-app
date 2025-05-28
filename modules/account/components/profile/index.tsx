import { BodyText } from "@/modules/ui/components/text/body"
import { MiniTitleText } from "@/modules/ui/components/text/mini-title"
import Ionicons from "@expo/vector-icons/build/Ionicons"
import { useUserFullName, useUserDisplayName } from "../../../auth/context/auth-context"
import { View } from "react-native"

export const AccountProfile = () => {
    const fullName = useUserFullName();
    const displayName = useUserDisplayName();

    return (
      <View className="flex flex-row gap-4 items-center">
        <Ionicons name="person-outline" size={24} color="black" />
        <View className="flex flex-col gap-1">
          <MiniTitleText className="text-lg font-semibold">{fullName}</MiniTitleText>
          <BodyText className="text-neutral-600">{displayName}</BodyText>
        </View>
      </View>
    )
}