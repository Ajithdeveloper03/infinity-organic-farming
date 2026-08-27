import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { router } from "expo-router";

import {
  CheckCircle2,
  Moon,
  Target,
  Route,
  ChevronLeft,
} from "lucide-react-native";

import { showToast } from "../../../components/ui/ToastMessage";

import { employeeProfile, dashboardStats } from "../../../data/mockData";

import { useTracking } from "../../../context/TrackingContext";

import { LinearGradient } from "expo-linear-gradient";

export default function ClockOutScreen() {
  const [loading, setLoading] = useState(false);

  const { stopSession } = useTracking();
  useEffect(() => {}, []);

  const handleClockOut = async () => {
    setLoading(true);

    /*
 Stop the tracking session await stopSession(); */
    setTimeout(() => {
      setLoading(false);
      showToast({
        title: "Clock Out Successful",
        message: "Have a great evening!",
        type: "success",
      });
      router.replace("/intro" as any);
    }, 1500);
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Background Glow */}
      <View className="absolute top-0 left-0 right-0 h-96">
        <LinearGradient
          colors={["#312e81", "#0A0A0C"]}
          className="w-full h-full opacity-20"
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header Overlay */}
        <View className="px-5 pt-4 pb-4 flex-row items-center z-10 pointer-events-box-none">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-12 h-12 bg-white/90 rounded-full items-center justify-center border border-white/10"
            activeOpacity={0.8}
          >
            <ChevronLeft size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 px-5 justify-center pb-12">
          <View className="mb-10 items-center">
            <View className="w-24 h-24 bg-indigo-500/20 rounded-full items-center justify-center mb-6 border border-indigo-500/30 shadow-lg shadow-indigo-500/20">
              <Moon size={40} color="#818cf8" />
            </View>
            <Text className="text-gray-500 font-gotham-bold text-lg text-center uppercase tracking-widest mb-1">
              Good Evening
            </Text>
            <Text className="text-gray-900 font-gotham-bold text-3xl text-center mb-2">
              {employeeProfile.name}
            </Text>
          </View>
          <View className="w-full mb-8">
            <View className="bg-white rounded-3xl p-5 mb-4 border border-white/5 flex-row items-center shadow-lg">
              <View className="w-12 h-12 bg-green-500/20 rounded-full items-center justify-center mr-4 border border-green-500/30">
                <CheckCircle2 size={24} color="#22c55e" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-gotham-bold text-base mb-1">
                  Visits Completed
                </Text>
                <Text className="text-[#9ca3af] font-brandon text-xs">
                  {dashboardStats.completed}
                  out of {dashboardStats.totalVisits}
                  visits completed
                </Text>
              </View>
              <Text className="text-[#22c55e] font-gotham-bold text-2xl ml-2">
                {dashboardStats.completed}
              </Text>
            </View>
            <View className="bg-white rounded-3xl p-5 mb-4 border border-white/5 flex-row items-center shadow-lg">
              <View className="w-12 h-12 bg-orange-500/20 rounded-full items-center justify-center mr-4 border border-orange-500/30">
                <Route size={24} color="#f97316" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-gotham-bold text-base mb-1">
                  Distance Covered
                </Text>
                <Text className="text-[#9ca3af] font-brandon text-xs">
                  Total distance tracked today
                </Text>
              </View>
              <Text className="text-[#f97316] font-gotham-bold text-xl ml-2">
                42
                <Text className="text-sm">km</Text>
              </Text>
            </View>
            <View className="bg-white rounded-3xl p-5 border border-white/5 flex-row items-center shadow-lg">
              <View className="w-12 h-12 bg-blue-500/20 rounded-full items-center justify-center mr-4 border border-blue-500/30">
                <Target size={24} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-gotham-bold text-base mb-1">
                  Goal Progress
                </Text>
                <Text className="text-[#9ca3af] font-brandon text-xs">
                  {dashboardStats.adminTarget.currentProgress}/
                  {dashboardStats.adminTarget.monthlyGoal}
                  achieved
                </Text>
              </View>
              <Text className="text-[#3b82f6] font-gotham-bold text-2xl ml-2">
                {Math.round(
                  (dashboardStats.adminTarget.currentProgress /
                    dashboardStats.adminTarget.monthlyGoal) *
                    100,
                )}
                %
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleClockOut}
            disabled={loading}
            className="w-full py-5 rounded-full items-center justify-center shadow-lg bg-indigo-600 mb-6"
          >
            <Text className="font-gotham-bold text-lg tracking-wide uppercase text-gray-900">
              {loading ? "Clocking out..." : "Clock Out & Go Home"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center py-2"
          >
            <Text className="text-gray-500 font-gotham-bold tracking-widest text-xs uppercase">
              Wait, I have more visits
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
