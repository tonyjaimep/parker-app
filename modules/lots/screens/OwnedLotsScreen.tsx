import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useGetOwnedLots } from '../hooks/useGetOwnedLots';
import { Lot } from '../types';
import { Stack } from 'expo-router';

const OwnedLotsScreen = () => {
  const { lots, isLoading, error, refetch } = useGetOwnedLots();

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
        <Text className="text-red-500 text-center mb-4">Error fetching lots: {error.message}</Text>
        <TouchableOpacity onPress={refetch} className="bg-blue-500 p-3 rounded">
          <Text className="text-white">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!lots || lots.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-neutral-500 text-center">You do not own any lots.</Text>
      </View>
    );
  }

  const renderLotItem = ({ item }: { item: Lot }) => (
    <View className="p-4 border-b border-neutral-200">
      <Text className="text-lg font-semibold">{item.name}</Text>
      {item.address && <Text className="text-neutral-600">{item.address}</Text>}
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ title: 'My Lots' }} />
      <FlatList
        data={lots}
        renderItem={renderLotItem}
        keyExtractor={(item: Lot): string => String(item.id)}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <Text>No lots found.</Text>
          </View>
        )}
      />
    </View>
  );
};

export default OwnedLotsScreen;
