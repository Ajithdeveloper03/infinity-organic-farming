import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  CheckCircle2,
  MapPin,
  Sprout,
  Droplets,
  Layers,
} from "lucide-react-native";
import { Button } from "../../components/ui/Button";

export default function FarmerMyFarmScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Background image overlay */}
      <ImageBackground
        source={require("../../assets/images/image4.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.12 }}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header */}
        <View className="px-5 py-4 bg-white/95 border-b border-gray-100 flex-row items-center justify-between shadow-sm backdrop-blur-md">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center border border-gray-200"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-lg font-gotham-bold">My Farm</Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Farm Image Hero Banner */}
          <View className="h-64 relative bg-gray-200">
            <ImageBackground
              source={require("../../assets/images/image2.jpg")}
              className="w-full h-full"
              resizeMode="cover"
            >
              <View className="absolute inset-0 bg-black/25" />
              {/* Overlay Badge */}
              <View className="absolute bottom-5 left-5 bg-green-700 px-4 py-2 rounded-full flex-row items-center shadow-lg border border-white/20">
                <CheckCircle2 size={16} color="#fff" className="mr-1.5" />
                <Text className="text-white font-gotham-bold text-xs uppercase tracking-wider">
                  Verified Farm
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View className="px-5 pt-6">
            <Text className="text-xl font-gotham-bold text-gray-900 mb-4">
              Registered Farm Details
            </Text>

            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
              {[
                { label: "Farm Name", value: "Kuppusamy Organic Estate", icon: Sprout },
                { label: "Village", value: "Annur / Somanur", icon: MapPin },
                { label: "District", value: "Coimbatore, Tamil Nadu", icon: MapPin },
                { label: "Primary Crop", value: "Vetiver (Chrysopogon zizanioides)", icon: Sprout },
                { label: "Soil Type", value: "Red Loamy Mineral Rich", icon: Layers },
                { label: "Irrigation", value: "Drip Irrigation & Rainwater", icon: Droplets },
                { label: "Total Area", value: "2.5 Acres", icon: Layers },
              ].map((row, idx) => (
                <View
                  key={idx}
                  className={`flex-row justify-between items-center py-3.5 ${
                    idx < 6 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <Text className="text-gray-700 font-brandon font-bold text-sm w-36">
                    {row.label}
                  </Text>
                  <Text className="text-gray-900 font-gotham-bold flex-1 text-right text-sm">
                    {row.value}
                  </Text>
                </View>
              ))}
            </View>

            <Button
              title="Request Land Re-survey"
              onPress={() => {}}
              className="bg-green-700 py-4 rounded-xl shadow-md w-full"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
