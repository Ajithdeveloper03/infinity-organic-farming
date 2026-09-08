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
import { ChevronLeft, Phone, Tag, ArrowRight, ShieldCheck } from "lucide-react-native";

export default function Step1Mobile() {
  const [mobile, setMobile] = useState("9842155678");
  const [category, setCategory] = useState<"Crop" | "Fertilizer" | "Both">("Crop");
  const [crops, setCrops] = useState("Vetiver & Turmeric");

  const handleNext = () => {
    if (mobile.length < 10) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit mobile number.");
      return;
    }

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
          Register Farmer
        </Text>

        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Stepper (3 Steps) */}
        <View className="flex-row items-center justify-center my-4 px-6">
          <View className="w-8 h-8 rounded-full bg-emerald-600 items-center justify-center shadow-sm">
            <Text className="text-white font-gotham-bold text-xs">1</Text>
          </View>
          <View className="flex-1 h-0.5 bg-slate-200 mx-2" />
          <View className="w-8 h-8 rounded-full bg-white border border-slate-300 items-center justify-center">
            <Text className="text-slate-400 font-gotham-bold text-xs">2</Text>
          </View>
          <View className="flex-1 h-0.5 bg-slate-200 mx-2" />
          <View className="w-8 h-8 rounded-full bg-white border border-slate-300 items-center justify-center">
            <Text className="text-slate-400 font-gotham-bold text-xs">3</Text>
          </View>
        </View>

        {/* Hero Visual */}
        <View className="items-center justify-center my-4">
          <View className="w-28 h-28 rounded-3xl bg-emerald-50 items-center justify-center border border-emerald-200 shadow-sm">
            <Image
              source={require("../../../assets/images/shield_phone.png")}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          </View>
          <Text className="text-xl font-gotham-bold text-slate-900 mt-4 text-center">
            Farmer Identity & Category
          </Text>
          <Text className="text-slate-500 font-brandon text-xs text-center mt-1 px-4">
            Step 1 of 3: Enter the landholder&apos;s registered mobile number
          </Text>
        </View>

        {/* Mobile Input Card */}
        <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-4">
          <Text className="text-slate-500 text-xs font-gotham-bold uppercase tracking-wider mb-2">
            Mobile Number
          </Text>
          <View className="flex-row items-center bg-slate-50 rounded-xl px-3.5 py-3 border border-slate-200">
            <Phone size={20} color="#059669" />
            <Text className="text-slate-900 font-gotham-bold text-base ml-2.5 mr-1">
              +91
            </Text>
            <TextInput
              className="flex-1 text-base font-gotham-bold text-slate-900 p-0 m-0"
              placeholder="98765 43210"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
              maxLength={10}
            />
          </View>
        </View>

        {/* Customer Category */}
        <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-4">
          <Text className="text-slate-500 text-xs font-gotham-bold uppercase tracking-wider mb-2.5">
            Customer Category
          </Text>
          <View className="flex-row justify-between">
            {(["Crop", "Fertilizer", "Both"] as const).map((cat) => {
              const selected = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  className={`flex-1 py-3 px-2 rounded-xl mx-1 border items-center shadow-sm ${
                    selected
                      ? "bg-emerald-600 border-emerald-600"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <Text
                    className={`font-gotham-bold text-xs ${
                      selected ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {category === "Fertilizer" && (
            <View className="bg-blue-50 border border-blue-200 rounded-xl p-3 mt-3">
              <Text className="text-blue-800 text-xs font-brandon text-center">
                ✓ Fertilizer customers bypass OTP and proceed directly to registration
              </Text>
            </View>
          )}
        </View>

        {/* Crops Input */}
        {(category === "Crop" || category === "Both") && (
          <View className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6">
            <Text className="text-slate-500 text-xs font-gotham-bold uppercase tracking-wider mb-2">
              Cultivated Crop Varieties
            </Text>
            <View className="flex-row items-center bg-slate-50 rounded-xl px-3.5 py-3 border border-slate-200">
              <Tag size={20} color="#059669" />
              <TextInput
                className="flex-1 ml-2.5 text-base font-gotham-bold text-slate-900 p-0 m-0"
                placeholder="e.g. Vetiver, Turmeric, Pepper"
                placeholderTextColor="#94a3b8"
                value={crops}
                onChangeText={setCrops}
              />
            </View>
          </View>
        )}

        {/* Continue Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleNext}
          className="w-full bg-emerald-600 py-4 rounded-2xl items-center justify-center shadow-md shadow-emerald-700/25 flex-row"
        >
          <Text className="text-white font-gotham-bold text-base uppercase tracking-wider mr-2">
            {category === "Fertilizer" ? "Continue to Details" : "Proceed to OTP"}
          </Text>
          <ArrowRight size={18} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
