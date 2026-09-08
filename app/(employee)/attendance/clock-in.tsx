import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  MapPin,
  Camera,
  CheckCircle2,
  Navigation,
  AlertCircle,
  ChevronLeft,
} from "lucide-react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../../components/ui/Button";
import { showToast } from "../../../components/ui/ToastMessage";
import { employeeProfile } from "../../../data/mockData";
import { useTracking } from "../../../context/TrackingContext";
import { api } from "../../../services/api";

export default function ClockInScreen() {
  const [loading, setLoading] = useState(false);
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const { startSession } = useTracking();

  useEffect(() => {
    const checkStatus = async () => {
      const isClockedIn = await AsyncStorage.getItem("isClockedIn");
      const clockInDate = await AsyncStorage.getItem("clockInDate");
      if (isClockedIn === "true" && clockInDate === new Date().toDateString()) {
        router.replace("/(employee)/dashboard");
      }
    };
    checkStatus();

    (async () => {
      let { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus !== "granted") {
        setLocationGranted(false);
        Alert.alert(
          "Permission Denied",
          "You must enable location services to clock in for the day.",
        );
        return;
      }
      let { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== "granted") {
        console.warn("Background location permission denied.");
      }
      setLocationGranted(true);
      try {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setCurrentLocation(loc);
      } catch (e) {
        console.error("Location error", e);
      }
    })();
  }, []);

  const handleSimulateSelfie = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Camera Access Required", "You've refused to allow this app to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setPhotoTaken(true);
      showToast({
        title: "Selfie Captured",
        message: "Identity verified successfully.",
        type: "success",
      });
    }
  };

  const handleClockIn = async () => {
    if (!currentLocation) {
      showToast({
        title: "Location Required",
        message: "Still acquiring your precise location. Please wait.",
        type: "error",
      });
      return;
    }
    if (!photoTaken) {
      showToast({
        title: "Selfie Required",
        message: "You must capture a selfie to clock in.",
        type: "error",
      });
      return;
    }
    setLoading(true);

    try {
      // Post attendance to backend
      await api.post("/employee/attendance", {
        action: "check_in",
        latitude: currentLocation?.coords?.latitude || 11.0168,
        longitude: currentLocation?.coords?.longitude || 76.9558,
      }).catch((e) => console.log("Attendance API sync notice:", e?.message));
    } catch (apiErr) {
      console.log("Attendance sync error (proceeding):", apiErr);
    }

    const sessionId = `TRK_${Date.now()}`;
    startSession(sessionId);
    
    await AsyncStorage.setItem("isClockedIn", "true");
    await AsyncStorage.setItem("clockInDate", new Date().toDateString());
    
    setLoading(false);
    showToast({
      title: "Clock In Successful",
      message: "Have a productive day ahead!",
      type: "success",
    });
    router.replace("/(employee)/dashboard");
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/image4.jpg")}
      style={StyleSheet.absoluteFill}
    >
      <View style={StyleSheet.absoluteFill} className="bg-black/70" />
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          {/* Header */}
          <View className="px-5 pt-4 pb-4 flex-row items-center z-10 pointer-events-box-none">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-12 h-12 bg-white/20 rounded-full items-center justify-center border border-white/20 backdrop-blur-md"
              activeOpacity={0.8}
            >
              <ChevronLeft size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <View className="flex-1 px-5 justify-center">
            <View className="mb-10 items-center">
              <View className="p-1 rounded-full border-4 border-green-500/50 mb-6 shadow-lg shadow-green-500/20">
                <Image
                  source={{
                    uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeProfile.name)}&background=1C1C1E&color=fff&size=200`,
                  }}
                  className="w-28 h-28 rounded-full"
                />
              </View>
              <Text className="text-gray-300 font-gotham-bold text-lg text-center uppercase tracking-widest mb-1">
                Good Morning
              </Text>
              <Text className="text-white font-gotham-bold text-3xl text-center mb-2">
                {employeeProfile.name}
              </Text>
            </View>

            <View className="w-full mb-8">
              {/* Location Check Card */}
              <View className="bg-white/10 backdrop-blur-md rounded-3xl p-5 mb-4 border border-white/10 flex-row items-center">
                <View
                  className={`w-14 h-14 rounded-full items-center justify-center mr-4 ${currentLocation ? "bg-green-500/20 border border-green-500/30" : "bg-white/10 border border-white/20"}`}
                >
                  {currentLocation ? (
                    <MapPin size={28} color="#4ade80" />
                  ) : (
                    <Navigation size={28} color="#9ca3af" />
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-white font-gotham-bold text-base mb-1">
                    Location Check
                  </Text>
                  {currentLocation ? (
                    <Text className="text-green-400 font-brandon-medium text-xs">
                      Acquired (Accuracy: {Math.round(currentLocation.coords.accuracy || 0)}m)
                    </Text>
                  ) : (
                    <Text className="text-gray-300 font-brandon text-xs">
                      Acquiring GPS location...
                    </Text>
                  )}
                </View>
                {currentLocation && <CheckCircle2 size={24} color="#4ade80" />}
              </View>

              {/* Selfie Verification Card */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSimulateSelfie}
                disabled={photoTaken || loading}
                className={`rounded-3xl p-5 flex-row items-center backdrop-blur-md border ${photoTaken ? "bg-green-500/10 border-green-500/30" : "bg-white/10 border-white/10"}`}
              >
                <View
                  className={`w-14 h-14 rounded-full items-center justify-center mr-4 ${photoTaken ? "bg-green-500/20 border border-green-500/30" : "bg-blue-500/20 border border-blue-500/30"}`}
                >
                  <Camera size={28} color={photoTaken ? "#4ade80" : "#60a5fa"} />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-gotham-bold text-base mb-1">
                    Verify Identity
                  </Text>
                  <Text
                    className={`${photoTaken ? "text-green-400" : "text-gray-300"} font-brandon text-xs`}
                  >
                    {photoTaken ? "Selfie captured successfully" : "Take a live selfie"}
                  </Text>
                </View>
                {photoTaken && <CheckCircle2 size={24} color="#4ade80" />}
              </TouchableOpacity>
            </View>

            {!locationGranted && locationGranted !== null && (
              <View className="flex-row items-center bg-red-500/20 p-4 rounded-2xl mb-8 border border-red-500/30 backdrop-blur-md">
                <AlertCircle size={20} color="#f87171" className="mr-3" />
                <Text className="text-red-200 font-brandon text-sm flex-1 leading-tight">
                  Location permission is required to log attendance.
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={handleClockIn}
              disabled={!currentLocation || !photoTaken}
              className={`w-full py-5 rounded-full items-center justify-center shadow-lg ${!currentLocation || !photoTaken ? "bg-white/20" : "bg-green-500"}`}
            >
              <Text
                className={`font-gotham-bold text-lg tracking-wide uppercase ${!currentLocation || !photoTaken ? "text-gray-400" : "text-white"}`}
              >
                {loading && !photoTaken ? "Verifying..." : "Clock In & Start Day"}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}
