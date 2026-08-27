import React, { useState } from "react";

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

import {
  ChevronLeft,
  Droplets,
  Leaf,
  Sprout,
  Bug,
  Calendar,
  Camera,
} from "lucide-react-native";

import { LinearGradient } from "expo-linear-gradient";

const generalTips = [
  {
    id: "1",
    category: "Irrigation",
    title: "Irrigation Management",
    desc: "Maintain regular irrigation for better root growth.",
    icon: Droplets,
    color: "#3b82f6",
    bg: "bg-blue-500/20 border-blue-500/30",
  },
  {
    id: "2",
    category: "Soil",
    title: "Organic Manure",
    desc: "Apply compost or FYM every 45 days.",
    icon: Leaf,
    color: "#4ade80",
    bg: "bg-green-500/20 border-green-500/30",
  },
  {
    id: "3",
    category: "Weed",
    title: "Weed Management",
    desc: "Remove weeds regularly to increase yield.",
    icon: Sprout,
    color: "#f97316",
    bg: "bg-orange-500/20 border-orange-500/30",
  },
  {
    id: "4",
    category: "Pest",
    title: "Pest Control",
    desc: "Use neem oil spray for natural pest control.",
    icon: Bug,
    color: "#ef4444",
    bg: "bg-red-500/20 border-red-500/30",
  },
];

const visitReports = [
  {
    id: "101",
    date: "Aug 12, 2025",
    officer: "Arun Kumar",
    status: "Good",
    recommendation:
      "Crop health is excellent. Continue current irrigation schedule. Applied bio-fertilizer today.",
    hasPhotos: true,
  },
  {
    id: "102",
    date: "Jul 28, 2025",
    officer: "Arun Kumar",
    status: "Action Needed",
    recommendation:
      "Noticed slight weed growth. Recommended immediate weeding. Provided organic weedicide.",
    hasPhotos: false,
  },
];

export default function FarmerRecommendationsScreen() {
  const [activeTab, setActiveTab] = useState<"reports" | "tips">("reports");
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Background Glow */}
      <View className="absolute top-0 left-0 right-0 h-64">
        <LinearGradient
          colors={["#064e3b", "#0A0A0C"]}
          className="w-full h-full opacity-30"
        />
      </View>
      {/* Header */}
      <View className="px-5 pt-16 pb-4 flex-row items-center justify-between z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-12 h-12 bg-white/90 rounded-full items-center justify-center border border-white/10"
          activeOpacity={0.8}
        >
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-xl font-gotham-bold">
          Reports & Tips
        </Text>
        <View className="w-12 h-12" />
      </View>
      <ScrollView className="flex-1 pb-24" showsVerticalScrollIndicator={false}>
        {/* Tab Switcher (JioHotstar style) */}
        <View className="flex-row mx-5 mt-6 bg-white p-1 rounded-full border border-white/10 mb-8">
          <TouchableOpacity
            onPress={() => setActiveTab("reports")}
            activeOpacity={0.8}
            className={`flex-1 py-3 items-center rounded-full ${activeTab === "reports" ? "bg-white shadow-lg" : ""}`}
          >
            <Text
              className={`font-gotham-bold text-sm ${activeTab === "reports" ? "text-[#0A0A0C]" : "text-gray-500"}`}
            >
              Visit Reports
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("tips")}
            activeOpacity={0.8}
            className={`flex-1 py-3 items-center rounded-full ${activeTab === "tips" ? "bg-white shadow-lg" : ""}`}
          >
            <Text
              className={`font-gotham-bold text-sm ${activeTab === "tips" ? "text-[#0A0A0C]" : "text-gray-500"}`}
            >
              General Tips
            </Text>
          </TouchableOpacity>
        </View>
        <View className="px-5">
          {activeTab === "reports" && (
            <View>
              {visitReports.map((report) => (
                <View
                  key={report.id}
                  className="bg-white rounded-[32px] p-6 shadow-lg border border-white/5 mb-6"
                >
                  <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-white/5">
                    <View className="flex-row items-center">
                      <Calendar size={18} color="#9ca3af" className="mr-3" />
                      <Text className="text-gray-900 font-gotham-bold text-lg">
                        {report.date}
                      </Text>
                    </View>
                    <View
                      className={`px-4 py-1.5 rounded-full border ${report.status === "Good" ? "bg-green-500/20 border-green-500/30" : "bg-yellow-500/20 border-yellow-500/30"}`}
                    >
                      <Text
                        className={`${report.status === "Good" ? "text-green-400" : "text-yellow-400"}
text-[10px] uppercase tracking-widest font-gotham-bold`}
                      >
                        {report.status}
                      </Text>
                    </View>
                  </View>
                  <View className="mb-5 flex-row justify-between items-center">
                    <View>
                      <Text className="text-[#9ca3af] text-[10px] font-gotham-bold uppercase tracking-widest mb-1">
                        Field Officer
                      </Text>
                      <Text className="text-gray-900 font-gotham-bold text-base">
                        {report.officer}
                      </Text>
                    </View>
                    <View className="w-10 h-10 rounded-full bg-blue-500/20 items-center justify-center border border-blue-500/30">
                      <Text className="text-blue-400 font-gotham-bold">AK</Text>
                    </View>
                  </View>
                  <View className="bg-black/20 p-5 rounded-[24px] mb-5 border border-white/5">
                    <Text className="text-gray-400 text-[10px] uppercase font-gotham-bold tracking-widest mb-2">
                      Recommendation
                    </Text>
                    <Text className="text-gray-800 font-brandon text-sm leading-relaxed">
                      {report.recommendation}
                    </Text>
                  </View>
                  {report.hasPhotos && (
                    <View className="flex-row items-center justify-center bg-white/5 py-3 rounded-xl border border-white/10">
                      <Camera size={18} color="#4ade80" className="mr-2" />
                      <Text className="text-[#4ade80] font-gotham-bold text-xs uppercase tracking-widest">
                        2 Photos Attached
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
          {activeTab === "tips" && (
            <View>
              {generalTips.map((item) => {
                const Icon = item.icon;
                return (
                  <View
                    key={item.id}
                    className="bg-white rounded-[24px] p-5 shadow-lg border border-white/5 mb-4 flex-row items-center"
                  >
                    <View
                      className={`w-14 h-14 rounded-[16px] items-center justify-center mr-4 border ${item.bg}`}
                    >
                      <Icon size={24} color={item.color} />
                    </View>
                    <View className="flex-1 pr-2">
                      <Text className="text-gray-900 font-gotham-bold text-lg mb-1">
                        {item.title}
                      </Text>
                      <Text className="text-[#9ca3af] text-xs leading-5 font-brandon">
                        {item.desc}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
