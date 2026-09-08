import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  Calendar,
  FileText,
  Leaf,
  IndianRupee,
} from "lucide-react-native";

const notifications = [
  {
    id: "1",
    title: "Upcoming Visit Reminder",
    desc: "Arun Kumar will visit your farm on May 28, 2026 for root inspection.",
    time: "15m ago",
    icon: Calendar,
    color: "#b45309",
    cardBg: "bg-amber-50/80",
    cardBorder: "border-amber-200/90",
    iconBg: "bg-amber-100",
  },
  {
    id: "2",
    title: "Visit Report Submitted",
    desc: "Harish has submitted the official audit report for your review.",
    time: "2h ago",
    icon: FileText,
    color: "#0284c7",
    cardBg: "bg-sky-50/80",
    cardBorder: "border-sky-200/90",
    iconBg: "bg-sky-100",
  },
  {
    id: "3",
    title: "Irrigation Recommendation",
    desc: "New optimal drip cycle recommendation available for your land.",
    time: "1d ago",
    icon: Leaf,
    color: "#15803d",
    cardBg: "bg-emerald-50/80",
    cardBorder: "border-emerald-200/90",
    iconBg: "bg-emerald-100",
  },
  {
    id: "4",
    title: "Payment Credited",
    desc: "₹5,000 received for recent organic harvest allocation.",
    time: "2d ago",
    icon: IndianRupee,
    color: "#7e22ce",
    cardBg: "bg-purple-50/80",
    cardBorder: "border-purple-200/90",
    iconBg: "bg-purple-100",
  },
];

export default function FarmerNotificationsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Background image subtle overlay */}
      <ImageBackground
        source={require("../../assets/images/image4.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.12 }}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header - Transparent */}
        <View style={{ backgroundColor: "transparent" }} className="px-5 pt-2 pb-3 flex-row items-center justify-between z-10">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-white/95 items-center justify-center border border-slate-200 shadow-sm mr-3"
              activeOpacity={0.7}
            >
              <ChevronLeft size={22} color="#0f172a" />
            </TouchableOpacity>
            <Text className="text-slate-900 text-lg font-gotham-bold">
              Notifications
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-[#15803d] font-gotham-bold text-xs uppercase tracking-wider">
              Clear All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 6 }}
        >
          <View className="px-5">
            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <View
                  key={notif.id}
                  className={`rounded-2xl p-4.5 shadow-sm border mb-4 flex-row items-start ${notif.cardBg} ${notif.cardBorder}`}
                >
                  <View
                    className={`w-11 h-11 rounded-xl items-center justify-center mr-3.5 mt-0.5 shadow-xs ${notif.iconBg}`}
                  >
                    <Icon size={20} color={notif.color} />
                  </View>
                  <View className="flex-1">
                    <View className="flex-row justify-between items-start mb-1">
                      <Text className="text-slate-900 font-gotham-bold text-sm flex-1 pr-2">
                        {notif.title}
                      </Text>
                      <Text className="text-slate-400 font-gotham-medium text-[11px] mt-0.5">
                        {notif.time}
                      </Text>
                    </View>
                    <Text className="text-slate-600 font-gotham-medium text-xs leading-relaxed">
                      {notif.desc}
                    </Text>
                  </View>
                </View>
              );
            })}

            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-white/90 border border-slate-200 py-3.5 rounded-xl items-center mt-2 shadow-xs"
            >
              <Text className="text-slate-700 font-gotham-bold text-xs uppercase tracking-wider">
                Mark all as read
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

