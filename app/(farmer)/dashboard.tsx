import { router, useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  Bell,
  FileText,
  Gift,
  HeadphonesIcon,
  History,
  Leaf,
  ShoppingBag,
  Star,
  Droplet,
  ChevronRight,
  CloudRain,
  Sun,
  Sprout,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function FarmerDashboardScreen() {
  const [activeTab, setActiveTab] = useState<"All" | "Crops" | "Fertilizers">("All");

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Aesthetic Agricultural Background Image */}
      <ImageBackground
        source={require("../../assets/images/image4.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.16 }}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header - Strictly Transparent Background */}
        <View style={{ backgroundColor: "transparent" }} className="px-5 pt-2 pb-3 flex-row justify-between items-center z-10">
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 rounded-full mr-3 border-2 border-green-600/30 overflow-hidden bg-white/80 items-center justify-center shadow-sm">
              <Image
                source={{
                  uri: "https://ui-avatars.com/api/?name=Kuppusamy&background=15803d&color=fff",
                }}
                className="w-full h-full"
            />
          </View>
          <View>
            <Text className="text-gray-500 text-xs font-brandon uppercase tracking-wider">
              Good Morning
            </Text>
            <Text className="text-gray-900 text-lg font-gotham-bold leading-tight">
              Kuppusamy
            </Text>
            <Text className="text-green-700 text-[11px] font-brandon font-bold">
              Annur, Coimbatore
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(farmer)/notifications" as any)}
          className="w-10 h-10 rounded-full bg-white/80 items-center justify-center border border-gray-200 shadow-sm"
          activeOpacity={0.7}
        >
          <Bell size={20} color="#374151" />
          <View className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110, paddingTop: 16 }}
      >
        {/* Weather Widget Mini */}
        <View className="px-5 mb-6">
          <LinearGradient
            colors={["#0284c7", "#2563eb"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 24, padding: 20, position: "relative", overflow: "hidden" }}
          >
            <View style={{ position: "absolute", right: -10, bottom: -10, opacity: 0.15 }}>
              <CloudRain size={130} color="#fff" />
            </View>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-white/80 font-brandon font-bold text-xs uppercase tracking-widest mb-1">
                  Today's Weather • Coimbatore
                </Text>
                <Text className="text-white font-gotham-bold text-3xl">
                  28°C
                </Text>
                <Text className="text-white/90 font-brandon text-xs mt-1">
                  Partly cloudy • Ideal for field inspection
                </Text>
              </View>
              <View className="bg-white/20 p-3 rounded-full border border-white/30 backdrop-blur-md">
                <Sun size={28} color="#fff" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Category Tabs (All / Crops / Fertilizers) */}
        <View className="mb-6 px-5">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            {(["All", "Crops", "Fertilizers"] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full border shadow-sm ${
                  activeTab === tab
                    ? "bg-[#15803d] border-[#15803d]"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`font-gotham-bold text-sm ${
                    activeTab === tab ? "text-white" : "text-gray-700"
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Farm Overview Card */}
        {(activeTab === "Crops" || activeTab === "All") && (
          <View className="px-5 mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-gotham-bold text-gray-900">
                Farm Overview
              </Text>
              <TouchableOpacity onPress={() => router.push("/(farmer)/profile" as any)}>
                <Text className="text-[#15803d] font-gotham-bold text-xs uppercase tracking-wider">
                  Details
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("/(farmer)/profile" as any)}
              className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100"
            >
              <Image
                source={require("../../assets/images/image2.jpg")}
                className="w-full h-32"
                resizeMode="cover"
              />
              <View className="p-5 flex-row justify-between items-center bg-white">
                <View className="items-center flex-1">
                  <Text className="text-gray-900 font-gotham-bold text-2xl">
                    2.5
                  </Text>
                  <Text className="text-gray-400 text-[10px] uppercase font-gotham-bold tracking-widest mt-1">
                    Acres
                  </Text>
                </View>
                <View className="w-px h-10 bg-gray-100" />
                <View className="items-center flex-1">
                  <Text className="text-gray-900 font-gotham-bold text-lg">
                    Vetiver
                  </Text>
                  <Text className="text-gray-400 text-[10px] uppercase font-gotham-bold tracking-widest mt-1">
                    Crop Type
                  </Text>
                </View>
                <View className="w-px h-10 bg-gray-100" />
                <View className="items-center flex-1">
                  <Text className="text-green-600 font-gotham-bold text-lg">
                    Optimal
                  </Text>
                  <Text className="text-gray-400 text-[10px] uppercase font-gotham-bold tracking-widest mt-1">
                    Health
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Recent Orders Section */}
        {(activeTab === "Fertilizers" || activeTab === "All") && (
          <View className="px-5 mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-gotham-bold text-gray-900">
                Recent Orders
              </Text>
              <TouchableOpacity onPress={() => router.push("/(farmer)/orders" as any)}>
                <Text className="text-[#15803d] font-gotham-bold text-xs uppercase tracking-wider">
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("/(farmer)/orders" as any)}
              className="bg-white rounded-[20px] p-4 border border-gray-100 shadow-sm flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1 pr-2">
                <View className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-2xl items-center justify-center mr-3.5">
                  <Droplet size={22} color="#d97706" />
                </View>
                <View>
                  <Text className="text-gray-900 font-gotham-bold text-base">
                    Organic Compost (50kg)
                  </Text>
                  <Text className="text-gray-400 text-xs mt-0.5 font-brandon">
                    Order #8832 • Dispatched
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-green-700 font-gotham-bold text-sm">
                  ₹1,250
                </Text>
                <ChevronRight size={16} color="#9ca3af" className="mt-1" />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Actions (Visits, Reports, Rate FO, Support) */}
        <View className="px-5 mb-6">
          <Text className="text-lg font-gotham-bold text-gray-900 mb-3.5">
            Quick Actions
          </Text>
          <View className="flex-row justify-between">
            {[
              {
                icon: History,
                label: "Visits",
                route: "/(farmer)/history",
                color: "#15803d",
                bgColor: "#f0fdf4",
                borderColor: "#dcfce7",
              },
              {
                icon: Leaf,
                label: "Reports",
                route: "/(farmer)/recommendations",
                color: "#d97706",
                bgColor: "#fffbeb",
                borderColor: "#fef3c7",
              },
              {
                icon: Star,
                label: "Rate FO",
                route: "/(farmer)/rate/v1",
                color: "#2563eb",
                bgColor: "#eff6ff",
                borderColor: "#dbeafe",
              },
              {
                icon: HeadphonesIcon,
                label: "Support",
                route: "/(farmer)/support",
                color: "#9333ea",
                bgColor: "#faf5ff",
                borderColor: "#f3e8ff",
              },
            ].map((action, idx) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.8}
                  onPress={() => router.push(action.route as any)}
                  className="items-center w-[22%]"
                >
                  <View
                    style={{
                      backgroundColor: action.bgColor,
                      borderColor: action.borderColor,
                    }}
                    className="w-16 h-16 rounded-[20px] items-center justify-center mb-2 border shadow-sm"
                  >
                    <Icon size={26} color={action.color} strokeWidth={1.75} />
                  </View>
                  <Text className="text-gray-700 text-xs font-gotham-bold text-center">
                    {action.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Refer & Earn Banner */}
        <View className="px-5 mb-6">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push("/(farmer)/referral" as any)}
            className="rounded-[24px] overflow-hidden shadow-md"
          >
            <LinearGradient
              colors={["#15803d", "#047857"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 22, position: "relative", overflow: "hidden" }}
            >
              <View style={{ position: "absolute", right: -15, bottom: -15, opacity: 0.15 }}>
                <Gift size={120} color="#fff" />
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-1 pr-4">
                  <Text className="text-white font-gotham-bold text-xl mb-1">
                    Refer & Earn
                  </Text>
                  <Text className="text-white/80 text-xs leading-relaxed mb-3 font-brandon">
                    Invite neighboring farmers and get bonus points!
                  </Text>
                  <View className="bg-white/20 py-1.5 px-4 rounded-full self-start border border-white/30">
                    <Text className="text-white font-gotham-bold text-[11px] uppercase tracking-wider">
                      Share Invite
                    </Text>
                  </View>
                </View>
                <Gift size={48} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}
