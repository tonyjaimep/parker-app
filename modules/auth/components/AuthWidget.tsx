import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useIsAuthenticated } from '../context/auth-context';


const AuthWidget = () => {
  const router = useRouter();
  const isLoggedIn = useIsAuthenticated();

  const handlePress = () => {
    if (!isLoggedIn) {
      router.push('/auth'); // Navigate to auth screen if not logged in
    }
    // If logged in, the ellipsis icon would likely open a menu or other actions
  };

  return (
    <TouchableOpacity
      className="flex-row items-center p-4 bg-neutral-100 rounded-full shadow gap-4"
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Ionicons name="person-outline" size={24} color="black" />
      {isLoggedIn && (
        <View className="ml-2">
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AuthWidget;
