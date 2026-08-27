import * as Location from "expo-location";
import { router } from "expo-router";
import {
  AlertCircle,
  Bell,
  ChevronRight,
  ClipboardList,
  FileText,
  MapPin,
  Target,
  UserPlus,
  Clock,
  Globe,
  Shield,
  User,
  Wallet,
  History,
  Map,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "expo-linear-gradient";
import { showToast } from "../../components/ui/ToastMessage";
import {
  dashboardStats,
  employeeProfile,
  getTodayVisits,
} from "../../data/mockData";
import { useTracking } from "../../context/TrackingContext";

const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const { t, i18n } = useTranslation();
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark" || true;
  /* Forcing dark mode aesthetic based on reference images */

  const { isTracking } = useTracking();
  const todayVisits = getTodayVisits();
  const nextVisit =
    todayVisits.find((v) => v.status === "pending") || todayVisits[0];
  const currentHour = new Date().getHours();
  let greeting = "Good Morning";
  if (currentHour >= 12 && currentHour < 17) greeting = "Good Afternoon";
  else if (currentHour >= 17) greeting = "Good Evening";

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationGranted(false);
      } else {
        setLocationGranted(true);
      }
    })();
  }, []);

  const QuickActionItem = ({ icon: Icon, label, color, onPress }: any) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="items-center w-[22%] mb-6"
    >
      <View
        className="w-16 h-16 rounded-[22px] items-center justify-center mb-2"
        style={{ backgroundColor: color }}
      >
        <Icon size={28} color="#fff" strokeWidth={1.5} />
      </View>
      <Text
        className="text-gray-900 dark:text-white font-brandon text-[11px] text-center w-full"
        numberOfLines={2}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0A0A0C]">
      {/* Banner Background Image */}
      <View className="absolute top-0 left-0 right-0 h-[400px]">
        <Image
          source={require("../../assets/images/image1.jpg")}
          className="w-full h-full opacity-30"
        />
        <LinearGradient
          colors={["transparent", "#0A0A0C"]}
          className="absolute inset-0"
        />
      </View>

      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-5 pt-14 pb-4 flex-row justify-between items-center z-10">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/(employee)/profile" as any)}
            className="flex-row items-center bg-white/80 dark:bg-[#1C1C1E]/80 rounded-full py-1.5 pl-1.5 pr-4 border border-white/5"
          >
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeProfile.name)}&background=3b82f6&color=fff&size=200`,
              }}
              className="w-8 h-8 rounded-full mr-3"
            />
            <Text className="text-gray-900 dark:text-white text-sm font-gotham-bold">
              {employeeProfile.name}
            </Text>
          </TouchableOpacity>
          <View className="flex-row space-x-3">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-white/80 dark:bg-[#1C1C1E]/80 items-center justify-center border border-white/5">
              <Globe size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-white/80 dark:bg-[#1C1C1E]/80 items-center justify-center border border-white/5">
              <Bell size={20} color="#fff" />
              <View className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#1C1C1E]" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Greeting Hero */}
          <View className="px-6 py-4 mt-2">
            <Text className="text-gray-500 dark:text-white/60 text-sm font-brandon uppercase tracking-[0.2em] mb-2">
              Infinity Organics
            </Text>
            <Text className="text-gray-900 dark:text-white text-3xl font-gotham-bold leading-tight">
              {greeting},
            </Text>
            <Text className="text-gray-700 dark:text-white/80 text-3xl font-gotham-bold leading-tight">
              Ready for today?
            </Text>
          </View>

          {/* Quick Actions (Google Pay Style Grid) */}
          <View className="px-5 mt-6 mb-4 flex-row flex-wrap justify-start">
            <QuickActionItem
              icon={UserPlus}
              label={t("Register")}
              color="#3b82f6"
              onPress={() =>
                router.push("/(employee)/register-farmer/step1" as any)
              }
            />
            <QuickActionItem
              icon={MapPin}
              label={t("Visits")}
              color="#10b981"
              onPress={() => router.push("/(employee)/visits" as any)}
            />
            <QuickActionItem
              icon={FileText}
              label={t("Reports")}
              color="#8b5cf6"
              onPress={() => router.push("/(employee)/reports" as any)}
            />
            <QuickActionItem
              icon={Clock}
              label={t("Attendance")}
              color="#ec4899"
              onPress={() => router.push("/(employee)/attendance" as any)}
            />
            <QuickActionItem
              icon={Map}
              label={t("Live Map")}
              color="#06b6d4"
              onPress={() => router.push("/(employee)/map" as any)}
            />
          </View>

          {/* Live Tracking Banner */}
          {isTracking && (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("/(employee)/map" as any)}
              className="px-5 mb-8"
            >
              <View className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 flex-row items-center">
                <View className="w-10 h-10 bg-green-500/20 rounded-full items-center justify-center mr-3 relative">
                  <View className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
                  <View className="w-3 h-3 bg-green-400 rounded-full" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-900 dark:text-white font-gotham-bold text-base mb-1">
                    Live Tracking Active
                  </Text>
                  <Text className="text-green-400 font-brandon text-xs">
                    GPS is recording your movement in background.
                  </Text>
                </View>
                <ChevronRight size={20} color="#22c55e" />
              </View>
            </TouchableOpacity>
          )}

          {/* Spotify Style Featured Card (Schedule Overview) */}
          <View className="px-5 mb-8">
            <Text className="text-gray-900 dark:text-white font-gotham-bold text-xl mb-4">
              Today's Overview
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              className="w-full rounded-[28px] overflow-hidden"
            >
              <LinearGradient
                colors={["#FF416C", "#FF4B2B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="p-6 relative"
              >
                <View className="absolute -right-10 -bottom-10 opacity-20">
                  <Target size={180} color="#fff" />
                </View>
                <View className="flex-row justify-between items-start mb-8">
                  <View>
                    <Text className="text-gray-700 dark:text-white/80 font-brandon uppercase tracking-widest text-xs mb-1">
                      Visit Target
                    </Text>
                    <Text className="text-gray-900 dark:text-white font-gotham-bold text-4xl">
                      {dashboardStats.completed}
                      <Text className="text-gray-500 dark:text-white/60 text-2xl">
                        /{dashboardStats.totalVisits}
                      </Text>
                    </Text>
                  </View>
                  <View className="bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                    <Text className="text-gray-900 dark:text-white font-gotham-bold text-xs">
                      {dashboardStats.pending} Left
                    </Text>
                  </View>
                </View>
                <View className="bg-black/30 rounded-full h-1.5 w-full mb-3 overflow-hidden">
                  <View
                    className="bg-white dark:bg-[#1C1C1E] h-full rounded-full"
                    style={{
                      width: `${(dashboardStats.completed / dashboardStats.totalVisits) * 100}%`,
                    }}
                  />
                </View>
                <Text className="text-gray-800 dark:text-white/90 font-brandon text-xs">
                  Keep up the great work! You're on track.
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Up Next List (Like a Playlist track list) */}
          {nextVisit && (
            <View className="px-5 mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-gray-900 dark:text-white font-gotham-bold text-xl">
                  Up Next
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(employee)/visits" as any)}
                >
                  <Text className="text-blue-400 font-gotham-bold text-xs uppercase tracking-widest">
                    View All
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  router.push(`/(employee)/visit/${nextVisit.id}` as any)
                }
                className="flex-row items-center bg-white dark:bg-[#1C1C1E] p-4 rounded-[20px] mb-3"
              >
                <View className="w-16 h-16 rounded-[14px] bg-[#2C2C2E] items-center justify-center mr-4">
                  <Text className="text-[#10b981] font-gotham-bold text-sm">
                    {nextVisit.time.split(" ")[0]}
                  </Text>
                  <Text className="text-white/50 font-brandon text-[10px] uppercase">
                    {nextVisit.time.split(" ")[1]}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    className="text-gray-900 dark:text-white font-gotham-bold text-base mb-1"
                    numberOfLines={1}
                  >
                    {nextVisit.farmer?.name}
                  </Text>
                  <View className="flex-row items-center">
                    <MapPin size={12} color="#8E8E93" />
                    <Text
                      className="text-[#8E8E93] text-xs ml-1 font-brandon"
                      numberOfLines={1}
                    >
                      {nextVisit.farmer?.address}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity className="w-10 h-10 rounded-full bg-[#2C2C2E] items-center justify-center">
                  <ChevronRight size={20} color="#fff" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
