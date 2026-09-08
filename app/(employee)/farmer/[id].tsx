import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  MapPin,
  Phone,
  MessageCircle,
  Sprout,
  Package,
  Layers,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Award,
  Droplets,
  Truck,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react-native";
import { mockFarmers } from "../../../data/mockData";

export default function FarmerDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Find farmer or fallback
  const farmer =
    mockFarmers.find(
      (f) =>
        f.id === id ||
        f.id === `f${id}` ||
        f.id.replace("f", "") === id
    ) || mockFarmers[0];

  const handleCall = () => {
    Linking.openURL(`tel:${farmer.phone}`);
  };

  const handleWhatsApp = () => {
    Linking.openURL(
      `https://wa.me/${farmer.phone.replace(/[^0-9]/g, "")}?text=Hello%20${farmer.name},%20Infinity%20Organics%20Field%20Team`
    );
  };

  const isDual = farmer.customerType === "both";
  const isFert = farmer.customerType === "fertilizer";
  const isCrop = farmer.customerType === "crop";

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header - Transparent */}
        <View
          style={{ backgroundColor: "transparent" }}
          className="px-5 pt-2 pb-3 flex-row items-center justify-between z-10"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-200 shadow-sm"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>

          <Text className="text-lg font-gotham-bold text-slate-900">
            Farmer Profile Dossier
          </Text>

          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={handleCall}
              className="w-10 h-10 rounded-full bg-emerald-50 items-center justify-center border border-emerald-200 mr-2"
            >
              <Phone size={17} color="#059669" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleWhatsApp}
              className="w-10 h-10 rounded-full bg-emerald-600 items-center justify-center shadow-xs"
            >
              <MessageCircle size={17} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-1 px-5 pt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 160, paddingTop: 6 }}
        >
          {/* Profile Overview Card (Medium Brightness Elegance) */}
          <View className="bg-emerald-50/90 rounded-3xl p-5 mb-4 border border-emerald-200/90 shadow-sm">
            <View className="flex-row items-center mb-4">
              <View
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 38,
                  overflow: "hidden",
                  borderWidth: 3,
                  borderColor: "#10b981",
                  backgroundColor: "#ffffff",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 14,
                  shadowColor: "#059669",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                  elevation: 3,
                }}
              >
                <Image
                  source={{
                    uri:
                      farmer.photo ||
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                  }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>

              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text className="text-slate-900 font-gotham-bold text-xl">
                    {farmer.name}
                  </Text>
                  <ShieldCheck size={18} color="#059669" className="ml-1.5" />
                </View>

                <View className="flex-row items-center mt-1">
                  <MapPin size={13} color="#047857" />
                  <Text className="text-slate-700 font-gotham-medium text-xs ml-1" numberOfLines={1}>
                    {farmer.address}
                  </Text>
                </View>

                <Text className="text-emerald-800 font-gotham-bold text-xs mt-1">
                  Phone: {farmer.phone}
                </Text>
              </View>
            </View>

            {/* Customer Mingle Badges */}
            <View className="flex-row flex-wrap items-center gap-2 pt-3 border-t border-emerald-200/80">
              {isDual && (
                <View className="bg-purple-100 border border-purple-300 px-3 py-1 rounded-full flex-row items-center">
                  <Sparkles size={13} color="#7e22ce" className="mr-1" />
                  <Text className="text-purple-900 font-gotham-bold text-xs uppercase tracking-wider">
                    ★ Dual Client (Crops & Inputs)
                  </Text>
                </View>
              )}

              {(isDual || isCrop) && (
                <View className="bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full flex-row items-center">
                  <Sprout size={13} color="#047857" className="mr-1" />
                  <Text className="text-emerald-900 font-gotham-bold text-xs uppercase tracking-wider">
                    Crop Cultivator • {farmer.cropType}
                  </Text>
                </View>
              )}

              {(isDual || isFert) && (
                <View className="bg-amber-100 border border-amber-300 px-3 py-1 rounded-full flex-row items-center">
                  <Package size={13} color="#b45309" className="mr-1" />
                  <Text className="text-amber-900 font-gotham-bold text-xs uppercase tracking-wider">
                    Bio-Fertilizer Buyer
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Farm Land & Agronomy Metrics (Sky Pastel Medium Card) */}
          <View className="bg-sky-50/90 rounded-3xl p-5 mb-4 border border-sky-200/90 shadow-sm">
            <View className="flex-row items-center justify-between mb-3.5">
              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-sky-100 items-center justify-center border border-sky-200 mr-2">
                  <Layers size={16} color="#0284c7" />
                </View>
                <Text className="text-slate-900 font-gotham-bold text-base">
                  Land & Soil Specifications
                </Text>
              </View>
              <View className="bg-sky-200/80 px-2.5 py-0.5 rounded-full">
                <Text className="text-sky-900 font-gotham-bold text-xs">
                  {farmer.farmArea}
                </Text>
              </View>
            </View>

            <View className="flex-row gap-2.5 mb-3">
              <View className="flex-1 bg-white p-3 rounded-2xl border border-sky-100 items-center">
                <Text className="text-sky-950 font-gotham-bold text-lg">6.8</Text>
                <Text className="text-slate-600 text-[10px] font-gotham-bold uppercase tracking-wider">
                  Soil pH (Optimal)
                </Text>
              </View>
              <View className="flex-1 bg-white p-3 rounded-2xl border border-sky-100 items-center">
                <Text className="text-sky-950 font-gotham-bold text-lg">68%</Text>
                <Text className="text-slate-600 text-[10px] font-gotham-bold uppercase tracking-wider">
                  Moisture Index
                </Text>
              </View>
              <View className="flex-1 bg-white p-3 rounded-2xl border border-sky-100 items-center">
                <Text className="text-sky-950 font-gotham-bold text-lg">42 cm</Text>
                <Text className="text-slate-600 text-[10px] font-gotham-bold uppercase tracking-wider">
                  Root Depth
                </Text>
              </View>
            </View>

            <View className="bg-white rounded-2xl p-3 border border-sky-100">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-slate-600 text-xs font-gotham-medium">Irrigation System</Text>
                <Text className="text-slate-900 text-xs font-gotham-bold">Automated Root Drip</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-slate-600 text-xs font-gotham-medium">Organic Certification</Text>
                <Text className="text-emerald-700 text-xs font-gotham-bold">NPOP Certified Organic</Text>
              </View>
            </View>
          </View>

          {/* Active Crop Portfolio (Emerald Medium Card) */}
          <View className="bg-emerald-50/90 rounded-3xl p-5 mb-4 border border-emerald-200/90 shadow-sm">
            <View className="flex-row items-center justify-between mb-3.5">
              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-emerald-100 items-center justify-center border border-emerald-200 mr-2">
                  <Sprout size={16} color="#059669" />
                </View>
                <Text className="text-slate-900 font-gotham-bold text-base">
                  Crop Cultivation Details
                </Text>
              </View>
              <View className="bg-emerald-200/80 px-2.5 py-0.5 rounded-full">
                <Text className="text-emerald-900 font-gotham-bold text-xs">
                  Active Cycle
                </Text>
              </View>
            </View>

            <View className="bg-white rounded-2xl p-4 border border-emerald-100 mb-3">
              <Text className="text-slate-900 font-gotham-bold text-sm mb-1">
                {farmer.cropType}
              </Text>
              <Text className="text-slate-700 text-xs font-gotham-medium leading-relaxed mb-3">
                {farmer.cropDetails || "Vegetative growth stage under organic protocols. Healthy leaf canopy and fibrous root network."}
              </Text>

              <View className="flex-row justify-between pt-2.5 border-t border-slate-100">
                <View>
                  <Text className="text-slate-500 text-[10px] font-gotham-bold uppercase">Planting Date</Text>
                  <Text className="text-slate-900 text-xs font-gotham-bold">Mar 15, 2026</Text>
                </View>
                <View>
                  <Text className="text-slate-500 text-[10px] font-gotham-bold uppercase">Expected Harvest</Text>
                  <Text className="text-slate-900 text-xs font-gotham-bold">Dec 2026</Text>
                </View>
                <View>
                  <Text className="text-slate-500 text-[10px] font-gotham-bold uppercase">Buyback Status</Text>
                  <Text className="text-emerald-700 text-xs font-gotham-bold">Guaranteed</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Bio-Fertilizer & Soil Nutrition Status (Amber Medium Card) */}
          <View className="bg-amber-50/90 rounded-3xl p-5 mb-4 border border-amber-200/90 shadow-sm">
            <View className="flex-row items-center justify-between mb-3.5">
              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-amber-100 items-center justify-center border border-amber-200 mr-2">
                  <Package size={16} color="#d97706" />
                </View>
                <Text className="text-slate-900 font-gotham-bold text-base">
                  Bio-Inputs & Fertilizer Plan
                </Text>
              </View>
              <View className="bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                <Text className="text-amber-900 font-gotham-bold text-xs">
                  Active
                </Text>
              </View>
            </View>

            <View className="bg-white rounded-2xl p-4 border border-amber-100 mb-3">
              <Text className="text-slate-900 font-gotham-bold text-sm mb-1">
                Prescribed Nutrition Protocol
              </Text>
              <Text className="text-slate-700 text-xs font-gotham-medium leading-relaxed mb-3">
                {farmer.fertilizerDetails || "Organic Vermicompost, Bio-NPK Granules, and Neem Cake applied along root irrigation drip lines."}
              </Text>

              <View className="flex-row justify-between pt-2.5 border-t border-slate-100">
                <View>
                  <Text className="text-slate-500 text-[10px] font-gotham-bold uppercase">Recent Order</Text>
                  <Text className="text-slate-900 text-xs font-gotham-bold">{farmer.recentOrder || "50kg Bio-NPK"}</Text>
                </View>
                <View>
                  <Text className="text-slate-500 text-[10px] font-gotham-bold uppercase">Next Application</Text>
                  <Text className="text-amber-700 text-xs font-gotham-bold">In 12 Days</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="gap-3 mt-2">
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => router.push(`/(employee)/visit/check-in` as any)}
              className="w-full bg-[#15803d] active:bg-[#166534] py-4 rounded-2xl items-center shadow-md flex-row justify-center"
            >
              <Calendar size={18} color="#ffffff" className="mr-2" />
              <Text className="text-white font-gotham-bold text-base tracking-wide">
                Start / Log Field Visit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleCall}
              className="w-full bg-white border border-slate-200 py-3.5 rounded-2xl items-center shadow-xs flex-row justify-center"
            >
              <Phone size={16} color="#059669" className="mr-2" />
              <Text className="text-emerald-800 font-gotham-bold text-sm uppercase tracking-wider">
                Call Farmer ({farmer.phone})
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
