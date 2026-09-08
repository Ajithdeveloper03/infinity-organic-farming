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
  Sparkles,
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
      cardBg: "bg-emerald-50/80",
      cardBorder: "border-emerald-200/90",
      badgeBg: "#dcfce7",
      badgeBorder: "#86efac",
      iconBg: "bg-emerald-100/90",
      iconBorder: "border-emerald-300/80",
    },
    {
      id: "#8833",
      product: "Pure Neem Oil Extract (5L)",
      qty: "1 Canister",
      price: "₹850",
      status: "Processing",
      date: "Yesterday",
      icon: Clock,
      color: "#b45309",
      cardBg: "bg-amber-50/80",
      cardBorder: "border-amber-200/90",
      badgeBg: "#fef3c7",
      badgeBorder: "#fde68a",
      iconBg: "bg-amber-100/90",
      iconBorder: "border-amber-300/80",
    },
    {
      id: "#8834",
      product: "Bio-Fertilizer Soil Booster (25kg)",
      qty: "1 Bag",
      price: "₹1,350",
      status: "Dispatched",
      date: "Oct 18, 2025",
      icon: Truck,
      color: "#0369a1",
      cardBg: "bg-sky-50/80",
      cardBorder: "border-sky-200/90",
      badgeBg: "#e0f2fe",
      badgeBorder: "#bae6fd",
      iconBg: "bg-sky-100/90",
      iconBorder: "border-sky-300/80",
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
        {/* Header - Transparent */}
        <View style={{ backgroundColor: "transparent" }} className="px-5 pt-2 pb-3 flex-row items-center justify-between z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/95 items-center justify-center border border-slate-200 shadow-sm"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-lg font-gotham-bold text-slate-900">
            My Orders
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 6 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Important Section: Hero Overview Banner with background image */}
          <View className="p-5">
            <View className="rounded-3xl overflow-hidden shadow-sm border border-emerald-800/20">
              <ImageBackground
                source={require("../../assets/images/image3.jpg")}
                className="w-full"
                resizeMode="cover"
              >
                <View className="p-6 bg-emerald-950/85">
                  <View className="flex-row items-center mb-2">
                    <Package size={18} color="#86efac" className="mr-2" />
                    <Text className="text-emerald-300 font-gotham-bold text-xs uppercase tracking-widest">
                      Fertilizer & Supply Orders
                    </Text>
                  </View>
                  <Text className="text-white font-gotham-bold text-2xl mb-4">
                    Active Deliveries
                  </Text>

                  <View className="flex-row justify-between bg-white/10 rounded-2xl p-4 border border-white/20">
                    <View>
                      <Text className="text-white/75 text-xs font-gotham-medium">Total Orders</Text>
                      <Text className="text-white font-gotham-bold text-xl mt-0.5">3 Items</Text>
                    </View>
                    <View className="w-px bg-white/20 h-full" />
                    <View>
                      <Text className="text-white/75 text-xs font-gotham-medium">Total Value</Text>
                      <Text className="text-white font-gotham-bold text-xl mt-0.5">₹3,450</Text>
                    </View>
                    <View className="w-px bg-white/20 h-full" />
                    <View>
                      <Text className="text-white/75 text-xs font-gotham-medium">Logistics</Text>
                      <Text className="text-emerald-300 font-gotham-bold text-xl mt-0.5">On Track</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* Orders List Section */}
          <View className="px-5">
            <Text className="text-slate-900 font-gotham-bold text-base mb-3.5">
              Recent Order History
            </Text>

            {orders.map((order, index) => {
              const Icon = order.icon;
              return (
                <View
                  key={index}
                  className={`mb-4 p-5 rounded-2xl border shadow-sm ${order.cardBg} ${order.cardBorder}`}
                >
                  <View className="flex-row justify-between items-center mb-3">
                    <View className="flex-row items-center">
                      <View className={`w-10 h-10 rounded-xl items-center justify-center mr-3 border ${order.iconBg} ${order.iconBorder}`}>
                        <Droplets size={19} color={order.color} />
                      </View>
                      <View>
                        <Text className="font-gotham-bold text-base text-slate-900">
                          {order.id}
                        </Text>
                        <Text className="text-slate-600 font-gotham-medium text-xs">
                          Ordered on {order.date}
                        </Text>
                      </View>
                    </View>

                    <View
                      className="flex-row items-center px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: order.badgeBg,
                        borderColor: order.badgeBorder,
                      }}
                    >
                      <Icon size={12} color={order.color} />
                      <Text
                        style={{ color: order.color }}
                        className="text-xs font-gotham-bold ml-1.5 uppercase tracking-wider"
                      >
                        {order.status}
                      </Text>
                    </View>
                  </View>

                  <View className="bg-white/85 rounded-xl p-3.5 mb-3 border border-slate-200/70">
                    <Text className="font-gotham-bold text-sm text-slate-900 mb-0.5">
                      {order.product}
                    </Text>
                    <Text className="text-slate-600 font-gotham-medium text-xs">
                      Quantity: {order.qty}
                    </Text>
                  </View>

                  <View className="flex-row justify-between items-center pt-2 border-t border-slate-200/60">
                    <Text className="text-slate-600 font-gotham-medium text-xs">
                      Payment: Cash On Delivery
                    </Text>
                    <Text className="font-gotham-bold text-base text-emerald-800">
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

