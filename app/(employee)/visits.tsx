import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  MapPin,
  ChevronRight,
  ListTodo,
  Phone,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react-native";
import { getTodayVisits } from "../../data/mockData";
import { api } from "../../services/api";

export default function VisitsScreen() {
  const [visits, setVisits] = useState<any[]>(getTodayVisits());
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">("all");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.get("/employee/visits");
        if (res?.status === "success" && res?.visits && res.visits.length > 0) {
          setVisits(res.visits);
        }
      } catch (e) {
        console.log("Visits fetch notice:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const completedCount = visits.filter((v) => v.status === "completed").length;
  const pendingCount = visits.length - completedCount;

  const filteredVisits = visits.filter((v) => {
    if (activeTab === "pending") return v.status !== "completed";
    if (activeTab === "completed") return v.status === "completed";
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

          <View className="items-center">
            <Text className="text-lg font-gotham-bold text-slate-900">
              Today's Field Visits
            </Text>
            <Text className="text-xs text-emerald-700 font-brandon font-bold">
              {visits.length} Scheduled • Delta Zone
            </Text>
          </View>

          <View className="w-10 items-end">
            {loading && <ActivityIndicator size="small" color="#059669" />}
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
                source={require("../../assets/images/image5.jpg")}
                className="w-full h-44"
                resizeMode="cover"
              >
                {/* Dark Bottom-to-Top Overlay */}
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(0, 0, 0, 0.5)",
                    "rgba(10, 15, 25, 0.94)",
                  ]}
                  locations={[0, 0.35, 1]}
                  style={StyleSheet.absoluteFill}
                />

                <View className="flex-1 p-5 justify-between">
                  <View className="flex-row items-center bg-emerald-500 px-3 py-1 rounded-full self-start shadow-sm">
                    <ListTodo size={13} color="#ffffff" />
                    <Text className="text-white font-gotham-bold text-[11px] ml-1.5 uppercase tracking-wider">
                      Daily Route Overview
                    </Text>
                  </View>

                  <View>
                    <Text className="text-white font-gotham-bold text-2xl leading-tight">
                      {completedCount} of {visits.length} Completed
                    </Text>
                    <View className="flex-row items-center mt-2">
                      <View className="bg-white/20 px-3 py-1 rounded-full border border-white/25 mr-2">
                        <Text className="text-emerald-300 font-gotham-bold text-xs">
                          ✓ {completedCount} Done
                        </Text>
                      </View>
                      <View className="bg-white/20 px-3 py-1 rounded-full border border-white/25">
                        <Text className="text-amber-300 font-gotham-bold text-xs">
                          ⚡ {pendingCount} Pending
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* Filter Tabs */}
          <View className="px-5 mb-4 flex-row justify-between">
            {(["all", "pending", "completed"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`flex-1 mx-1 py-2.5 rounded-full items-center border ${
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

          {/* Concise Visits List - Lesser Content, Clean Layout */}
          <View className="px-5">
            {filteredVisits.map((visit, idx) => {
              const isCompleted = visit.status === "completed";
              return (
                <TouchableOpacity
                  key={visit.id || idx}
                  activeOpacity={0.85}
                  onPress={() =>
                    router.push(`/(employee)/visit/${visit.id}` as any)
                  }
                  className="bg-white rounded-[22px] p-4 mb-3 border border-slate-200 shadow-sm"
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                      <View
                        className={`px-2.5 py-0.5 rounded-md mr-2 ${
                          isCompleted
                            ? "bg-emerald-100 border border-emerald-200"
                            : "bg-orange-100 border border-orange-200"
                        }`}
                      >
                        <Text
                          className={`text-[11px] font-gotham-bold ${
                            isCompleted ? "text-emerald-800" : "text-orange-800"
                          }`}
                        >
                          {visit.time || "10:30 AM"}
                        </Text>
                      </View>
                      <Text className="text-slate-500 font-brandon text-xs">
                        {isCompleted ? "Completed ✓" : "Upcoming"}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          `tel:${visit.farmer?.phone || "9411111111"}`
                        )
                      }
                      className="w-8 h-8 rounded-full bg-emerald-50 items-center justify-center border border-emerald-200"
                    >
                      <Phone size={15} color="#059669" />
                    </TouchableOpacity>
                  </View>

                  <Text className="text-slate-900 font-gotham-bold text-base mb-1">
                    {visit.farmerName || visit.farmer?.name || "Organic Farm"}
                  </Text>

                  <View className="flex-row items-center justify-between pt-2 border-t border-slate-100">
                    <View className="flex-row items-center flex-1 mr-2">
                      <MapPin size={13} color="#64748b" />
                      <Text
                        className="text-slate-600 text-xs ml-1 font-brandon"
                        numberOfLines={1}
                      >
                        {visit.address || visit.farmer?.address || "Thanjavur Ag-Corridor"}
                      </Text>
                    </View>

                    <View className="flex-row items-center">
                      <Text className="text-emerald-700 font-gotham-bold text-xs mr-1">
                        View Details
                      </Text>
                      <ChevronRight size={14} color="#059669" />
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
