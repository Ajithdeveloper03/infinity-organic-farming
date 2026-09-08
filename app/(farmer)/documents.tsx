import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, FileText, Download, Upload } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const documents = [
  {
    id: "1",
    title: "Farming Agreement",
    size: "PDF • 1.2 MB",
    date: "Jan 12, 2025",
    type: "Agreements",
    color: "#15803d",
    cardBg: "bg-emerald-50/80",
    cardBorder: "border-emerald-200/90",
    iconBg: "bg-emerald-100",
  },
  {
    id: "2",
    title: "Land Document & Survey",
    size: "PDF • 1.6 MB",
    date: "Nov 20, 2024",
    type: "Land",
    color: "#0284c7",
    cardBg: "bg-sky-50/80",
    cardBorder: "border-sky-200/90",
    iconBg: "bg-sky-100",
  },
  {
    id: "3",
    title: "Aadhaar Card (Verified)",
    size: "PDF • 1.1 MB",
    date: "Jun 08, 2024",
    type: "Other",
    color: "#b45309",
    cardBg: "bg-amber-50/80",
    cardBorder: "border-amber-200/90",
    iconBg: "bg-amber-100",
  },
  {
    id: "4",
    title: "Bank Account Details",
    size: "PDF • 0.8 MB",
    date: "Jun 08, 2024",
    type: "Other",
    color: "#7e22ce",
    cardBg: "bg-purple-50/80",
    cardBorder: "border-purple-200/90",
    iconBg: "bg-purple-100",
  },
];

export default function FarmerDocumentsScreen() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredDocs =
    activeTab === "All"
      ? documents
      : documents.filter((d) => d.type.toLowerCase() === activeTab.toLowerCase());

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
            Documents
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 6 }}
        >
          {/* Tabs */}
          <View className="px-5 mb-5">
            <View className="flex-row bg-slate-200/80 p-1 rounded-full">
              {["All", "Agreements", "Land", "Other"].map((tab) => {
                const isCurrent = activeTab === tab;
                return (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    activeOpacity={0.8}
                    className={`flex-1 items-center py-2.5 rounded-full ${
                      isCurrent ? "bg-white shadow-sm" : ""
                    }`}
                  >
                    <Text
                      className={`font-gotham-bold text-xs ${
                        isCurrent ? "text-emerald-800" : "text-slate-600"
                      }`}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View className="px-5">
            {filteredDocs.map((doc) => (
              <View
                key={doc.id}
                className={`rounded-2xl p-4.5 shadow-sm border mb-4 flex-row items-center justify-between ${doc.cardBg} ${doc.cardBorder}`}
              >
                <View className="flex-row items-center flex-1 pr-3">
                  <View className={`w-12 h-12 ${doc.iconBg} rounded-xl items-center justify-center mr-3.5 shadow-xs`}>
                    <FileText size={22} color={doc.color} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-900 font-gotham-bold text-sm mb-0.5">
                      {doc.title}
                    </Text>
                    <Text className="text-slate-600 font-gotham-medium text-xs mb-0.5">{doc.size}</Text>
                    <Text className="text-slate-400 font-gotham-medium text-[10px]">{doc.date}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  className="w-10 h-10 rounded-full bg-white/95 items-center justify-center border border-slate-200 shadow-xs"
                >
                  <Download size={18} color={doc.color} />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              activeOpacity={0.85}
              className="mt-2 rounded-2xl overflow-hidden shadow-sm"
            >
              <LinearGradient
                colors={["#15803d", "#047857"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingVertical: 16, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
              >
                <Upload size={18} color="#fff" className="mr-2" />
                <Text className="text-white font-gotham-bold text-sm tracking-wide">
                  Upload New Document
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

