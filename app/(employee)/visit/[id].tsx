import React, { useEffect } from "react";

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  Leaf,
  CalendarClock,
  History,
  CheckCircle2,
} from "lucide-react-native";

import { getVisitWithFarmer } from "../../../data/mockData";

import { showToast } from "../../../components/ui/ToastMessage";

import { LinearGradient } from "expo-linear-gradient";

export default function VisitDetailsScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const visit = id ? getVisitWithFarmer(id) : null;
  useEffect(() => {
    if (visit?.status === "upcoming") {
      showToast({
        title: "Upcoming Visit Reminder",
        message: `Next visit for ${visit.farmer?.name}
is in 5 days. Please be prepared.`,
        type: "info",
        duration: 4000,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visit?.status]);
  if (!visit || !visit.farmer) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500 font-brandon">
          Visit details not found.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-green-600 px-6 py-3 rounded-full"
        >
          <Text className="text-gray-900 font-gotham-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const InfoRow = ({ icon: Icon, label, value, color }: any) => (
    <View className="flex-row items-center py-4 border-b border-white/5">
      <View
        className="w-10 h-10 rounded-[12px] items-center justify-center mr-4"
        style={{
          backgroundColor: `${color}20`,
          borderColor: `${color}30`,
          borderWidth: 1,
        }}
      >
        <Icon size={18} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-[#9ca3af] font-gotham-bold text-[10px] uppercase tracking-widest">
          {label}
        </Text>
        <Text className="text-gray-900 font-gotham-bold text-base mt-0.5">
          {value}
        </Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Background Glow */}
      <View className="absolute top-0 left-0 right-0 h-80">
        <Image
          source={require("../../../assets/images/image1.jpg")}
          className="w-full h-full opacity-20"
        />
        <LinearGradient
          colors={["transparent", "#0A0A0C"]}
          style={StyleSheet.absoluteFill}
        />
      </View>
      {/* Header */}
      <View className="px-5 pt-16 pb-4 flex-row items-center z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-12 h-12 bg-white/90 rounded-full items-center justify-center border border-white/10 mr-4"
          activeOpacity={0.8}
        >
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <View className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 mr-3">
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(visit.farmer.name)}&background=15803d&color=fff`,
            }}
            className="w-full h-full"
          />
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 font-gotham-bold text-lg">
            {visit.farmer.name}
          </Text>
          <Text
            className="text-gray-500 text-xs font-brandon"
            numberOfLines={1}
          >
            {visit.farmer.address}
          </Text>
        </View>
      </View>
      <ScrollView
        className="flex-1 px-5 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Info List */}
        <View className="bg-white rounded-[32px] p-6 shadow-2xl border border-white/5 mb-8">
          <InfoRow
            icon={Calendar}
            label="Visit Date"
            value={visit.date}
            color="#10b981"
          />
          <InfoRow
            icon={Clock}
            label="Visit Time"
            value={visit.time}
            color="#3b82f6"
          />
          <InfoRow
            icon={MapPin}
            label="Farm Area"
            value={visit.farmer.farmArea}
            color="#f59e0b"
          />
          <InfoRow
            icon={Leaf}
            label="Crop Type"
            value={visit.farmer.cropType}
            color="#ec4899"
          />
          <InfoRow
            icon={History}
            label="Previous Visit"
            value={visit.previousVisitDate || "First Visit"}
            color="#8b5cf6"
          />
          <InfoRow
            icon={CalendarClock}
            label="Frequency"
            value={visit.visitFrequency}
            color="#14b8a6"
          />
          <View className="pt-5 pb-2">
            <Text className="text-gray-500 font-gotham-bold text-[10px] uppercase tracking-widest mb-2">
              Remarks / Notes
            </Text>
            <Text className="text-gray-900 text-sm leading-5 font-brandon-medium">
              {visit.remarks ||
                "Ensure to check the soil moisture levels and provide adequate fertilizer recommendations."}
            </Text>
          </View>
        </View>
        {/* Start Visit Button - navigates to Check In (Screen 5) */}
        {visit.status !== "completed" ? (
          <View className="pb-24">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/(employee)/visit/check-in",
                  params: {
                    id: visit.id,
                  },
                } as any)
              }
              className="bg-green-600 w-full py-5 rounded-full items-center justify-center shadow-lg shadow-green-600/30"
            >
              <Text className="font-gotham-bold text-lg tracking-wide uppercase text-gray-900">
                Start Visit Workflow
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="pb-24">
            <View className="bg-green-500/10 border border-green-500/20 w-full py-5 rounded-[24px] flex-row items-center justify-center">
              <CheckCircle2 size={24} color="#4ade80" className="mr-3" />
              <Text className="font-gotham-bold text-lg text-green-400">
                Visit Completed
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
