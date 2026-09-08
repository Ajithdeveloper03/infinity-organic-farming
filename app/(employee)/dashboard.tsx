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
  Users,
  Clock,
  Radio,
  Sparkles,
  Zap,
  Play,
  Plus,
  QrCode,
  Award,
  ChevronDown,
  FileCheck2,
  BadgeCheck,
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
  const [clockInTime, setClockInTime] = useState<string>("09:15 AM");

  const { isTracking } = useTracking();
  const nextVisit = todayVisitsList.find((v) => v.status === "pending") || todayVisitsList[0];

  // Google Pay style Assigned Farmers Circular Avatar List (with online free photos)
  const assignedFarmers = [
    {
      id: "1",
      name: "Murugan S",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      phone: "+91 9411111111",
    },
    {
      id: "2",
      name: "Chandra K",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      phone: "+91 9422222222",
    },
    {
      id: "3",
      name: "Swathi M",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      phone: "+91 9433333333",
    },
    {
      id: "4",
      name: "Buhanesh",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      phone: "+91 9444444444",
    },
    {
      id: "5",
      name: "Dhanabal",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      phone: "+91 9455555555",
    },
    {
      id: "6",
      name: "Vijaykumar",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      phone: "+91 9466666666",
    },
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
      {/* Agricultural Hero Background for Top to Main Section with Bottom-to-Top Overlay */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 380,
          overflow: "hidden",
        }}
      >
        <Image
          source={require("../../assets/images/image1.jpg")}
          style={{ width: "100%", height: "100%", opacity: 0.95 }}
          resizeMode="cover"
        />
        {/* Bottom-to-top overlay blending from solid #f8fafc at bottom into translucent top */}
        <LinearGradient
          colors={[
            "rgba(248, 250, 252, 0.05)",
            "rgba(248, 250, 252, 0.35)",
            "#f8fafc",
          ]}
          locations={[0, 0.65, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* HEADER - Transparent Background with Employee Name & ID */}
        <View
          style={{ backgroundColor: "transparent" }}
          className="px-5 pt-2 pb-3 z-10"
        >
          {/* Top Officer Profile, Name & ID (Replaces Search Bar) */}
          <View className="flex-row items-center justify-between">
            <View className="flex-1 mr-3 flex-row items-center">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/(employee)/profile" as any)}
                className="relative mr-3"
              >
                <View className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/40 bg-emerald-100 shadow-sm items-center justify-center">
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              </TouchableOpacity>

              <View className="flex-1 justify-center">
                <View className="flex-row items-center">
                  <Text
                    className="text-white font-gotham-bold text-base tracking-tight"
                    numberOfLines={1}
                  >
                    {employeeName || employeeProfile.name}
                  </Text>
                  <BadgeCheck size={16} color="#059669" className="ml-5" />
                </View>
                <View className="flex-row items-center mt-2">
                  <View className="bg-emerald-100/90 border border-emerald-300/70 px-2 py-0.5 rounded-full flex-row items-center">
                    <Text className="text-emerald-900 font-gotham-bold text-[10px] tracking-wide">
                      ID: {employeeProfile.id} • {employeeProfile.role}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/(employee)/notifications" as any)}
              className="w-10 h-10 rounded-full bg-white/95 items-center justify-center border border-slate-200 shadow-sm"
            >
              <Bell size={18} color="#0f172a" />
              <View className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white" />
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
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
        >
          {/* Google Pay Style Celebratory / Motivational Banner (Light Mode) */}
          {/* Light Multi-Color Target & Achievement Card */}
          {/* <View className="px-5 mb-5">
              <View className="rounded-[24px] overflow-hidden border border-amber-200 bg-amber-50/90 shadow-sm p-4 flex-row items-center justify-between">
                <View className="flex-1 pr-3">
                  <View className="flex-row items-center mb-1">
                    <Award size={16} color="#b45309" />
                    <Text className="text-amber-800 font-gotham-bold text-xs ml-1.5 uppercase tracking-wider">
                      Harvest Target 2026
                    </Text>
                  </View>
                  <Text className="text-amber-950 font-gotham-bold text-base">
                    72% Achieved • 18 Farmers
                  </Text>
                  <Text className="text-amber-800/80 font-brandon text-xs mt-0.5">
                    Monthly Organic Certification on track
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push("/(employee)/reports" as any)}
                  className="bg-amber-600 px-3.5 py-2 rounded-full shadow-sm"
                >
                  <Text className="text-white font-gotham-bold text-xs">
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}

          {/* JioHotstar Style Featured Spotlight Card (Hero Farmer Visit) */}
          {nextVisit && (
            <View className="px-5 mb-6">
              <View className="flex-row justify-between items-center mb-2.5">
                <Text className="text-white font-gotham-bold text-lg">
                  Next Up For You
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(employee)/visits" as any)}
                >
                  <Text className="text-white bg-green-500 px-3 py-2 rounded-full font-gotham-bold text-xs uppercase tracking-wider">
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="rounded-[28px] overflow-hidden shadow-xl border border-slate-200 bg-slate-900">
                <ImageBackground
                  source={require("../../assets/images/image3.jpg")}
                  className="w-full h-72"
                  resizeMode="cover"
                >
                  {/* Mandatory Dark Bottom-to-Top Overlay with Enhanced White Text */}
                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(0, 0, 0, 0.45)",
                      "rgba(10, 15, 25, 0.94)",
                    ]}
                    locations={[0, 0.35, 1]}
                    style={StyleSheet.absoluteFill}
                  />

                  <View className="flex-1 p-5 justify-between">
                    {/* Top Pill Tag */}
                    <View className="flex-row items-center self-start bg-emerald-500 px-3 py-1 rounded-full shadow-sm">
                      <Sparkles size={12} color="#ffffff" />
                      <Text className="text-white font-gotham-bold text-[11px] ml-1 uppercase tracking-wider">
                        Priority Field Visit • {nextVisit.time || "10:30 AM"}
                      </Text>
                    </View>

                    {/* Bottom Details with Enhanced Pure White Text */}
                    <View>
                      <Text className="text-white font-gotham-bold text-2xl mb-1 leading-tight">
                        {nextVisit.farmerName || nextVisit.farmer?.name || "Murugan Organic Farm"}
                      </Text>
                      <View className="flex-row items-center mb-2">
                        <MapPin size={13} color="#34d399" />
                        <Text className="text-emerald-300 font-brandon font-bold text-xs ml-1">
                          {nextVisit.address || nextVisit.farmer?.address || "Thanjavur Ag-Corridor"}
                        </Text>
                        <Text className="text-white/40 mx-1.5">•</Text>
                        <Text className="text-slate-300 font-gotham-medium text-xs">
                          Soil & Bio-Tonic Audit
                        </Text>
                      </View>

                      {/* JioHotstar Style Buttons on Hero Card (+ and Play) */}
                      <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-white/20">
                        <View className="flex-row items-center">
                          <TouchableOpacity
                            onPress={() => router.push("/(employee)/reports" as any)}
                            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center border border-white/30 mr-2.5 shadow-sm"
                          >
                            <Plus size={20} color="#ffffff" />
                          </TouchableOpacity>
                          <Text className="text-white font-brandon font-bold text-xs">
                            Add Note
                          </Text>
                        </View>

                        <TouchableOpacity
                          activeOpacity={0.85}
                          onPress={() =>
                            router.push(`/(employee)/visit/${nextVisit.id}` as any)
                          }
                          className="bg-emerald-500 px-5 py-2.5 rounded-full flex-row items-center shadow-md shadow-emerald-700/40"
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

            {/* Light Multi-Color Shortcut Pill Row */}
            <View className="flex-row justify-between mt-2">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/(employee)/attendance/clock-in" as any)}
                className="flex-1 mr-1.5 bg-sky-50/90 p-2.5 rounded-2xl flex-row items-center border border-sky-200 shadow-sm"
              >
                <Zap size={16} color="#0284c7" />
                <Text className="text-sky-900 font-gotham-bold text-xs ml-1.5">
                  Clock In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/(employee)/attendance/clock-out" as any)}
                className="flex-1 mx-1.5 bg-amber-50/90 p-2.5 rounded-2xl flex-row items-center border border-amber-200 shadow-sm"
              >
                <Clock size={16} color="#d97706" />
                <Text className="text-amber-900 font-gotham-bold text-xs ml-1.5">
                  Clock Out
                </Text>
              </TouchableOpacity>

              <View className="flex-1 ml-1.5 bg-emerald-50/90 p-2.5 rounded-2xl flex-row items-center border border-emerald-200 shadow-sm">
                <Radio size={16} color="#16a34a" />
                <Text className="text-emerald-900 font-gotham-bold text-xs ml-1.5">
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
              {assignedFarmers.map((f, fIdx) => {
                const ringColors = ["#a7f3d0", "#bae6fd", "#fde68a", "#ddd6fe"];
                const ringBorder = ringColors[fIdx % ringColors.length];

                return (
                  <TouchableOpacity
                    key={f.id}
                    activeOpacity={0.8}
                    onPress={() => router.push("/(employee)/my-farmers" as any)}
                    className="items-center mr-4"
                  >
                    <View
                      style={{
                        width: 58,
                        height: 58,
                        borderRadius: 29,
                        overflow: "hidden",
                        borderWidth: 2.5,
                        borderColor: ringBorder,
                        backgroundColor: "#f1f5f9",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 4,
                        elevation: 2,
                      }}
                    >
                      <Image
                        source={{ uri: f.photo }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </View>
                    <Text
                      className="text-slate-800 font-gotham-medium text-xs mt-1.5 text-center w-16"
                      numberOfLines={1}
                    >
                      {f.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}

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
              {todayVisitsList.map((v, i) => {
                const routeThemes = [
                  { cardBg: "bg-emerald-50/90", border: "border-emerald-200", text: "text-emerald-800", iconColor: "#059669" },
                  { cardBg: "bg-sky-50/90", border: "border-sky-200", text: "text-sky-800", iconColor: "#0284c7" },
                  { cardBg: "bg-amber-50/90", border: "border-amber-200", text: "text-amber-800", iconColor: "#d97706" },
                  { cardBg: "bg-purple-50/90", border: "border-purple-200", text: "text-purple-800", iconColor: "#7c3aed" },
                ];
                const rTheme = routeThemes[i % routeThemes.length];

                return (
                  <TouchableOpacity
                    key={v.id || i}
                    activeOpacity={0.85}
                    onPress={() =>
                      router.push(`/(employee)/visit/${v.id}` as any)
                    }
                    className={`w-64 mr-4 rounded-2xl overflow-hidden border ${rTheme.border} ${rTheme.cardBg} shadow-sm`}
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
                      {/* Bottom to top dark overlay for high contrast white text */}
                      <LinearGradient
                        colors={["transparent", "rgba(0, 0, 0, 0.5)", "rgba(10, 15, 25, 0.92)"]}
                        locations={[0, 0.35, 1]}
                        style={StyleSheet.absoluteFill}
                      />

                      <View className="flex-1 p-3 justify-between">
                        <View className="self-end bg-emerald-500 px-2 py-0.5 rounded-md shadow-sm">
                          <Text className="text-white font-gotham-bold text-[11px]">
                            {v.time || "11:00 AM"}
                          </Text>
                        </View>

                        <View>
                          <Text
                            className="text-white font-gotham-bold text-sm"
                            numberOfLines={1}
                          >
                            {v.farmerName || v.farmer?.name || "Farmer Visit"}
                          </Text>
                          <Text
                            className="text-slate-200 font-gotham-medium text-xs"
                            numberOfLines={1}
                          >
                            {v.address || v.farmer?.address || "Tamil Nadu Field"}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>

                    <View className="p-3 flex-row items-center justify-between border-t border-slate-200/60">
                      <Text className={`${rTheme.text} font-gotham-bold text-xs`}>
                        {v.status === "completed" ? "✓ Completed" : "Start Inspection"}
                      </Text>
                      <ChevronRight size={16} color={rTheme.iconColor} />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>

        {/* JioHotstar Style Floating Bottom Pill Dock (Light Mode) */}
        {/* <View className="absolute bottom-24 left-5 right-5 items-center pointer-events-box-none">
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
          </View> */}
      </SafeAreaView>
    </View>
  );
}
