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
import {
  ChevronLeft,
  Clock,
  CalendarDays,
  CheckCircle2,
  LogIn,
  LogOut,
  MapPin,
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
      {/* Background image subtle overlay */}
      <ImageBackground
        source={require("../../../assets/images/image7.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.12 }}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header */}
        <View className="px-5 py-4 bg-white/95 border-b border-gray-100 flex-row items-center justify-between shadow-sm backdrop-blur-md">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center border border-gray-200"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-lg font-gotham-bold text-gray-900">
            Attendance History
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Banner with Background Image */}
          <View className="p-5">
            <View className="rounded-3xl overflow-hidden shadow-md border border-green-800/20">
              <ImageBackground
                source={require("../../../assets/images/image1.jpg")}
                className="w-full"
                resizeMode="cover"
              >
                <View className="p-6 bg-green-950/80">
                  <View className="flex-row items-center mb-2">
                    <CalendarDays size={20} color="#86efac" className="mr-2" />
                    <Text className="text-green-300 font-brandon font-bold text-xs uppercase tracking-widest">
                      Daily Time Tracker
                    </Text>
                  </View>
                  <Text className="text-white font-gotham-bold text-2xl mb-4">
                    Today's Shift
                  </Text>

                  <View className="flex-row justify-between bg-white/10 rounded-2xl p-4 border border-white/20">
                    <View className="items-center flex-1">
                      <Text className="text-white/75 text-xs font-brandon">Status</Text>
                      <Text className="text-emerald-300 font-gotham-bold text-base mt-0.5">
                        {isClockedIn ? "Active Shift" : "Completed"}
                      </Text>
                    </View>
                    <View className="w-px bg-white/20 h-full" />
                    <View className="items-center flex-1">
                      <Text className="text-white/75 text-xs font-brandon">Clock In</Text>
                      <Text className="text-white font-gotham-bold text-base mt-0.5">
                        {clockInTime || "09:15 AM"}
                      </Text>
                    </View>
                    <View className="w-px bg-white/20 h-full" />
                    <View className="items-center flex-1">
                      <Text className="text-white/75 text-xs font-brandon">Shift Target</Text>
                      <Text className="text-white font-gotham-bold text-base mt-0.5">
                        8.0 Hrs
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="px-5 mb-5 flex-row space-x-3">
            <TouchableOpacity
              onPress={() => router.push("/(employee)/attendance/clock-in" as any)}
              className="flex-1 bg-green-700 py-3.5 rounded-xl items-center flex-row justify-center shadow-sm"
              activeOpacity={0.8}
            >
              <LogIn size={18} color="#fff" className="mr-2" />
              <Text className="text-white font-gotham-bold text-sm">Clock In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(employee)/attendance/clock-out" as any)}
              className="flex-1 bg-amber-600 py-3.5 rounded-xl items-center flex-row justify-center shadow-sm"
              activeOpacity={0.8}
            >
              <LogOut size={18} color="#fff" className="mr-2" />
              <Text className="text-white font-gotham-bold text-sm">Clock Out</Text>
            </TouchableOpacity>
          </View>

          {/* Past Attendance Logs */}
          <View className="px-5">
            <Text className="text-gray-900 font-gotham-bold text-base mb-3">
              Recent Attendance Logs
            </Text>

            {[
              {
                date: "Today",
                in: clockInTime || "09:15 AM",
                out: "In Progress",
                hours: "3.5 hrs",
                status: "Present",
                location: "Delta Field Office, Thanjavur",
              },
              {
                date: "Yesterday",
                in: "09:00 AM",
                out: "05:45 PM",
                hours: "8.7 hrs",
                status: "Present",
                location: "Delta Field Office, Thanjavur",
              },
              {
                date: "2 days ago",
                in: "08:50 AM",
                out: "05:30 PM",
                hours: "8.6 hrs",
                status: "Present",
                location: "Kumbakonam Regional Cluster",
              },
            ].map((log, idx) => (
              <View
                key={idx}
                className="bg-white rounded-2xl p-5 mb-3.5 border border-gray-200 shadow-sm"
              >
                <View className="flex-row justify-between items-center mb-3">
                  <View>
                    <Text className="text-gray-900 font-gotham-bold text-base">
                      {log.date}
                    </Text>
                    <View className="flex-row items-center mt-0.5">
                      <MapPin size={12} color="#4b5563" className="mr-1" />
                      <Text className="text-gray-600 text-xs font-brandon">
                        {log.location}
                      </Text>
                    </View>
                  </View>
                  <View className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
                    <Text className="text-emerald-800 text-xs font-gotham-bold uppercase">
                      {log.status}
                    </Text>
                  </View>
                </View>

                <View className="bg-gray-50 rounded-xl p-3 flex-row justify-between border border-gray-100">
                  <View>
                    <Text className="text-gray-500 font-brandon text-xs">Clock In</Text>
                    <Text className="text-gray-900 font-gotham-bold text-sm mt-0.5">{log.in}</Text>
                  </View>
                  <View>
                    <Text className="text-gray-500 font-brandon text-xs">Clock Out</Text>
                    <Text className="text-gray-900 font-gotham-bold text-sm mt-0.5">{log.out}</Text>
                  </View>
                  <View>
                    <Text className="text-gray-500 font-brandon text-xs">Working Time</Text>
                    <Text className="text-green-700 font-gotham-bold text-sm mt-0.5">{log.hours}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
