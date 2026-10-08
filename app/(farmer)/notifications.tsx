import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  Calendar,
  FileText,
  Leaf,
  IndianRupee,
  X,
  Bell
} from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";

if (Platform.OS === 'android') {

}

const initialNotifications = [
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
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState(initialNotifications);

  const dismissAlert = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

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
              onPress={() => router.push("/(farmer)/dashboard")}
              className="w-10 h-10 rounded-full bg-white/95 items-center justify-center border border-slate-200 shadow-sm mr-3"
              activeOpacity={0.7}
            >
              <ChevronLeft size={22} color="#0f172a" />
            </TouchableOpacity>
            <Text className="text-slate-900 text-lg font-brandon-bold">
              {t("notifications", "Notifications")}
            </Text>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 6 }}
        >
          <View className="px-5">

            {/* Featured Hero Notification */}
            <TouchableOpacity activeOpacity={0.9} className="w-full h-48 rounded-[24px] overflow-hidden mb-6 shadow-sm border border-slate-200 mt-2">
              <Image 
                source={require("../../assets/images/image6.jpg")}
                className="w-full h-full absolute"
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={StyleSheet.absoluteFill}
              />
              <View className="absolute bottom-0 left-0 right-0 p-5">
                <View className="bg-emerald-500 self-start px-3 py-1 rounded-full mb-2">
                  <Text className="text-white font-brandon-bold text-[10px] uppercase tracking-widest">Market Update</Text>
                </View>
                <Text className="text-white font-brandon-bold text-xl mb-1">Vetiver Prices Up 12%</Text>
                <Text className="text-slate-200 font-brandon-medium text-xs">Good news! The current market demand has increased organic Vetiver prices.</Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row items-center justify-between mb-4 mt-2">
              <Text className="text-slate-800 font-brandon-bold text-lg">Alerts & Messages</Text>
              {alerts.length > 0 && (
                <TouchableOpacity onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setAlerts([]);
                }}>
                  <Text className="text-[#15803d] font-brandon-bold text-xs uppercase tracking-wider">
                    Clear All
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {alerts.length === 0 ? (
              <View className="items-center justify-center py-10 bg-white/80 rounded-[24px] border border-slate-200 shadow-sm mt-4">
                <Bell size={48} color="#cbd5e1" className="mb-4" />
                <Text className="text-slate-500 font-brandon-medium text-base">You're all caught up!</Text>
              </View>
            ) : (
              alerts.map((notif) => {
                const Icon = notif.icon;
                return (
                  <View
                    key={notif.id}
                    className={`rounded-2xl p-4.5 shadow-sm border mb-4 flex-row items-start relative ${notif.cardBg} ${notif.cardBorder}`}
                  >
                    <View
                      className={`w-11 h-11 rounded-xl items-center justify-center mr-3.5 mt-0.5 shadow-xs ${notif.iconBg}`}
                    >
                      <Icon size={20} color={notif.color} />
                    </View>
                    <View className="flex-1 pr-6">
                      <View className="flex-row justify-between items-start mb-1">
                        <Text className="text-slate-900 font-brandon-bold text-sm flex-1 pr-2">
                          {notif.title}
                        </Text>
                      </View>
                      <Text className="text-slate-600 font-brandon-medium text-xs leading-relaxed mb-1.5">
                        {notif.desc}
                      </Text>
                      <Text className="text-slate-400 font-brandon-bold text-[10px]">
                        {notif.time}
                      </Text>
                    </View>
                    <TouchableOpacity 
                      className="absolute top-4 right-4 p-1"
                      onPress={() => dismissAlert(notif.id)}
                    >
                      <X size={16} color="#94a3b8" />
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

