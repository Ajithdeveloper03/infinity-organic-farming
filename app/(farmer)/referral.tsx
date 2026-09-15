import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Share,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, Copy, Gift, Share2, Star } from "lucide-react-native";
import { showToast } from "../../components/ui/ToastMessage";
import * as Clipboard from "expo-clipboard";
import { useLanguage, LanguageTogglePill } from "../../context/LanguageContext";

export default function ReferralScreen() {
  const { t, language } = useLanguage();
  const referralCode = "FARM-KUPPU-089";

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(referralCode);
    showToast({
      title: language === "ta" ? "நகலெடுக்கப்பட்டது!" : "Copied!",
      message: language === "ta" ? "பரிந்துரை குறியீடு நகலெடுக்கப்பட்டது" : "Referral code copied to clipboard",
      type: "success",
    });
  };

  const shareCode = async () => {
    try {
      await Share.share({
        message: language === "ta"
          ? `இன்பினிட்டி ஆர்கானிக்ஸ் தளத்தில் இணையுங்கள். எனது பரிந்துரை குறியீடு: ${referralCode}. நாம் இருவரும் 500 பரிசு புள்ளிகளைப் பெறுவோம்!`
          : `Join Infinity Organics using my referral code: ${referralCode}. We both get 500 bonus reward points!`,
      });
    } catch (error: any) {
      showToast({
        title: language === "ta" ? "பிழை" : "Error",
        message: error.message,
        type: "error",
      });
    }
  };

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
        {/* Header - Neat Top Spacing & Alignment */}
        <View
          style={{ backgroundColor: "transparent" }}
          className="px-5 pt-3 pb-3 flex-row items-center justify-between z-10"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/95 items-center justify-center border border-slate-200 shadow-sm"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-slate-900 text-lg font-gotham-bold">
            {language === "ta" ? "பரிந்துரைத்து பரிசு வெல்க" : "Refer & Earn"}
          </Text>
          <LanguageTogglePill />
        </View>

        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 130, paddingTop: 16 }}
        >
          <View className="items-center mb-6 pt-2">
            <View className="w-24 h-24 bg-emerald-100/90 border border-emerald-300/80 rounded-full items-center justify-center mb-4 shadow-xs">
              <Gift size={46} color="#15803d" />
            </View>
            <Text className="text-2xl font-gotham-bold text-slate-900 mb-2 text-center px-4">
              {language === "ta" ? "விவசாயிகளை இணையுங்கள், பரிசு வெல்லுங்கள்!" : "Invite Farmers, Get Rewarded!"}
            </Text>
            <Text className="text-slate-600 font-gotham-medium text-xs text-center px-4 leading-relaxed">
              {language === "ta"
                ? "உங்கள் தனித்துவமான குறியீட்டை அண்டை விவசாயிகளுடன் பகிருங்கள். அவர்கள் முதல் இயற்கை உரம் வாங்கும் போது இருவருக்கும் 500 பரிசு புள்ளிகள் கிடைக்கும்!"
                : "Share your unique code with neighboring farmers. When they register and order their first organic supply, you both receive 500 reward points!"}
            </Text>
          </View>

          {/* Current Balance */}
          <View className="bg-amber-50/80 rounded-[24px] p-5 mb-5 border border-amber-200/90 shadow-sm flex-row items-center justify-between">
            <View>
              <Text className="text-amber-900 font-gotham-bold text-[11px] uppercase tracking-widest mb-1">
                {language === "ta" ? "உங்கள் பரிசுப் புள்ளிகள்" : "Your Reward Points"}
              </Text>
              <Text className="text-slate-900 font-gotham-bold text-3xl">
                1,250
              </Text>
            </View>
            <View className="w-12 h-12 bg-amber-100 rounded-full items-center justify-center border border-amber-300">
              <Star size={24} color="#d97706" fill="#f59e0b" />
            </View>
          </View>

          {/* Referral Code Box */}
          <View className="bg-white rounded-[24px] p-5 mb-6 border border-slate-200 shadow-sm">
            <Text className="text-slate-500 font-gotham-bold text-xs uppercase tracking-wider mb-2 text-center">
              {language === "ta" ? "உங்கள் தனிப்பட்ட பரிந்துரை குறியீடு" : "Your Unique Referral Code"}
            </Text>
            <View className="bg-slate-50 border-2 border-dashed border-emerald-500/40 rounded-2xl py-3 px-4 flex-row items-center justify-between mb-4">
              <Text className="text-slate-900 font-gotham-bold text-xl tracking-widest">
                {referralCode}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={copyToClipboard}
                className="bg-emerald-600 px-3.5 py-1.5 rounded-xl flex-row items-center"
              >
                <Copy size={14} color="#ffffff" className="mr-1.5" />
                <Text className="text-white font-gotham-bold text-xs">
                  {language === "ta" ? "நகல்" : "Copy"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={shareCode}
              className="bg-[#15803d] py-3.5 rounded-2xl flex-row items-center justify-center shadow-sm"
            >
              <Share2 size={18} color="#ffffff" className="mr-2" />
              <Text className="text-white font-gotham-bold text-sm">
                {language === "ta" ? "நண்பர்களுடன் பகிர்க" : "Share with Neighbors"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

