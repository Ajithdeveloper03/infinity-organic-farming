import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { router } from "expo-router";
import { ChevronLeft, Filter, MapPin, MoreVertical } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const reports = [
  {
    id: "1",
    name: "Kuppusamy",
    date: "Aug 12, 2025",
    location: "Block A",
    status: "Completed",
    statusColor: "text-green-400",
    bg: "bg-green-500/20 border-green-500/30",
    image: require("../../assets/images/image1.jpg"),
  },
  {
    id: "2",
    name: "Subramani",
    date: "Aug 10, 2025",
    location: "Block D",
    status: "Completed",
    statusColor: "text-green-400",
    bg: "bg-green-500/20 border-green-500/30",
    image: require("../../assets/images/image2.jpg"),
  },
  {
    id: "3",
    name: "Muthuvel",
    date: "Aug 08, 2025",
    location: "Block C",
    status: "Completed",
    statusColor: "text-green-400",
    bg: "bg-green-500/20 border-green-500/30",
    image: require("../../assets/images/image3.jpg"),
  },
  {
    id: "4",
    name: "Perumal",
    date: "Aug 05, 2025",
    location: "Block B",
    status: "Pending",
    statusColor: "text-orange-400",
    bg: "bg-orange-500/20 border-orange-500/30",
    image: require("../../assets/images/image4.jpg"),
  },
];

export default function ReportsScreen() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-[#0A0A0C]">
      {/* Top Gradient */}
      <View className="absolute top-0 left-0 right-0 h-64">
        <LinearGradient
          colors={["#1e1b4b", "#0A0A0C"]}
          className="w-full h-full opacity-50"
        />
      </View>

      {/* Header */}
      <View className="px-5 pt-16 pb-4 flex-row justify-between items-center z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-12 h-12 bg-white/90 dark:bg-[#1C1C1E]/90 rounded-full items-center justify-center border border-white/10"
          activeOpacity={0.8}
        >
          <ChevronLeft size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-gray-900 dark:text-white text-xl font-gotham-bold">
          Daily Reports
        </Text>
        <TouchableOpacity
          className="w-12 h-12 bg-white/90 dark:bg-[#1C1C1E]/90 rounded-full items-center justify-center border border-white/10"
          activeOpacity={0.8}
        >
          <Filter size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Tabs (Spotify Style) */}
        <View className="flex-row px-5 py-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {["All", "This Week", "This Month", "Pending"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`py-2 px-6 rounded-full border ${activeTab === tab ? "bg-white dark:bg-[#1C1C1E] border-white" : "bg-white dark:bg-[#1C1C1E] border-white/10"}`}
              >
                <Text
                  className={`font-gotham-bold text-sm ${activeTab === tab ? "text-[#0A0A0C]" : "text-gray-900 dark:text-white"}`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* List */}
        <View className="px-5 pb-24">
          {reports
            .filter((report) => {
              if (activeTab === "All") return true;
              if (activeTab === "Pending") return report.status === "Pending";
              // Note: 'This Week' and 'This Month' would normally have date logic,
              // for now we'll just show all for them since it's mock data.
              return true;
            })
            .map((report, idx) => (
              <TouchableOpacity
                key={report.id}
                activeOpacity={0.9}
                className="bg-white dark:bg-[#1C1C1E] rounded-[24px] p-4 flex-row items-center mb-4 border border-white/5 shadow-lg"
              >
                <Image
                  source={report.image}
                  className="w-20 h-20 rounded-[16px] mr-4"
                />

                <View className="flex-1 justify-center">
                  <View className="flex-row justify-between items-start mb-1">
                    <Text
                      className="text-gray-900 dark:text-white font-gotham-bold text-lg leading-tight"
                      numberOfLines={1}
                    >
                      {report.name}
                    </Text>
                  </View>
                  <View className="flex-row items-center mb-2">
                    <MapPin size={12} color="#9ca3af" />
                    <Text className="text-[#9ca3af] text-xs ml-1 font-brandon">
                      {report.location}
                    </Text>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <View
                      className={`px-3 py-1 rounded-full border ${report.bg}`}
                    >
                      <Text
                        className={`${report.statusColor} font-gotham-bold text-[10px] uppercase tracking-wider`}
                      >
                        {report.status}
                      </Text>
                    </View>
                    <Text className="text-gray-400 dark:text-white/40 text-[10px] font-gotham-bold uppercase tracking-widest">
                      {report.date}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
