import React, { useCallback, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { AxiosError } from "axios";
import { Lot } from "../types";
import Button from "@/modules/ui/components/button";
import { useOwnedLots } from "../hooks/use-owned-lots";
import { BodyText } from "@/modules/ui/components/text/body";
import { useRouter } from "expo-router";
import { Screen } from "@/modules/ui/components/screen";

const RegisterLotCta = () => {
  const router = useRouter();

  const navigateToLotForm = () => {
    router.navigate("/account/lots/register");
  };

  return (
    <View className="pt-4">
      <Button label="Registrar Estacionamiento" onPress={navigateToLotForm} />
    </View>
  );
};

const Header = () => {
  return <RegisterLotCta />;
};

const LotItem = ({ lot }: { lot: Lot }) => {
  const router = useRouter();

  const onPress = () => {
    router.navigate(`/account/lots/${lot.id}/edit`);
  };

  return (
    <TouchableOpacity
      className="p-4 border-b border-neutral-300"
      onPress={onPress}
    >
      <Text className="text-lg font-semibold">{lot.name}</Text>
      {lot.address && <Text className="text-neutral-600">{lot.address}</Text>}
    </TouchableOpacity>
  );
};

const renderLotItem = ({ item }: { item: Lot }) => <LotItem lot={item} />;

const ownedLotsQueryParams = { withAvailability: true };

export const OwnedLotsScreen = () => {
  const [error, setError] = useState<AxiosError>();

  const onLotsRetrieved = useCallback(() => {
    setError(undefined);
  }, []);

  const { ownedLots, isLoading, refresh } = useOwnedLots({
    onSuccess: onLotsRetrieved,
    onError: setError,
    params: ownedLotsQueryParams,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-negative-800 text-center mb-4">
          Error buscando estacionamientos - {error.message}
        </Text>
        <Button label="Intentar de nuevo" onPress={refresh} />
      </View>
    );
  }

  return (
    <Screen
      list={true}
      data={ownedLots}
      renderItem={renderLotItem}
      keyExtractor={(item: Lot): string => String(item.id)}
      refreshing={isLoading}
      onRefresh={refresh}
      ListHeaderComponent={Header}
      ListEmptyComponent={() => (
        <View className="flex-1 justify-center items-center mt-8">
          <BodyText>No encontramos estacionamientos</BodyText>
        </View>
      )}
    />
  );
};
