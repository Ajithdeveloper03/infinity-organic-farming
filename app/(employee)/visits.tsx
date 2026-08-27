import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { ChevronLeft, MapPin, ChevronRight } from "lucide-react-native";
import { getTodayVisits } from "../../data/mockData";

export default function VisitsScreen() {
  const visits = getTodayVisits();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-[#0A0A0C]">
      <View className="px-5 pt-16 pb-4 flex-row items-center border-b border-gray-100 dark:border-white/5">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft size={28} className="text-gray-900 dark:text-white" />
        </TouchableOpacity>
        <Text className="text-xl font-gotham-bold text-gray-900 dark:text-white">
          Today's Visits
        </Text>
      </View>
      <ScrollView className="flex-1 px-5 pt-6">
        {visits.map((visit) => (
          <TouchableOpacity
            key={visit.id}
            activeOpacity={0.8}
            onPress={() => router.push(`/(employee)/visit/${visit.id}` as any)}
            className="flex-row items-center bg-white dark:bg-[#1C1C1E] p-4 rounded-[20px] mb-3 border border-gray-100 dark:border-white/5"
          >
            <View className="w-16 h-16 rounded-[14px] bg-gray-100 dark:bg-[#2C2C2E] items-center justify-center mr-4">
              <Text className="text-[#10b981] font-gotham-bold text-sm">
                {visit.time.split(" ")[0]}
              </Text>
              <Text className="text-gray-400 dark:text-white/50 font-brandon text-[10px] uppercase">
                {visit.time.split(" ")[1]}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-gray-900 dark:text-white font-gotham-bold text-base mb-1">
                {visit.farmer?.name}
              </Text>
              <View className="flex-row items-center">
                <MapPin size={12} color="#8E8E93" />
                <Text className="text-[#8E8E93] text-xs ml-1 font-brandon">
                  {visit.farmer?.address}
                </Text>
              </View>
            </View>
            <ChevronRight
              size={20}
              className="text-gray-400 dark:text-white/40"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
