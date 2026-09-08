import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  User,
  CalendarDays,
  MapPin,
  FileText,
  LogOut,
  Settings,
  ChevronRight,
  ShieldCheck,
  Phone,
  Mail,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const [employeeName, setEmployeeName] = useState("Harish");
  const [employeeRegion, setEmployeeRegion] = useState("Delta Zone");

  useEffect(() => {
    (async () => {
      const name = await AsyncStorage.getItem("userName");
      const region = await AsyncStorage.getItem("userRegion");
      if (name) setEmployeeName(name);
      if (region) setEmployeeRegion(region);
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Background image subtle overlay */}
      <ImageBackground
        source={require("../../assets/images/image7.jpg")}
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
          <Text className="text-gray-900 text-lg font-gotham-bold">
            Officer Profile
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Identity Card */}
          <View className="bg-white mx-5 mt-5 rounded-3xl overflow-hidden shadow-sm border border-gray-200">
            <View className="h-28 bg-green-900 relative">
              <ImageBackground
                source={require("../../assets/images/image1.jpg")}
                className="w-full h-full"
                resizeMode="cover"
              >
                <View className="absolute inset-0 bg-green-950/70" />
              </ImageBackground>
            </View>

            <View className="items-center -mt-14 mb-4">
              <View className="w-24 h-24 bg-white rounded-full p-1 shadow-md border-2 border-green-600/30">
                <Image
                  source={{
                    uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeName)}&background=15803d&color=fff&size=200`,
                  }}
                  className="w-full h-full rounded-full"
                />
              </View>
            </View>

            <View className="items-center px-6 pb-6">
              <Text className="text-gray-900 text-2xl font-gotham-bold mb-0.5">
                {employeeName}
              </Text>
              <View className="flex-row items-center bg-green-100 px-3 py-1 rounded-full border border-green-300 mt-1 mb-2">
                <ShieldCheck size={14} color="#15803d" className="mr-1" />
                <Text className="text-green-800 font-gotham-bold text-xs uppercase tracking-wider">
                  Field Officer • {employeeRegion}
                </Text>
              </View>
              <Text className="text-gray-600 font-brandon text-xs">
                Emp ID: IO-FO-2026 • Infinity Organics
              </Text>
            </View>
          </View>

          <Text className="px-6 pt-6 pb-2 text-gray-700 font-gotham-bold text-xs uppercase tracking-wider">
            Field Officer Tools & History
          </Text>

          {/* Menu Items */}
          <View className="bg-white rounded-2xl mx-5 overflow-hidden border border-gray-200 shadow-sm">
            {[
              {
                icon: User,
                label: "Edit Profile Info",
                route: "/(employee)/edit-profile",
                color: "#15803d",
                bgColor: "#f0fdf4",
              },
              {
                icon: CalendarDays,
                label: "My Attendance & Clock History",
                route: "/(employee)/attendance",
                color: "#2563eb",
                bgColor: "#eff6ff",
              },
              {
                icon: MapPin,
                label: "Assigned Farmer Visits",
                route: "/(employee)/visits",
                color: "#d97706",
                bgColor: "#fffbeb",
              },
              {
                icon: FileText,
                label: "Daily Inspection Reports",
                route: "/(employee)/reports",
                color: "#7c3aed",
                bgColor: "#faf5ff",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => router.push(item.route as any)}
                  activeOpacity={0.7}
                  className={`flex-row items-center p-4 ${
                    idx < 3 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <View
                    style={{ backgroundColor: item.bgColor }}
                    className="w-10 h-10 rounded-xl items-center justify-center mr-3.5 border border-gray-100"
                  >
                    <Icon size={20} color={item.color} />
                  </View>
                  <Text className="flex-1 text-gray-900 font-gotham-bold text-sm">
                    {item.label}
                  </Text>
                  <ChevronRight size={18} color="#9ca3af" />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Sign Out Button */}
          <View className="bg-white rounded-2xl mx-5 mt-4 overflow-hidden border border-red-200 shadow-sm">
            <TouchableOpacity
              onPress={() => router.replace("/intro" as any)}
              activeOpacity={0.7}
              className="flex-row items-center p-4"
            >
              <View className="w-10 h-10 rounded-xl bg-red-50 items-center justify-center mr-3.5 border border-red-100">
                <LogOut size={20} color="#dc2626" />
              </View>
              <Text className="flex-1 text-red-600 font-gotham-bold text-sm">
                Sign Out / Return to Intro
              </Text>
              <ChevronRight size={18} color="#fca5a5" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
