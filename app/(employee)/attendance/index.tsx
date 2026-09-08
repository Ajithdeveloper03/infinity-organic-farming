import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  Clock,
  CalendarDays,
  CheckCircle2,
  LogIn,
  LogOut,
  MapPin,
  Sparkles,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AttendanceScreen() {
  const [clockInTime, setClockInTime] = useState<string | null>("09:15 AM");
  const [isClockedIn, setIsClockedIn] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const time = await AsyncStorage.getItem("clockInTime");
      const status = await AsyncStorage.getItem("isClockedIn");
      if (time) setClockInTime(time);
      if (status) setIsClockedIn(status === "true");
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ImageBackground
        source={require("../../../assets/images/image7.jpg")}
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
            <Text className="text-lg font-gotham-bold text-slate-900">
              Duty & Attendance
            </Text>
            <View className="w-10" />
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Hero Banner with DARK Overlay & Enhanced Bright White Text */}
            <View className="p-5">
              <View className="rounded-[28px] overflow-hidden shadow-md border border-slate-200 bg-slate-900">
                <ImageBackground
                  source={require("../../../assets/images/image1.jpg")}
                  className="w-full h-52"
                  resizeMode="cover"
                >
                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(0, 0, 0, 0.45)",
                      "rgba(10, 15, 25, 0.94)",
                    ]}
                    locations={[0, 0.25, 1]}
                    style={StyleSheet.absoluteFill}
                  />

                  <View className="flex-1 p-5 justify-between">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center bg-emerald-500 px-3 py-1 rounded-full shadow-sm">
                        <CalendarDays size={14} color="#ffffff" />
                        <Text className="text-white font-gotham-bold text-[11px] ml-1.5 uppercase tracking-wider">
                          Daily Time Tracker
                        </Text>
                      </View>

                      <View className="bg-white/20 px-3 py-1 rounded-full border border-white/30">
                        <Text className="text-white font-gotham-bold text-xs">
                          {isClockedIn ? "● On Duty" : "○ Clocked Out"}
                        </Text>
                      </View>
                    </View>

                    <View>
                      <Text className="text-white font-gotham-bold text-2xl mb-3">
                        Today's Shift Hours
                      </Text>

                      <View className="flex-row justify-between bg-black/40 rounded-2xl p-3.5 border border-white/20">
                        <View className="items-center flex-1">
                          <Text className="text-slate-300 text-[11px] font-brandon uppercase">Clock In</Text>
                          <Text className="text-white font-gotham-bold text-sm mt-0.5">
                            {clockInTime || "09:15 AM"}
                          </Text>
                        </View>
                        <View className="w-px bg-white/20 h-full" />
                        <View className="items-center flex-1">
                          <Text className="text-slate-300 text-[11px] font-brandon uppercase">Shift Duration</Text>
                          <Text className="text-emerald-300 font-gotham-bold text-sm mt-0.5">
                            8.0 Hours
                          </Text>
                        </View>
                        <View className="w-px bg-white/20 h-full" />
                        <View className="items-center flex-1">
                          <Text className="text-slate-300 text-[11px] font-brandon uppercase">Geofence</Text>
                          <Text className="text-blue-300 font-gotham-bold text-sm mt-0.5">
                            Verified
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </View>

            {/* Quick Actions (Clock In / Clock Out Buttons) */}
            <View className="px-5 mb-5 flex-row justify-between">
              <TouchableOpacity
                onPress={() => router.push("/(employee)/attendance/clock-in" as any)}
                className="w-[48%] rounded-2xl overflow-hidden shadow-md"
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#059669", "#047857"]}
                  style={{
                    paddingVertical: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LogIn size={18} color="#fff" className="mr-2" />
                  <Text className="text-white font-gotham-bold text-sm ml-2">Clock In</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/(employee)/attendance/clock-out" as any)}
                className="w-[48%] rounded-2xl overflow-hidden shadow-md"
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#ea580c", "#c2410c"]}
                  style={{
                    paddingVertical: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LogOut size={18} color="#fff" className="mr-2" />
                  <Text className="text-white font-gotham-bold text-sm ml-2">Clock Out</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Past Attendance Logs (White Cards with Crisp Dark Text) */}
            <View className="px-5">
              <Text className="text-slate-900 font-gotham-bold text-base mb-3">
                Recent Attendance History
              </Text>

              {[
                {
                  date: "Today",
                  in: clockInTime || "09:15 AM",
                  out: "In Progress",
                  hours: "Active",
                  status: "Present",
                  color: "#059669",
                  location: "Delta Field Office, Thanjavur",
                },
                {
                  date: "Yesterday",
                  in: "09:00 AM",
                  out: "06:10 PM",
                  hours: "9.1 hrs",
                  status: "Completed",
                  color: "#2563eb",
                  location: "Annur Ag-Cluster, Coimbatore",
                },
                {
                  date: "Sep 06, 2026",
                  in: "08:50 AM",
                  out: "05:30 PM",
                  hours: "8.6 hrs",
                  status: "Completed",
                  color: "#7c3aed",
                  location: "Pollachi Organic Belt",
                },
              ].map((item, idx) => (
                <View
                  key={idx}
                  className="bg-white rounded-[22px] p-4 mb-3 border border-slate-200 shadow-sm"
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <View className="flex-row items-center">
                      <Clock size={16} color={item.color} className="mr-2" />
                      <Text className="text-slate-900 font-gotham-bold text-sm ml-2">
                        {item.date}
                      </Text>
                    </View>
                    <View
                      style={{ backgroundColor: `${item.color}15`, borderColor: `${item.color}35` }}
                      className="px-2.5 py-0.5 rounded-full border"
                    >
                      <Text style={{ color: item.color }} className="text-xs font-gotham-bold">
                        {item.status}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between py-2 border-t border-slate-100">
                    <Text className="text-slate-500 font-brandon text-xs">
                      Time: {item.in} → {item.out}
                    </Text>
                    <Text className="text-emerald-700 font-gotham-bold text-xs">
                      {item.hours}
                    </Text>
                  </View>

                  <View className="flex-row items-center mt-1">
                    <MapPin size={12} color="#64748b" />
                    <Text className="text-slate-600 font-brandon text-xs ml-1">
                      {item.location}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
