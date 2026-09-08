import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  Bell,
  Gift,
  HeadphonesIcon,
  History,
  Leaf,
  Star,
  Droplet,
  ChevronRight,
  CloudRain,
  Sun,
  BadgeCheck,
  Sparkles,
  MapPin,
  TrendingUp,
  Sprout,
  Package,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function FarmerDashboardScreen() {
  const [activeTab, setActiveTab] = useState<"All" | "Crops" | "Fertilizers">("All");

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Agricultural Hero Background for Top to Main Section with Bottom-to-Top Overlay */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 380,
          overflow: "hidden",
        }}
      >
        <Image
          source={require("../../assets/images/image4.jpg")}
          style={{ width: "100%", height: "100%", opacity: 0.95 }}
          resizeMode="cover"
        />
        {/* Bottom-to-top overlay blending into solid #f8fafc */}
        <LinearGradient
          colors={[
            "rgba(248, 250, 252, 0.45)",
            "rgba(248, 250, 252, 0.85)",
            "#f8fafc",
          ]}
          locations={[0, 0.65, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* HEADER - Strictly Transparent Background with Farmer Profile & ID */}
        <View
          style={{ backgroundColor: "transparent" }}
          className="px-5 pt-2 pb-3 z-10"
        >
          {/* Top Profile, Name & ID Header */}
          <View className="flex-row items-center justify-between">
            <View className="flex-1 mr-3 flex-row items-center">
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => router.push("/(farmer)/profile" as any)}
                className="relative mr-3"
              >
                <View className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/50 bg-emerald-100 shadow-sm items-center justify-center">
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              </TouchableOpacity>

              <View className="flex-1 justify-center">
                <View className="flex-row items-center">
                  <Text
                    className="text-slate-900 font-gotham-bold text-base tracking-tight"
                    numberOfLines={1}
                  >
                    Kuppusamy
                  </Text>
                  <BadgeCheck size={16} color="#10b981" className="ml-1.5" />
                </View>
                <View className="flex-row items-center mt-1">
                  <View className="bg-emerald-100/95 border border-emerald-300/80 px-2.5 py-0.5 rounded-full flex-row items-center shadow-xs">
                    <Text className="text-emerald-950 font-gotham-bold text-[10px] tracking-wide">
                      ID: FMR-1002 • Dual Client (Crop + Fert)
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/(farmer)/notifications" as any)}
              className="w-10 h-10 rounded-full bg-white/95 items-center justify-center border border-slate-200 shadow-sm"
            >
              <Bell size={18} color="#0f172a" />
              <View className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white" />
            </TouchableOpacity>
          </View>

          {/* Quick Dual Switcher Badges (Crop & Fertilizer Mingle) */}
          <View className="flex-row items-center justify-between mt-3.5">
            <View className="flex-1 mr-2 rounded-full overflow-hidden shadow-sm">
              <LinearGradient
                colors={["#059669", "#047857"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  paddingVertical: 9,
                  paddingHorizontal: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 999,
                }}
              >
                <Sparkles size={14} color="#a7f3d0" />
                <Text className="text-white font-gotham-bold text-xs ml-1.5 uppercase tracking-wider">
                  Vetiver • 2.5 Acres
                </Text>
              </LinearGradient>
            </View>

            <View className="flex-1 ml-2 rounded-full overflow-hidden shadow-sm">
              <LinearGradient
                colors={["#d97706", "#b45309"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  paddingVertical: 9,
                  paddingHorizontal: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 999,
                }}
              >
                <Package size={14} color="#fef08a" />
                <Text className="text-white font-gotham-bold text-xs ml-1.5 uppercase tracking-wider">
                  Bio-Input Client
                </Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 14 }}
        >
          {/* Active Agronomy & Fertilizer Advisory Card (Medium Brightness & Elegance) */}
          <View className="px-5 mb-5">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("/(farmer)/recommendations" as any)}
              className="rounded-3xl overflow-hidden shadow-sm border border-emerald-300 bg-emerald-50/95"
            >
              <View className="p-5 relative overflow-hidden">
                <View style={{ position: "absolute", right: -15, bottom: -15, opacity: 0.08 }}>
                  <Leaf size={140} color="#059669" />
                </View>
                <View className="flex-row items-center justify-between mb-2.5">
                  <View className="bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 flex-row items-center">
                    <Sparkles size={12} color="#047857" className="mr-1" />
                    <Text className="text-emerald-900 font-gotham-bold text-[10px] uppercase tracking-wider">
                      Advisory • Active Growth Stage
                    </Text>
                  </View>
                  <View className="bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                    <Text className="text-amber-900 font-gotham-bold text-[10px] uppercase tracking-wider">
                      Due in 3 Days
                    </Text>
                  </View>
                </View>

                <Text className="text-slate-900 font-gotham-bold text-xl mb-1">
                  Bio-Fertilizer & Soil Nutrition
                </Text>
                <Text className="text-slate-700 font-gotham-medium text-xs leading-relaxed mb-3">
                  Apply 50kg Organic Vermicompost & Neem Cake blend along root irrigation drip lines for maximum rhizosphere elongation.
                </Text>

                <View className="flex-row items-center justify-between pt-2.5 border-t border-emerald-200">
                  <View className="flex-row items-center">
                    <View className="w-2 h-2 rounded-full bg-emerald-600 mr-2" />
                    <Text className="text-emerald-900 font-gotham-bold text-xs">
                      Agronomist: Harish (Delta Zone)
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-[#15803d] font-gotham-bold text-xs mr-1">
                      View Protocol
                    </Text>
                    <ChevronRight size={14} color="#15803d" />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Category Tabs (All / Crops / Fertilizers) */}
          <View className="mb-5 px-5">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
            >
              {(["All", "Crops", "Fertilizers"] as const).map((tab) => {
                const isCurrent = activeTab === tab;
                return (
                  <TouchableOpacity
                    key={tab}
                    activeOpacity={0.8}
                    onPress={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-full border shadow-sm ${
                      isCurrent
                        ? "bg-[#15803d] border-[#15803d]"
                        : "bg-white/95 border-slate-200"
                    }`}
                  >
                    <Text
                      className={`font-gotham-bold text-sm ${
                        isCurrent ? "text-white" : "text-slate-700"
                      }`}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Farm Overview Card with 3-stat cluster */}
          {(activeTab === "Crops" || activeTab === "All") && (
            <View className="px-5 mb-5">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-lg font-gotham-bold text-slate-900">
                  Farm Overview
                </Text>
                <TouchableOpacity onPress={() => router.push("/(farmer)/farm" as any)}>
                  <Text className="text-[#15803d] font-gotham-bold text-xs uppercase tracking-wider">
                    Details
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => router.push("/(farmer)/farm" as any)}
                className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-200/90"
              >
                <View className="h-36 relative">
                  <Image
                    source={require("../../assets/images/image2.jpg")}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.55)"]}
                    style={StyleSheet.absoluteFill}
                  />
                  <View className="absolute bottom-3 left-4 flex-row items-center">
                    <MapPin size={13} color="#a7f3d0" className="mr-1" />
                    <Text className="text-white font-gotham-semibold text-xs drop-shadow-sm">
                      Kuppusamy Organic Estate • Annur
                    </Text>
                  </View>
                </View>

                {/* 3-Stat Cluster in multi-color pastel backgrounds */}
                <View className="p-3.5 flex-row gap-2.5 bg-white">
                  <View className="flex-1 bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-3 items-center">
                    <Text className="text-emerald-950 font-gotham-bold text-xl">
                      2.5
                    </Text>
                    <Text className="text-emerald-800 text-[10px] uppercase font-gotham-bold tracking-widest mt-0.5">
                      Acres
                    </Text>
                  </View>

                  <View className="flex-1 bg-sky-50/90 border border-sky-200/80 rounded-2xl p-3 items-center">
                    <Text className="text-sky-950 font-gotham-bold text-base">
                      Vetiver
                    </Text>
                    <Text className="text-sky-800 text-[10px] uppercase font-gotham-bold tracking-widest mt-0.5">
                      Crop Type
                    </Text>
                  </View>

                  <View className="flex-1 bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3 items-center">
                    <Text className="text-amber-800 font-gotham-bold text-base">
                      Optimal
                    </Text>
                    <Text className="text-amber-800 text-[10px] uppercase font-gotham-bold tracking-widest mt-0.5">
                      Health
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Recent Orders Section */}
          {(activeTab === "Fertilizers" || activeTab === "All") && (
            <View className="px-5 mb-5">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-lg font-gotham-bold text-slate-900">
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
                className="bg-amber-50/80 rounded-[20px] p-4 border border-amber-200/90 shadow-sm flex-row items-center justify-between"
              >
                <View className="flex-row items-center flex-1 pr-2">
                  <View className="w-12 h-12 bg-amber-100/90 border border-amber-300/80 rounded-2xl items-center justify-center mr-3.5 shadow-xs">
                    <Droplet size={22} color="#b45309" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-900 font-gotham-bold text-sm">
                      Organic Compost (50kg)
                    </Text>
                    <Text className="text-amber-900 font-gotham-medium text-xs mt-0.5">
                      Order #8832 • Dispatched
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-emerald-800 font-gotham-bold text-sm">
                    ₹1,250
                  </Text>
                  <ChevronRight size={16} color="#78350f" className="mt-1" />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Quick Actions (Visits, Reports, Rate FO, Support) */}
          <View className="px-5 mb-5">
            <Text className="text-lg font-gotham-bold text-slate-900 mb-3.5">
              Quick Actions
            </Text>
            <View className="flex-row justify-between">
              {[
                {
                  icon: History,
                  label: "Visits",
                  route: "/(farmer)/history",
                  color: "#15803d",
                  bgColor: "#ecfdf5",
                  borderColor: "#a7f3d0",
                },
                {
                  icon: Leaf,
                  label: "Reports",
                  route: "/(farmer)/recommendations",
                  color: "#b45309",
                  bgColor: "#fffbeb",
                  borderColor: "#fde68a",
                },
                {
                  icon: Star,
                  label: "Rate FO",
                  route: "/(farmer)/rate/v1",
                  color: "#0369a1",
                  bgColor: "#f0f9ff",
                  borderColor: "#bae6fd",
                },
                {
                  icon: HeadphonesIcon,
                  label: "Support",
                  route: "/(farmer)/support",
                  color: "#7e22ce",
                  bgColor: "#faf5ff",
                  borderColor: "#e9d5ff",
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
                      <Icon size={25} color={action.color} strokeWidth={1.8} />
                    </View>
                    <Text className="text-slate-800 text-xs font-gotham-bold text-center">
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
              className="rounded-[24px] overflow-hidden shadow-sm"
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
                    <Text className="text-white/85 text-xs leading-relaxed mb-3 font-gotham-medium">
                      Invite neighboring farmers and get bonus reward points!
                    </Text>
                    <View className="bg-white/20 py-1.5 px-4 rounded-full self-start border border-white/30">
                      <Text className="text-white font-gotham-bold text-[11px] uppercase tracking-wider">
                        Share Invite
                      </Text>
                    </View>
                  </View>
                  <Gift size={44} color="#fff" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

