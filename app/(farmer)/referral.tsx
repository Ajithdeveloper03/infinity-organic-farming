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

export default function ReferralScreen() {
  const referralCode = "FARM-KUPPU-089";

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(referralCode);
    showToast({
      title: "Copied!",
      message: "Referral code copied to clipboard",
      type: "success",
    });
  };

  const shareCode = async () => {
    try {
      await Share.share({
        message: `Join Infinity Organics using my referral code: ${referralCode}. We both get 500 bonus reward points!`,
      });
    } catch (error: any) {
      showToast({
        title: "Error",
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
            Refer & Earn
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-5 pt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 6 }}
        >
          <View className="items-center mb-6 pt-2">
            <View className="w-24 h-24 bg-emerald-100/90 border border-emerald-300/80 rounded-full items-center justify-center mb-4 shadow-xs">
              <Gift size={46} color="#15803d" />
            </View>
            <Text className="text-2xl font-gotham-bold text-slate-900 mb-2 text-center px-4">
              Invite Farmers, Get Rewarded!
            </Text>
            <Text className="text-slate-600 font-gotham-medium text-xs text-center px-4 leading-relaxed">
              Share your unique code with neighboring farmers. When they register and order their first organic supply, you both receive 500 reward points!
            </Text>
          </View>

          {/* Current Balance */}
          <View className="bg-amber-50/80 rounded-[24px] p-5 mb-5 border border-amber-200/90 shadow-sm flex-row items-center justify-between">
            <View>
              <Text className="text-amber-900 font-gotham-bold text-[11px] uppercase tracking-widest mb-1">
                Your Reward Points
              </Text>
              <Text className="text-slate-900 font-gotham-bold text-3xl">
                1,250
              </Text>
            </View>
            <View className="w-12 h-12 bg-amber-100 rounded-full items-center justify-center border border-amber-300">
              <Star size={24} color="#d97706" fill="#f59e0b" />
            </View>
          </View>

          {/* Referral Code Block */}
          <View className="bg-emerald-50/80 rounded-[24px] p-5 border border-emerald-200/90 mb-8 items-center shadow-sm">
            <Text className="text-emerald-900 font-gotham-bold mb-2 uppercase tracking-wider text-[11px]">
              Your Unique Farmer Code
            </Text>
            <View className="flex-row items-center justify-center bg-white rounded-xl py-3 px-6 shadow-xs border border-emerald-200 mb-5">
              <Text className="text-xl font-gotham-bold text-slate-900 tracking-widest">
                {referralCode}
              </Text>
            </View>
            <View className="flex-row gap-3 w-full">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={copyToClipboard}
                className="flex-1 bg-white py-3.5 rounded-xl items-center flex-row justify-center border border-slate-200 shadow-xs"
              >
                <Copy size={17} color="#0f172a" className="mr-1.5" />
                <Text className="text-slate-900 font-gotham-bold text-xs uppercase tracking-wider">
                  Copy Code
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={shareCode}
                className="flex-1 bg-[#15803d] py-3.5 rounded-xl items-center flex-row justify-center shadow-xs"
              >
                <Share2 size={17} color="#fff" className="mr-1.5" />
                <Text className="text-white font-gotham-bold text-xs uppercase tracking-wider">
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}


