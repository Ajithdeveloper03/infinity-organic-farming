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
import { useLanguage, LanguageTogglePill } from "../../context/LanguageContext";
import { api } from "../../services/api";

export default function VisitsScreen() {
  const { t, language } = useLanguage();
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
              {t("todaysVisits", "Today's Field Visits")}
            </Text>
            <Text className="text-xs text-emerald-700 font-brandon font-bold">
              {visits.length} {t("scheduled", "Scheduled")} • Delta Zone
            </Text>
          </View>

          <View className="flex-row items-center gap-1">
            <LanguageTogglePill />
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
                      {language === "ta" ? "தினசரி களப் பாதை" : "Daily Route Overview"}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-white font-gotham-bold text-2xl leading-tight">
                      {completedCount} / {visits.length} {t("completed", "Completed")}
                    </Text>
                    <View className="flex-row items-center mt-2">
                      <View className="bg-white/20 px-3 py-1 rounded-full border border-white/25 mr-2">
                        <Text className="text-emerald-300 font-gotham-bold text-xs">
                          ✓ {completedCount} {t("completed", "Done")}
                        </Text>
                      </View>
                      <View className="bg-white/20 px-3 py-1 rounded-full border border-white/25">
                        <Text className="text-amber-300 font-gotham-bold text-xs">
                          ⚡ {pendingCount} {t("pending", "Pending")}
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
              const tabText =
                tab === "all"
                  ? t("all", "All")
                  : tab === "pending"
                  ? t("pending", "Pending")
                  : t("completed", "Completed");
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
                    {tabText}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Concise Visits List - Lesser Content, Clean Layout */}
          <View className="px-5">
            {filteredVisits.map((visit, idx) => {
              const isCompleted = visit.status === "completed";
              const mediumThemes = [
                {
                  bg: "bg-emerald-50/95",
                  border: "border-emerald-200/90",
                  timeBg: "bg-emerald-100",
                  timeBorder: "border-emerald-300",
                  timeText: "text-emerald-900",
                  iconColor: "#059669",
                  actionText: "text-emerald-800",
                },
                {
                  bg: "bg-sky-50/95",
                  border: "border-sky-200/90",
                  timeBg: "bg-sky-100",
                  timeBorder: "border-sky-300",
                  timeText: "text-sky-900",
                  iconColor: "#0284c7",
                  actionText: "text-sky-800",
                },
                {
                  bg: "bg-amber-50/95",
                  border: "border-amber-200/90",
                  timeBg: "bg-amber-100",
                  timeBorder: "border-amber-300",
                  timeText: "text-amber-900",
                  iconColor: "#d97706",
                  actionText: "text-amber-800",
                },
                {
                  bg: "bg-purple-50/95",
                  border: "border-purple-200/90",
                  timeBg: "bg-purple-100",
                  timeBorder: "border-purple-300",
                  timeText: "text-purple-900",
                  iconColor: "#7e22ce",
                  actionText: "text-purple-800",
                },
              ];
              const theme = mediumThemes[idx % mediumThemes.length];

              return (
                <TouchableOpacity
                  key={visit.id || idx}
                  activeOpacity={0.88}
                  onPress={() =>
                    router.push(`/(employee)/visit/${visit.id}` as any)
                  }
                  className={`${theme.bg} rounded-[24px] p-4 mb-3.5 border ${theme.border} shadow-xs`}
                >
                  <View className="flex-row justify-between items-center mb-2.5">
                    <View className="flex-row items-center">
                      <View
                        className={`px-2.5 py-0.5 rounded-md mr-2 border ${theme.timeBg} ${theme.timeBorder}`}
                      >
                        <Text
                          className={`text-[11px] font-gotham-bold ${theme.timeText}`}
                        >
                          {visit.time || "10:30 AM"}
                        </Text>
                      </View>
                      <Text className="text-slate-600 font-gotham-medium text-xs">
                        {isCompleted
                          ? (language === "ta" ? "முடிந்தது ✓" : "Completed ✓")
                          : (language === "ta" ? "வரவிருக்கும் வருகை" : "Upcoming Visit")}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          `tel:${visit.farmer?.phone || "9411111111"}`
                        )
                      }
                      className="w-8 h-8 rounded-full bg-emerald-100/90 items-center justify-center border border-emerald-200"
                    >
                      <Phone size={13} color="#059669" />
                    </TouchableOpacity>
                  </View>

                  <Text className="text-slate-900 font-gotham-bold text-base mb-1">
                    {visit.farmerName || visit.farmer?.name || "Organic Farm"}
                  </Text>

                  <View className="flex-row items-center justify-between pt-2.5 border-t border-slate-200/70">
                    <View className="flex-row items-center flex-1 mr-2">
                      <MapPin size={13} color={theme.iconColor} />
                      <Text
                        className="text-slate-700 text-xs ml-1 font-gotham-medium"
                        numberOfLines={1}
                      >
                        {visit.address || visit.farmer?.address || "Thanjavur Ag-Corridor"}
                      </Text>
                    </View>

                    <View className="flex-row items-center">
                      <Text className={`${theme.actionText} font-gotham-bold text-xs mr-1`}>
                        {t("viewDetails", "View Details")}
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
