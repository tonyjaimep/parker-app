import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  jsEngine: "hermes",
  name: "Parker",
  slug: "parker-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "parker",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.anonymous.parker-app",
    googleServicesFile: "./assets/firebase/GoogleService-Info.plist",
    config: {
      usesNonExemptEncryption: false,
    },
    newArchEnabled: true,
  },
  android: {
    edgeToEdgeEnabled: true,
    newArchEnabled: true,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.anonymous.parkerapp",
    googleServicesFile: "./assets/firebase/google-services.json",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "@react-native-firebase/app",
    "@react-native-firebase/auth",
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
    [
      "react-native-maps",
      {
        iosGoogleMapsApiKey: process.env.GOOGLE_MAPS_IOS_API_KEY,
        androidGoogleMapsApiKey: process.env.GOOGLE_MAPS_ANDROID_API_KEY,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
