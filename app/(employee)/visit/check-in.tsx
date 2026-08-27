import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Camera, CheckCircle2 } from "lucide-react-native";

export default function CheckInScreen() {
  const { id } = useLocalSearchParams();

  const handleCheckIn = () => {
    // Navigate to tracking or form
    router.push(`/(employee)/visit/tracking?id=${id}` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-[#0A0A0C]">
      <View className="px-5 pt-16 pb-4 flex-row items-center border-b border-gray-100 dark:border-white/5">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft size={28} className="text-gray-900 dark:text-white" />
        </TouchableOpacity>
        <Text className="text-xl font-gotham-bold text-gray-900 dark:text-white">
          Visit Check-In
        </Text>
      </View>
      <ScrollView className="flex-1 px-5 pt-6 content-center">
        <View className="bg-white dark:bg-[#1C1C1E] rounded-[32px] p-8 items-center justify-center border border-gray-100 dark:border-white/5 shadow-xl mt-10">
          <View className="w-24 h-24 bg-blue-500/20 rounded-full items-center justify-center mb-6">
            <Camera size={40} color="#3b82f6" />
          </View>
          <Text className="text-2xl font-gotham-bold text-gray-900 dark:text-white text-center mb-2">
            Location Verified
          </Text>
          <Text className="text-gray-500 dark:text-white/60 text-center font-brandon mb-8">
            You are within 50 meters of the farm. Please take a selfie to
            check-in and start the visit report.
          </Text>

          <TouchableOpacity
            onPress={handleCheckIn}
            className="w-full bg-green-600 py-4 rounded-full items-center justify-center shadow-lg flex-row"
          >
            <CheckCircle2 size={20} color="#fff" className="mr-2" />
            <Text className="text-white font-gotham-bold text-lg">
              Check In Now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
