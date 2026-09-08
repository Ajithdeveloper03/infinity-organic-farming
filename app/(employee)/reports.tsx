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
  Filter,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck2,
  ChevronRight,
} from "lucide-react-native";

const reports = [
  {
    id: "1",
    name: "Kuppusamy Farm",
    date: "Aug 12, 2026",
    location: "Annur, Block A",
    status: "Completed",
    notes: "Root development inspected. Recommended organic bio-tonic.",
    image: require("../../assets/images/image1.jpg"),
  },
  {
    id: "2",
    name: "Subramani Estate",
    date: "Aug 10, 2026",
    location: "Pollachi, Block D",
    status: "Completed",
    notes: "Soil moisture retention test conducted. Optimal moisture levels recorded.",
    image: require("../../assets/images/image2.jpg"),
  },
  {
    id: "3",
    name: "Muthuvel Agro",
    date: "Aug 08, 2026",
    location: "Udumalpet, Block C",
    status: "Completed",
    notes: "Vetiver sapling health optimal. Fertilizer distribution logged.",
    image: require("../../assets/images/image3.jpg"),
  },
  {
    id: "4",
    name: "Perumal Lands",
    date: "Aug 05, 2026",
    location: "Sulur, Block B",
    status: "Pending Action",
    notes: "Field audit awaiting farmer confirmation for second fertilization cycle.",
    image: require("../../assets/images/image4.jpg"),
  },
];

export default function ReportsScreen() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredReports = reports.filter((report) => {
    if (activeTab === "All") return true;
    if (activeTab === "Pending") return report.status.includes("Pending");
    if (activeTab === "Completed") return report.status === "Completed";
    return true;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Background image subtle overlay */}
      <ImageBackground
        source={require("../../assets/images/image7.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.12 }}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header */}
        <View className="px-5 py-4 bg-white/95 border-b border-gray-100 flex-row items-center justify-between shadow-sm backdrop-blur-md">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center border border-gray-200"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-lg font-gotham-bold text-gray-900">
            Daily Audit Reports
          </Text>
          <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center border border-gray-200">
            <Filter size={18} color="#111827" />
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Banner with Background Image */}
          <View className="p-5">
            <View className="rounded-3xl overflow-hidden shadow-md border border-green-800/20">
              <ImageBackground
                source={require("../../assets/images/image8.jpg")}
                className="w-full"
                resizeMode="cover"
              >
                <View className="p-6 bg-green-950/80">
                  <View className="flex-row items-center mb-2">
                    <FileCheck2 size={20} color="#86efac" className="mr-2" />
                    <Text className="text-green-300 font-brandon font-bold text-xs uppercase tracking-widest">
                      Field Audit Documentation
                    </Text>
                  </View>
                  <Text className="text-white font-gotham-bold text-2xl mb-2">
                    Inspection Summaries
                  </Text>
                  <Text className="text-white/80 font-brandon text-xs leading-relaxed">
                    Detailed field inspection reports verified with GPS geo-stamping.
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* Filter Tabs */}
          <View className="px-5 mb-4">
            <View className="flex-row bg-gray-200/70 p-1 rounded-full">
              {["All", "Completed", "Pending"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-full items-center ${
                    activeTab === tab ? "bg-white shadow-sm" : ""
                  }`}
                >
                  <Text
                    className={`font-gotham-bold text-xs ${
                      activeTab === tab ? "text-green-800" : "text-gray-600"
                    }`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Reports List */}
          <View className="px-5">
            {filteredReports.map((report) => {
              const isCompleted = report.status === "Completed";
              return (
                <View
                  key={report.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 mb-4"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center flex-1 pr-3">
                      <Image
                        source={report.image}
                        className="w-14 h-14 rounded-2xl mr-3.5 border border-gray-200"
                        resizeMode="cover"
                      />
                      <View className="flex-1">
                        <Text className="text-gray-900 font-gotham-bold text-base mb-0.5">
                          {report.name}
                        </Text>
                        <View className="flex-row items-center">
                          <MapPin size={13} color="#4b5563" className="mr-1" />
                          <Text className="text-gray-700 text-xs font-brandon">
                            {report.location}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      className={`px-3 py-1 rounded-full border ${
                        isCompleted
                          ? "bg-emerald-50 border-emerald-300"
                          : "bg-amber-50 border-amber-300"
                      }`}
                    >
                      <Text
                        className={`text-[11px] font-gotham-bold uppercase tracking-wider ${
                          isCompleted ? "text-emerald-800" : "text-amber-800"
                        }`}
                      >
                        {report.status}
                      </Text>
                    </View>
                  </View>

                  <View className="bg-gray-50 rounded-xl p-3 border border-gray-100 mb-3">
                    <View className="flex-row items-center mb-1">
                      <Calendar size={12} color="#4b5563" className="mr-1" />
                      <Text className="text-gray-600 text-xs font-brandon">
                        Audited on {report.date}
                      </Text>
                    </View>
                    <Text className="text-gray-800 font-brandon text-xs leading-relaxed">
                      {report.notes}
                    </Text>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center justify-between pt-2 border-t border-gray-100"
                  >
                    <Text className="text-green-800 font-gotham-bold text-xs uppercase tracking-wider">
                      View Full Audit Details
                    </Text>
                    <ChevronRight size={16} color="#15803d" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
