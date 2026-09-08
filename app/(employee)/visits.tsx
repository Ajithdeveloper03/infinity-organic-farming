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
  Play,
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

            <View className="items-center">
              <Text className="text-lg font-gotham-bold text-slate-900">
                Field Inspection Route
              </Text>
              <Text className="text-xs text-emerald-700 font-brandon font-bold">
                {visits.length} Visits Scheduled
              </Text>
            </View>

            <View className="w-10 items-end">
              {loading && <ActivityIndicator size="small" color="#059669" />}
            </View>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero Banner with Bottom-to-Top White Gradient Overlay */}
            <View className="p-5">
              <View className="rounded-[28px] overflow-hidden shadow-md border border-slate-200 bg-white">
                <ImageBackground
                  source={require("../../assets/images/image5.jpg")}
                  className="w-full h-48"
                  resizeMode="cover"
                >
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

                  <View className="flex-1 p-5 justify-between">
                    <View className="flex-row items-center bg-emerald-700 px-3 py-1 rounded-full self-start shadow-sm">
                      <ListTodo size={14} color="#ffffff" />
                      <Text className="text-white font-gotham-bold text-[11px] ml-1.5 uppercase tracking-wider">
                        Today's Inspection Schedule
                      </Text>
                    </View>

                    <View>
                      <Text className="text-slate-900 font-gotham-bold text-2xl mb-2">
                        {completedCount} of {visits.length} Done
                      </Text>

                      <View className="flex-row space-x-2">
                        <View className="bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                          <Text className="text-emerald-800 font-gotham-bold text-xs">
                            ✓ {completedCount} Completed
                          </Text>
                        </View>
                        <View className="bg-amber-100 px-3 py-1 rounded-full border border-amber-200 ml-2">
                          <Text className="text-amber-800 font-gotham-bold text-xs">
                            ⚡ {pendingCount} Pending
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </View>

            {/* Filter Tabs (Light Mode) */}
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

            {/* Visits List (White Cards, Deep Dark Text) */}
            <View className="px-5">
              {filteredVisits.map((visit, idx) => {
                const isCompleted = visit.status === "completed";
                return (
                  <View
                    key={visit.id || idx}
                    className="bg-white rounded-[24px] p-4 mb-3.5 border border-slate-200 shadow-sm"
                  >
                    <View className="flex-row justify-between items-start mb-2">
                      <View className="flex-1 pr-2">
                        <View className="flex-row items-center mb-1">
                          <View
                            className={`px-2 py-0.5 rounded-md mr-2 ${
                              isCompleted ? "bg-emerald-100 border border-emerald-200" : "bg-orange-100 border border-orange-200"
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
                            {isCompleted ? "Inspection Logged" : "Next in queue"}
                          </Text>
                        </View>

                        <Text className="text-slate-900 font-gotham-bold text-lg leading-tight">
                          {visit.farmerName || visit.farmer?.name || "Organic Farm"}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => Linking.openURL(`tel:${visit.farmer?.phone || "9411111111"}`)}
                        className="w-10 h-10 rounded-full bg-emerald-50 items-center justify-center border border-emerald-200"
                      >
                        <Phone size={18} color="#059669" />
                      </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center mb-3">
                      <MapPin size={14} color="#64748b" />
                      <Text
                        className="text-slate-600 text-xs ml-1 font-brandon flex-1"
                        numberOfLines={1}
                      >
                        {visit.address || visit.farmer?.address || "Thanjavur Ag-Corridor"}
                      </Text>
                    </View>

                    <View className="flex-row justify-between items-center pt-2.5 border-t border-slate-100">
                      <Text className="text-emerald-700 font-gotham-bold text-xs">
                        Crop: Vetiver & Turmeric
                      </Text>

                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                          router.push(`/(employee)/visit/${visit.id}` as any)
                        }
                        className={`px-4 py-2 rounded-xl flex-row items-center ${
                          isCompleted ? "bg-slate-100" : "bg-emerald-600"
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle2 size={14} color="#059669" className="mr-1" />
                            <Text className="text-slate-800 font-gotham-bold text-xs ml-1">
                              View Report
                            </Text>
                          </>
                        ) : (
                          <>
                            <Play size={14} color="#fff" fill="#fff" className="mr-1" />
                            <Text className="text-white font-gotham-bold text-xs ml-1">
                              Start Visit
                            </Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
