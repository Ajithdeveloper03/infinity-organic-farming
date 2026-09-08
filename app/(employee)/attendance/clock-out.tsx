import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  CheckCircle2,
  Moon,
  Target,
  Route,
  ChevronLeft,
  Clock,
  LogOut,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../../components/ui/ToastMessage";
import { employeeProfile, dashboardStats } from "../../../data/mockData";
import { useTracking } from "../../../context/TrackingContext";
import { api, getAuthUser } from "../../../services/api";

export default function ClockOutScreen() {
  const [loading, setLoading] = useState(false);
  const [clockInTime, setClockInTime] = useState<string>("09:15 AM");
  const [officerName, setOfficerName] = useState(employeeProfile.name);
  const { stopSession } = useTracking();

  useEffect(() => {
    (async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        const storedClockIn = await AsyncStorage.getItem("clockInTime");
        if (storedName) setOfficerName(storedName);
        if (storedClockIn) setClockInTime(storedClockIn);
      } catch (e) {
        console.log("Clock out init notice:", e);
      }
    })();
  }, []);

  const handleClockOut = async () => {
    setLoading(true);

    try {
      await api.post("/employee/attendance", {
        action: "check_out",
        latitude: 10.7870,
        longitude: 79.1378,
      }).catch((e) => console.log("Clock out sync catch:", e));
    } catch (e) {
      console.log("Clock out API notice:", e);
    }

    try {
      await stopSession();
    } catch (e) {
      console.log("Tracking stop notice:", e);
    }

    await AsyncStorage.setItem("isClockedIn", "false");

    setTimeout(() => {
      setLoading(false);
      showToast({
        title: "Shift Completed! 🌟",
        message: "Great work today. Have a peaceful evening!",
        type: "success",
      });
      router.replace("/(employee)/dashboard" as any);
    }, 1200);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Background Agriculture Image with Bottom-to-Top White Gradient */}
      <ImageBackground
        source={require("../../../assets/images/image2.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.12 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0.4)",
            "rgba(248, 250, 252, 0.85)",
            "#f8fafc",
          ]}
          locations={[0, 0.25, 1]}
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
              className="w-11 h-11 bg-white rounded-full items-center justify-center border border-slate-200 shadow-sm"
              activeOpacity={0.8}
            >
              <ChevronLeft size={24} color="#0f172a" />
            </TouchableOpacity>

            <View className="flex-row items-center bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200 shadow-sm">
              <Moon size={14} color="#4f46e5" />
              <Text className="text-indigo-900 font-gotham-bold text-xs ml-1.5 uppercase tracking-wider">
                End of Shift
              </Text>
            </View>

            <View className="w-11" />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 150, paddingTop: 10 }}
            >
              {/* Header Greeting */}
              <View className="items-center mt-2 mb-6">
                <View className="w-20 h-20 bg-indigo-100 rounded-full items-center justify-center mb-3 border border-indigo-200 shadow-md">
                  <Moon size={36} color="#4f46e5" />
                </View>
                <Text className="text-indigo-700 font-brandon font-bold text-xs uppercase tracking-widest mb-1">
                  Shift Wrap-Up
                </Text>
                <Text className="text-slate-900 font-gotham-bold text-3xl text-center">
                  {officerName}
                </Text>
                <Text className="text-slate-500 font-brandon text-xs mt-1">
                  Started at {clockInTime} • Delta Zone Field Operations
                </Text>
              </View>

              {/* Shift Metrics Cards (Multi-Color Informative Grid on White Cards) */}
              <View className="mb-6">
                {/* 1. Visits Metric */}
                <View className="bg-white rounded-[24px] p-4 mb-3 border border-slate-200 shadow-sm flex-row items-center">
                  <View className="w-12 h-12 bg-emerald-50 rounded-2xl items-center justify-center mr-4 border border-emerald-200">
                    <CheckCircle2 size={24} color="#059669" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-900 font-gotham-bold text-base mb-0.5">
                      Field Visits Completed
                    </Text>
                    <Text className="text-slate-500 font-brandon text-xs">
                      {dashboardStats.completed} out of {dashboardStats.totalVisits} visits logged
                    </Text>
                  </View>
                  <Text className="text-emerald-700 font-gotham-bold text-2xl">
                    {dashboardStats.completed}
                  </Text>
                </View>

                {/* 2. Route Distance Metric */}
                <View className="bg-white rounded-[24px] p-4 mb-3 border border-slate-200 shadow-sm flex-row items-center">
                  <View className="w-12 h-12 bg-orange-50 rounded-2xl items-center justify-center mr-4 border border-orange-200">
                    <Route size={24} color="#ea580c" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-900 font-gotham-bold text-base mb-0.5">
                      GPS Field Distance
                    </Text>
                    <Text className="text-slate-500 font-brandon text-xs">
                      Live geotracking distance logged
                    </Text>
                  </View>
                  <Text className="text-orange-600 font-gotham-bold text-2xl">
                    38.4<Text className="text-sm font-brandon">km</Text>
                  </Text>
                </View>

                {/* 3. Monthly Goal Metric */}
                <View className="bg-white rounded-[24px] p-4 border border-slate-200 shadow-sm flex-row items-center">
                  <View className="w-12 h-12 bg-blue-50 rounded-2xl items-center justify-center mr-4 border border-blue-200">
                    <Target size={24} color="#2563eb" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-900 font-gotham-bold text-base mb-0.5">
                      Monthly Inspection Goal
                    </Text>
                    <Text className="text-slate-500 font-brandon text-xs">
                      {dashboardStats.adminTarget.currentProgress} / {dashboardStats.adminTarget.monthlyGoal} targets met
                    </Text>
                  </View>
                  <Text className="text-blue-600 font-gotham-bold text-2xl">
                    72%
                  </Text>
                </View>
              </View>

              {/* Clock Out Action Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleClockOut}
                disabled={loading}
                className="w-full rounded-2xl overflow-hidden shadow-lg shadow-indigo-600/25 mb-3"
              >
                <LinearGradient
                  colors={["#4f46e5", "#4338ca"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    paddingVertical: 18,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <>
                      <LogOut size={20} color="#ffffff" className="mr-2" />
                      <Text className="text-white font-gotham-bold text-base uppercase tracking-wider ml-2">
                        Clock Out & End Shift
                      </Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.back()}
                className="items-center py-2"
              >
                <Text className="text-slate-500 font-brandon text-xs uppercase tracking-wider">
                  Cancel • Return to field dashboard
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
