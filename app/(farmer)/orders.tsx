import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, TouchableOpacity, useColorScheme } from "react-native";
import { ChevronLeft, Package, Clock, CheckCircle } from "lucide-react-native";
import { router } from "expo-router";

export default function OrdersScreen() {
  const isDark = useColorScheme() === "dark";

  const orders = [
    { id: "#8832", product: "Organic Compost (50kg)", status: "Delivered", date: "Oct 12, 2023", icon: CheckCircle, color: "#10b981" },
    { id: "#8833", product: "Neem Oil Extract", status: "Processing", date: "Oct 15, 2023", icon: Clock, color: "#f59e0b" },
    { id: "#8834", product: "Urea Fertilizer", status: "Shipped", date: "Oct 18, 2023", icon: Package, color: "#3b82f6" },
  ];

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-[#0A0A0C]" : "bg-gray-50"}`}>
      <View className="px-5 py-4 flex-row items-center justify-between border-b border-gray-200/20">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 rounded-full">
          <ChevronLeft size={24} color={isDark ? "#fff" : "#111827"} />
        </TouchableOpacity>
        <Text className={`text-xl font-gotham-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          My Orders
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-5 pt-4">
        {orders.map((order, index) => {
          const Icon = order.icon;
          return (
            <TouchableOpacity 
              key={index}
              activeOpacity={0.8}
              className={`mb-4 p-4 rounded-2xl border ${isDark ? "bg-[#1C1C1E] border-white/5" : "bg-white border-gray-100"} shadow-sm`}
            >
              <View className="flex-row justify-between items-center mb-3">
                <Text className={`font-gotham-bold text-base ${isDark ? "text-white" : "text-gray-900"}`}>
                  Order {order.id}
                </Text>
                <View className="flex-row items-center px-2 py-1 rounded-full" style={{ backgroundColor: `${order.color}20` }}>
                  <Icon size={12} color={order.color} />
                  <Text style={{ color: order.color }} className="text-xs font-gotham-bold ml-1">
                    {order.status}
                  </Text>
                </View>
              </View>
              
              <Text className={`font-brandon text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-1`}>
                {order.product}
              </Text>
              
              <Text className={`font-brandon text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                Ordered on {order.date}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
