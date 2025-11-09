import { useSignOut } from "@/modules/auth/context/auth-context";
import { BodyText } from "@/modules/ui/components/text/body";
import { Ionicons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";

export const SignOutButton = () => {
  const signOut = useSignOut();

  const handleSignOut = () => {
    Alert.alert("Cerrar sesión", "¿De verdad quieres cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        style: "destructive",
        text: "Cerrar sesión",
        onPress: () => signOut(),
      },
    ]);
  };

  return (
    <TouchableOpacity
      onPress={handleSignOut}
      className="flex-row items-center gap-4"
    >
      <Ionicons name="log-out-outline" size={24} color="#e11d48" />
      <BodyText className="text-negative-700 font-bold">Cerrar Sesión</BodyText>
    </TouchableOpacity>
  );
};

