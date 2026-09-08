import {
  JosefinSans_400Regular,
  JosefinSans_500Medium,
  JosefinSans_600SemiBold,
  JosefinSans_700Bold,
} from "@expo-google-fonts/josefin-sans";
import {
  Lora_400Regular,
  Lora_500Medium,
  Lora_700Bold,
} from "@expo-google-fonts/lora";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { Asset } from "expo-asset";
import "react-native-reanimated";
import { ToastMessage } from "../components/ui/ToastMessage";
import "../global.css";

import { TrackingProvider } from "../context/TrackingContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Lora_400Regular,
    Lora_500Medium,
    Lora_700Bold,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_600SemiBold,
    JosefinSans_700Bold,
  });

  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    async function loadAssets() {
      try {
        const images = [
          require("../assets/images/icon.png"),
          require("../assets/images/splash-icon.png"),
        ];
        
        const cacheImages = images.map(image => {
          if (typeof image === 'string') {
            return Image.prefetch(image);
          } else {
            return Asset.fromModule(image).downloadAsync();
          }
        });

        await Promise.all(cacheImages);
      } catch (e) {
        console.warn("Error preloading assets:", e);
      } finally {
        setAssetsLoaded(true);
      }
    }

    loadAssets();
  }, []);

  useEffect(() => {
    if ((loaded || error) && assetsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, assetsLoaded]);

  if ((!loaded && !error) || !assetsLoaded) {
    return null;
  }

  return (
    <TrackingProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <ToastMessage />
      <StatusBar style="auto" />
    </TrackingProvider>
  );
}
