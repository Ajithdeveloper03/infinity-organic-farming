import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ChevronLeft, Bell } from "lucide-react-native";
import { router } from "expo-router";

export default function NotificationsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header - Strictly Transparent Background */}
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
            Field Notifications
          </Text>

          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-5 pt-2"
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
        >
          <View className="items-center justify-center mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <View className="w-20 h-20 bg-emerald-50 rounded-full items-center justify-center mb-4 border border-emerald-200">
              <Bell size={36} color="#059669" />
            </View>
            <Text className="text-xl font-gotham-bold text-slate-900 mb-2">
              All Caught Up!
            </Text>
            <Text className="text-slate-500 font-brandon text-center text-xs leading-relaxed px-2">
              No pending alerts. Field schedule, soil audit alerts, and admin updates will appear here in real-time.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
