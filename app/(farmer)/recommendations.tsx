import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  Droplets,
  Leaf,
  Sprout,
  Bug,
  Calendar,
  Camera,
  CheckCircle2,
  FileText,
  AlertCircle,
} from "lucide-react-native";

const generalTips = [
  {
    id: "1",
    category: "Irrigation",
    title: "Irrigation Management",
    desc: "Maintain regular morning drip irrigation for optimal vetiver root elongation.",
    icon: Droplets,
    color: "#2563eb",
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
  },
  {
    id: "2",
    category: "Soil Health",
    title: "Organic Bio-Compost",
    desc: "Apply vermicompost or FYM every 45 days around crop root zone.",
    icon: Leaf,
    color: "#15803d",
    bgColor: "#f0fdf4",
    borderColor: "#bbf7d0",
  },
  {
    id: "3",
    category: "Weed Control",
    title: "Inter-row Weeding",
    desc: "Remove weeds before flowering stage to conserve ground nitrogen and moisture.",
    icon: Sprout,
    color: "#d97706",
    bgColor: "#fffbeb",
    borderColor: "#fde68a",
  },
  {
    id: "4",
    category: "Pest Management",
    title: "Natural Neem Spray",
    desc: "Spray cold-pressed neem kernel oil solution (5ml/L) as preventative barrier.",
    icon: Bug,
    color: "#dc2626",
    bgColor: "#fef2f2",
    borderColor: "#fecaca",
  },
];

const visitReports = [
  {
    id: "101",
    date: "Aug 12, 2026",
    officer: "Harish (Delta Field Officer)",
    status: "Optimal Growth",
    statusColor: "#059669",
    statusBg: "#ecfdf5",
    recommendation:
      "Crop health is in prime condition. Continue standard drip cycle. Bio-tonic applied successfully.",
    hasPhotos: true,
  },
  {
    id: "102",
    date: "Jul 28, 2026",
    officer: "Hemath (Field Officer)",
    status: "Action Suggested",
    statusColor: "#d97706",
    statusBg: "#fffbeb",
    recommendation:
      "Minor weed density observed in southern corner. Recommended organic manual weeding.",
    hasPhotos: false,
  },
];

export default function FarmerRecommendationsScreen() {
  const [activeTab, setActiveTab] = useState<"reports" | "tips">("reports");

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
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-200 shadow-sm"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-lg font-gotham-bold">
            Reports & Recommendations
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Banner with Background Image */}
          <View className="p-5">
            <View className="rounded-3xl overflow-hidden shadow-md border border-green-800/20">
              <ImageBackground
                source={require("../../assets/images/image6.jpg")}
                className="w-full"
                resizeMode="cover"
              >
                <View className="p-6 bg-green-950/80">
                  <View className="flex-row items-center mb-2">
                    <FileText size={20} color="#86efac" className="mr-2" />
                    <Text className="text-green-300 font-brandon font-bold text-xs uppercase tracking-widest">
                      Agronomy Guidance
                    </Text>
                  </View>
                  <Text className="text-white font-gotham-bold text-2xl mb-2">
                    Expert Farm Reports
                  </Text>
                  <Text className="text-white/80 font-brandon text-xs leading-relaxed">
                    Customized field observations and scientific organic protocols for your land.
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* Tab Switcher */}
          <View className="px-5 mb-5">
            <View className="flex-row bg-gray-200/70 p-1 rounded-full">
              <TouchableOpacity
                onPress={() => setActiveTab("reports")}
                activeOpacity={0.8}
                className={`flex-1 py-2.5 items-center rounded-full ${
                  activeTab === "reports" ? "bg-white shadow-sm" : ""
                }`}
              >
                <Text
                  className={`font-gotham-bold text-xs ${
                    activeTab === "reports" ? "text-green-800" : "text-gray-600"
                  }`}
                >
                  Visit Reports ({visitReports.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveTab("tips")}
                activeOpacity={0.8}
                className={`flex-1 py-2.5 items-center rounded-full ${
                  activeTab === "tips" ? "bg-white shadow-sm" : ""
                }`}
              >
                <Text
                  className={`font-gotham-bold text-xs ${
                    activeTab === "tips" ? "text-green-800" : "text-gray-600"
                  }`}
                >
                  Farming Tips ({generalTips.length})
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tab Content */}
          <View className="px-5">
            {activeTab === "reports" ? (
              <View>
                {visitReports.map((report) => (
                  <View
                    key={report.id}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 mb-4"
                  >
                    <View className="flex-row justify-between items-center mb-3">
                      <View>
                        <Text className="text-gray-900 font-gotham-bold text-base">
                          {report.officer}
                        </Text>
                        <View className="flex-row items-center mt-0.5">
                          <Calendar size={12} color="#4b5563" className="mr-1" />
                          <Text className="text-gray-600 text-xs font-brandon">
                            {report.date}
                          </Text>
                        </View>
                      </View>

                      <View
                        className="px-3 py-1 rounded-full border flex-row items-center"
                        style={{
                          backgroundColor: report.statusBg,
                          borderColor: `${report.statusColor}40`,
                        }}
                      >
                        <CheckCircle2 size={12} color={report.statusColor} className="mr-1" />
                        <Text
                          style={{ color: report.statusColor }}
                          className="text-[11px] font-gotham-bold uppercase tracking-wider"
                        >
                          {report.status}
                        </Text>
                      </View>
                    </View>

                    <View className="bg-gray-50 rounded-xl p-3 border border-gray-100 mb-3">
                      <Text className="text-gray-800 font-brandon font-bold text-xs uppercase mb-1">
                        Agronomist Recommendation
                      </Text>
                      <Text className="text-gray-800 font-brandon text-xs leading-relaxed">
                        {report.recommendation}
                      </Text>
                    </View>

                    {report.hasPhotos && (
                      <View className="flex-row items-center justify-between pt-2 border-t border-gray-100">
                        <View className="flex-row items-center">
                          <Camera size={14} color="#15803d" className="mr-1.5" />
                          <Text className="text-green-800 font-gotham-bold text-xs">
                            Field Inspection Photos Attached
                          </Text>
                        </View>
                        <Text className="text-gray-500 font-brandon text-xs">
                          2 Captured
                        </Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ) : (
              <View>
                {generalTips.map((tip) => {
                  const Icon = tip.icon;
                  return (
                    <View
                      key={tip.id}
                      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 mb-4"
                    >
                      <View className="flex-row items-start">
                        <View
                          style={{
                            backgroundColor: tip.bgColor,
                            borderColor: tip.borderColor,
                          }}
                          className="w-12 h-12 rounded-2xl border items-center justify-center mr-3.5"
                        >
                          <Icon size={22} color={tip.color} />
                        </View>
                        <View className="flex-1">
                          <Text
                            style={{ color: tip.color }}
                            className="font-brandon font-bold text-[11px] uppercase tracking-wider mb-0.5"
                          >
                            {tip.category}
                          </Text>
                          <Text className="text-gray-900 font-gotham-bold text-base mb-1">
                            {tip.title}
                          </Text>
                          <Text className="text-gray-700 font-brandon text-xs leading-relaxed">
                            {tip.desc}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
