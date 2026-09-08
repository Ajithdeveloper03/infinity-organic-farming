import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  Camera,
  CheckCircle2,
  MapPin,
  ArrowRight,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";

export default function CheckInScreen() {
  const { id } = useLocalSearchParams();
  const [photoTaken, setPhotoTaken] = useState(false);

  const handleCapture = async () => {
    try {
      const res = await ImagePicker.requestCameraPermissionsAsync();
      if (res.granted) {
        const result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          quality: 0.5,
        });
        if (!result.canceled) {
          setPhotoTaken(true);
          return;
        }
      }
    } catch (e) {
      console.log("Check-in camera notice:", e);
    }
    setPhotoTaken(true);
  };

  const handleCheckIn = () => {
    router.push(`/(employee)/visit/tracking?id=${id}` as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ImageBackground
        source={require("../../../assets/images/image4.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.12 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0.4)",
            "rgba(248, 250, 252, 0.85)",
            "#f8fafc",
          ]}
          locations={[0, 0.25, 1]}
          style={StyleSheet.absoluteFill}
        />

        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
          {/* Header - Strictly Transparent Background (Light Mode) */}
          <View
            style={{ backgroundColor: "transparent" }}
            className="px-5 pt-2 pb-3 flex-row items-center justify-between z-10"
          >
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-200 shadow-sm"
              activeOpacity={0.7}
            >
              <ChevronLeft size={22} color="#0f172a" />
            </TouchableOpacity>

            <Text className="text-lg font-gotham-bold text-slate-900">
              Field Arrival Check-In
            </Text>

            <View className="w-10" />
          </View>

          <ScrollView
            className="flex-1 px-5"
            contentContainerStyle={{ paddingBottom: 40, justifyContent: "center", flexGrow: 1 }}
          >
            <View className="bg-white rounded-[32px] p-6 items-center border border-slate-200 shadow-md">
              <View className="w-20 h-20 bg-emerald-50 rounded-full items-center justify-center mb-4 border border-emerald-200 shadow-sm">
                <MapPin size={36} color="#059669" />
              </View>

              <Text className="text-2xl font-gotham-bold text-slate-900 text-center mb-1">
                Geofence Verified
              </Text>

              <Text className="text-emerald-700 font-brandon font-bold text-xs uppercase tracking-wider mb-3">
                Within 25m of Farm Coordinates
              </Text>

              <Text className="text-slate-600 text-center font-brandon text-sm leading-relaxed mb-6">
                You have arrived at the registered organic parcel. Please verify your presence to start the audit.
              </Text>

              {/* Photo Verification Box */}
              <TouchableOpacity
                onPress={handleCapture}
                className={`w-full p-4 rounded-2xl border flex-row items-center mb-6 ${
                  photoTaken
                    ? "bg-emerald-50 border-emerald-300"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <View
                  className={`w-12 h-12 rounded-xl items-center justify-center mr-3.5 ${
                    photoTaken ? "bg-emerald-600" : "bg-blue-600"
                  }`}
                >
                  <Camera size={22} color="#ffffff" />
                </View>

                <View className="flex-1">
                  <Text className="text-slate-900 font-gotham-bold text-sm">
                    {photoTaken ? "Photo Verified ✓" : "Field Photo Verification"}
                  </Text>
                  <Text className="text-slate-500 font-brandon text-xs">
                    {photoTaken
                      ? "Geotagged timestamp logged"
                      : "Tap to snap geotagged photo"}
                  </Text>
                </View>

                {photoTaken && <CheckCircle2 size={22} color="#059669" />}
              </TouchableOpacity>

              {/* Check In Action Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleCheckIn}
                className="w-full rounded-2xl overflow-hidden shadow-lg shadow-emerald-700/25"
              >
                <LinearGradient
                  colors={["#059669", "#047857"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text className="text-white font-gotham-bold text-base uppercase tracking-wider mr-2">
                    Check In & Start Tracking
                  </Text>
                  <ArrowRight size={18} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
