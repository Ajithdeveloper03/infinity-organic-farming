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
} from "lucide-react-native";

const reports = [
  {
    id: "1",
    name: "Kuppusamy Farm",
    date: "Sep 08, 2026",
    location: "Annur, Block A",
    status: "Completed",
    notes: "Root development inspected. Recommended organic bio-tonic spray.",
    metrics: "Moisture: 68% • Saplings: Healthy",
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
    notes: "Soil moisture retention test conducted. Optimal organic nitrogen recorded.",
    metrics: "Moisture: 72% • Stage: Vegetative",
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
    notes: "Vetiver sapling health optimal. Fertilizer distribution logged.",
    metrics: "Moisture: 65% • Bio-manure applied",
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
    notes: "Field audit awaiting farmer confirmation for second fertilization cycle.",
    metrics: "Awaiting next cycle confirmation",
    image: require("../../assets/images/image4.jpg"),
    tagBg: "#fff7ed",
    tagText: "#ea580c",
    tagBorder: "#fed7aa",
  },
];

export default function ReportsScreen() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredReports = reports.filter((report) => {
    if (activeTab === "All") return true;
    if (activeTab === "Pending") return report.status.includes("Pending");
    if (activeTab === "Completed") return report.status === "Completed";
    return true;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ImageBackground
        source={require("../../assets/images/image7.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.12 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.4)", "rgba(248, 250, 252, 0.85)", "#f8fafc"]}
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
              Field Audit Reports
            </Text>

            <View className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-200 shadow-sm">
              <FileCheck2 size={18} color="#0f172a" />
            </View>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Filter Chips (Light Mode) */}
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

            {/* Reports List (White Cards with Bottom-to-Top White Gradient Overlays) */}
            <View className="px-5">
              {filteredReports.map((item) => (
                <View
                  key={item.id}
                  className="rounded-[26px] overflow-hidden bg-white border border-slate-200 mb-4 shadow-sm"
                >
                  <ImageBackground
                    source={item.image}
                    className="w-full h-40"
                    resizeMode="cover"
                  >
                    {/* Mandatory Bottom-to-Top White Overlay */}
                    <LinearGradient
                      colors={[
                        "transparent",
                        "rgba(255, 255, 255, 0.4)",
                        "rgba(255, 255, 255, 0.92)",
                        "#ffffff",
                      ]}
                      locations={[0, 0.25, 0.65, 1]}
                      style={StyleSheet.absoluteFill}
                    />

                    <View className="flex-1 p-4 justify-between">
                      <View className="flex-row justify-between items-center">
                        <View
                          style={{
                            backgroundColor: item.tagBg,
                            borderColor: item.tagBorder,
                          }}
                          className="px-3 py-1 rounded-full border shadow-sm"
                        >
                          <Text
                            style={{ color: item.tagText }}
                            className="font-gotham-bold text-[11px] uppercase tracking-wider"
                          >
                            {item.status}
                          </Text>
                        </View>

                        <View className="bg-white/90 px-2.5 py-1 rounded-md border border-slate-200">
                          <Text className="text-slate-700 text-xs font-gotham-bold">
                            {item.date}
                          </Text>
                        </View>
                      </View>

                      <View>
                        <Text className="text-slate-900 font-gotham-bold text-xl leading-tight">
                          {item.name}
                        </Text>
                        <View className="flex-row items-center mt-1">
                          <MapPin size={12} color="#059669" />
                          <Text className="text-slate-600 font-brandon text-xs ml-1 font-bold">
                            {item.location}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>

                  <View className="p-4 bg-white border-t border-slate-100">
                    <Text className="text-slate-700 font-brandon text-xs leading-relaxed mb-2.5">
                      {item.notes}
                    </Text>

                    <View className="flex-row items-center justify-between pt-2 border-t border-slate-100">
                      <View className="flex-row items-center">
                        <Droplets size={14} color="#0284c7" />
                        <Text className="text-emerald-700 font-gotham-bold text-xs ml-1.5">
                          {item.metrics}
                        </Text>
                      </View>

                      <TouchableOpacity className="flex-row items-center">
                        <Text className="text-emerald-700 font-gotham-bold text-xs mr-1">
                          Full Audit
                        </Text>
                        <ChevronRight size={14} color="#059669" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
