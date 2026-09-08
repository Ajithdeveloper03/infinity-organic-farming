import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, ArrowRight, ShieldCheck } from "lucide-react-native";
import { showToast } from "../../../components/ui/ToastMessage";

const DUMMY_OTP = "123456";

export default function Step2OTP() {
  const params = useLocalSearchParams<{ mobile: string; category: string; crops: string }>();
  const [otp, setOtp] = useState(["1", "2", "3", "4", "5", "6"]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text.length === 1 && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleFillDummy = () => {
    const otpArr = DUMMY_OTP.split("");
    setOtp(otpArr);
    showToast({ title: "Demo OTP", message: "Auto-filled dummy OTP: 123456", type: "info" });
  };

  const handleNext = () => {
    router.push({
      pathname: "/(employee)/register-farmer/step3",
      params: {
        mobile: params.mobile || "9842155678",
        category: params.category || "Crop",
        crops: params.crops || "Vetiver",
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Header - Strictly Transparent Background */}
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
          Verify Mobile OTP
        </Text>

        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
      >
        {/* Stepper (3 Steps) */}
        <View className="flex-row items-center justify-center my-4 px-6">
          <View className="w-8 h-8 rounded-full bg-emerald-600 items-center justify-center shadow-sm">
            <Text className="text-white font-gotham-bold text-xs">✓</Text>
          </View>
          <View className="flex-1 h-0.5 bg-emerald-500 mx-2" />
          <View className="w-8 h-8 rounded-full bg-emerald-600 items-center justify-center shadow-sm">
            <Text className="text-white font-gotham-bold text-xs">2</Text>
          </View>
          <View className="flex-1 h-0.5 bg-slate-200 mx-2" />
          <View className="w-8 h-8 rounded-full bg-white border border-slate-300 items-center justify-center">
            <Text className="text-slate-400 font-gotham-bold text-xs">3</Text>
          </View>
        </View>

        {/* Hero Visual */}
        <View className="items-center justify-center my-4">
          <View className="w-28 h-28 rounded-3xl bg-blue-50 items-center justify-center border border-blue-200 shadow-sm">
            <Image
              source={require("../../../assets/images/lock_phone.png")}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          </View>
          <Text className="text-xl font-gotham-bold text-slate-900 mt-4 text-center">
            Enter 6-Digit OTP
          </Text>
          <Text className="text-slate-500 font-brandon text-xs text-center mt-1">
            Sent to +91 {params.mobile || "9842155678"}
          </Text>

          {/* Quick Fill Button */}
          <TouchableOpacity
            onPress={handleFillDummy}
            className="mt-3 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 shadow-sm"
          >
            <Text className="text-amber-800 font-gotham-bold text-xs">
              ⚡ Demo Auto-Fill (123456)
            </Text>
          </TouchableOpacity>
        </View>

        {/* OTP Input Boxes */}
        <View className="flex-row justify-between my-6 px-1">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={{
                width: 46,
                height: 56,
                borderWidth: 2,
                borderRadius: 14,
                textAlign: "center",
                fontSize: 22,
                fontFamily: "Gotham-Bold",
                borderColor: digit ? "#059669" : "#cbd5e1",
                backgroundColor: digit ? "#ecfdf5" : "#ffffff",
                color: digit ? "#059669" : "#0f172a",
                elevation: digit ? 2 : 0,
              }}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        <View className="flex-row justify-center mb-8">
          <Text className="text-slate-500 font-brandon text-xs">Didn't receive code? </Text>
          <TouchableOpacity onPress={handleFillDummy}>
            <Text className="text-emerald-700 font-gotham-bold text-xs">Resend Code</Text>
          </TouchableOpacity>
        </View>

        {/* Verify & Continue Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleNext}
          className="w-full bg-emerald-600 py-4 rounded-2xl items-center justify-center shadow-md shadow-emerald-700/25 flex-row"
        >
          <Text className="text-white font-gotham-bold text-base uppercase tracking-wider mr-2">
            Verify & Proceed to Details
          </Text>
          <ArrowRight size={18} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
