import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, Phone, ShieldCheck, ArrowRight } from "lucide-react-native";
import { showToast } from "../../../components/ui/ToastMessage";

export default function RegisterStep1Screen() {
  const [mobile, setMobile] = useState("9687846895");

  const handleSendOtp = () => {
    if (!mobile || mobile.trim().length < 10) {
      showToast({
        title: "Invalid Mobile Number",
        message: "Please enter a valid 10-digit mobile number.",
        type: "error",
      });
      return;
    }

    router.push({
      pathname: "/(employee)/register-farmer/step2",
      params: { mobile: mobile.trim() },
    } as any);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fbfdfa" }}>
      {/* Header matching Image 2 Screen 1 */}
      <View className="px-5 pt-3 pb-2 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-200 shadow-sm mr-3"
          activeOpacity={0.7}
        >
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <View>
          <Text className="text-xl font-gotham-bold text-slate-900">
            Create Account
          </Text>
          <Text className="text-slate-500 font-brandon text-xs">
            Let&apos;s get you started
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150, paddingTop: 12 }}
      >
        {/* 5-Step Stepper matching Image 2 */}
        <View className="flex-row items-center justify-center my-6 px-4">
          <View className="w-8 h-8 rounded-full bg-[#2f6f36] items-center justify-center shadow-sm">
            <Text className="text-white font-gotham-bold text-xs">1</Text>
          </View>
          <View className="flex-1 h-0.5 bg-slate-200 mx-1.5" />
          <View className="w-7 h-7 rounded-full bg-white border border-slate-300 items-center justify-center">
            <Text className="text-slate-400 font-gotham-bold text-[11px]">2</Text>
          </View>
          <View className="flex-1 h-0.5 bg-slate-200 mx-1.5" />
          <View className="w-7 h-7 rounded-full bg-white border border-slate-300 items-center justify-center">
            <Text className="text-slate-400 font-gotham-bold text-[11px]">3</Text>
          </View>
          <View className="flex-1 h-0.5 bg-slate-200 mx-1.5" />
          <View className="w-7 h-7 rounded-full bg-white border border-slate-300 items-center justify-center">
            <Text className="text-slate-400 font-gotham-bold text-[11px]">4</Text>
          </View>
          <View className="flex-1 h-0.5 bg-slate-200 mx-1.5" />
          <View className="w-7 h-7 rounded-full bg-white border border-slate-300 items-center justify-center">
            <Text className="text-slate-400 font-gotham-bold text-[11px]">5</Text>
          </View>
        </View>

        {/* Hero Visual: Phone with Shield & Leaves (From Design) */}
        <View className="items-center justify-center my-6">
          <View className="w-32 h-32 rounded-full bg-emerald-50/80 items-center justify-center border border-emerald-100 shadow-sm relative">
            <Image
              source={require("../../../assets/images/shield_phone.png")}
              style={{ width: 95, height: 95 }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Instruction Titles */}
        <View className="items-center mb-8">
          <Text className="text-xl font-gotham-bold text-slate-900 text-center">
            Enter your mobile number
          </Text>
          <Text className="text-slate-500 font-brandon text-xs text-center mt-1.5">
            We&apos;ll send you a verification code
          </Text>
        </View>

        {/* Mobile Input Card matching Design */}
        <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8">
          <Text className="text-slate-400 text-[11px] font-brandon-medium mb-1.5">
            Mobile Number
          </Text>
          <View className="flex-row items-center border border-slate-200 rounded-xl px-3.5 py-3 bg-slate-50/50">
            <Phone size={18} color="#64748b" />
            <Text className="text-slate-900 font-gotham-bold text-sm ml-2.5 mr-1.5">
              +91
            </Text>
            <TextInput
              className="flex-1 text-base font-gotham-bold text-slate-900 p-0 m-0"
              placeholder="9687846895"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
              maxLength={10}
            />
          </View>
        </View>

        {/* Action Button matching Design (Solid Green) */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSendOtp}
          className="w-full bg-[#2f6f36] py-4 rounded-2xl items-center justify-center shadow-md shadow-emerald-900/20 flex-row"
        >
          <Text className="text-white font-gotham-bold text-base tracking-wide">
            Send OTP
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
