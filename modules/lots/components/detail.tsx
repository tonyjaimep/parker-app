import Button from "@/modules/ui/components/button";
import { Text, View } from "react-native";
import { LotWithAvailability } from "../types";
import { useCallback } from "react";
import { useCreateReservation } from "@/modules/reservations/hooks/use-create-reservation";

type LotDetailProps = {
  lot: LotWithAvailability;
};

export const LotDetail = ({ lot }: LotDetailProps) => {
  const { createReservation } = useCreateReservation();

  const onReservationPressed = useCallback(() => {
    createReservation(lot.id);
  }, [lot]);

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
        <Button label="Reservar" onPress={createReservation} />
      ) : null}
    </View>
  );
};
