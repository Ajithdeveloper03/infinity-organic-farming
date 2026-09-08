import React, { useState } from "react";

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Share,
} from "react-native";

import { router } from "expo-router";

import { ArrowLeft, Copy, Gift, Share2, Star } from "lucide-react-native";

import { showToast } from "../../components/ui/ToastMessage";

import * as Clipboard from "expo-clipboard";

export default function ReferralScreen() {
  const isDark = false;

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
        message: `Join Infinity Organics using my referral code: ${referralCode}. We both get 500 bonus points!`,
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
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-6 pt-12"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center mb-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-4 p-2 bg-gray-50 rounded-full"
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color={isDark ? "#fff" : "#000"} />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-gotham-bold text-gray-900">
              Refer & Earn
            </Text>
            <Text className="text-gray-500 text-xs font-brandon uppercase tracking-wider mt-1">
              Infinity Organics Rewards
            </Text>
          </View>
        </View>
        <View className="items-center mb-8">
          <View className="w-32 h-32 bg-green-100 rounded-full items-center justify-center mb-6">
            <Gift size={64} color={isDark ? "#4ade80" : "#15803d"} />
          </View>
          <Text className="text-2xl font-gotham-bold text-gray-900 mb-3 text-center px-4 leading-8">
            Invite Farmers, Get Rewarded!
          </Text>
          <Text className="text-gray-500 font-brandon text-center px-6 leading-5">
            Share your unique code with other farmers. When they register and
            order their first fertilizer, you both receive 500 bonus points.
          </Text>
        </View>
        {/* Current Balance */}
        <View className="bg-gray-50 rounded-[24px] p-6 mb-8 border border-gray-100 flex-row items-center justify-between">
          <View>
            <Text className="text-gray-500 font-gotham-bold text-xs uppercase tracking-widest mb-1">
              Your Balance
            </Text>
            <Text className="text-gray-900 font-gotham-bold text-3xl">
              1,250
            </Text>
          </View>
          <View className="w-14 h-14 bg-yellow-100 rounded-full items-center justify-center">
            <Star
              size={32}
              color={isDark ? "#facc15" : "#eab308"}
              fill={isDark ? "#facc15" : "#eab308"}
            />
          </View>
        </View>
        {/* Referral Code Block */}
        <View className="bg-green-50 rounded-[24px] p-6 border border-green-200 mb-8 items-center">
          <Text className="text-green-800 font-brandon-medium mb-3 uppercase tracking-wider text-xs">
            Your Unique Code
          </Text>
          <View className="flex-row items-center justify-center bg-white rounded-xl py-3 px-6 shadow-sm border border-green-100 mb-6">
            <Text className="text-2xl font-gotham-bold text-gray-900 tracking-widest">
              {referralCode}
            </Text>
          </View>
          <View className="flex-row space-x-4 w-full">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={copyToClipboard}
              className="flex-1 bg-white py-3 rounded-xl items-center flex-row justify-center border border-gray-200"
            >
              <Copy
                size={18}
                color={isDark ? "#fff" : "#1f2937"}
                className="mr-2"
              />
              <Text className="text-gray-900 font-gotham-bold text-sm">
                Copy Code
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={shareCode}
              className="flex-1 bg-[#15803d] py-3 rounded-xl items-center flex-row justify-center"
            >
              <Share2 size={18} color="#fff" className="mr-2" />
              <Text className="text-gray-900 font-gotham-bold text-sm">
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

