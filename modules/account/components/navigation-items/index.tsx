import colors from "tailwindcss/colors";
import { TouchableOpacity, View } from "react-native";
import { BodyText } from "@/modules/ui/components/text/body";
import { useCurrentReservation } from "@/modules/reservations/context";
import { MicroTitleText } from "@/modules/ui/components/text/micro-title";
import { CurrentReservationExpiration } from "@/modules/reservations/components/reservation-expiration";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useOwnedLots } from "@/modules/lots/hooks/use-owned-lots";
import { useUserReservations } from "@/modules/reservations/hooks/use-user-reservations";

export const AccountNavigationItems = () => {
  const router = useRouter();
  const currentReservation = useCurrentReservation();
  const { ownedLots } = useOwnedLots();
  const { userReservations } = useUserReservations();

  const goToCurrentReservation = () => {
    if (currentReservation) {
      router.navigate(`/reservations/current`);
    }
  };

  const goToLots = () => {
    router.navigate(`/account/lots`);
  };

  const goToReservationsOnOwnedLots = () => {
    router.navigate(`/account/lots/reservations`);
  };

  const goToUserReservations = () => {
    router.navigate(`/account/reservations`);
  };

  return (
    <View className="flex flex-col gap-2">
      {currentReservation ? (
        <TouchableOpacity
          onPress={goToCurrentReservation}
          className="flex flex-row items-center justify-between gap-2 p-4 bg-neutral-100 rounded-lg border border-neutral-400"
        >
          <View className="flex flex-col justify-between">
            <MicroTitleText>Current Reservation</MicroTitleText>
            <BodyText>{currentReservation.lot.name}</BodyText>
            <BodyText>{currentReservation.lot.address}</BodyText>
            {currentReservation.expiresAt ? (
              <CurrentReservationExpiration
                expiresAt={currentReservation.expiresAt}
              />
            ) : null}
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral["600"]}
          />
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        onPress={goToLots}
        className="flex flex-row items-center justify-between gap-2 p-4 bg-neutral-100 rounded-lg border border-neutral-400"
      >
        <Ionicons
          name="location-outline"
          size={24}
          color={colors.neutral["600"]}
        />
        <View className="flex flex-col justify-between flex-1">
          <MicroTitleText>Mis estacionamientos</MicroTitleText>
          <BodyText>Ver tus estacionamientos</BodyText>
        </View>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={colors.neutral["600"]}
        />
      </TouchableOpacity>
      {ownedLots && ownedLots.length > 0 ? (
        <TouchableOpacity
          onPress={goToReservationsOnOwnedLots}
          className="flex flex-row items-center justify-between gap-3 p-4 bg-neutral-100 rounded-lg border border-neutral-400"
        >
          <Ionicons
            name="file-tray-full"
            size={24}
            color={colors.neutral["600"]}
          />
          <View className="flex flex-col justify-between shrink">
            <MicroTitleText>
              Reservaciones en mis estacionamientos
            </MicroTitleText>
            <BodyText>
              Ver reservaciones que se han hecho en tus estacionamientos
            </BodyText>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral["600"]}
          />
        </TouchableOpacity>
      ) : null}
      {userReservations && userReservations.length > 0 ? (
        <TouchableOpacity
          onPress={goToUserReservations}
          className="flex flex-row items-center justify-between gap-2 p-4 bg-neutral-100 rounded-lg border border-neutral-400"
        >
          <Ionicons
            name="ticket-outline"
            size={24}
            color={colors.neutral["600"]}
          />
          <View className="flex flex-col justify-between flex-1">
            <MicroTitleText>Mis reservaciones</MicroTitleText>
            <BodyText>Ver reservaciones que has hecho</BodyText>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.neutral["600"]}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
