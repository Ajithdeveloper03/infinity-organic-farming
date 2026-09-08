import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  User,
  MapPin,
  ShieldCheck,
  Phone,
  Mail,
  FileText,
  Lock,
} from "lucide-react-native";

export default function FarmerProfileScreen() {
  const [activeTab, setActiveTab] = useState<"personal" | "kyc" | "land">("personal");

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
        {/* Header */}
        <View className="px-5 py-4 flex-row items-center justify-between bg-white/95 border-b border-gray-100 shadow-sm backdrop-blur-md">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center border border-gray-200"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-lg font-gotham-bold">
            Farmer Profile
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Banner and Profile Card */}
          <View className="bg-white mx-5 mt-5 rounded-3xl overflow-hidden shadow-sm border border-gray-200">
            {/* Top Landscape Banner */}
            <View className="h-32 bg-gray-200">
              <Image
                source={require("../../assets/images/image2.jpg")}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            {/* Profile Picture */}
            <View className="items-center -mt-12 mb-3">
              <View className="w-24 h-24 bg-white rounded-full p-1 shadow-md border-2 border-slate-200 overflow-hidden">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
                  }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </View>
            </View>
            {/* Quick Details */}
            <View className="items-center px-6 mb-5">
              <Text className="text-gray-900 text-2xl font-gotham-bold mb-0.5">
                Kuppusamy
              </Text>
              <Text className="text-green-700 font-brandon font-bold text-xs uppercase tracking-wider mb-1">
                Verified Farmer • ID: FM10008
              </Text>
              <Text className="text-gray-600 font-brandon text-xs">
                Annur / Somanur, Coimbatore
              </Text>
            </View>
          </View>

          {/* Tab Switcher */}
          <View className="flex-row mx-5 mt-5 bg-gray-200/70 p-1 rounded-full">
            {[
              { key: "personal", label: "Personal" },
              { key: "kyc", label: "KYC Docs" },
              { key: "land", label: "Land Details" },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key as any)}
                activeOpacity={0.8}
                className={`flex-1 py-2.5 items-center rounded-full ${
                  activeTab === tab.key ? "bg-white shadow-sm" : ""
                }`}
              >
                <Text
                  className={`font-gotham-bold text-xs ${
                    activeTab === tab.key ? "text-green-800" : "text-gray-600"
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Dynamic Content */}
          <View className="mx-5 mt-5 mb-12">
            {activeTab === "personal" && (
              <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
                <View className="bg-blue-50 p-4 rounded-xl mb-4 flex-row items-start border border-blue-200">
                  <Lock size={18} color="#2563eb" className="mt-0.5 mr-2.5" />
                  <Text className="flex-1 text-blue-900 font-brandon text-xs leading-5">
                    Your profile is officially verified. To request updates, please contact your assigned Field Officer.
                  </Text>
                </View>
                <InfoRow icon={Phone} label="Mobile Number" value="+91 98765 43210" />
                <InfoRow icon={Mail} label="Email Address" value="kuppusamy.farmer@infinityorganics.com" />
                <InfoRow icon={MapPin} label="Village" value="Somanur" />
                <InfoRow icon={MapPin} label="Taluk" value="Sulur" />
                <InfoRow icon={MapPin} label="District" value="Coimbatore" isLast />
              </View>
            )}

            {activeTab === "kyc" && (
              <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
                <View className="bg-emerald-50 p-4 rounded-xl mb-4 flex-row items-center border border-emerald-200">
                  <ShieldCheck size={22} color="#059669" className="mr-2.5" />
                  <Text className="flex-1 text-emerald-900 font-gotham-bold text-sm">
                    KYC Verified & Certified (Organic Division)
                  </Text>
                </View>
                <InfoRow icon={FileText} label="Aadhaar Number" value="XXXX XXXX 4321" />
                <InfoRow icon={FileText} label="PAN Number" value="ABCDE1234F" />
                <InfoRow icon={User} label="Bank Account" value="State Bank of India" />
                <InfoRow icon={FileText} label="Account Number" value="XXXXXXXXXX8901" isLast />
              </View>
            )}

            {activeTab === "land" && (
              <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
                <InfoRow icon={MapPin} label="Total Land Area" value="2.5 Acres" />
                <InfoRow icon={FileText} label="Survey Number" value="SF 102/3B" />
                <InfoRow icon={MapPin} label="Soil Type" value="Red Soil (Semman Mineral)" />
                <InfoRow icon={FileText} label="Irrigation Source" value="Borewell & Drip Network" />
                <InfoRow icon={FileText} label="Primary Crop" value="Vetiver (Chrysopogon zizanioides)" isLast />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const InfoRow = ({ icon: Icon, label, value, isLast = false }: any) => (
  <View className={`flex-row items-center py-3.5 ${!isLast ? "border-b border-gray-100" : ""}`}>
    <View className="w-10 h-10 bg-green-50 border border-green-200 rounded-full items-center justify-center mr-3.5">
      <Icon size={18} color="#15803d" />
    </View>
    <View className="flex-1">
      <Text className="text-gray-700 text-xs font-brandon font-bold mb-0.5">
        {label}
      </Text>
      <Text className="text-gray-900 font-gotham-bold text-sm">{value}</Text>
    </View>
  </View>
);
