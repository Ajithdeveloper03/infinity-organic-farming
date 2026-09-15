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
import { useLanguage, LanguageTogglePill } from "../../context/LanguageContext";

export default function OrdersScreen() {
  const { t, language } = useLanguage();

  const orders = [
    {
      id: "#8831",
      product: language === "ta" ? "சான்றளிக்கப்பட்ட வெட்டிவேர் நாற்றுகள்" : "Certified Vetiver Root Slips",
      category: language === "ta" ? "பயிர் நடவுப் பொருட்கள்" : "Crop Planting Material",
      qty: language === "ta" ? "5,000 நாற்றுகள் (2.5 ஏக்கருக்கு)" : "5,000 Slips (For 2.5 Acres)",
      price: "₹12,500",
      status: t("delivered", "Delivered"),
      date: "Aug 02, 2026",
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
      id: "#8832",
      product: language === "ta" ? "இயற்கை மண்புழு உரம் (50 கிலோ)" : "Organic Vermicompost (50kg)",
      category: language === "ta" ? "உயிர் உரம்" : "Bio-Fertilizer Input",
      qty: language === "ta" ? "2 மூட்டைகள்" : "2 Bags",
      price: "₹1,250",
      status: t("delivered", "Delivered"),
      date: language === "ta" ? "இன்று, 09:30 AM" : "Today, 09:30 AM",
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
      product: language === "ta" ? "தூய வேப்பெண்ணெய் சாறு (5 லி)" : "Pure Neem Oil Extract (5L)",
      category: language === "ta" ? "பூச்சி விரட்டி" : "Organic Pest Bio-Control",
      qty: language === "ta" ? "1 கேன்" : "1 Canister",
      price: "₹850",
      status: t("processing", "Processing"),
      date: t("yesterday", "Yesterday"),
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
      product: language === "ta" ? "மண் ஊட்டச்சத்து உரம் (25 கிலோ)" : "Bio-Fertilizer Soil Booster (25kg)",
      category: language === "ta" ? "உயிர் உரம்" : "Bio-Fertilizer Input",
      qty: language === "ta" ? "1 மூட்டை" : "1 Bag",
      price: "₹1,350",
      status: t("dispatched", "Dispatched"),
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
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
          {/* Header - Transparent */}
          <View style={{ backgroundColor: "transparent" }} className="px-5 pt-3 pb-3 flex-row items-center justify-between z-10">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-white/95 items-center justify-center border border-slate-200 shadow-sm"
              activeOpacity={0.7}
            >
              <ChevronLeft size={22} color="#0f172a" />
            </TouchableOpacity>
            <Text className="text-slate-900 text-lg font-gotham-bold">
              {t("myOrders", "My Orders")}
            </Text>
            <LanguageTogglePill />
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 130, paddingTop: 16 }}
          >
            <View className="px-5">
              <Text className="text-slate-900 font-gotham-bold text-base mb-3.5">
                {language === "ta" ? "சமீபத்திய ஆர்டர் வரலாறு" : "Recent Order History (Crops & Bio-Fertilizers)"}
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
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="font-gotham-bold text-sm text-slate-900 flex-1 mr-2">
                        {order.product}
                      </Text>
                      {order.category && (
                        <View className="bg-emerald-100 px-2 py-0.5 rounded-md">
                          <Text className="text-emerald-800 text-[10px] font-gotham-bold">
                            {order.category}
                          </Text>
                        </View>
                      )}
                    </View>
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

