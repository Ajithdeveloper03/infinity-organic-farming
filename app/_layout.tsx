import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css"
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_800ExtraBold } from '@expo-google-fonts/poppins';
import { Lora_400Regular, Lora_500Medium, Lora_700Bold } from '@expo-google-fonts/lora';
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';
import { JosefinSans_400Regular, JosefinSans_500Medium, JosefinSans_600SemiBold, JosefinSans_700Bold } from '@expo-google-fonts/josefin-sans';
import { ToastMessage } from '../components/ui/ToastMessage';

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

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <ToastMessage />
      <StatusBar style="auto" />
    </>
  );
}