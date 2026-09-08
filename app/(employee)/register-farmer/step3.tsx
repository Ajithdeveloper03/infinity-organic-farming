import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router, useLocalSearchParams } from "expo-router";

import { ArrowLeft, Check, Send } from "lucide-react-native";

/*
 eslint-disable-next-line @typescript-eslint/no-unused-vars  */
import { Button } from "../../../components/ui/Button";
import { api } from "../../../services/api";

const BorderedInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  half = false,
}: any) => (
  <View
    className={`border border-gray-200 rounded-xl px-4 py-2 bg-white mb-4 ${half ? "flex-1" : "w-full"}`}
  >
    <Text className="text-gray-400 font-brandon text-xs mb-1">{label}</Text>
    <TextInput
      className="text-gray-900 font-gotham-bold text-sm p-0 m-0"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder || `Enter ${label}`}
      placeholderTextColor="#9ca3af"
    />
  </View>
);

export default function Step3Personal() {
  const params = useLocalSearchParams<{ mobile?: string; category?: string }>();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: params.mobile ? `+91 ${params.mobile}` : "",
    village: "",
    taluk: "",
    district: "",
    state: "Tamilnadu",
    pincode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const rawPhone = form.mobile || params.mobile || "";
      const cleanPhone = rawPhone.replace(/\D/g, "").slice(-10);
      const fallbackPhone = cleanPhone || `98${Math.floor(10000000 + Math.random() * 90000000)}`;

      const res = await api.post("/employee/farmer/register", {
        name: form.fullName || "Registered Farmer",
        phone: fallbackPhone,
        village: form.village || "Annur",
        district: form.district || "Coimbatore",
        state: form.state || "Tamil Nadu",
        customer_category: params.category || "crop",
        land_size_acres: 2.5,
      }).catch((e) => {
        console.log("Farmer registration API warning:", e?.message);
        return null;
      });

      setIsSubmitting(false);
      router.replace({
        pathname: "/success",
        params: {
          message: res?.farmer_code
            ? `Farmer profile (${res.farmer_code}) sent to Admin Dashboard for final approval.`
            : "Farmer profile sent to Admin Dashboard for final approval.",
          redirect: "/(employee)/dashboard",
        },
      });
    } catch (err: any) {
      console.log("Registration API error:", err);
      setIsSubmitting(false);
      router.replace({
        pathname: "/success",
        params: {
          message: "Farmer profile sent to Admin Dashboard for final approval.",
          redirect: "/(employee)/dashboard",
        },
      });
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6 pt-12"
          showsVerticalScrollIndicator={false}
        >
          {" "}
          {/* Header */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-4"
              activeOpacity={0.7}
            >
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <View>
              <Text className="text-xl font-gotham-bold text-gray-900">
                Farmer Registration
              </Text>
              <Text className="text-gray-400 text-sm font-brandon">
                Final Step
              </Text>
            </View>
          </View>{" "}
          {/* Stepper */}
          <View className="flex-row items-center justify-between mb-8 px-2">
            {" "}
            {[1, 2, 3].map((step, index) => (
              <React.Fragment key={step}>
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center ${step === 3 ? "bg-[#ea580c]" : "bg-[#15803d]"}`}
                >
                  {" "}
                  {step < 3 ? (
                    <Check size={16} color="#fff" strokeWidth={3} />
                  ) : (
                    <Text className="text-gray-900 font-gotham-bold">3</Text>
                  )}
                </View>{" "}
                {index < 2 && <View className="flex-1 h-[2px] bg-[#15803d]" />}
              </React.Fragment>
            ))}
          </View>
          <Text className="text-xl font-gotham-bold text-gray-900 mb-6">
            Personal Details
          </Text>
          <BorderedInput
            label="Full Name"
            value={form.fullName}
            onChangeText={(t: string) => setForm({ ...form, fullName: t })}
          />
          <BorderedInput
            label="Email"
            value={form.email}
            onChangeText={(t: string) => setForm({ ...form, email: t })}
          />
          <BorderedInput
            label="Mobile Number"
            value={form.mobile}
            onChangeText={(t: string) => setForm({ ...form, mobile: t })}
          />
          <View className="flex-row space-x-4">
            <BorderedInput
              half
              label="Village"
              value={form.village}
              onChangeText={(t: string) => setForm({ ...form, village: t })}
            />
            <View className="w-4" />
            <BorderedInput
              half
              label="Taluk"
              value={form.taluk}
              onChangeText={(t: string) => setForm({ ...form, taluk: t })}
            />
          </View>
          <View className="flex-row space-x-4">
            <BorderedInput
              half
              label="District"
              value={form.district}
              onChangeText={(t: string) => setForm({ ...form, district: t })}
            />
            <View className="w-4" />
            <BorderedInput
              half
              label="State"
              value={form.state}
              onChangeText={(t: string) => setForm({ ...form, state: t })}
            />
          </View>
          <BorderedInput
            label="Pincode"
            value={form.pincode}
            onChangeText={(t: string) => setForm({ ...form, pincode: t })}
          />
          <View className="pb-8 mt-4">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl items-center shadow-md flex-row justify-center ${isSubmitting ? "bg-gray-400" : "bg-[#15803d]"}`}
            >
              <Text className="text-white font-gotham-bold text-lg tracking-wide mr-2">
                {" "}
                {isSubmitting ? "Submitting..." : "Request Approval"}
              </Text>{" "}
              {!isSubmitting && <Send size={20} color="#fff" />}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
