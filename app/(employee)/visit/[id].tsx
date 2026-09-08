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
  ShieldCheck,
  FileSpreadsheet,
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
            Visit Dossier Not Found
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 bg-emerald-600 px-6 py-3 rounded-full shadow-sm"
          >
            <Text className="text-white font-gotham-bold">Go Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }

  const InfoRow = ({ icon: Icon, label, value, color }: any) => (
    <View className="flex-row items-center py-3.5 border-b border-white/10">
      <View
        className="w-10 h-10 rounded-2xl items-center justify-center mr-3.5 shadow-sm"
        style={{
          backgroundColor: `${color}25`,
          borderColor: `${color}50`,
          borderWidth: 1,
        }}
      >
        <Icon size={18} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-slate-400 font-gotham-semibold text-[10px] uppercase tracking-wider">
          {label}
        </Text>
        <Text className="text-white font-gotham-bold text-sm mt-0.5">
          {value}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header - Strictly Transparent Background */}
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
            onPress={() =>
              Linking.openURL(`tel:${visit.farmer?.phone || "9411111111"}`)
            }
            className="w-10 h-10 rounded-full bg-emerald-50 items-center justify-center border border-emerald-200"
          >
            <Phone size={18} color="#059669" />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 px-5 pt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
        >
          {/* Detailed Hero Image Card with DARK Overlay & Enhanced Bright White Text */}
          <View className="rounded-[28px] overflow-hidden shadow-md bg-slate-900 mb-4">
            <ImageBackground
              source={require("../../../assets/images/image3.jpg")}
              className="w-full h-48"
              resizeMode="cover"
            >
              {/* Dark Bottom-to-Top Overlay */}
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(0, 0, 0, 0.45)",
                  "rgba(10, 15, 25, 0.94)",
                ]}
                locations={[0, 0.3, 1]}
                style={StyleSheet.absoluteFill}
              />

              <View className="flex-1 p-5 justify-between">
                <View className="flex-row items-center justify-between">
                  <View className="bg-emerald-500 px-3 py-1 rounded-full">
                    <Text className="text-white font-gotham-bold text-[11px] uppercase tracking-wider">
                      {visit.time || "10:30 AM"} Slot
                    </Text>
                  </View>

                  <View className="bg-black/60 px-3 py-1 rounded-full border border-white/20">
                    <Text className="text-white font-gotham-bold text-xs">
                      {visit.status === "completed" ? "Completed" : "Action Needed"}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text className="text-white font-gotham-bold text-2xl leading-tight">
                    {visit.farmer.name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <MapPin size={13} color="#34d399" />
                    <Text
                      className="text-emerald-300 font-brandon text-xs ml-1"
                      numberOfLines={1}
                    >
                      {visit.farmer.address || "Thanjavur Ag-Corridor"}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          {/* Full Audit Detailed Parameters (Darkish Rich Card) */}
          <View className="bg-slate-900 rounded-[28px] p-5 shadow-md border border-slate-700/60 mb-6">
            <Text className="text-white font-gotham-bold text-base mb-2">
              Agronomic Parameters
            </Text>

            <InfoRow
              icon={Calendar}
              label="Audit Scheduled Date"
              value={visit.date}
              color="#34d399"
            />
            <InfoRow
              icon={Clock}
              label="Target Time Window"
              value={visit.time}
              color="#38bdf8"
            />
            <InfoRow
              icon={MapPin}
              label="Registered Parcel Size"
              value={visit.farmer.farmArea || "5.0 Acres"}
              color="#fbbf24"
            />
            <InfoRow
              icon={Leaf}
              label="Cultivated Crops"
              value={visit.farmer.cropType || "Organic Vetiver & Turmeric"}
              color="#c084fc"
            />
            <InfoRow
              icon={History}
              label="Previous Field Log"
              value={visit.previousVisitDate || "Initial Onboarding Audit"}
              color="#f472b6"
            />

            <View className="pt-4">
              <Text className="text-slate-400 font-gotham-bold text-[10px] uppercase tracking-wider mb-1">
                Field Instructions & Notes
              </Text>
              <Text className="text-slate-200 text-xs leading-relaxed font-gotham-medium">
                {visit.remarks ||
                  "Conduct root depth inspection, test soil moisture levels, inspect bio-tonic spray efficacy, and record geo-coordinates."}
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
              className="w-full bg-emerald-600 py-4 rounded-2xl items-center justify-center shadow-md shadow-emerald-700/25 flex-row"
            >
              <Text className="text-white font-gotham-bold text-base uppercase tracking-wider mr-2">
                Start Field Check-In Workflow
              </Text>
              <ArrowRight size={18} color="#ffffff" />
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
    </View>
  );
}
