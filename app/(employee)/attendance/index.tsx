import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function AttendanceScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-5 pt-16 pb-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft size={28} className="text-gray-900" />
        </TouchableOpacity>
        <Text className="text-xl font-gotham-bold text-gray-900">
          Attendance
        </Text>
      </View>
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-gray-900 font-gotham-bold text-lg mb-2">
          Attendance Management
        </Text>
        <Text className="text-gray-500 font-brandon text-center">
          Clock in and track your daily work hours here.
        </Text>
      </View>
    </SafeAreaView>
  );
}

