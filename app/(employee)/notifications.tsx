import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ChevronLeft, Bell } from "lucide-react-native";
import { router } from "expo-router";

export default function NotificationsScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-5 pt-4 pb-4 flex-row items-center border-b border-gray-200 bg-white">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center -ml-2"
            accessibilityRole="button"
          >
            <ChevronLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-lg font-gotham-bold text-gray-900 mr-8">
            Notifications
          </Text>
        </View>

        <ScrollView className="flex-1 px-5 pt-6">
          <View className="items-center justify-center mt-20">
            <View className="w-20 h-20 bg-blue-50 rounded-full items-center justify-center mb-4">
              <Bell size={40} color="#3b82f6" />
            </View>
            <Text className="text-xl font-gotham-bold text-gray-900 mb-2">
              No new notifications
            </Text>
            <Text className="text-gray-500 font-brandon text-center px-4">
              You're all caught up! Check back later for updates on your visits and reports.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
