import React from "react";

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { router } from "expo-router";

import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react-native";

import { LinearGradient } from "expo-linear-gradient";

const history = [
  {
    id: "1",
    name: "Arun Kumar",
    initial: "AK",
    date: "May 11, 2025 • 10:30 AM",
    location: "Vetiver Farm - Block A",
    status: "Completed",
    type: "completed",
  },
  {
    id: "2",
    name: "Arun Kumar",
    initial: "AK",
    date: "Apr 26, 2025 • 10:15 AM",
    location: "Vetiver Farm - Block A",
    status: "Completed",
    type: "completed",
  },
  {
    id: "3",
    name: "Suresh Raj",
    initial: "SR",
    date: "Apr 11, 2025 • 11:00 AM",
    location: "Vetiver Farm - Block A",
    status: "Completed",
    type: "completed",
  },
];

export default function FarmerHistoryScreen() {
  const [activeTab, setActiveTab] = React.useState("All");
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Top Gradient Background */}
      <View className="absolute top-0 left-0 right-0 h-64">
        <LinearGradient
          colors={["#064e3b", "#0A0A0C"]}
          className="w-full h-full opacity-40"
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
          Visit History
        </Text>
        <View className="w-12 h-12" />
      </View>
      <ScrollView className="flex-1 pb-24" showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View className="px-5 py-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 12,
            }}
          >
            {["All", "Upcoming", "Completed"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`py-2 px-6 rounded-full border ${activeTab === tab ? "bg-white border-white" : "bg-white border-white/10"}`}
              >
                <Text
                  className={`font-gotham-bold text-sm ${activeTab === tab ? "text-[#0A0A0C]" : "text-gray-900"}`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View className="px-5">
          {history.map((visit) => (
            <View
              key={visit.id}
              className="bg-white rounded-[24px] p-5 shadow-lg border border-white/5 mb-4"
            >
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center">
                  <View className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-full items-center justify-center mr-4">
                    <Text className="text-green-400 font-gotham-bold text-lg">
                      {visit.initial}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-gray-900 font-gotham-bold text-base mb-0.5">
                      {visit.name}
                    </Text>
                    <Text className="text-[#9ca3af] text-xs font-brandon">
                      {visit.date}
                    </Text>
                    <Text className="text-gray-400 text-[10px] font-gotham-bold uppercase tracking-widest mt-1">
                      {visit.location}
                    </Text>
                  </View>
                </View>
                <View className="bg-green-500/20 px-3 py-1.5 rounded-full border border-green-500/30">
                  <Text className="text-green-400 text-[10px] uppercase font-gotham-bold tracking-widest">
                    {visit.status}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push(`/(farmer)/visit/${visit.id}` as any)
                }
                activeOpacity={0.7}
                className="flex-row items-center justify-end pt-4 border-t border-white/5 mt-1"
              >
                <Text className="text-[#9ca3af] text-xs font-gotham-bold mr-2 uppercase tracking-widest">
                  View Report
                </Text>
                <ChevronRight size={16} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
