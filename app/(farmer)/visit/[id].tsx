import React from "react";

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { ChevronLeft, CheckCircle2 } from "lucide-react-native";

export default function FarmerVisitReportScreen() {
  const { id } = useLocalSearchParams();

  const isDark = false;
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-12 pb-4 bg-white flex-row items-center z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 -ml-2 mr-2 bg-gray-50 rounded-full"
        >
          <ChevronLeft size={24} color={isDark ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-gotham-bold">
          Visit Report
        </Text>
      </View>
      <ScrollView className="flex-1 pb-24" showsVerticalScrollIndicator={false}>
        {/* Banner Image */}
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
          }}
          className="w-full h-64"
        />
        <View className="px-6 -mt-12">
          <View className="bg-white rounded-[24px] p-6 shadow-lg border border-gray-100 mb-6">
            <View className="flex-row justify-between items-start mb-6 pb-6 border-b border-gray-100">
              <View>
                <Text className="text-gray-900 font-gotham-bold text-lg">
                  Visit by Arun Kumar
                </Text>
                <Text className="text-gray-500 text-sm mt-1 font-brandon">
                  May 11, 2025 • 10:30 AM
                </Text>
                <Text className="text-gray-400 text-xs mt-1 font-brandon uppercase tracking-wider">
                  Vetiver Farm - Block A
                </Text>
              </View>
              <View className="bg-green-50 px-3 py-1.5 rounded-full">
                <Text className="text-[#15803d] font-gotham-bold text-xs uppercase tracking-wider">
                  Completed
                </Text>
              </View>
            </View>
            <View className="mb-6">
              <View className="flex-row items-center mb-2">
                <CheckCircle2
                  size={16}
                  color={isDark ? "#4ade80" : "#15803d"}
                />
                <Text className="text-gray-900 font-gotham-bold ml-2">
                  Crop Condition
                </Text>
              </View>
              <Text className="text-gray-600 pl-6 font-brandon">Good</Text>
            </View>
            <View className="mb-6">
              <View className="flex-row items-center mb-2">
                <CheckCircle2
                  size={16}
                  color={isDark ? "#4ade80" : "#15803d"}
                />
                <Text className="text-gray-900 font-gotham-bold ml-2">
                  Notes
                </Text>
              </View>
              <Text className="text-gray-600 pl-6 leading-5 font-brandon">
                Plants are healthy and growing well. Growth is as per the
                schedule. No pest issues observed.
              </Text>
            </View>
            <View className="mb-6">
              <Text className="text-gray-900 font-gotham-bold mb-3">
                Photos
              </Text>
              <View className="flex-row space-x-2">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=100&h=100&fit=crop",
                  }}
                  className="w-16 h-16 rounded-xl mr-2"
                />
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop",
                  }}
                  className="w-16 h-16 rounded-xl mr-2"
                />
                <View className="w-16 h-16 bg-gray-50 rounded-xl items-center justify-center border border-gray-200">
                  <Text className="text-gray-500 font-gotham-bold">+4</Text>
                </View>
              </View>
            </View>
            <View className="bg-green-50 rounded-xl p-4 border border-green-100">
              <Text className="text-green-900 font-gotham-bold mb-2 text-sm uppercase tracking-wider">
                Recommendations
              </Text>
              <Text className="text-green-800 leading-5 font-brandon">
                Continue with current irrigation schedule. Apply organic manure
                in next cycle.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push(`/(farmer)/rate/v1` as any)}
            className="w-full bg-[#15803d] py-4 rounded-xl items-center shadow-md mb-4"
          >
            <Text className="text-gray-900 font-gotham-bold text-lg tracking-wide">
              Rate Field Officer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            className="w-full bg-transparent border-2 border-[#15803d] py-3.5 rounded-xl items-center"
          >
            <Text className="text-[#15803d] font-gotham-bold text-lg tracking-wide">
              View Full Report (PDF)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

