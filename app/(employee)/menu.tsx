import { router } from "expo-router";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CloudOff,
  FileText,
  LogOut,
  MapPin,
  PhoneCall,
  Settings,
  User,
  Bell,
  Shield,
  Database,
} from "lucide-react-native";

import React from "react";

import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function MenuScreen() {
  const menuGroups = [
    {
      title: "Workflow",
      items: [
        {
          icon: CalendarDays,
          label: "Attendance",
          route: "/(employee)/attendance",
          color: "#10b981",
        },
        {
          icon: MapPin,
          label: "My Visits",
          route: "/(employee)/visits",
          color: "#3b82f6",
        },
        {
          icon: FileText,
          label: "Reports",
          route: "/(employee)/reports",
          color: "#8b5cf6",
        },
      ],
    },
    {
      title: "Account & Preferences",
      items: [
        {
          icon: User,
          label: "My Profile",
          route: "/(employee)/edit-profile",
          color: "#f59e0b",
        },
        {
          icon: Bell,
          label: "Notifications",
          route: null,
          color: "#ec4899",
        },
        {
          icon: Settings,
          label: "App Settings",
          route: null,
          color: "#64748b",
        },
      ],
    },
    {
      title: "System & Support",
      items: [
        {
          icon: CloudOff,
          label: "Offline Data",
          route: null,
          color: "#14b8a6",
        },
        {
          icon: Database,
          label: "Storage Usage",
          route: null,
          color: "#6366f1",
        },
        {
          icon: PhoneCall,
          label: "Emergency Contact",
          route: null,
          color: "#ef4444",
        },
      ],
    },
  ];
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-5 pt-16 pb-4 flex-row items-center justify-between z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-12 h-12 bg-white/90 rounded-full items-center justify-center border border-white/10"
          activeOpacity={0.8}
        >
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-xl font-gotham-bold">Menu</Text>
        <View className="w-12 h-12" /> {/* Spacer */}
      </View>
      <ScrollView
        className="flex-1 px-5 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {menuGroups.map((group, groupIdx) => (
          <View key={groupIdx} className="mb-8">
            <Text className="text-gray-500 font-gotham-bold text-xs uppercase tracking-widest mb-4 ml-2">
              {group.title}
            </Text>
            <View className="bg-white rounded-[32px] overflow-hidden border border-white/5">
              {group.items.map((item, itemIdx) => {
                const Icon = item.icon;

                const isLast = itemIdx === group.items.length - 1;
                return (
                  <TouchableOpacity
                    key={itemIdx}
                    onPress={() => item.route && router.push(item.route as any)}
                    activeOpacity={0.8}
                    className={`flex-row items-center p-5 ${!isLast ? "border-b border-white/5" : ""}`}
                  >
                    <View
                      className="w-10 h-10 rounded-[14px] items-center justify-center mr-4"
                      style={{
                        backgroundColor: `${item.color}20`,
                      }}
                    >
                      <Icon size={20} color={item.color} strokeWidth={2} />
                    </View>
                    <Text className="flex-1 text-gray-900 font-brandon-medium text-lg">
                      {item.label}
                    </Text>
                    <ChevronRight size={20} color="#6b7280" />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
        <TouchableOpacity
          onPress={() => router.replace("/intro" as any)}
          activeOpacity={0.8}
          className="flex-row items-center justify-center py-5 bg-red-500/10 rounded-[24px] border border-red-500/20 mt-4"
        >
          <LogOut size={20} color="#ef4444" className="mr-3" />
          <Text className="text-red-500 font-gotham-bold text-base tracking-wide">
            Secure Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
