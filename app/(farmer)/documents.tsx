import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { ChevronLeft, FileText, Download, Upload } from "lucide-react-native";

import { Button } from "../../components/ui/Button";

const documents = [
  {
    id: "1",
    title: "Farming Agreement",
    size: "PDF • 1.2 MB",
    date: "Jan 12, 2025",
    type: "agreements",
    color: "#15803d",
  },
  {
    id: "2",
    title: "Land Document",
    size: "PDF • 1.6 MB",
    date: "Nov 20, 2024",
    type: "land",
    color: "#15803d",
  },
  {
    id: "3",
    title: "Aadhaar Card",
    size: "PDF • 1.1 MB",
    date: "Jun 08, 2024",
    type: "other",
    color: "#3b82f6",
  },
  {
    id: "4",
    title: "Bank Details",
    size: "PDF • 0.8 MB",
    date: "Jun 08, 2024",
    type: "other",
    color: "#ef4444",
  },
];

export default function FarmerDocumentsScreen() {
  const [activeTab, setActiveTab] = useState("All");
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header - Transparent */}
      <View style={{ backgroundColor: "transparent" }} className="px-5 pt-2 pb-3 flex-row items-center justify-between z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-200 shadow-sm"
        >
          <ChevronLeft size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-gotham-bold">
          Documents
        </Text>
        <View className="w-10" />
      </View>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
      >
        {/* Tabs */}
        <View className="px-6 py-4 flex-row justify-between bg-white border-b border-gray-100">
          {["All", "Agreements", "Land", "Other"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 items-center py-2 rounded-full ${activeTab === tab ? "bg-[#15803d]" : "bg-gray-100"}
mx-1`}
            >
              <Text
                className={`font-gotham-bold text-[11px] ${activeTab === tab ? "text-gray-900" : "text-gray-500"}`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="px-6 pt-6">
          {documents.map((doc) => (
            <View
              key={doc.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 flex-row items-center"
            >
              <View className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl items-center justify-center mr-4">
                <FileText size={24} color={doc.color} />
              </View>
              <View className="flex-1 pr-2">
                <Text className="text-gray-900 font-gotham-bold text-base mb-1">
                  {doc.title}
                </Text>
                <Text className="text-gray-500 text-xs mb-1">{doc.size}</Text>
                <Text className="text-gray-400 text-[10px]">{doc.date}</Text>
              </View>
              <TouchableOpacity className="w-10 h-10 items-center justify-center">
                <Download size={20} color="#15803d" />
              </TouchableOpacity>
            </View>
          ))}
          <View className="mt-4">
            <Button
              title="Upload Document"
              onPress={() => {}}
              className="bg-[#15803d]"
              icon={<Upload size={20} color="#fff" className="mr-2" />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
