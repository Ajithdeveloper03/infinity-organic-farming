import React from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

/*
 eslint-disable-next-line @typescript-eslint/no-unused-vars  */
import {
  ChevronLeft,
  Bell,
  Calendar,
  FileText,
  Leaf,
  IndianRupee,
} from "lucide-react-native";

const notifications = [
  {
    id: "1",
    title: "Upcoming Visit Reminder",
    desc: "Arun Kumar will visit your farm on May 28, 2025.",
    time: "15m ago",
    icon: Calendar,
    color: "#ea580c",
    bg: "bg-orange-50",
  },
  {
    id: "2",
    title: "Visit Report Submitted",
    desc: "Arun Kumar has submitted the visit report.",
    time: "2h ago",
    icon: FileText,
    color: "#3b82f6",
    bg: "bg-blue-50",
  },
  {
    id: "3",
    title: "Irrigation Recommendation",
    desc: "New recommendation available for your farm.",
    time: "1d ago",
    icon: Leaf,
    color: "#15803d",
    bg: "bg-green-50",
  },
  {
    id: "4",
    title: "Payment Received",
    desc: "₹5,000 received on May 10, 2025 for last cycle.",
    time: "2d ago",
    icon: IndianRupee,
    color: "#15803d",
    bg: "bg-green-50",
  },
];

export default function FarmerNotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header - Transparent */}
      <View style={{ backgroundColor: "transparent" }} className="px-5 pt-2 pb-3 flex-row items-center justify-between z-10">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-200 shadow-sm mr-3"
          >
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-lg font-gotham-bold">
            Notifications
          </Text>
        </View>
        <TouchableOpacity>
          <Text className="text-[#15803d] font-gotham-bold text-sm">
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
      >
        <View className="px-6 pt-6">
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <View
                key={notif.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 flex-row"
              >
                <View
                  className={`w-12 h-12 rounded-full items-center justify-center mr-4 mt-1 ${notif.bg}`}
                >
                  <Icon size={24} color={notif.color} />
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="text-gray-900 font-gotham-bold text-base flex-1 pr-2">
                      {notif.title}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-1">
                      {notif.time}
                    </Text>
                  </View>
                  <Text className="text-gray-500 text-sm leading-5">
                    {notif.desc}
                  </Text>
                </View>
              </View>
            );
          })}
          <TouchableOpacity className="bg-gray-100 py-4 rounded-xl items-center mt-4">
            <Text className="text-gray-600 font-gotham-bold">
              Mark all as read
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
