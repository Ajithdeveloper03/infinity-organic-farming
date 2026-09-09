import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { CheckCircle2, Leaf, Users } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../components/ui/Card";
import { useLanguage, LanguageTogglePill } from "../context/LanguageContext";

export default function IntroScreen() {
  const [role, setRole] = useState<"farmer" | "employee">("employee");
  const { t, language } = useLanguage();

  return (
    <View className="flex-1 bg-black relative">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ImageBackground
        source={require("../assets/images/intro_bg.png")}
        style={StyleSheet.absoluteFill}
        resizeMode="contain"
      >
        <View className="flex-1 bg-black/40">
          <SafeAreaView className="flex-1 justify-between">
            {/* Top Bar with Language Toggle */}
            <View className="flex-row justify-end items-center px-6 pt-2">
              <LanguageTogglePill />
            </View>

            {/* Header Section */}
            <View className="items-center pt-8">
              <View className="bg-white/95 p-4 rounded-3xl mb-4 shadow-lg border border-gray-100">
                <Image
                  source={require("../assets/images/logo.png")}
                  style={{ width: 180, height: 180 }}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Bottom Sheet Card for Role Selection (Glassmorphism) */}
            <View className="px-4 relative bottom-0 left-0 pb-4 mt-12">
              <BlurView
                className="bg-transparent overflow-hidden pt-6 pb-6"
              >
                <View className="items-center mb-6">
                  <View className="bg-white/80 p-4 rounded-full mb-4 shadow-sm border border-white/60">
                    <Users size={32} color="#15803d" />
                  </View>
                  <Text className="text-gray-900 font-gotham-bold text-2xl mb-2 text-center">
                    {t("chooseRole", "Choose Your Role")}
                  </Text>
                  <Text className="text-gray-800 font-brandon text-center px-4">
                    {language === "ta"
                      ? "உங்கள் கணக்கைத் தொடர உங்கள் பங்கைத் தேர்ந்தெடுக்கவும்."
                      : "Select a role to personalize your profile and access your dashboard."}
                  </Text>
                </View>

                <View className="space-y-3 mb-6 px-4">
                  {/* Employee Card */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setRole("employee")}
                    className={`flex-row items-center p-4 rounded-[20px] border-2 mb-3 ${role === "employee"
                      ? "bg-white/80 border-[#15803d] shadow-sm"
                      : "bg-orange-200/80 border-orange-400"
                      }`}
                  >
                    <View
                      className={`p-3 rounded-full ${role === "employee" ? "bg-[#15803d]" : "bg-gray-200/80"}`}
                    >
                      <Users
                        size={24}
                        color={role === "employee" ? "#fff" : "#4b5563"}
                      />
                    </View>
                    <View className="flex-1 ml-4">
                      <Text
                        className={`font-gotham-bold text-lg ${role === "employee" ? "text-[#15803d]" : "text-gray-800"}`}
                      >
                        {t("fieldOfficer", "Field Officer")}
                      </Text>
                      <Text className="text-gray-800 font-brandon text-xs mt-0.5">
                        {language === "ta" ? "வருகைகள் மற்றும் வேலைகளை நிர்வகிக்கவும்" : "Manage visits & track activities"}
                      </Text>
                    </View>
                    {role === "employee" && (
                      <CheckCircle2 size={24} color="#15803d" />
                    )}
                  </TouchableOpacity>

                  {/* Farmer Card */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setRole("farmer")}
                    className={`flex-row items-center p-4 rounded-[20px] border-2 ${role === "farmer"
                      ? "bg-white/80 border-[#15803d] shadow-sm"
                      : "bg-orange-200/80 border-orange-400"
                      }`}
                  >
                    <View
                      className={`p-3 rounded-full ${role === "farmer" ? "bg-[#15803d]" : "bg-gray-200/80"}`}
                    >
                      <Leaf
                        size={24}
                        color={role === "farmer" ? "#fff" : "#4b5563"}
                      />
                    </View>
                    <View className="flex-1 ml-4">
                      <Text
                        className={`font-gotham-bold text-lg ${role === "farmer" ? "text-[#15803d]" : "text-gray-800"}`}
                      >
                        {t("farmer", "Farmer")}
                      </Text>
                      <Text className="text-gray-600 font-brandon text-xs mt-0.5">
                        {language === "ta" ? "பண்ணை அறிக்கைகள் மற்றும் முன்னேற்றத்தைக் காண்க" : "View reports & farm progress"}
                      </Text>
                    </View>
                    {role === "farmer" && (
                      <CheckCircle2 size={24} color="#15803d" />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Continue Button */}
                <View className="px-4">
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      if (role === "farmer") {
                        router.push("/(auth)/farmer-login" as any);
                      } else {
                        router.push("/(auth)/login" as any);
                      }
                    }}
                    className="w-full bg-[#15803d] py-4 rounded-full items-center shadow-md flex-row justify-center"
                  >
                    <Text className="text-white font-gotham-bold text-lg tracking-wide">
                      {t("continue", "Continue")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </BlurView>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});

