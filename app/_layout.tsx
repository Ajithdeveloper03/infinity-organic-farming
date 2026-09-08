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
import {
  ActivityIndicator,
  Animated,
  Image,
  Text,
  View,
} from "react-native";
import { Asset } from "expo-asset";
import "react-native-reanimated";
import { ToastMessage } from "../components/ui/ToastMessage";
import "../global.css";
import { TrackingProvider } from "../context/TrackingContext";

// Keep splash screen visible while loading resources
SplashScreen.preventAutoHideAsync().catch(() => {});

const REMOTE_ASSETS_TO_PREFETCH = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
];

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
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Subtle breathing pulse for app loading screen
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  useEffect(() => {
    async function loadAssets() {
      try {
        const localImages = [
          require("../assets/images/logo.png"),
          require("../assets/images/intro_bg.png"),
          require("../assets/images/icon.png"),
          require("../assets/images/splash-icon.png"),
          require("../assets/images/image1.jpg"),
          require("../assets/images/image2.jpg"),
          require("../assets/images/image3.jpg"),
          require("../assets/images/image4.jpg"),
          require("../assets/images/image5.jpg"),
          require("../assets/images/image6.jpg"),
          require("../assets/images/image7.jpg"),
          require("../assets/images/image8.jpg"),
        ];

        // Preload local assets
        const localPromises = localImages.map((img) =>
          Asset.fromModule(img).downloadAsync().catch(() => null)
        );

        // Preload remote assets in parallel
        const remotePromises = REMOTE_ASSETS_TO_PREFETCH.map((url) =>
          Image.prefetch(url).catch(() => null)
        );

        await Promise.all([...localPromises, ...remotePromises]);
      } catch (e) {
        console.warn("Asset preloading notice:", e);
      } finally {
        setAssetsLoaded(true);
      }
    }

    loadAssets();
  }, []);

  useEffect(() => {
    if ((loaded || error) && assetsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, error, assetsLoaded]);

  // Branded App Starting Loading Screen
  if ((!loaded && !error) || !assetsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#061c14",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 24,
        }}
      >
        <StatusBar style="light" />
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 55,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#10b981",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.35,
              shadowRadius: 20,
              elevation: 10,
              padding: 10,
              marginBottom: 20,
            }}
          >
            <Image
              source={require("../assets/images/logo.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <Text
          style={{
            color: "#ffffff",
            fontSize: 20,
            fontWeight: "700",
            letterSpacing: 2.5,
            marginBottom: 6,
            textAlign: "center",
          }}
        >
          INFINITY ORGANICS
        </Text>
        <Text
          style={{
            color: "#34d399",
            fontSize: 12,
            fontWeight: "600",
            letterSpacing: 1.5,
            marginBottom: 28,
            textTransform: "uppercase",
          }}
        >
          Eco Agronomy Platform
        </Text>

        <ActivityIndicator size="small" color="#10b981" />
      </View>
    );
  }

  return (
    <TrackingProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <ToastMessage />
      <StatusBar style="auto" />
    </TrackingProvider>
  );
}
