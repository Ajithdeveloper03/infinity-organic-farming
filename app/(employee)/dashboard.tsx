import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Bell,
  MapPin,
  ChevronRight,
  UserPlus,
  ClipboardList,
  Target,
  FileText,
  Users,
  Clock,
  Radio,
  CheckCircle2,
} from "lucide-react-native";
import {
  dashboardStats,
  employeeProfile,
  getTodayVisits,
} from "../../data/mockData";
import { useTracking } from "../../context/TrackingContext";
import { api, getAuthUser } from "../../services/api";

export default function DashboardScreen() {
  const [employeeName, setEmployeeName] = useState<string>(employeeProfile.name);
  const [employeeRegion, setEmployeeRegion] = useState<string>("Delta Zone");
  const [stats, setStats] = useState({
    totalVisits: dashboardStats.totalVisits,
    completed: dashboardStats.completed,
    pending: dashboardStats.pending,
    totalFarmers: 8,
  });
  const [todayVisitsList, setTodayVisitsList] = useState<any[]>(getTodayVisits());
  const [loading, setLoading] = useState(false);

  const { isTracking } = useTracking();
  const nextVisit = todayVisitsList.find((v) => v.status === "pending") || todayVisitsList[0];

  const currentHour = new Date().getHours();
  let greeting = "Good Morning";
  if (currentHour >= 12 && currentHour < 17) greeting = "Good Afternoon";
  else if (currentHour >= 17) greeting = "Good Evening";

  useEffect(() => {
    (async () => {
      // 1. Request location permission
      try {
        await Location.requestForegroundPermissionsAsync();
      } catch (e) {
        console.log("Location permission notice:", e);
      }

      // 2. Load stored employee name/region
      try {
        const user = await getAuthUser();
        const storedName = await AsyncStorage.getItem("userName");
        const storedRegion = await AsyncStorage.getItem("userRegion");
        if (user?.name || storedName) {
          setEmployeeName(user?.name || storedName || "Field Officer");
        }
        if (user?.region || storedRegion) {
          setEmployeeRegion(user?.region || storedRegion || "Delta Zone");
        }
      } catch (e) {
        console.log("Stored user load error:", e);
      }

      // 3. Fetch live stats from backend API
      try {
        setLoading(true);
        const res = await api.get("/employee/dashboard");
        if (res?.status === "success" && res?.data) {
          const d = res.data;
          if (d.employee?.name) setEmployeeName(d.employee.name);
          if (d.employee?.region) setEmployeeRegion(d.employee.region);
          setStats({
            totalVisits: d.visits_today || dashboardStats.totalVisits,
            completed: Math.max(0, (d.visits_today || 3) - (d.pending_visits || 1)),
            pending: d.pending_visits ?? dashboardStats.pending,
            totalFarmers: d.total_farmers || 8,
          });
          if (d.recent_visits && d.recent_visits.length > 0) {
            setTodayVisitsList(d.recent_visits);
          }
        }
      } catch (err) {
        console.log("Live dashboard API sync notice:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Aesthetic Agricultural Background Image */}
      <ImageBackground
        source={require("../../assets/images/image7.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.16 }}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header */}
        <View className="bg-white/90 px-5 pt-3 pb-4 border-b border-gray-100 shadow-sm flex-row justify-between items-center z-10 backdrop-blur-md">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/(employee)/profile" as any)}
          className="flex-row items-center flex-1 pr-3"
        >
          <View className="w-12 h-12 rounded-full mr-3 border-2 border-green-600/30 overflow-hidden bg-green-50 items-center justify-center shadow-sm">
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeName)}&background=15803d&color=fff&size=200`,
              }}
              className="w-full h-full"
            />
          </View>
          <View>
            <Text className="text-gray-400 text-xs font-brandon uppercase tracking-wider">
              {greeting}
            </Text>
            <Text className="text-gray-900 text-lg font-gotham-bold leading-tight" numberOfLines={1}>
              {employeeName}
            </Text>
            <Text className="text-green-700 text-[11px] font-brandon font-bold">
              {employeeRegion}
            </Text>
          </View>
        </TouchableOpacity>

        <View className="flex-row items-center space-x-2">
          {loading && <ActivityIndicator size="small" color="#15803d" className="mr-2" />}
          <TouchableOpacity
            onPress={() => router.push("/(employee)/notifications" as any)}
            className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center border border-gray-200 shadow-sm"
            activeOpacity={0.7}
          >
            <Bell size={20} color="#374151" />
            <View className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110, paddingTop: 16 }}
      >
        {/* Silent Live GPS Tracking Active Banner */}
        {isTracking && (
          <View className="px-5 mb-5">
            <View className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex-row items-center">
              <View className="w-9 h-9 bg-emerald-100 rounded-full items-center justify-center mr-3 relative">
                <Radio size={18} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-emerald-900 font-gotham-bold text-sm">
                  Background GPS Tracking Active
                </Text>
                <Text className="text-emerald-700 font-brandon text-xs">
                  Coordinates syncing silently with admin portal.
                </Text>
              </View>
              <CheckCircle2 size={18} color="#059669" />
            </View>
          </View>
        )}

        {/* Today's Schedule Card */}
        <View className="px-5 mb-6">
          <View className="rounded-[24px] overflow-hidden shadow-md border border-gray-100 bg-white">
            <ImageBackground
              source={require("../../assets/images/image2.jpg")}
              className="w-full h-44"
              imageStyle={{ opacity: 0.9 }}
            >
              <View style={StyleSheet.absoluteFill} className="bg-black/60" />

              <View className="flex-1 p-5 justify-between">
                <View className="flex-row justify-between items-center">
                  <Text className="text-white text-xl font-gotham-bold">
                    Today's Schedule
                  </Text>
                  <View className="bg-white/20 px-2.5 py-1 rounded-full border border-white/20">
                    <Text className="text-white text-xs font-brandon font-bold">
                      {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center justify-between bg-white/20 p-3 rounded-2xl border border-white/30 backdrop-blur-md">
                  <View className="items-center flex-1">
                    <Text className="text-white text-2xl font-gotham-bold leading-7">
                      {stats.totalVisits}
                    </Text>
                    <Text className="text-gray-200 text-[10px] font-brandon uppercase tracking-widest">
                      Total
                    </Text>
                  </View>
                  <View className="w-px h-8 bg-white/30" />
                  <View className="items-center flex-1">
                    <Text className="text-green-300 text-2xl font-gotham-bold leading-7">
                      {stats.completed}
                    </Text>
                    <Text className="text-gray-200 text-[10px] font-brandon uppercase tracking-widest">
                      Done
                    </Text>
                  </View>
                  <View className="w-px h-8 bg-white/30" />
                  <View className="items-center flex-1">
                    <Text className="text-amber-300 text-2xl font-gotham-bold leading-7">
                      {stats.pending}
                    </Text>
                    <Text className="text-gray-200 text-[10px] font-brandon uppercase tracking-widest">
                      Pending
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>

        {/* Up Next Scheduled Visit Card */}
        {nextVisit && (
          <View className="px-5 mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-gotham-bold text-gray-900">
                Up Next
              </Text>
              <TouchableOpacity onPress={() => router.push("/(employee)/visits" as any)}>
                <Text className="text-[#15803d] font-gotham-bold text-xs uppercase tracking-wider">
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <View className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100 flex-row">
              <Image
                source={require("../../assets/images/image3.jpg")}
                className="w-1/3 h-full"
                resizeMode="cover"
              />

              <View className="flex-1 p-4">
                <View className="flex-row justify-between items-center mb-2">
                  <View className="bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                    <Text className="text-[#ea580c] font-gotham-bold text-xs">
                      {nextVisit.time || "10:00 AM"}
                    </Text>
                  </View>
                </View>

                <Text
                  className="text-gray-900 font-gotham-bold text-base mb-1"
                  numberOfLines={1}
                >
                  {nextVisit.farmerName || nextVisit.farmer?.name || "Farmer"}
                </Text>

                <View className="flex-row items-center mb-3">
                  <MapPin size={12} color="#6b7280" />
                  <Text
                    className="text-gray-500 text-xs ml-1 font-brandon"
                    numberOfLines={1}
                  >
                    {nextVisit.address || nextVisit.farmer?.address || "Tamil Nadu"}
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push(`/(employee)/visit/${nextVisit.id}` as any)
                  }
                  className="bg-[#15803d] py-2.5 rounded-xl items-center flex-row justify-center shadow-sm"
                >
                  <Text className="text-white font-gotham-bold text-xs mr-1">
                    Start Visit
                  </Text>
                  <ChevronRight size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Quick Actions Grid (Original 2x2 grid restored & enhanced) */}
        <View className="px-5 mb-8">
          <Text className="text-lg font-gotham-bold text-gray-900 mb-3.5">
            Quick Actions
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {/* Register Farmer */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                router.push("/(employee)/register-farmer/step1" as any)
              }
              className="w-[48%] bg-white p-4 rounded-[20px] mb-4 shadow-sm border border-gray-100 items-center justify-center"
            >
              <View className="w-12 h-12 bg-green-50 rounded-2xl items-center justify-center mb-2.5 border border-green-100">
                <UserPlus size={24} color="#15803d" />
              </View>
              <Text className="text-gray-900 font-gotham-bold text-sm text-center">
                Register{"\n"}New Farmer
              </Text>
            </TouchableOpacity>

            {/* Visit History */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/(employee)/visits" as any)}
              className="w-[48%] bg-white p-4 rounded-[20px] mb-4 shadow-sm border border-gray-100 items-center justify-center"
            >
              <View className="w-12 h-12 bg-blue-50 rounded-2xl items-center justify-center mb-2.5 border border-blue-100">
                <ClipboardList size={24} color="#3b82f6" />
              </View>
              <Text className="text-gray-900 font-gotham-bold text-sm text-center">
                Visit{"\n"}History
              </Text>
            </TouchableOpacity>

            {/* My Farmers */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/(employee)/my-farmers" as any)}
              className="w-[48%] bg-white p-4 rounded-[20px] mb-4 shadow-sm border border-gray-100 items-center justify-center"
            >
              <View className="w-12 h-12 bg-amber-50 rounded-2xl items-center justify-center mb-2.5 border border-amber-100">
                <Users size={24} color="#f59e0b" />
              </View>
              <Text className="text-gray-900 font-gotham-bold text-sm text-center">
                My{"\n"}Farmers
              </Text>
            </TouchableOpacity>

            {/* My Reports */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/(employee)/reports" as any)}
              className="w-[48%] bg-white p-4 rounded-[20px] mb-4 shadow-sm border border-gray-100 items-center justify-center"
            >
              <View className="w-12 h-12 bg-purple-50 rounded-2xl items-center justify-center mb-2.5 border border-purple-100">
                <FileText size={24} color="#a855f7" />
              </View>
              <Text className="text-gray-900 font-gotham-bold text-sm text-center">
                My{"\n"}Reports
              </Text>
            </TouchableOpacity>

            {/* Attendance (Clock In/Out) */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push("/(employee)/attendance" as any)}
              className="w-[48%] bg-white p-4 rounded-[20px] shadow-sm border border-gray-100 items-center justify-center"
            >
              <View className="w-12 h-12 bg-pink-50 rounded-2xl items-center justify-center mb-2.5 border border-pink-100">
                <Clock size={24} color="#ec4899" />
              </View>
              <Text className="text-gray-900 font-gotham-bold text-sm text-center">
                Attendance{"\n"}Logs
              </Text>
            </TouchableOpacity>

            {/* Monthly Target */}
            <View className="w-[48%] bg-white p-4 rounded-[20px] shadow-sm border border-gray-100 items-center justify-center">
              <View className="w-12 h-12 bg-orange-50 rounded-2xl items-center justify-center mb-2.5 border border-orange-100">
                <Target size={24} color="#ea580c" />
              </View>
              <Text className="text-gray-900 font-gotham-bold text-sm text-center">
                Monthly Target{"\n"}
                <Text className="text-green-700 text-xs">70% Reached</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  </View>
);
}
