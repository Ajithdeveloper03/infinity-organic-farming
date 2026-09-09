
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
  Sparkles,
  ChevronRight,
} from "lucide-react-native";
import { useLanguage, LanguageTogglePill } from "../../context/LanguageContext";

const generalTips = [
  {
    id: "1",
    category: "Irrigation",
    title: "Irrigation Management",
    desc: "Maintain regular morning drip irrigation for optimal vetiver root elongation.",
    icon: Droplets,
    color: "#0284c7",
    cardBg: "bg-sky-50/85",
    cardBorder: "border-sky-200/90",
    iconBg: "#e0f2fe",
    iconBorder: "#bae6fd",
  },
  {
    id: "2",
    category: "Soil Health",
    title: "Organic Bio-Compost",
    desc: "Apply vermicompost or FYM every 45 days around crop root zone for enriched microbial life.",
    icon: Leaf,
    color: "#15803d",
    cardBg: "bg-emerald-50/85",
    cardBorder: "border-emerald-200/90",
    iconBg: "#dcfce7",
    iconBorder: "#a7f3d0",
  },
  {
    id: "3",
    category: "Weed Control",
    title: "Inter-row Weeding",
    desc: "Remove weeds before flowering stage to conserve ground nitrogen and moisture.",
    icon: Sprout,
    color: "#b45309",
    cardBg: "bg-amber-50/85",
    cardBorder: "border-amber-200/90",
    iconBg: "#fef3c7",
    iconBorder: "#fde68a",
  },
  {
    id: "4",
    category: "Pest Management",
    title: "Natural Neem Spray",
    desc: "Spray cold-pressed neem kernel oil solution (5ml/L) as preventative bio-barrier.",
    icon: Bug,
    color: "#e11d48",
    cardBg: "bg-rose-50/85",
    cardBorder: "border-rose-200/90",
    iconBg: "#ffe4e6",
    iconBorder: "#fecdd3",
  },
];

const visitReports = [
  {
    id: "101",
    date: "Aug 12, 2026",
    officer: "Harish (Delta Field Officer)",
    status: "Optimal Growth",
    statusColor: "#059669",
    statusBg: "bg-emerald-100",
    cardBg: "bg-emerald-50/95",
    cardBorder: "border-emerald-200/90",
    noteBg: "bg-white/90 border-emerald-100",
    actionColor: "#059669",
    actionText: "text-emerald-800",
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
    statusBg: "bg-amber-100",
    cardBg: "bg-amber-50/95",
    cardBorder: "border-amber-200/90",
    noteBg: "bg-white/90 border-amber-100",
    actionColor: "#d97706",
    actionText: "text-amber-800",
    recommendation:
      "Minor weed density observed in southern corner. Recommended organic manual weeding.",
    hasPhotos: false,
  },
];

export default function FarmerRecommendationsScreen() {
  const { t, language } = useLanguage();
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
            className="w-10 h-10 rounded-full bg-white/95 items-center justify-center border border-slate-200 shadow-sm"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-slate-900 text-lg font-gotham-bold">
            {language === "ta" ? "அறிக்கைகள் & வழிகாட்டல்" : "Reports & Guidance"}
          </Text>
          <LanguageTogglePill />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 6 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Banner with Background Image */}
          <View className="p-5">
            <View className="rounded-3xl overflow-hidden shadow-sm border border-emerald-800/20">
              <ImageBackground
                source={require("../../assets/images/image6.jpg")}
                className="w-full"
                resizeMode="cover"
              >
                <View className="p-6 bg-emerald-950/85">
                  <View className="flex-row items-center mb-2">
                    <FileText size={18} color="#86efac" className="mr-2" />
                    <Text className="text-emerald-300 font-gotham-bold text-xs uppercase tracking-widest">
                      {language === "ta" ? "பண்ணை வழிகாட்டல்" : "Agronomy Guidance"}
                    </Text>
                  </View>
                  <Text className="text-white font-gotham-bold text-2xl mb-2">
                    {language === "ta" ? "நிபுணர் பண்ணை அறிக்கைகள்" : "Expert Farm Reports"}
                  </Text>
                  <Text className="text-white/85 font-gotham-medium text-xs leading-relaxed">
                    {language === "ta"
                      ? "உங்கள் நிலத்திற்கான களப் பதிவுகள் மற்றும் இயற்கை நெறிமுறைகள்."
                      : "Customized field observations and scientific organic protocols for your land."}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* Tab Switcher */}
          <View className="px-5 mb-5">
            <View className="flex-row bg-slate-200/80 p-1 rounded-full">
              <TouchableOpacity
                onPress={() => setActiveTab("reports")}
                activeOpacity={0.8}
                className={`flex-1 py-2.5 items-center rounded-full ${
                  activeTab === "reports" ? "bg-white shadow-sm" : ""
                }`}
              >
                <Text
                  className={`font-gotham-bold text-xs ${
                    activeTab === "reports" ? "text-emerald-800" : "text-slate-600"
                  }`}
                >
                  {language === "ta" ? "வருகை அறிக்கைகள்" : "Visit Reports"} ({visitReports.length})
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
                    activeTab === "tips" ? "text-emerald-800" : "text-slate-600"
                  }`}
                >
                  {language === "ta" ? "விவசாயக் குறிப்புகள்" : "Farming Tips"} ({generalTips.length})
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tab Content */}
          <View className="px-5">
            {activeTab === "reports" ? (
              <View>
                {visitReports.map((report) => (
                  <TouchableOpacity
                    key={report.id}
                    activeOpacity={0.9}
                    onPress={() => router.push(`/(farmer)/report/${report.id}` as any)}
                    className={`rounded-2xl p-4 shadow-xs border mb-3.5 ${report.cardBg} ${report.cardBorder}`}
                  >
                    <View className="flex-row justify-between items-center mb-3">
                      <View>
                        <Text className="text-slate-900 font-gotham-bold text-base">
                          {report.officer}
                        </Text>
                        <View className="flex-row items-center mt-0.5">
                          <Calendar size={12} color="#64748b" className="mr-1" />
                          <Text className="text-slate-600 text-xs font-gotham-medium">
                            {report.date}
                          </Text>
                        </View>
                      </View>

                      <View
                        className={`px-3 py-1 rounded-full border flex-row items-center ${report.statusBg}`}
                        style={{ borderColor: `${report.statusColor}60` }}
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

                    <View className={`rounded-xl p-3.5 mb-2.5 border ${report.noteBg}`}>
                      <Text className={`font-gotham-bold text-xs uppercase tracking-wider mb-1 ${report.actionText}`}>
                        Agronomist Recommendation
                      </Text>
                      <Text className="text-slate-700 font-gotham-medium text-xs leading-relaxed" numberOfLines={2}>
                        {report.recommendation}
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between pt-2.5 border-t border-slate-200/70">
                      <View className="flex-row items-center">
                        <Camera size={13} color={report.actionColor} className="mr-1.5" />
                        <Text className={`font-gotham-bold text-xs ${report.actionText}`}>
                          Photos Attached
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Text className={`font-gotham-bold text-xs mr-1 ${report.actionText}`}>
                          {t("viewReport", "View Full Report")}
                        </Text>
                        <ChevronRight size={14} color={report.actionColor} />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View>
                {generalTips.map((tip) => {
                  const Icon = tip.icon;
                  return (
                    <View
                      key={tip.id}
                      className={`rounded-2xl p-5 shadow-sm border mb-4 ${tip.cardBg} ${tip.cardBorder}`}
                    >
                      <View className="flex-row items-start">
                        <View
                          style={{
                            backgroundColor: tip.iconBg,
                            borderColor: tip.iconBorder,
                          }}
                          className="w-12 h-12 rounded-2xl border items-center justify-center mr-3.5 shadow-xs"
                        >
                          <Icon size={22} color={tip.color} />
                        </View>
                        <View className="flex-1">
                          <Text
                            style={{ color: tip.color }}
                            className="font-gotham-bold text-[11px] uppercase tracking-wider mb-0.5"
                          >
                            {tip.category}
                          </Text>
                          <Text className="text-slate-900 font-gotham-bold text-base mb-1">
                            {tip.title}
                          </Text>
                          <Text className="text-slate-700 font-gotham-medium text-xs leading-relaxed">
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

