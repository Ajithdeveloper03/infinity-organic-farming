import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import {
  ChevronLeft,
  Package,
  Clock,
  CheckCircle2,
  Droplets,
  Truck,
} from "lucide-react-native";
import { router } from "expo-router";

export default function OrdersScreen() {
  const orders = [
    {
      id: "#8832",
      product: "Organic Compost (50kg)",
      qty: "2 Bags",
      price: "₹1,250",
      status: "Delivered",
      date: "Today, 09:30 AM",
      icon: CheckCircle2,
      color: "#15803d",
      bgColor: "#f0fdf4",
      borderColor: "#bbf7d0",
    },
    {
      id: "#8833",
      product: "Pure Neem Oil Extract (5L)",
      qty: "1 Canister",
      price: "₹850",
      status: "Processing",
      date: "Yesterday",
      icon: Clock,
      color: "#d97706",
      bgColor: "#fffbeb",
      borderColor: "#fef3c7",
    },
    {
      id: "#8834",
      product: "Bio-Fertilizer Soil Booster (25kg)",
      qty: "1 Bag",
      price: "₹1,350",
      status: "Dispatched",
      date: "Oct 18, 2025",
      icon: Truck,
      color: "#2563eb",
      bgColor: "#eff6ff",
      borderColor: "#dbeafe",
    },
  ];

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
        {/* Header */}
        <View className="px-5 py-4 flex-row items-center justify-between bg-white/95 border-b border-gray-100 shadow-sm backdrop-blur-md">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center border border-gray-200"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-lg font-gotham-bold text-gray-900">
            My Orders
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Important Section: Hero Overview Banner with background image */}
          <View className="p-5">
            <View className="rounded-3xl overflow-hidden shadow-md border border-green-800/20">
              <ImageBackground
                source={require("../../assets/images/image3.jpg")}
                className="w-full"
                resizeMode="cover"
              >
                <View className="p-6 bg-green-950/80">
                  <View className="flex-row items-center mb-2">
                    <Package size={20} color="#86efac" className="mr-2" />
                    <Text className="text-green-300 font-brandon font-bold text-xs uppercase tracking-widest">
                      Fertilizer & Supply Orders
                    </Text>
                  </View>
                  <Text className="text-white font-gotham-bold text-2xl mb-4">
                    Active Deliveries
                  </Text>

                  <View className="flex-row justify-between bg-white/10 rounded-2xl p-4 border border-white/20">
                    <View>
                      <Text className="text-white/75 text-xs font-brandon">Total Orders</Text>
                      <Text className="text-white font-gotham-bold text-xl mt-0.5">3 Items</Text>
                    </View>
                    <View className="w-px bg-white/20 h-full" />
                    <View>
                      <Text className="text-white/75 text-xs font-brandon">Total Value</Text>
                      <Text className="text-white font-gotham-bold text-xl mt-0.5">₹3,450</Text>
                    </View>
                    <View className="w-px bg-white/20 h-full" />
                    <View>
                      <Text className="text-white/75 text-xs font-brandon">Fast Transit</Text>
                      <Text className="text-emerald-300 font-gotham-bold text-xl mt-0.5">On Track</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* Orders List Section */}
          <View className="px-5">
            <Text className="text-gray-900 font-gotham-bold text-base mb-3">
              Recent Order History
            </Text>

            {orders.map((order, index) => {
              const Icon = order.icon;
              return (
                <View
                  key={index}
                  className="mb-4 p-5 rounded-2xl border bg-white border-gray-200 shadow-sm"
                >
                  <View className="flex-row justify-between items-center mb-3">
                    <View className="flex-row items-center">
                      <View className="w-9 h-9 rounded-xl bg-green-50 border border-green-200 items-center justify-center mr-3">
                        <Droplets size={18} color="#15803d" />
                      </View>
                      <View>
                        <Text className="font-gotham-bold text-base text-gray-900">
                          {order.id}
                        </Text>
                        <Text className="text-gray-500 font-brandon text-xs">
                          Ordered on {order.date}
                        </Text>
                      </View>
                    </View>

                    <View
                      className="flex-row items-center px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: order.bgColor,
                        borderColor: order.borderColor,
                      }}
                    >
                      <Icon size={13} color={order.color} />
                      <Text
                        style={{ color: order.color }}
                        className="text-xs font-gotham-bold ml-1.5"
                      >
                        {order.status}
                      </Text>
                    </View>
                  </View>

                  <View className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-100">
                    <Text className="font-gotham-bold text-sm text-gray-900 mb-0.5">
                      {order.product}
                    </Text>
                    <Text className="text-gray-600 font-brandon text-xs">
                      Quantity: {order.qty}
                    </Text>
                  </View>

                  <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
                    <Text className="text-gray-600 font-brandon text-xs">
                      Payment: Cash On Delivery
                    </Text>
                    <Text className="font-gotham-bold text-base text-green-700">
                      {order.price}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
