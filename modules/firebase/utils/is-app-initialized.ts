import { getApps } from "@react-native-firebase/app";

export const isAppInitialized = () => {
  return getApps().length > 0;
};
