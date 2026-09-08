import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft, Phone, Tag } from "lucide-react-native";
import { Button } from "../../../components/ui/Button";

export default function Step1Mobile() {
  const [mobile, setMobile] = useState("9842155678");
  const [category, setCategory] = useState<"Crop" | "Fertilizer" | "Both" | null>("Crop");
  const [crops, setCrops] = useState("Vetiver");

  const handleNext = () => {
    if (mobile.length < 10) {
      Alert.alert("Error", "Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!category) {
      Alert.alert("Error", "Please select a customer category.");
      return;
    }

    // Fertilizer-only customers skip OTP verification
    if (category === "Fertilizer") {
      router.push({
        pathname: "/(employee)/register-farmer/step3",
        params: { mobile, category, crops },
      });
    } else {
      router.push({
        pathname: "/(employee)/register-farmer/step2",
        params: { mobile, category, crops },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-12">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-gotham-bold text-gray-900">
              Register New Farmer
            </Text>
            <Text className="text-gray-400 text-sm font-brandon">
              Let&apos;s get you started
            </Text>
          </View>
        </View>

        {/* Stepper */}
        <View className="flex-row items-center justify-between mb-10 px-2">
          {[1, 2, 3, 4, 5].map((step, index) => (
            <React.Fragment key={step}>
              <View
                className={`w-8 h-8 rounded-full items-center justify-center ${step === 1 ? "bg-[#15803d]" : "bg-white border border-gray-300"}`}
              >
                <Text
                  className={step === 1 ? "text-white font-gotham-bold" : "text-gray-400 font-gotham-bold"}
                >
                  {step}
                </Text>
              </View>
              {index < 4 && <View className="flex-1 h-[1px] bg-gray-300" />}
            </React.Fragment>
          ))}
        </View>

        {/* Real Image */}
        <View className="items-center justify-center h-48 mb-6 self-center">
          <Image
            source={require("../../../assets/images/shield_phone.png")}
            style={{ width: 160, height: 160 }}
            resizeMode="contain"
          />
        </View>

        <View className="items-center mb-8">
          <Text className="text-xl font-gotham-bold text-gray-900 mb-2">
            Enter mobile number &amp; category
          </Text>
          <Text className="text-gray-400 font-brandon text-center px-4">
            Fertilizer-only customers skip OTP verification
          </Text>
        </View>

        {/* Mobile Input */}
        <View className="border border-gray-200 rounded-xl px-4 py-3 flex-row items-center mb-6 bg-white">
          <Phone size={24} color="#6b7280" />
          <View className="flex-1 ml-3">
            <Text className="text-gray-500 text-xs font-brandon-medium mb-1">
              Mobile Number
            </Text>
            <TextInput
              className="text-base font-gotham-bold text-gray-900 p-0 m-0"
              placeholder="+91 XXXXX XXXXX"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
              maxLength={10}
            />
          </View>
        </View>

        {/* Customer Category */}
        <Text className="text-gray-900 font-gotham-bold mb-3">
          Customer Category
        </Text>
        <View className="flex-row justify-between mb-6">
          {(["Crop", "Fertilizer", "Both"] as const).map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setCategory(cat)}
              className={`flex-1 py-3 px-2 rounded-xl mx-1 border items-center ${category === cat ? "bg-green-50 border-green-500" : "bg-white border-gray-200"}`}
            >
              <Text
                className={`font-gotham-bold text-xs ${category === cat ? "text-green-800" : "text-gray-600"}`}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Fertilizer badge */}
        {category === "Fertilizer" && (
          <View className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
            <Text className="text-blue-700 text-xs font-brandon-medium text-center">
              ✓ Fertilizer customers don&apos;t need OTP — will proceed directly to details
            </Text>
          </View>
        )}

        {/* Crop Types if applicable */}
        {(category === "Crop" || category === "Both") && (
          <View className="border border-gray-200 rounded-xl px-4 py-3 flex-row items-center mb-6 bg-white">
            <Tag size={24} color="#6b7280" />
            <View className="flex-1 ml-3">
              <Text className="text-gray-500 text-xs font-brandon-medium mb-1">
                Crop Types
              </Text>
              <TextInput
                className="text-base font-gotham-bold text-gray-900 p-0 m-0"
                placeholder="e.g. Vettiverr, Milagu, Manjal"
                value={crops}
                onChangeText={setCrops}
              />
            </View>
          </View>
        )}

        <Button
          title={category === "Fertilizer" ? "Continue to Details →" : "Send OTP →"}
          onPress={handleNext}
          className="mb-10 bg-[#15803d]"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
