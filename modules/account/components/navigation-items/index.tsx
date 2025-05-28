import { TouchableOpacity, View } from "react-native";
import { BodyText } from "@/modules/ui/components/text/body";
import { useCurrentReservation } from "@/modules/reservations/context";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";
import { CurrentReservationExpiration } from "@/modules/reservations/components/reservation-expiration";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export const AccountNavigationItems = () => {
  const router = useRouter();
  const currentReservation = useCurrentReservation();

  const goToCurrentReservation = () => {
    if (currentReservation) {
      router.navigate(`/reservations/current`);
    }
  };

  const goToLots = () => {
    router.navigate(`/account/lots`);
  };

    return (
        <View className="flex flex-col gap-2">
            {currentReservation ? (
                <TouchableOpacity onPress={goToCurrentReservation} className="flex flex-row items-center justify-between gap-2 p-4 bg-neutral-100 rounded-lg border border-neutral-400">
                  <View className="flex flex-col justify-between">
                    <MicroTitleText>Current Reservation</MicroTitleText>
                    <BodyText>{currentReservation.lot.name}</BodyText>
                    <BodyText>{currentReservation.lot.address}</BodyText>
                    {currentReservation.expiresAt ? (
                      <CurrentReservationExpiration expiresAt={currentReservation.expiresAt} />
                    ) : null}
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="black" />
                </TouchableOpacity>
            ) : null}
            <TouchableOpacity onPress={goToLots} className="flex flex-row items-center justify-between gap-2 p-4 bg-neutral-100 rounded-lg border border-neutral-400">
              <View className="flex flex-col justify-between">
                <MicroTitleText>My Lots</MicroTitleText>
                <BodyText>View your parking lots</BodyText>
              </View>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}