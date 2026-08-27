import { router } from "expo-router";

import React, { useState } from "react";

import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
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
  Globe,
  Droplet,
  ChevronRight,
  CloudRain,
  Sun,
} from "lucide-react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

export default function FarmerDashboardScreen() {
  const { t, i18n } = useTranslation();

  /*
 Tab feature state  */
  const [activeTab, setActiveTab] = useState<"All" | "Crops" | "Fertilizers">(
    "All",
  );

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ta" : "en");
  };
  return (
    <View className="flex-1 bg-gray-50">
      {/* Top Gradient Background (JioHotstar Aesthetic) */}
      <View className="absolute top-0 left-0 right-0 h-[450px]">
        <Image
          source={require("../../assets/images/image1.jpg")}
          className="w-full h-full opacity-30"
        />
        <LinearGradient
          colors={["transparent", "#0A0A0C"]}
          className="absolute inset-0"
        />
      </View>
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        >
          {/* Header with Top Padding */}
          <View className="px-5 pt-16 pb-4 flex-row justify-between items-center z-10">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 rounded-full mr-4 border-2 border-white/20 overflow-hidden shadow-lg shadow-green-500/20">
                <Image
                  source={{
                    uri: "https://ui-avatars.com/api/?name=Kuppusamy&background=15803d&color=fff",
                  }}
                  className="w-full h-full"
                />
              </View>
              <View>
                <Text className="text-gray-500 text-[10px] font-gotham-bold uppercase tracking-widest">
                  {t("Good Morning")}
                </Text>
                <Text className="text-gray-900 text-2xl font-gotham-bold tracking-tight">
                  Kuppusamy
                </Text>
              </View>
            </View>
            <View className="flex-row items-center space-x-3">
              <TouchableOpacity
                onPress={toggleLanguage}
                className="p-2.5 bg-white/80 rounded-full border border-white/10"
                activeOpacity={0.7}
              >
                <Globe size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(farmer)/notifications" as any)}
                className="relative p-2.5 bg-white/80 rounded-full border border-white/10"
              >
                <Bell size={22} color="#fff" />
                <View className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1C1C1E]" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Weather Widget Mini (Hotstar Featured banner style) */}
          <View className="px-5 mb-8 mt-2">
            <LinearGradient
              colors={["#0ea5e9", "#2563eb"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-[32px] p-6 shadow-2xl relative overflow-hidden flex-row items-center justify-between"
            >
              <View className="absolute -right-4 -bottom-4 opacity-20">
                <CloudRain size={120} color="#fff" />
              </View>
              <View>
                <Text className="text-gray-700 font-gotham-bold text-xs uppercase tracking-widest mb-1">
                  Today's Weather
                </Text>
                <Text className="text-gray-900 font-gotham-bold text-4xl">
                  28°C
                </Text>
                <Text className="text-gray-800 font-brandon text-sm mt-1">
                  Light rain expected this afternoon.
                </Text>
              </View>
              <View className="bg-white/20 p-4 rounded-full backdrop-blur-xl border border-white/30">
                <Sun size={32} color="#fff" />
              </View>
            </LinearGradient>
          </View>
          {/* TAB FEATURE - Requested by User */}
          <View className="mb-6">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 20,
                gap: 12,
              }}
            >
              {["All", "Crops", "Fertilizers"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab as any)}
                  className={`px-6 py-2.5 rounded-full border ${activeTab === tab ? "bg-white border-white" : "bg-transparent border-white/20"}`}
                >
                  <Text
                    className={`font-gotham-bold text-sm ${activeTab === tab ? "text-[#0A0A0C]" : "text-gray-900"}`}
                  >
                    {t(tab)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          {/* Dynamic Content based on Category Tab */}
          <View className="px-5 mb-10">
            {(activeTab === "Crops" || activeTab === "All") && (
              <View className="mb-8">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-xl font-gotham-bold text-gray-900 tracking-tight">
                    {t("Farm Overview")}
                  </Text>
                  <ChevronRight size={20} color="#9ca3af" />
                </View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => router.push("/(farmer)/profile" as any)}
                  className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-white/5"
                >
                  <Image
                    source={require("../../assets/images/image2.jpg")}
                    className="w-full h-32 opacity-80"
                  />
                  <LinearGradient
                    colors={["transparent", "#1C1C1E"]}
                    className="absolute inset-0 h-32"
                  />
                  <View className="px-6 pb-6 pt-2 flex-row justify-between">
                    <View className="items-center">
                      <Text className="text-gray-900 font-gotham-bold text-3xl">
                        2.5
                      </Text>
                      <Text className="text-[#9ca3af] text-[10px] uppercase tracking-widest mt-1 font-gotham-bold">
                        Acres
                      </Text>
                    </View>
                    <View className="w-px h-12 bg-white/10" />
                    <View className="items-center">
                      <Text className="text-gray-900 font-gotham-bold text-xl mt-2">
                        Vetiver
                      </Text>
                      <Text className="text-[#9ca3af] text-[10px] uppercase tracking-widest mt-1 font-gotham-bold">
                        Crop Type
                      </Text>
                    </View>
                    <View className="w-px h-12 bg-white/10" />
                    <View className="items-center">
                      <Text className="text-green-400 font-gotham-bold text-xl mt-2">
                        Good
                      </Text>
                      <Text className="text-[#9ca3af] text-[10px] uppercase tracking-widest mt-1 font-gotham-bold">
                        Crop Health
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {(activeTab === "Fertilizers" || activeTab === "All") && (
              <View className="mb-6">
                <Text className="text-xl font-gotham-bold text-gray-900 tracking-tight mb-4">
                  {t("Recent Orders")}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  className="bg-white rounded-[24px] p-5 border border-white/5 flex-row items-center justify-between"
                >
                  <View className="flex-row items-center">
                    <View className="w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-2xl items-center justify-center mr-4">
                      <Droplet size={24} color="#f97316" />
                    </View>
                    <View>
                      <Text className="text-gray-900 font-gotham-bold text-base">
                        Order #8832
                      </Text>
                      <Text className="text-[#9ca3af] text-xs mt-0.5 font-brandon">
                        Organic Compost (50kg)
                      </Text>
                    </View>
                  </View>
                  <View className="bg-green-500/20 px-4 py-1.5 rounded-full border border-green-500/30">
                    <Text className="text-green-400 text-xs font-gotham-bold">
                      Delivered
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {/* Recommended Products (Horizontal Scroll) */}
          <View className="mb-10">
            <View className="flex-row justify-between items-end mb-4 px-5">
              <Text className="text-xl font-gotham-bold text-gray-900 tracking-tight">
                Recommended for You
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="pl-5 pb-4"
              snapToInterval={180}
              decelerationRate="fast"
            >
              <TouchableOpacity
                activeOpacity={0.9}
                className="bg-white rounded-[24px] w-40 mr-4 p-3 shadow-lg border border-white/5"
              >
                <Image
                  source={require("../../assets/images/image3.jpg")}
                  className="w-full h-36 rounded-[16px] mb-3"
                />
                <View className="px-1">
                  <Text
                    className="text-gray-900 font-gotham-bold text-sm mb-1 leading-4"
                    numberOfLines={2}
                  >
                    Organic Fertilizer
                  </Text>
                  <Text className="text-blue-400 text-[10px] uppercase font-gotham-bold tracking-wider mb-2">
                    Nutrient Boost
                  </Text>
                  <View className="flex-row justify-between items-center mt-1">
                    <Text className="text-green-400 font-gotham-bold text-lg">
                      ₹850
                    </Text>
                    <View className="bg-white/10 p-2 rounded-full border border-white/5">
                      <ShoppingBag size={14} color="#fff" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                className="bg-white rounded-[24px] w-40 mr-8 p-3 shadow-lg border border-white/5"
              >
                <Image
                  source={require("../../assets/images/image4.jpg")}
                  className="w-full h-36 rounded-[16px] mb-3"
                />
                <View className="px-1">
                  <Text
                    className="text-gray-900 font-gotham-bold text-sm mb-1 leading-4"
                    numberOfLines={2}
                  >
                    Neem Oil Extract
                  </Text>
                  <Text className="text-blue-400 text-[10px] uppercase font-gotham-bold tracking-wider mb-2">
                    Pest Control
                  </Text>
                  <View className="flex-row justify-between items-center mt-1">
                    <Text className="text-green-400 font-gotham-bold text-lg">
                      ₹420
                    </Text>
                    <View className="bg-white/10 p-2 rounded-full border border-white/5">
                      <ShoppingBag size={14} color="#fff" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
          {/* Quick Actions (Spotify Rounded Grid) */}
          <View className="px-5 mb-10">
            <Text className="text-xl font-gotham-bold text-gray-900 mb-4 tracking-tight">
              {t("Quick Actions")}
            </Text>
            <View className="flex-row justify-between">
              {[
                {
                  icon: History,
                  label: "Visits",
                  route: "/(farmer)/history",
                  color: "#4ade80",
                  bgClass: "bg-green-500/10 border-green-500/20",
                },
                {
                  icon: Leaf,
                  label: "Reports",
                  route: "/(farmer)/recommendations",
                  color: "#facc15",
                  bgClass: "bg-yellow-500/10 border-yellow-500/20",
                },
                {
                  icon: Star,
                  label: "Rate FO",
                  route: "/(farmer)/rate/v1",
                  color: "#60a5fa",
                  bgClass: "bg-blue-500/10 border-blue-500/20",
                },
                {
                  icon: HeadphonesIcon,
                  label: "Support",
                  route: "/(farmer)/support",
                  color: "#c084fc",
                  bgClass: "bg-purple-500/10 border-purple-500/20",
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
                      className={`w-16 h-16 rounded-[20px] items-center justify-center mb-2 border ${action.bgClass}`}
                    >
                      <Icon size={28} color={action.color} strokeWidth={1.5} />
                    </View>
                    <Text className="text-[#9ca3af] text-[10px] font-gotham-bold uppercase tracking-widest">
                      {action.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          {/* Refer & Earn (Netflix Poster Style) */}
          <View className="px-5 mb-10">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("/(farmer)/referral" as any)}
              className="rounded-[32px] overflow-hidden h-40 shadow-2xl"
            >
              <Image
                source={require("../../assets/images/image1.jpg")}
                className="absolute inset-0 w-full h-full opacity-50"
              />
              <LinearGradient
                colors={["rgba(21, 128, 61, 0.8)", "rgba(6, 78, 59, 0.95)"]}
                className="absolute inset-0"
              />
              <View className="flex-1 p-6 flex-row items-center justify-between">
                <View className="flex-1 pr-6">
                  <Text className="text-gray-900 font-gotham-bold text-2xl mb-1">
                    Refer & Earn
                  </Text>
                  <Text className="text-gray-700 text-sm leading-tight mb-4 font-brandon">
                    Invite other farmers and get 500 bonus points!
                  </Text>
                  <View className="bg-white/20 py-2 px-6 rounded-full self-start backdrop-blur-sm border border-white/30">
                    <Text className="text-gray-900 font-gotham-bold text-xs uppercase tracking-widest">
                      View Code
                    </Text>
                  </View>
                </View>
                <Gift size={64} color="rgba(255,255,255,0.2)" />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
