import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  Bell,
  AlertTriangle,
  FileText,
  CheckCircle2,
} from "lucide-react-native";

export default function EmployeeNotificationsScreen() {
  const notifications = [
    {
      id: "1",
      type: "alert",
      title: "Low Soil Moisture Alert",
      message: "Sensor data indicates critically low moisture in South Block of Farm A.",
      time: "10 mins ago",
      icon: <AlertTriangle size={20} color="#ef4444" />,
      bgColor: "#fee2e2",
    },
    {
      id: "2",
      type: "document",
      title: "New Soil Report",
      message: "Farmer Muthuvel has uploaded the latest NPK test results.",
      time: "1 hour ago",
      icon: <FileText size={20} color="#3b82f6" />,
      bgColor: "#dbeafe",
    },
    {
      id: "3",
      type: "success",
      title: "Task Approved",
      message: "Your field inspection report for Farm C was approved by the admin.",
      time: "3 hours ago",
      icon: <CheckCircle2 size={20} color="#16a34a" />,
      bgColor: "#dcfce7",
    },
    {
      id: "4",
      type: "reminder",
      title: "Upcoming Visit",
      message: "You have a scheduled visit with Rajesh Kumar at 4:00 PM.",
      time: "Yesterday",
      icon: <Bell size={20} color="#d97706" />,
      bgColor: "#fef3c7",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1 }}>
        
        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 }}>
          <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace("/(employee)/dashboard")} style={{ padding: 8, backgroundColor: "#ffffff", borderRadius: 999, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
            <ChevronLeft size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 18 }}>Alerts & Notifications</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}>
          
          <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 28, marginBottom: 8 }}>Stay Updated</Text>
          <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 15, marginBottom: 32 }}>Recent activity across your assigned farms.</Text>

          <View style={{ gap: 16 }}>
            {notifications.map((notif) => (
              <TouchableOpacity key={notif.id} activeOpacity={0.8} style={{ flexDirection: "row", backgroundColor: "#ffffff", padding: 20, borderRadius: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 4 }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: notif.bgColor, alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                  {notif.icon}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 16, flex: 1 }}>{notif.title}</Text>
                    <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 11, marginLeft: 8 }}>{notif.time}</Text>
                  </View>
                  <Text style={{ color: "#475569", fontFamily: "Brandon-Medium", fontSize: 14, lineHeight: 20 }}>
                    {notif.message}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>

      </SafeAreaView>
    </View>
  );
}
