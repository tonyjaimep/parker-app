import React, { useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { Lot } from "../types";
import Button from "@/modules/ui/components/button";
import { useOwnedLots } from "../hooks/use-owned-lots";
import { AxiosResponse } from "axios";

const RegisterLotCta = () => {
  return (
    <View>
      <Button label="Add Lot" onPress={() => {}} />
    </View>
  );
};

const Header = () => {
  return <RegisterLotCta />;
};

const renderLotItem = ({ item }: { item: Lot }) => (
  <View className="p-4 border-b border-neutral-300">
    <Text className="text-lg font-semibold">{item.name}</Text>
    {item.address && <Text className="text-neutral-600">{item.address}</Text>}
  </View>
);

const OwnedLotsScreen = () => {
  const [error, setError] = useState<AxiosResponse>();

  const { ownedLots, isLoading, refresh } = useOwnedLots({ onError: setError });

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
        <Text className="text-red-500 text-center mb-4">
          Error fetching lots: {error.data}
        </Text>
        <Button label="Try Again" onPress={refresh} />
      </View>
    );
  }

  if (!ownedLots || ownedLots.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-neutral-500 text-center">
          You do not own any lots.
        </Text>
        <RegisterLotCta />
      </View>
    );
  }

  return (
    <FlatList
      data={ownedLots}
      renderItem={renderLotItem}
      keyExtractor={(item: Lot): string => String(item.id)}
      ListHeaderComponent={Header}
      ListEmptyComponent={() => (
        <View className="flex-1 justify-center items-center">
          <Text>No lots found.</Text>
        </View>
      )}
    />
  );
};

export default OwnedLotsScreen;
