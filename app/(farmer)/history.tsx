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
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  UserCheck,
} from "lucide-react-native";

const history = [
  {
    id: "1",
    name: "Harish (Field Officer)",
    initial: "H",
    date: "May 11, 2026 • 10:30 AM",
    location: "Vetiver Farm - Block A, Annur",
    status: "Completed",
    notes: "Root development inspected. Recommended organic bio-tonic.",
  },
  {
    id: "2",
    name: "Hemath (Field Officer)",
    initial: "HE",
    date: "Apr 26, 2026 • 10:15 AM",
    location: "Vetiver Farm - Block A, Annur",
    status: "Completed",
    notes: "Drip irrigation pattern calibrated. Soil pH verified optimal (6.8).",
  },
  {
    id: "3",
    name: "Murugan (Field Officer)",
    initial: "M",
    date: "Apr 11, 2026 • 11:00 AM",
    location: "Vetiver Farm - Block B, Annur",
    status: "Completed",
    notes: "Baseline plantation verification. Organic manure quantity allocated.",
  },
];

export default function FarmerHistoryScreen() {
  const [activeTab, setActiveTab] = useState("All");

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
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-200 shadow-sm"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-lg font-gotham-bold">
            Visit History
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Banner with Background Image */}
          <View className="p-5">
            <View className="rounded-3xl overflow-hidden shadow-md border border-green-800/20">
              <ImageBackground
                source={require("../../assets/images/image1.jpg")}
                className="w-full"
                resizeMode="cover"
              >
                <View className="p-6 bg-green-950/80">
                  <View className="flex-row items-center mb-2">
                    <UserCheck size={20} color="#86efac" className="mr-2" />
                    <Text className="text-green-300 font-brandon font-bold text-xs uppercase tracking-widest">
                      Field Officer Audits
                    </Text>
                  </View>
                  <Text className="text-white font-gotham-bold text-2xl mb-3">
                    Regular Inspections
                  </Text>
                  <Text className="text-white/80 font-brandon text-xs leading-relaxed">
                    Verified field audits by certified Infinity Organics agronomy officers.
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* Filter Tabs */}
          <View className="px-5 mb-4">
            <View className="flex-row bg-gray-200/70 p-1 rounded-full">
              {["All", "Completed", "Scheduled"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-full items-center ${
                    activeTab === tab ? "bg-white shadow-sm" : ""
                  }`}
                >
                  <Text
                    className={`font-gotham-bold text-xs ${
                      activeTab === tab ? "text-green-800" : "text-gray-600"
                    }`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Visits List */}
          <View className="px-5">
            {history.map((visit) => (
              <View
                key={visit.id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 mb-4"
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View className="flex-row items-center flex-1 pr-2">
                    <View className="w-11 h-11 bg-green-100 border border-green-300 rounded-full items-center justify-center mr-3.5">
                      <Text className="text-green-800 font-gotham-bold text-base">
                        {visit.initial}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-900 font-gotham-bold text-base">
                        {visit.name}
                      </Text>
                      <View className="flex-row items-center mt-0.5">
                        <Clock size={12} color="#4b5563" className="mr-1" />
                        <Text className="text-gray-600 text-xs font-brandon">
                          {visit.date}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex-row items-center">
                    <CheckCircle2 size={12} color="#059669" className="mr-1" />
                    <Text className="text-emerald-800 text-[11px] font-gotham-bold uppercase tracking-wider">
                      {visit.status}
                    </Text>
                  </View>
                </View>

                <View className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-100">
                  <View className="flex-row items-center mb-1">
                    <MapPin size={13} color="#4b5563" className="mr-1" />
                    <Text className="text-gray-800 font-gotham-bold text-xs">
                      {visit.location}
                    </Text>
                  </View>
                  <Text className="text-gray-700 font-brandon text-xs leading-relaxed">
                    {visit.notes}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => router.push(`/(farmer)/history` as any)}
                  activeOpacity={0.7}
                  className="flex-row items-center justify-between pt-2 border-t border-gray-100"
                >
                  <Text className="text-green-800 font-gotham-bold text-xs uppercase tracking-wider">
                    View Complete Audit Log
                  </Text>
                  <ChevronRight size={16} color="#15803d" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
