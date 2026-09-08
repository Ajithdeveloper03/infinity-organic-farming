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
  Sparkles,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function FarmerMyFarmScreen() {
  const farmDetails = [
    { label: "Farm Name", value: "Kuppusamy Organic Estate", icon: Sprout, iconColor: "#15803d", iconBg: "bg-emerald-50" },
    { label: "Village", value: "Annur / Somanur", icon: MapPin, iconColor: "#0284c7", iconBg: "bg-sky-50" },
    { label: "District", value: "Coimbatore, Tamil Nadu", icon: MapPin, iconColor: "#0284c7", iconBg: "bg-sky-50" },
    { label: "Primary Crop", value: "Vetiver (Chrysopogon zizanioides)", icon: Sprout, iconColor: "#15803d", iconBg: "bg-emerald-50" },
    { label: "Soil Type", value: "Red Loamy Mineral Rich", icon: Layers, iconColor: "#b45309", iconBg: "bg-amber-50" },
    { label: "Irrigation", value: "Drip Irrigation & Rainwater", icon: Droplets, iconColor: "#0284c7", iconBg: "bg-sky-50" },
    { label: "Total Area", value: "2.5 Acres Registered", icon: Layers, iconColor: "#7e22ce", iconBg: "bg-purple-50" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Background image subtle overlay */}
      <ImageBackground
        source={require("../../assets/images/image4.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.12 }}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header - Transparent */}
        <View style={{ backgroundColor: "transparent" }} className="px-5 pt-2 pb-3 flex-row items-center justify-between z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/95 items-center justify-center border border-slate-200 shadow-sm"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-slate-900 text-lg font-gotham-bold">My Farm</Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 6 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Farm Image Hero Banner */}
          <View className="px-5 mb-5">
            <View className="h-60 rounded-3xl overflow-hidden shadow-sm border border-emerald-800/20 relative">
              <ImageBackground
                source={require("../../assets/images/image2.jpg")}
                className="w-full h-full"
                resizeMode="cover"
              >
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  style={StyleSheet.absoluteFill}
                />
                {/* Overlay Badge */}
                <View className="absolute bottom-4 left-4 bg-emerald-700/90 px-3.5 py-1.5 rounded-full flex-row items-center shadow-md border border-emerald-400/40">
                  <CheckCircle2 size={15} color="#fff" className="mr-1.5" />
                  <Text className="text-white font-gotham-bold text-xs uppercase tracking-wider">
                    Verified Organic Land
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>

          <View className="px-5">
            <Text className="text-xl font-gotham-bold text-slate-900 mb-3.5">
              Registered Farm Details
            </Text>

            <View className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-6">
              {farmDetails.map((row, idx) => {
                const Icon = row.icon;
                return (
                  <View
                    key={idx}
                    className={`flex-row items-center justify-between py-3.5 ${
                      idx < farmDetails.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                  >
                    <View className="flex-row items-center flex-1 mr-2">
                      <View className={`w-8 h-8 rounded-lg items-center justify-center mr-2.5 ${row.iconBg}`}>
                        <Icon size={16} color={row.iconColor} />
                      </View>
                      <Text className="text-slate-600 font-gotham-medium text-xs">
                        {row.label}
                      </Text>
                    </View>
                    <Text className="text-slate-900 font-gotham-bold text-xs text-right flex-1">
                      {row.value}
                    </Text>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              className="rounded-2xl overflow-hidden shadow-sm"
            >
              <LinearGradient
                colors={["#15803d", "#047857"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingVertical: 16, alignItems: "center", justifyContent: "center" }}
              >
                <Text className="text-white font-gotham-bold text-sm tracking-wide">
                  Request Land Re-survey
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

