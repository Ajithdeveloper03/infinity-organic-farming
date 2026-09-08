import React, { useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  MapPin,
  FileCheck2,
  ChevronRight,
  Droplets,
  Calendar,
  Sparkles,
  Sprout,
} from "lucide-react-native";

export const mockReports = [
  {
    id: "1",
    name: "Kuppusamy Farm",
    date: "Sep 08, 2026",
    location: "Annur, Block A",
    status: "Completed",
    crop: "Vetiver (Organic)",
    acres: "4.5 Acres",
    moisture: "68%",
    nitrogen: "Optimal",
    ph: "6.8",
    rootDepth: "42 cm",
    recommendation: "Apply organic bio-tonic spray every 14 days. Moisture retention is excellent.",
    image: require("../../assets/images/image1.jpg"),
    tagBg: "#ecfdf5",
    tagText: "#059669",
    tagBorder: "#a7f3d0",
  },
  {
    id: "2",
    name: "Subramani Estate",
    date: "Sep 06, 2026",
    location: "Pollachi, Block D",
    status: "Completed",
    crop: "Turmeric & Vetiver",
    acres: "2.0 Acres",
    moisture: "72%",
    nitrogen: "High",
    ph: "7.1",
    rootDepth: "38 cm",
    recommendation: "Soil moisture retention test optimal. Maintain current irrigation cycle.",
    image: require("../../assets/images/image2.jpg"),
    tagBg: "#eff6ff",
    tagText: "#2563eb",
    tagBorder: "#bfdbfe",
  },
  {
    id: "3",
    name: "Muthuvel Agro",
    date: "Sep 04, 2026",
    location: "Udumalpet, Block C",
    status: "Completed",
    crop: "Vetiver Saplings",
    acres: "3.5 Acres",
    moisture: "65%",
    nitrogen: "Optimal",
    ph: "6.9",
    rootDepth: "35 cm",
    recommendation: "Sapling health optimal. Fertilizer distribution logged and signed by farmer.",
    image: require("../../assets/images/image3.jpg"),
    tagBg: "#f5f3ff",
    tagText: "#7c3aed",
    tagBorder: "#ddd6fe",
  },
  {
    id: "4",
    name: "Perumal Lands",
    date: "Sep 01, 2026",
    location: "Sulur, Block B",
    status: "Pending Action",
    crop: "Pepper & Vetiver",
    acres: "5.0 Acres",
    moisture: "58%",
    nitrogen: "Needs Boost",
    ph: "6.5",
    rootDepth: "28 cm",
    recommendation: "Field audit awaiting farmer confirmation for second organic fertilization cycle.",
    image: require("../../assets/images/image4.jpg"),
    tagBg: "#fff7ed",
    tagText: "#ea580c",
    tagBorder: "#fed7aa",
  },
];

export default function ReportsScreen() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredReports = mockReports.filter((report) => {
    if (activeTab === "All") return true;
    if (activeTab === "Pending") return report.status.includes("Pending");
    if (activeTab === "Completed") return report.status === "Completed";
    return true;
  });

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
            Daily Audit Reports
          </Text>

          <View className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-200 shadow-sm">
            <FileCheck2 size={18} color="#0f172a" />
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Banner with DARK Overlay & Enhanced Bright White Text */}
          <View className="p-5">
            <View className="rounded-[28px] overflow-hidden shadow-md bg-slate-900">
              <ImageBackground
                source={require("../../assets/images/image1.jpg")}
                className="w-full h-40"
                resizeMode="cover"
              >
                {/* Dark Bottom-to-Top Overlay */}
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(0, 0, 0, 0.45)",
                    "rgba(10, 15, 25, 0.94)",
                  ]}
                  locations={[0, 0.35, 1]}
                  style={StyleSheet.absoluteFill}
                />

                <View className="flex-1 p-5 justify-between">
                  <View className="bg-emerald-500 px-3 py-1 rounded-full self-start shadow-sm">
                    <Text className="text-white font-gotham-bold text-[11px] uppercase tracking-wider">
                      Agronomy Ledger
                    </Text>
                  </View>

                  <View>
                    <Text className="text-white font-gotham-bold text-2xl leading-tight">
                      Field Audit Dossiers
                    </Text>
                    <Text className="text-emerald-300 font-brandon text-xs mt-1">
                      {mockReports.length} Inspection Audits Recorded This Month
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* Filter Chips */}
          <View className="px-5 mb-4 flex-row">
            {["All", "Completed", "Pending"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`mr-2.5 px-5 py-2 rounded-full border ${
                    isActive
                      ? "bg-emerald-600 border-emerald-600 shadow-sm"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <Text
                    className={`font-gotham-bold text-xs uppercase tracking-wider ${
                      isActive ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Concise Reports Overview List - Darkish Rich Cards with Enhanced Contrast */}
          <View className="px-5">
            {filteredReports.map((item, idx) => {
              const mediumThemes = [
                {
                  bg: "bg-emerald-50/95",
                  border: "border-emerald-200/90",
                  pillBg: "bg-emerald-100",
                  pillBorder: "border-emerald-300",
                  pillText: "text-emerald-900",
                  iconColor: "#059669",
                  actionText: "text-emerald-800",
                },
                {
                  bg: "bg-sky-50/95",
                  border: "border-sky-200/90",
                  pillBg: "bg-sky-100",
                  pillBorder: "border-sky-300",
                  pillText: "text-sky-900",
                  iconColor: "#0284c7",
                  actionText: "text-sky-800",
                },
                {
                  bg: "bg-amber-50/95",
                  border: "border-amber-200/90",
                  pillBg: "bg-amber-100",
                  pillBorder: "border-amber-300",
                  pillText: "text-amber-900",
                  iconColor: "#d97706",
                  actionText: "text-amber-800",
                },
                {
                  bg: "bg-purple-50/95",
                  border: "border-purple-200/90",
                  pillBg: "bg-purple-100",
                  pillBorder: "border-purple-300",
                  pillText: "text-purple-900",
                  iconColor: "#7e22ce",
                  actionText: "text-purple-800",
                },
              ];
              const theme = mediumThemes[idx % mediumThemes.length];

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.88}
                  onPress={() =>
                    router.push(`/(employee)/report/${item.id}` as any)
                  }
                  className={`${theme.bg} rounded-[24px] p-4 mb-3.5 border ${theme.border} shadow-xs`}
                >
                  <View className="flex-row items-center mb-3">
                    {/* Visual Farm Image Thumbnail */}
                    <View className="w-14 h-14 rounded-2xl overflow-hidden mr-3 border border-white shadow-xs">
                      <ImageBackground
                        source={item.image}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>

                    <View className="flex-1">
                      <View className="flex-row items-center justify-between mb-0.5">
                        <Text className="text-slate-900 font-gotham-bold text-base flex-1 mr-2" numberOfLines={1}>
                          {item.name}
                        </Text>
                        <View
                          className={`px-2 py-0.5 rounded-full border ${theme.pillBg} ${theme.pillBorder}`}
                        >
                          <Text
                            className={`font-gotham-bold text-[9px] uppercase tracking-wider ${theme.pillText}`}
                          >
                            {item.status}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row items-center">
                        <Calendar size={11} color={theme.iconColor} />
                        <Text className="text-slate-600 font-gotham-medium text-xs ml-1 mr-2">
                          {item.date}
                        </Text>
                        <MapPin size={11} color={theme.iconColor} />
                        <Text className="text-slate-600 font-gotham-medium text-xs ml-0.5" numberOfLines={1}>
                          {item.location}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Metrics Badges */}
                  <View className="flex-row items-center justify-between pt-2.5 border-t border-slate-200/70">
                    <View className="flex-row items-center gap-2">
                      <View className={`flex-row items-center bg-white/90 px-2.5 py-1 rounded-xl border border-slate-200/70 shadow-2xs`}>
                        <Droplets size={12} color={theme.iconColor} />
                        <Text className="font-gotham-bold text-[11px] ml-1 text-slate-800">
                          {item.moisture}
                        </Text>
                      </View>
                      <View className={`flex-row items-center bg-white/90 px-2.5 py-1 rounded-xl border border-slate-200/70 shadow-2xs`}>
                        <Sprout size={12} color="#15803d" />
                        <Text className="font-gotham-bold text-[11px] ml-1 text-slate-800">
                          pH {item.ph}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center">
                      <Text className={`${theme.actionText} font-gotham-bold text-xs mr-1`}>
                        View Dossier
                      </Text>
                      <ChevronRight size={14} color={theme.iconColor} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
