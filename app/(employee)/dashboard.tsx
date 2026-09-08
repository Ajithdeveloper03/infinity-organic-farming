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
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Bell,
  MapPin,
  ChevronRight,
  UserPlus,
  ClipboardList,
  FileText,
  Users,
  Clock,
  Radio,
  Search,
  Sparkles,
  Zap,
  Play,
  Plus,
  QrCode,
  Award,
  ChevronDown,
  Navigation,
  FileCheck2,
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [stats, setStats] = useState({
    totalVisits: dashboardStats.totalVisits,
    completed: dashboardStats.completed,
    pending: dashboardStats.pending,
    totalFarmers: 8,
  });
  const [todayVisitsList, setTodayVisitsList] = useState<any[]>(getTodayVisits());
  const [loading, setLoading] = useState(false);
  const [clockInTime, setClockInTime] = useState<string>("09:15 AM");

  const { isTracking } = useTracking();
  const nextVisit = todayVisitsList.find((v) => v.status === "pending") || todayVisitsList[0];

  // Google Pay style Assigned Farmers Circular Avatar List
  const assignedFarmers = [
    { id: "1", name: "Murugan S", initial: "M", bg: "#2563eb", phone: "+91 9411111111" },
    { id: "2", name: "Chandra K", initial: "C", bg: "#7c3aed", phone: "+91 9422222222" },
    { id: "3", name: "Swathi M", initial: "S", bg: "#db2777", phone: "+91 9433333333" },
    { id: "4", name: "Buhanesh", initial: "B", bg: "#059669", phone: "+91 9444444444" },
    { id: "5", name: "Dhanabal", initial: "D", bg: "#d97706", phone: "+91 9455555555" },
    { id: "6", name: "Vijaykumar", initial: "V", bg: "#4f46e5", phone: "+91 9466666666" },
  ];

  useEffect(() => {
    (async () => {
      try {
        await Location.requestForegroundPermissionsAsync();
      } catch (e) {
        console.log("Location permission notice:", e);
      }

      try {
        const user = await getAuthUser();
        const storedName = await AsyncStorage.getItem("userName");
        const storedRegion = await AsyncStorage.getItem("userRegion");
        const storedClockIn = await AsyncStorage.getItem("clockInTime");
        if (user?.name || storedName) {
          setEmployeeName(user?.name || storedName || "Field Officer");
        }
        if (user?.region || storedRegion) {
          setEmployeeRegion(user?.region || storedRegion || "Delta Zone");
        }
        if (storedClockIn) {
          setClockInTime(storedClockIn);
        }
      } catch (e) {
        console.log("Stored user load error:", e);
      }

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
      {/* Aesthetic Agricultural Background Image with Bottom-to-Top White Overlay */}
      <ImageBackground
        source={require("../../assets/images/image7.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.12 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.4)", "rgba(248, 250, 252, 0.85)", "#f8fafc"]}
          locations={[0, 0.35, 1]}
          style={StyleSheet.absoluteFill}
        />

        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
          {/* HEADER - Strictly Transparent Background (Light Mode) */}
          <View
            style={{ backgroundColor: "transparent" }}
            className="px-5 pt-2 pb-3 z-10"
          >
            {/* Google Pay Style Top Search & Profile Bar */}
            <View className="flex-row items-center justify-between">
              <View className="flex-1 mr-3 flex-row items-center bg-white px-3.5 py-2.5 rounded-full border border-slate-200 shadow-sm">
                <Search size={18} color="#64748b" />
                <TextInput
                  placeholder="Search farmers, visits, schemes..."
                  placeholderTextColor="#94a3b8"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="flex-1 ml-2 text-slate-900 font-brandon text-sm py-0"
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/(employee)/notifications" as any)}
                className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-200 shadow-sm mr-2.5"
              >
                <Bell size={18} color="#0f172a" />
                <View className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white" />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/(employee)/profile" as any)}
                className="relative"
              >
                <View className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-600 bg-emerald-50 shadow-sm">
                  <Image
                    source={{
                      uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        employeeName
                      )}&background=059669&color=fff&size=100`,
                    }}
                    className="w-full h-full"
                  />
                </View>
                <View className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
              </TouchableOpacity>
            </View>

            {/* JioHotstar Style Dual Glowing Switcher Badges */}
            <View className="flex-row items-center justify-between mt-3.5">
              {/* Badge 1: Region / Hotstar style */}
              <View className="flex-1 mr-2 rounded-full overflow-hidden shadow-md shadow-emerald-600/20">
                <LinearGradient
                  colors={["#059669", "#047857"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 9,
                    paddingHorizontal: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 999,
                  }}
                >
                  <Sparkles size={14} color="#a7f3d0" />
                  <Text className="text-white font-gotham-bold text-xs ml-1.5 uppercase tracking-wider">
                    {employeeRegion}
                  </Text>
                </LinearGradient>
              </View>

              {/* Badge 2: Tadka style Live Shift */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/(employee)/attendance" as any)}
                className="flex-1 ml-2 rounded-full overflow-hidden shadow-md shadow-orange-600/20"
              >
                <LinearGradient
                  colors={["#ea580c", "#dc2626"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 9,
                    paddingHorizontal: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 999,
                  }}
                >
                  <Zap size={14} color="#fef08a" />
                  <Text className="text-white font-gotham-bold text-xs ml-1.5 uppercase tracking-wider">
                    Shift {clockInTime}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120, paddingTop: 4 }}
          >
            {/* Google Pay Style Celebratory / Motivational Banner (Light Mode) */}
            <View className="px-5 mb-4">
              <View className="rounded-[22px] overflow-hidden border border-amber-200 bg-amber-50 shadow-sm p-3.5 flex-row items-center justify-between">
                <View className="flex-1 pr-2">
                  <View className="flex-row items-center mb-0.5">
                    <Award size={15} color="#b45309" />
                    <Text className="text-amber-800 font-gotham-bold text-xs ml-1 uppercase tracking-wider">
                      Harvest Target 2026
                    </Text>
                  </View>
                  <Text className="text-amber-950 font-gotham-bold text-base">
                    72% Achieved • 18 Farmers
                  </Text>
                  <Text className="text-amber-700 font-brandon text-xs mt-0.5">
                    Keep pushing to reach monthly organic certification goal!
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => router.push("/(employee)/reports" as any)}
                  className="bg-amber-600 px-3 py-1.5 rounded-full shadow-sm"
                >
                  <Text className="text-white font-gotham-bold text-xs">
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* JioHotstar Style Featured Spotlight Card (Hero Farmer Visit) */}
            {nextVisit && (
              <View className="px-5 mb-6">
                <View className="flex-row justify-between items-center mb-2.5">
                  <Text className="text-slate-900 font-gotham-bold text-lg">
                    Next Up For You
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.push("/(employee)/visits" as any)}
                  >
                    <Text className="text-emerald-700 font-gotham-bold text-xs uppercase tracking-wider">
                      View All
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="rounded-[28px] overflow-hidden shadow-md border border-slate-200 bg-white">
                  <ImageBackground
                    source={require("../../assets/images/image3.jpg")}
                    className="w-full h-72"
                    resizeMode="cover"
                  >
                    {/* Mandatory Bottom-to-Top White-to-Transparent Overlay for Pristine Readability */}
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
                      {/* Top Pill Tag */}
                      <View className="flex-row items-center self-start bg-emerald-700 px-3 py-1 rounded-full shadow-sm">
                        <Sparkles size={12} color="#ffffff" />
                        <Text className="text-white font-gotham-bold text-[11px] ml-1 uppercase tracking-wider">
                          Priority Field Visit • {nextVisit.time || "10:30 AM"}
                        </Text>
                      </View>

                      {/* Bottom Details with 100% High Contrast Dark Text */}
                      <View>
                        <Text className="text-slate-900 font-gotham-bold text-2xl mb-1 leading-tight">
                          {nextVisit.farmerName || nextVisit.farmer?.name || "Murugan Organic Farm"}
                        </Text>
                        <View className="flex-row items-center mb-2">
                          <MapPin size={13} color="#059669" />
                          <Text className="text-emerald-800 font-brandon font-bold text-xs ml-1">
                            {nextVisit.address || nextVisit.farmer?.address || "Thanjavur Ag-Corridor"}
                          </Text>
                          <Text className="text-slate-400 mx-1.5">•</Text>
                          <Text className="text-slate-600 font-brandon text-xs">
                            Soil & Bio-Tonic Audit
                          </Text>
                        </View>

                        {/* JioHotstar Style Buttons on Hero Card (+ and Play) */}
                        <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-slate-200">
                          <View className="flex-row items-center">
                            <TouchableOpacity
                              onPress={() => router.push("/(employee)/reports" as any)}
                              className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center border border-slate-200 mr-2.5 shadow-sm"
                            >
                              <Plus size={20} color="#0f172a" />
                            </TouchableOpacity>
                            <Text className="text-slate-700 font-brandon font-bold text-xs">
                              Add Note
                            </Text>
                          </View>

                          <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() =>
                              router.push(`/(employee)/visit/${nextVisit.id}` as any)
                            }
                            className="bg-emerald-600 px-5 py-2.5 rounded-full flex-row items-center shadow-md shadow-emerald-700/30"
                          >
                            <Play size={16} color="#ffffff" fill="#ffffff" />
                            <Text className="text-white font-gotham-bold text-sm ml-2">
                              Start Visit
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </View>
            )}

            {/* Google Pay Style 4 Vibrant Action Grid (Light Mode) */}
            <View className="px-5 mb-6">
              <Text className="text-slate-900 font-gotham-bold text-lg mb-3">
                Quick Actions
              </Text>

              <View className="flex-row justify-between mb-3.5">
                {/* 1. Register Farmer (Vibrant Royal Blue) */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push("/(employee)/register-farmer/step1" as any)
                  }
                  className="w-[23%] items-center"
                >
                  <LinearGradient
                    colors={["#2563eb", "#1d4ed8"]}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      shadowColor: "#2563eb",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.25,
                      shadowRadius: 6,
                      elevation: 5,
                    }}
                  >
                    <UserPlus size={26} color="#ffffff" />
                  </LinearGradient>
                  <Text className="text-slate-900 font-gotham-bold text-xs text-center mt-2">
                    Register{"\n"}Farmer
                  </Text>
                </TouchableOpacity>

                {/* 2. Scan & Log Visit (Vibrant Emerald) */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push("/(employee)/visits" as any)}
                  className="w-[23%] items-center"
                >
                  <LinearGradient
                    colors={["#059669", "#047857"]}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      shadowColor: "#059669",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.25,
                      shadowRadius: 6,
                      elevation: 5,
                    }}
                  >
                    <QrCode size={26} color="#ffffff" />
                  </LinearGradient>
                  <Text className="text-slate-900 font-gotham-bold text-xs text-center mt-2">
                    Log{"\n"}Visit
                  </Text>
                </TouchableOpacity>

                {/* 3. Attendance Logs (Vibrant Violet) */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push("/(employee)/attendance" as any)}
                  className="w-[23%] items-center"
                >
                  <LinearGradient
                    colors={["#7c3aed", "#6d28d9"]}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      shadowColor: "#7c3aed",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.25,
                      shadowRadius: 6,
                      elevation: 5,
                    }}
                  >
                    <Clock size={26} color="#ffffff" />
                  </LinearGradient>
                  <Text className="text-slate-900 font-gotham-bold text-xs text-center mt-2">
                    Duty{"\n"}Logs
                  </Text>
                </TouchableOpacity>

                {/* 4. Field Reports (Vibrant Amber / Coral) */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push("/(employee)/reports" as any)}
                  className="w-[23%] items-center"
                >
                  <LinearGradient
                    colors={["#ea580c", "#c2410c"]}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      shadowColor: "#ea580c",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.25,
                      shadowRadius: 6,
                      elevation: 5,
                    }}
                  >
                    <FileCheck2 size={26} color="#ffffff" />
                  </LinearGradient>
                  <Text className="text-slate-900 font-gotham-bold text-xs text-center mt-2">
                    Field{"\n"}Reports
                  </Text>
                </TouchableOpacity>
              </View>

              {/* GPay Style Mini Shortcut Pill Row (Light Mode) */}
              <View className="flex-row justify-between mt-2">
                <TouchableOpacity
                  onPress={() => router.push("/(employee)/attendance/clock-in" as any)}
                  className="flex-1 mr-1.5 bg-white p-2.5 rounded-2xl flex-row items-center border border-slate-200 shadow-sm"
                >
                  <Zap size={16} color="#0284c7" />
                  <Text className="text-slate-800 font-gotham-bold text-xs ml-1.5">
                    Clock In
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/(employee)/attendance/clock-out" as any)}
                  className="flex-1 mx-1.5 bg-white p-2.5 rounded-2xl flex-row items-center border border-slate-200 shadow-sm"
                >
                  <Clock size={16} color="#d97706" />
                  <Text className="text-slate-800 font-gotham-bold text-xs ml-1.5">
                    Clock Out
                  </Text>
                </TouchableOpacity>

                <View className="flex-1 ml-1.5 bg-white p-2.5 rounded-2xl flex-row items-center border border-slate-200 shadow-sm">
                  <Radio size={16} color="#16a34a" />
                  <Text className="text-slate-800 font-gotham-bold text-xs ml-1.5">
                    GPS Live
                  </Text>
                </View>
              </View>
            </View>

            {/* Google Pay Style "People" Section: Assigned Farmers Circular Avatars (Light Mode) */}
            <View className="px-5 mb-6">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-slate-900 font-gotham-bold text-lg">
                  Assigned Farmers
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(employee)/my-farmers" as any)}
                >
                  <Text className="text-emerald-700 font-gotham-bold text-xs uppercase tracking-wider">
                    Directory
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
              >
                {assignedFarmers.map((f) => (
                  <TouchableOpacity
                    key={f.id}
                    activeOpacity={0.8}
                    onPress={() => router.push("/(employee)/my-farmers" as any)}
                    className="items-center mr-4"
                  >
                    <View className="relative">
                      <View
                        style={{
                          width: 58,
                          height: 58,
                          borderRadius: 29,
                          backgroundColor: f.bg,
                          alignItems: "center",
                          justifyContent: "center",
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.15,
                          shadowRadius: 4,
                          elevation: 3,
                        }}
                      >
                        <Text className="text-white font-gotham-bold text-xl">
                          {f.initial}
                        </Text>
                      </View>
                      <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                    </View>
                    <Text
                      className="text-slate-800 font-gotham-bold text-xs mt-1.5 text-center w-16"
                      numberOfLines={1}
                    >
                      {f.name}
                    </Text>
                  </TouchableOpacity>
                ))}

                {/* More Farmer Button */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push("/(employee)/my-farmers" as any)}
                  className="items-center mr-4"
                >
                  <View
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 29,
                      backgroundColor: "#f1f5f9",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#cbd5e1",
                    }}
                  >
                    <ChevronDown size={22} color="#475569" />
                  </View>
                  <Text className="text-slate-700 font-gotham-bold text-xs mt-1.5">
                    More
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            {/* JioHotstar Style "Continue Inspection" Today's Route Carousel (Light Mode) */}
            <View className="px-5 mb-6">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-slate-900 font-gotham-bold text-lg">
                  Today's Field Route ({stats.completed}/{stats.totalVisits})
                </Text>
                <View className="flex-row items-center bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Text className="text-emerald-800 font-gotham-bold text-xs">
                    {stats.pending} Pending
                  </Text>
                </View>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
              >
                {todayVisitsList.map((v, i) => (
                  <TouchableOpacity
                    key={v.id || i}
                    activeOpacity={0.85}
                    onPress={() =>
                      router.push(`/(employee)/visit/${v.id}` as any)
                    }
                    className="w-64 mr-4 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm"
                  >
                    <ImageBackground
                      source={
                        i === 0
                          ? require("../../assets/images/image1.jpg")
                          : i === 1
                          ? require("../../assets/images/image2.jpg")
                          : require("../../assets/images/image5.jpg")
                      }
                      className="w-full h-32"
                      resizeMode="cover"
                    >
                      {/* Bottom to top white overlay for high contrast text */}
                      <LinearGradient
                        colors={["transparent", "rgba(255, 255, 255, 0.7)", "#ffffff"]}
                        style={StyleSheet.absoluteFill}
                      />

                      <View className="flex-1 p-3 justify-between">
                        <View className="self-end bg-emerald-700 px-2 py-0.5 rounded-md shadow-sm">
                          <Text className="text-white font-gotham-bold text-[11px]">
                            {v.time || "11:00 AM"}
                          </Text>
                        </View>

                        <View>
                          <Text
                            className="text-slate-900 font-gotham-bold text-sm"
                            numberOfLines={1}
                          >
                            {v.farmerName || v.farmer?.name || "Farmer Visit"}
                          </Text>
                          <Text
                            className="text-slate-600 font-brandon text-xs"
                            numberOfLines={1}
                          >
                            {v.address || v.farmer?.address || "Tamil Nadu Field"}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>

                    <View className="p-3 flex-row items-center justify-between border-t border-slate-100">
                      <Text className="text-emerald-700 font-gotham-bold text-xs">
                        {v.status === "completed" ? "✓ Completed" : "Start Inspection"}
                      </Text>
                      <ChevronRight size={16} color="#059669" />
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </ScrollView>

          {/* JioHotstar Style Floating Bottom Pill Dock (Light Mode) */}
          <View className="absolute bottom-24 left-5 right-5 items-center pointer-events-box-none">
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 999,
                backgroundColor: "#ffffff",
                borderWidth: 1,
                borderColor: "#e2e8f0",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: 8,
              }}
            >
              <View className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2" />
              <Text className="text-slate-900 font-gotham-bold text-xs uppercase tracking-wider">
                GPS Live • Shift: Active •
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(employee)/visits" as any)}
                className="ml-2 bg-emerald-600 px-3 py-1 rounded-full shadow-sm"
              >
                <Text className="text-white font-gotham-bold text-[11px]">
                  Quick Log
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
