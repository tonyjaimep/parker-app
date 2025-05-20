import Button from "@/modules/ui/components/button";
import { Text, View } from "react-native";
import { LotWithAvailability } from "../types";
import { useCallback } from "react";
import { useCreateReservation } from "@/modules/reservations/hooks/use-create-reservation";
import { useIsAuthenticated } from "@/modules/auth/context/auth-context";
import { useRouter } from "expo-router";
import { useCheckForReservation } from "@/modules/reservations/context";

type LotDetailProps = {
  lot: LotWithAvailability;
  onDismiss: () => void;
};

export const LotDetail = ({ lot, onDismiss }: LotDetailProps) => {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const checkForReservation = useCheckForReservation();
  const { createReservation } = useCreateReservation(
    { lotId: lot.id },
    { onSuccess: onDismiss },
  );

  const onCreateReservationPressed = useCallback(async () => {
    if (!isAuthenticated) {
      onDismiss();
      router.navigate("/auth");
    } else {
      await createReservation();
      checkForReservation();
      onDismiss();
    }
  }, []);

  return (
    <View>
      <Text className="text-4xl font-bold">{lot.name}</Text>
      <Text className="text-lg">{lot.address}</Text>
      <Text className="text-neutral-700 mb-4">
        {lot.availability} lugar
        {lot.availability === 1 ? "" : "es"} disponibl
        {lot.availability === 1 ? "e" : "es"}
      </Text>
      {lot.availability >= 1 ? (
        <Button label="Reservar" onPress={onCreateReservationPressed} />
      ) : null}
    </View>
  );
};
