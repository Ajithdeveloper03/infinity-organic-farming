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
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  MapPin,
  FileText,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Phone,
  Mail,
  Clock,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { employeeProfile } from "../../data/mockData";
import { getAuthUser } from "../../services/api";

export default function ProfileScreen() {
  const [employeeName, setEmployeeName] = useState(employeeProfile.name);
  const [employeeRegion, setEmployeeRegion] = useState("Delta Zone (Thanjavur)");
  const [employeePhone, setEmployeePhone] = useState("+91 98765 43210");
  const [employeeEmail, setEmployeeEmail] = useState("officer@infinityorganics.com");

  useEffect(() => {
    (async () => {
      try {
        const user = await getAuthUser();
        const name = await AsyncStorage.getItem("userName");
        const region = await AsyncStorage.getItem("userRegion");
        const phone = await AsyncStorage.getItem("userPhone");
        if (user?.name || name) setEmployeeName(user?.name || name || "Field Officer");
        if (user?.region || region) setEmployeeRegion(user?.region || region || "Delta Zone");
        if (user?.phone || phone) setEmployeePhone(user?.phone || phone || "+91 98765 43210");
        if (user?.email) setEmployeeEmail(user.email);
      } catch (e) {
        console.log("Profile load notice:", e);
      }
    })();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.multiRemove(["token", "role", "userName", "userRegion", "isClockedIn"]);
    router.replace("/intro" as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ImageBackground
        source={require("../../assets/images/image7.jpg")}
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
              Field Officer ID
            </Text>

            <TouchableOpacity
              onPress={handleLogout}
              className="w-10 h-10 rounded-full bg-rose-50 items-center justify-center border border-rose-200 shadow-sm"
            >
              <LogOut size={18} color="#e11d48" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Officer Identification Hero Card (Light Mode) */}
            <View className="px-5 mt-2 mb-5">
              <View className="rounded-[28px] overflow-hidden bg-white border border-slate-200 shadow-sm">
                {/* Banner with Dark Bottom-to-Top Overlay */}
                <ImageBackground
                  source={require("../../assets/images/image1.jpg")}
                  className="w-full h-36"
                  resizeMode="cover"
                >
                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(0, 0, 0, 0.45)",
                      "rgba(10, 15, 25, 0.94)",
                    ]}
                    locations={[0, 0.35, 1]}
                    style={StyleSheet.absoluteFill}
                  />
                </ImageBackground>

                {/* Avatar & Name Details */}
                <View className="items-center -mt-16 pb-6 px-5">
                  <View className="w-24 h-24 rounded-full p-1 bg-white border-2 border-emerald-600 shadow-md mb-3">
                    <Image
                      source={{
                        uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          employeeName
                        )}&background=059669&color=fff&size=200`,
                      }}
                      className="w-full h-full rounded-full"
                    />
                  </View>

                  <Text className="text-slate-900 font-gotham-bold text-2xl text-center">
                    {employeeName}
                  </Text>

                  <View className="flex-row items-center bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mt-1.5 mb-2">
                    <ShieldCheck size={14} color="#059669" />
                    <Text className="text-emerald-800 font-gotham-bold text-xs ml-1 uppercase tracking-wider">
                      Verified Field Officer • EMP-2026-084
                    </Text>
                  </View>

                  <Text className="text-slate-600 font-brandon font-bold text-xs">
                    {employeeRegion}
                  </Text>
                </View>

                {/* Officer Key Metrics */}
                <View className="flex-row justify-between bg-slate-50 border-t border-slate-100 py-3.5 px-4">
                  <View className="items-center flex-1">
                    <Text className="text-slate-500 font-brandon text-[10px] uppercase">
                      Visits Logged
                    </Text>
                    <Text className="text-emerald-700 font-gotham-bold text-base mt-0.5">
                      142
                    </Text>
                  </View>
                  <View className="w-px bg-slate-200 h-full" />
                  <View className="items-center flex-1">
                    <Text className="text-slate-500 font-brandon text-[10px] uppercase">
                      Farmers
                    </Text>
                    <Text className="text-blue-700 font-gotham-bold text-base mt-0.5">
                      28
                    </Text>
                  </View>
                  <View className="w-px bg-slate-200 h-full" />
                  <View className="items-center flex-1">
                    <Text className="text-slate-500 font-brandon text-[10px] uppercase">
                      Rating
                    </Text>
                    <Text className="text-amber-700 font-gotham-bold text-base mt-0.5">
                      4.9 ★
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Contact & Field Information */}
            <View className="px-5 mb-5">
              <Text className="text-slate-900 font-gotham-bold text-base mb-3">
                Official Information
              </Text>

              <View className="bg-white rounded-[24px] p-4 border border-slate-200 shadow-sm">
                <View className="flex-row items-center py-2.5 border-b border-slate-100">
                  <Phone size={16} color="#059669" className="mr-3" />
                  <View className="flex-1 ml-2">
                    <Text className="text-slate-500 text-[11px] font-brandon">Contact Mobile</Text>
                    <Text className="text-slate-900 font-gotham-bold text-xs">{employeePhone}</Text>
                  </View>
                </View>

                <View className="flex-row items-center py-2.5 border-b border-slate-100">
                  <Mail size={16} color="#2563eb" className="mr-3" />
                  <View className="flex-1 ml-2">
                    <Text className="text-slate-500 text-[11px] font-brandon">Corporate Email</Text>
                    <Text className="text-slate-900 font-gotham-bold text-xs">{employeeEmail}</Text>
                  </View>
                </View>

                <View className="flex-row items-center py-2.5">
                  <MapPin size={16} color="#ea580c" className="mr-3" />
                  <View className="flex-1 ml-2">
                    <Text className="text-slate-500 text-[11px] font-brandon">HQ Assigned Office</Text>
                    <Text className="text-slate-900 font-gotham-bold text-xs">{employeeRegion}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Quick Officer Settings & Actions */}
            <View className="px-5">
              <TouchableOpacity
                onPress={() => router.push("/(employee)/attendance" as any)}
                className="bg-white rounded-2xl p-4 mb-3 border border-slate-200 shadow-sm flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <Clock size={18} color="#059669" />
                  <Text className="text-slate-900 font-gotham-bold text-sm ml-3">
                    Attendance History & Timesheets
                  </Text>
                </View>
                <ChevronRight size={18} color="#64748b" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/(employee)/reports" as any)}
                className="bg-white rounded-2xl p-4 mb-4 border border-slate-200 shadow-sm flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <FileText size={18} color="#2563eb" />
                  <Text className="text-slate-900 font-gotham-bold text-sm ml-3">
                    Inspection Reports & Sign-offs
                  </Text>
                </View>
                <ChevronRight size={18} color="#64748b" />
              </TouchableOpacity>

              {/* Logout Button */}
              <TouchableOpacity
                onPress={handleLogout}
                className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex-row items-center justify-center shadow-sm"
              >
                <LogOut size={18} color="#e11d48" className="mr-2" />
                <Text className="text-rose-700 font-gotham-bold text-sm ml-2">
                  Sign Out of Field Duty
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
