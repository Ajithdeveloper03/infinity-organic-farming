import React from "react";

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { router } from "expo-router";

import {
  ChevronLeft,
  User,
  CalendarDays,
  MapPin,
  FileText,
  Menu,
  LogOut,
  Settings,
} from "lucide-react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header with extra top padding for notch */}
      <View className="px-5 pt-16 pb-4 flex-row items-center justify-center relative">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute left-5 p-2 rounded-full hover:bg-white/10 z-10"
        >
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-base font-gotham-bold">
          rajesh.kumar@infinity.com
        </Text>
      </View>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Profile Identity */}
        <View className="items-center py-6 mb-4">
          <View className="p-1 rounded-full border-4 border-blue-500 mb-4">
            <Image
              source={{
                uri: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=1c1c1e&color=fff&size=200",
              }}
              className="w-24 h-24 rounded-full"
            />
            <View className="absolute bottom-0 right-0 bg-[#282828] p-1.5 rounded-full border border-[#1C1C1E]">
              <Settings size={14} color="#fff" />
            </View>
          </View>
          <Text className="text-gray-900 text-2xl font-gotham-bold mb-1">
            Hi, Rajesh!
          </Text>
          <Text className="text-gray-400 font-brandon text-sm">
            Field Officer • Salem Region
          </Text>
        </View>
        <Text className="px-5 py-4 text-[#9ca3af] font-brandon text-xs uppercase tracking-widest">
          Employee Tools
        </Text>
        {/* Clean Menu Items */}
        <View className="bg-white rounded-[24px] mx-5 overflow-hidden">
          <TouchableOpacity
            onPress={() => router.push("/(employee)/edit-profile" as any)}
            className="flex-row items-center p-5 border-b border-white/5"
          >
            <User size={22} color="#fff" strokeWidth={1.5} />
            <Text className="flex-1 text-gray-900 font-brandon-medium text-base ml-4">
              Edit Profile Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(employee)/attendance" as any)}
            className="flex-row items-center p-5 border-b border-white/5"
          >
            <CalendarDays size={22} color="#fff" strokeWidth={1.5} />
            <Text className="flex-1 text-gray-900 font-brandon-medium text-base ml-4">
              My Attendance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(employee)/visits" as any)}
            className="flex-row items-center p-5 border-b border-white/5"
          >
            <MapPin size={22} color="#fff" strokeWidth={1.5} />
            <Text className="flex-1 text-gray-900 font-brandon-medium text-base ml-4">
              My Visits
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(employee)/reports" as any)}
            className="flex-row items-center p-5"
          >
            <FileText size={22} color="#fff" strokeWidth={1.5} />
            <Text className="flex-1 text-gray-900 font-brandon-medium text-base ml-4">
              Daily Reports
            </Text>
          </TouchableOpacity>
        </View>
        <View className="bg-white rounded-[24px] mx-5 mt-4 overflow-hidden border border-red-500/20">
          <TouchableOpacity
            onPress={() => router.replace("/intro" as any)}
            className="flex-row items-center p-5"
          >
            <LogOut size={22} color="#ef4444" strokeWidth={1.5} />
            <Text className="flex-1 text-red-500 font-brandon-medium text-base ml-4">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
