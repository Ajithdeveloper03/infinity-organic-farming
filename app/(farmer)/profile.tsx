import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  User,
  MapPin,
  ShieldCheck,
  Phone,
  Mail,
  FileText,
  Lock,
  BadgeCheck,
  Building2,
  Layers,
  Droplets,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguage, LanguageTogglePill } from "../../context/LanguageContext";

export default function FarmerProfileScreen() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"personal" | "kyc" | "land">("personal");

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
              {t("farmerProfile", "Farmer Profile")}
            </Text>
            <LanguageTogglePill />
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 130, paddingTop: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Banner and Profile Card */}
            <View className="bg-white mx-5 rounded-3xl overflow-hidden shadow-sm border border-slate-200">
              {/* Top Landscape Banner */}
              <View className="h-32 bg-slate-200 relative">
                <Image
                  source={require("../../assets/images/image2.jpg")}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.45)"]}
                  style={StyleSheet.absoluteFill}
                />
              </View>

              {/* Profile Picture */}
              <View className="items-center -mt-12 mb-3">
                <View className="w-24 h-24 bg-white rounded-full p-1 shadow-md border-2 border-emerald-500/50 overflow-hidden">
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
                    }}
                    className="w-full h-full rounded-full"
                    resizeMode="cover"
                  />
                </View>
              </View>

              {/* Quick Details */}
              <View className="items-center px-6 mb-5">
                <View className="flex-row items-center">
                  <Text className="text-slate-900 text-2xl font-gotham-bold mb-0.5">
                    {language === "ta" ? "குப்புசாமி" : "Kuppusamy"}
                  </Text>
                  <BadgeCheck size={18} color="#10b981" className="ml-1.5" />
                </View>
                <View className="bg-emerald-100/90 border border-emerald-300/80 px-3 py-1 rounded-full mt-1 mb-1.5">
                  <Text className="text-emerald-950 font-gotham-bold text-[11px] uppercase tracking-wider">
                    {language === "ta" ? "சான்றளிக்கப்பட்ட விவசாயி • ID: FM10008" : "Verified Farmer • ID: FM10008"}
                  </Text>
                </View>
                <Text className="text-slate-600 font-gotham-medium text-xs">
                  {language === "ta" ? "அன்னூர் / சோமனூர், கோவை" : "Annur / Somanur, Coimbatore"}
                </Text>
              </View>
            </View>

            {/* Tab Switcher */}
            <View className="flex-row mx-5 mt-5 bg-slate-200/80 p-1 rounded-full">
              {[
                { key: "personal", label: t("personal", "Personal") },
                { key: "kyc", label: t("kycBank", "KYC & Bank") },
                { key: "land", label: t("landDetails", "Land Details") },
              ].map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key as any)}
                  activeOpacity={0.8}
                  className={`flex-1 py-2.5 items-center rounded-full ${
                    activeTab === tab.key ? "bg-white shadow-sm" : ""
                  }`}
                >
                  <Text
                    className={`font-gotham-bold text-xs ${
                      activeTab === tab.key ? "text-emerald-800" : "text-slate-600"
                    }`}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Dynamic Content */}
            <View className="mx-5 mt-5 mb-12">
              {activeTab === "personal" && (
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                  <View className="bg-sky-50 p-4 rounded-xl mb-4 flex-row items-start border border-sky-200">
                    <Lock size={18} color="#0284c7" className="mt-0.5 mr-2.5" />
                    <Text className="flex-1 text-sky-950 font-gotham-medium text-xs leading-5">
                      {language === "ta"
                        ? "உங்கள் சுயவிவரம் அதிகாரப்பூர்வமாக சரிபார்க்கப்பட்டது. மாற்றங்களை கோர கள அலுவலரை அணுகவும்."
                        : "Your profile is officially verified. To request changes, please contact your assigned Field Officer."}
                    </Text>
                  </View>
                  <InfoRow icon={Phone} label={t("contactMobile", "Mobile Number")} value="+91 98765 43210" iconColor="#15803d" iconBg="bg-emerald-50" />
                  <InfoRow icon={Mail} label={t("email", "Email Address")} value="kuppusamy.farmer@infinityorganics.com" iconColor="#0284c7" iconBg="bg-sky-50" />
                  <InfoRow icon={MapPin} label={t("village", "Village")} value={language === "ta" ? "சோமனூர்" : "Somanur"} iconColor="#b45309" iconBg="bg-amber-50" />
                  <InfoRow icon={MapPin} label={language === "ta" ? "வட்டம்" : "Taluk"} value={language === "ta" ? "சூலூர்" : "Sulur"} iconColor="#b45309" iconBg="bg-amber-50" />
                  <InfoRow icon={MapPin} label={t("district", "District")} value={language === "ta" ? "கோயம்புத்தூர்" : "Coimbatore"} iconColor="#7e22ce" iconBg="bg-purple-50" isLast />
                </View>
              )}

              {activeTab === "kyc" && (
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                  <View className="bg-emerald-50 p-4 rounded-xl mb-4 flex-row items-center border border-emerald-200">
                    <ShieldCheck size={22} color="#059669" className="mr-2.5" />
                    <Text className="flex-1 text-emerald-950 font-gotham-bold text-sm">
                      {language === "ta" ? "KYC சரிபார்க்கப்பட்டது (இயற்கை பிரிவு)" : "KYC Verified & Certified (Organic Division)"}
                    </Text>
                  </View>
                  <InfoRow icon={FileText} label={t("aadhaarNo", "Aadhaar Number")} value="XXXX XXXX 4321" iconColor="#15803d" iconBg="bg-emerald-50" />
                  <InfoRow icon={FileText} label={t("panNo", "PAN Number")} value="ABCDE1234F" iconColor="#0284c7" iconBg="bg-sky-50" />
                  <InfoRow icon={Building2} label={t("bankAccount", "Bank Account")} value="State Bank of India" iconColor="#b45309" iconBg="bg-amber-50" />
                  <InfoRow icon={FileText} label={language === "ta" ? "கணக்கு எண்" : "Account Number"} value="XXXXXXXXXX8901" iconColor="#7e22ce" iconBg="bg-purple-50" isLast />
                </View>
              )}

              {activeTab === "land" && (
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                  <InfoRow icon={Layers} label={t("totalArea", "Total Land Area")} value={language === "ta" ? "2.5 ஏக்கர்" : "2.5 Acres"} iconColor="#15803d" iconBg="bg-emerald-50" />
                  <InfoRow icon={FileText} label={language === "ta" ? "சர்வே எண்" : "Survey Number"} value="SF 102/3B" iconColor="#0284c7" iconBg="bg-sky-50" />
                  <InfoRow icon={MapPin} label={t("soilType", "Soil Type")} value={language === "ta" ? "செம்மண் வளம்" : "Red Soil (Semman Mineral)"} iconColor="#b45309" iconBg="bg-amber-50" />
                  <InfoRow icon={Droplets} label={t("irrigation", "Irrigation Source")} value={language === "ta" ? "ஆழ்துளை & சொட்டு நீர்" : "Borewell & Drip Network"} iconColor="#0284c7" iconBg="bg-sky-50" />
                  <InfoRow icon={Layers} label={t("primaryCrop", "Primary Crop")} value={language === "ta" ? "வெட்டிவேர்" : "Vetiver (Chrysopogon zizanioides)"} iconColor="#7e22ce" iconBg="bg-purple-50" isLast />
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const InfoRow = ({ icon: Icon, label, value, iconColor = "#15803d", iconBg = "bg-emerald-50", isLast = false }: any) => (
  <View className={`flex-row items-center py-3.5 ${!isLast ? "border-b border-slate-100" : ""}`}>
    <View className={`w-10 h-10 ${iconBg} rounded-xl items-center justify-center mr-3.5 shadow-xs`}>
      <Icon size={18} color={iconColor} />
    </View>
    <View className="flex-1">
      <Text className="text-slate-500 text-xs font-gotham-medium mb-0.5">
        {label}
      </Text>
      <Text className="text-slate-900 font-gotham-bold text-sm">{value}</Text>
    </View>
  </View>
);

