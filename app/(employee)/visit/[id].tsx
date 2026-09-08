import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Leaf,
  History,
  CheckCircle2,
  Phone,
  ArrowRight,
} from "lucide-react-native";
import { getVisitWithFarmer } from "../../../data/mockData";

export default function VisitDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const visit = id ? getVisitWithFarmer(id) : null;

  if (!visit || !visit.farmer) {
    return (
      <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        <SafeAreaView style={{ flex: 1 }} className="items-center justify-center px-5">
          <Text className="text-slate-900 font-gotham-bold text-lg mb-2">
            Visit Details Not Found
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 bg-emerald-600 px-6 py-3 rounded-full"
          >
            <Text className="text-white font-gotham-bold">Go Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }

  const InfoRow = ({ icon: Icon, label, value, color }: any) => (
    <View className="flex-row items-center py-3.5 border-b border-slate-100">
      <View
        className="w-10 h-10 rounded-2xl items-center justify-center mr-3.5"
        style={{
          backgroundColor: `${color}15`,
          borderColor: `${color}30`,
          borderWidth: 1,
        }}
      >
        <Icon size={18} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-slate-500 font-gotham-bold text-[10px] uppercase tracking-wider">
          {label}
        </Text>
        <Text className="text-slate-900 font-gotham-bold text-sm mt-0.5">
          {value}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ImageBackground
        source={require("../../../assets/images/image3.jpg")}
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
              Inspection Dossier
            </Text>

            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${visit.farmer?.phone || "9411111111"}`)}
              className="w-10 h-10 rounded-full bg-emerald-50 items-center justify-center border border-emerald-200"
            >
              <Phone size={18} color="#059669" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1 px-5 pt-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {/* Farmer Summary Header Card (Light Mode) */}
            <View className="bg-white rounded-[26px] p-4 mb-4 border border-slate-200 shadow-sm flex-row items-center">
              <View className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-600 bg-emerald-50 mr-3.5 shadow-sm">
                <Image
                  source={{
                    uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      visit.farmer.name
                    )}&background=059669&color=fff&size=200`,
                  }}
                  className="w-full h-full"
                />
              </View>
              <View className="flex-1">
                <Text className="text-slate-900 font-gotham-bold text-xl leading-tight">
                  {visit.farmer.name}
                </Text>
                <View className="flex-row items-center mt-1">
                  <MapPin size={12} color="#059669" />
                  <Text className="text-slate-600 font-brandon text-xs ml-1" numberOfLines={1}>
                    {visit.farmer.address || "Thanjavur Ag-Corridor"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Detailed Parameters List (White Card, High Contrast) */}
            <View className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-200 mb-6">
              <InfoRow
                icon={Calendar}
                label="Scheduled Date"
                value={visit.date}
                color="#059669"
              />
              <InfoRow
                icon={Clock}
                label="Target Time Window"
                value={visit.time}
                color="#2563eb"
              />
              <InfoRow
                icon={MapPin}
                label="Farm Registered Area"
                value={visit.farmer.farmArea || "5.0 Acres"}
                color="#ea580c"
              />
              <InfoRow
                icon={Leaf}
                label="Cultivated Crops"
                value={visit.farmer.cropType || "Organic Vetiver & Turmeric"}
                color="#7c3aed"
              />
              <InfoRow
                icon={History}
                label="Last Audit Timestamp"
                value={visit.previousVisitDate || "Initial Onboarding Audit"}
                color="#db2777"
              />

              <View className="pt-4">
                <Text className="text-slate-500 font-gotham-bold text-[10px] uppercase tracking-wider mb-1">
                  Agronomist Instructions
                </Text>
                <Text className="text-slate-700 text-xs leading-relaxed font-brandon">
                  {visit.remarks ||
                    "Conduct root depth inspection, test soil moisture levels, and advise organic fertilizer schedule."}
                </Text>
              </View>
            </View>

            {/* Action Trigger */}
            {visit.status !== "completed" ? (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                  router.push({
                    pathname: "/(employee)/visit/check-in",
                    params: { id: visit.id },
                  } as any)
                }
                className="rounded-2xl overflow-hidden shadow-lg shadow-emerald-700/25"
              >
                <LinearGradient
                  colors={["#059669", "#047857"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 18,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text className="text-white font-gotham-bold text-base uppercase tracking-wider mr-2">
                    Start Visit Workflow
                  </Text>
                  <ArrowRight size={20} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <View className="bg-emerald-50 border border-emerald-200 py-4 rounded-2xl flex-row items-center justify-center">
                <CheckCircle2 size={20} color="#059669" className="mr-2" />
                <Text className="text-emerald-800 font-gotham-bold text-sm uppercase tracking-wider">
                  Audit Completed & Submitted
                </Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
