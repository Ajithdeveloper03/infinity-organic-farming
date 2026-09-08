import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Clock,
  UserCheck,
  Sparkles,
} from "lucide-react-native";

const history = [
  {
    id: "1",
    name: "Harish (Field Officer)",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    date: "May 11, 2026 • 10:30 AM",
    location: "Vetiver Farm - Block A, Annur",
    status: "Completed",
    cardBg: "bg-[#062c1e]",
    cardBorder: "border-emerald-700/60",
    statusBg: "bg-emerald-500/20",
    statusColor: "#34d399",
    statusBorder: "border-emerald-500/40",
    notes: "Root development inspected. Recommended organic bio-tonic for next growth spurt.",
  },
  {
    id: "2",
    name: "Hemath (Field Officer)",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    date: "Apr 26, 2026 • 10:15 AM",
    location: "Vetiver Farm - Block A, Annur",
    status: "Completed",
    cardBg: "bg-[#08203e]",
    cardBorder: "border-sky-700/60",
    statusBg: "bg-sky-500/20",
    statusColor: "#38bdf8",
    statusBorder: "border-sky-500/40",
    notes: "Drip irrigation pattern calibrated. Soil pH verified optimal (6.8).",
  },
  {
    id: "3",
    name: "Murugan (Field Officer)",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    date: "Apr 11, 2026 • 11:00 AM",
    location: "Vetiver Farm - Block B, Annur",
    status: "Completed",
    cardBg: "bg-[#2a1705]",
    cardBorder: "border-amber-700/60",
    statusBg: "bg-amber-500/20",
    statusColor: "#fbbf24",
    statusBorder: "border-amber-500/40",
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
            className="w-10 h-10 rounded-full bg-white/95 items-center justify-center border border-slate-200 shadow-sm"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-slate-900 text-lg font-gotham-bold">
            Visit History
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 6 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Banner with Background Image */}
          <View className="p-5">
            <View className="rounded-3xl overflow-hidden shadow-sm border border-emerald-800/20">
              <ImageBackground
                source={require("../../assets/images/image1.jpg")}
                className="w-full"
                resizeMode="cover"
              >
                <View className="p-6 bg-emerald-950/85">
                  <View className="flex-row items-center mb-2">
                    <UserCheck size={18} color="#86efac" className="mr-2" />
                    <Text className="text-emerald-300 font-gotham-bold text-xs uppercase tracking-widest">
                      Field Officer Audits
                    </Text>
                  </View>
                  <Text className="text-white font-gotham-bold text-2xl mb-2">
                    Regular Inspections
                  </Text>
                  <Text className="text-white/85 font-gotham-medium text-xs leading-relaxed">
                    Verified field audits by certified Infinity Organics agronomy officers.
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* Filter Tabs */}
          <View className="px-5 mb-4">
            <View className="flex-row bg-slate-200/80 p-1 rounded-full">
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
                      activeTab === tab ? "text-emerald-800" : "text-slate-600"
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
                className={`rounded-2xl p-5 shadow-sm border mb-4 ${visit.cardBg} ${visit.cardBorder}`}
              >
                <View className="flex-row justify-between items-start mb-3">
                  <View className="flex-row items-center flex-1 pr-2">
                    <View className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/30 mr-3 shadow-sm bg-black/20">
                      <Image
                        source={{ uri: visit.photo }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-gotham-bold text-base">
                        {visit.name}
                      </Text>
                      <View className="flex-row items-center mt-0.5">
                        <Clock size={12} color="#94a3b8" className="mr-1" />
                        <Text className="text-slate-300 text-xs font-gotham-medium">
                          {visit.date}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View className={`px-3 py-1 rounded-full border flex-row items-center ${visit.statusBg} ${visit.statusBorder}`}>
                    <CheckCircle2 size={12} color={visit.statusColor} className="mr-1" />
                    <Text
                      style={{ color: visit.statusColor }}
                      className="text-[11px] font-gotham-bold uppercase tracking-wider"
                    >
                      {visit.status}
                    </Text>
                  </View>
                </View>

                <View className="bg-black/30 rounded-xl p-3 mb-3 border border-white/10">
                  <View className="flex-row items-center mb-1">
                    <MapPin size={13} color="#34d399" className="mr-1" />
                    <Text className="text-emerald-300 font-gotham-bold text-xs">
                      {visit.location}
                    </Text>
                  </View>
                  <Text className="text-slate-100 font-gotham-medium text-xs leading-relaxed">
                    {visit.notes}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => router.push(`/(farmer)/history` as any)}
                  activeOpacity={0.7}
                  className="flex-row items-center justify-between pt-2 border-t border-white/10"
                >
                  <Text className="text-emerald-300 font-gotham-bold text-xs uppercase tracking-wider">
                    View Complete Audit Log
                  </Text>
                  <ChevronRight size={16} color="#34d399" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

