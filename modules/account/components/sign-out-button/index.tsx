import { useSignOut } from "@/modules/auth/context/auth-context";
import { BodyText } from "@/modules/ui/components/text/body";
import { Ionicons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";

export const SignOutButton = () => {
    const signOut = useSignOut();

    const handleSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Sign Out',
                    onPress: () => signOut(),
                },
            ],
        );
      };

    return (
        <TouchableOpacity onPress={handleSignOut} className="flex-row items-center gap-4">
            <Ionicons name="log-out-outline" size={24} color="#e11d48" />
            <BodyText className="text-negative-700 font-bold">Sign Out</BodyText>
        </TouchableOpacity>
    )
}