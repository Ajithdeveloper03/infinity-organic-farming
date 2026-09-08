import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Button } from "../../../components/ui/Button";
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
    showToast({ title: "Demo OTP", message: "Filled with dummy OTP: 123456", type: "info" });
  };

  const handleNext = () => {
    router.push({
      pathname: "/(employee)/register-farmer/step3",
      params: { 
        mobile: params.mobile || "9842155678", 
        category: params.category || "Crop", 
        crops: params.crops || "Vetiver" 
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-12">
        {/* Header */}
        <View className="flex-row items-center mb-8">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-gotham-bold text-gray-900">
            Verify Your Number
          </Text>
        </View>

        <View className="items-center mb-8">
          <Text className="text-gray-500 text-base text-center font-brandon">
            Enter the 6-digit code sent to
          </Text>
          <Text className="text-gray-900 font-gotham-bold text-base mt-1">
            +91 {params.mobile || "XXXXXXXXXX"}
          </Text>

          {/* Demo hint banner */}
          <TouchableOpacity
            onPress={handleFillDummy}
            className="mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2"
          >
            <Text className="text-amber-700 font-brandon-medium text-xs text-center">
              🔑 Demo mode — tap here to auto-fill OTP: <Text className="font-gotham-bold">123456</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* OTP Inputs */}
        <View className="flex-row justify-between mb-8 px-2">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputs.current[index] = ref; }}
              style={{
                width: 46,
                height: 56,
                borderWidth: 2,
                borderRadius: 12,
                textAlign: "center",
                fontSize: 22,
                fontFamily: "Gotham-Bold",
                borderColor: digit ? "#15803d" : "#e5e7eb",
                backgroundColor: digit ? "#f0fdf4" : "#f9fafb",
                color: digit ? "#15803d" : "#111827",
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

        <View className="flex-row justify-center mb-12">
          <Text className="text-gray-500 font-brandon-medium">Resend OTP in </Text>
          <Text className="text-[#15803d] font-gotham-bold">00:25</Text>
        </View>

        {/* Real Image */}
        <View className="items-center justify-center h-48 mb-auto self-center">
          <Image
            source={require("../../../assets/images/lock_phone.png")}
            style={{ width: 160, height: 160 }}
            resizeMode="contain"
          />
        </View>

        <View className="pb-8">
          <Button
            title="Verify & Continue"
            onPress={handleNext}
            className="bg-[#15803d]"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
