import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function AttendanceScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-[#0A0A0C]">
      <View className="px-5 pt-16 pb-4 flex-row items-center border-b border-gray-100 dark:border-white/5">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft size={28} className="text-gray-900 dark:text-white" />
        </TouchableOpacity>
        <Text className="text-xl font-gotham-bold text-gray-900 dark:text-white">
          Attendance
        </Text>
      </View>
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-gray-900 dark:text-white font-gotham-bold text-lg mb-2">
          Attendance Management
        </Text>
        <Text className="text-gray-500 dark:text-white/60 font-brandon text-center">
          Clock in and track your daily work hours here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
