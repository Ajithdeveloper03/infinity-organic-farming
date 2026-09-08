import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  MapPin,
  Calendar,
  Droplets,
  Share2,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  FileCheck2,
  ArrowDownCircle,
} from "lucide-react-native";
import { mockReports } from "../reports";
import { showToast } from "../../../components/ui/ToastMessage";

export default function ReportDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const report = mockReports.find((r) => r.id === id) || mockReports[0];

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Field Audit Report for ${report.name} (${report.date})\nLocation: ${report.location}\nMoisture: ${report.moisture}\npH: ${report.ph}\nStatus: ${report.status}\nInfinity Organics Agronomy Division`,
      });
    } catch (e) {
      console.log("Share error", e);
    }
  };

  const handleDownload = () => {
    showToast({
      title: "PDF Audit Downloaded",
      message: `Inspection certificate for ${report.name} saved to device.`,
      type: "success",
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
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
            Audit Dossier Details
          </Text>

          <TouchableOpacity
            onPress={handleShare}
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-200 shadow-sm"
          >
            <Share2 size={18} color="#0f172a" />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 px-5 pt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
        >
          {/* Detailed Hero Image with DARK Bottom-to-Top Overlay & Enhanced Bright White Text */}
          <View className="rounded-[28px] overflow-hidden shadow-md bg-slate-900 mb-4">
            <ImageBackground
              source={report.image}
              className="w-full h-52"
              resizeMode="cover"
            >
              {/* Dark Overlay */}
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(0, 0, 0, 0.45)",
                  "rgba(10, 15, 25, 0.94)",
                ]}
                locations={[0, 0.3, 1]}
                style={StyleSheet.absoluteFill}
              />

              <View className="flex-1 p-5 justify-between">
                <View className="flex-row items-center justify-between">
                  <View
                    style={{ backgroundColor: report.tagBg, borderColor: report.tagBorder }}
                    className="px-3 py-1 rounded-full border shadow-sm"
                  >
                    <Text style={{ color: report.tagText }} className="font-gotham-bold text-[11px] uppercase tracking-wider">
                      {report.status}
                    </Text>
                  </View>

                  <View className="bg-black/60 px-3 py-1 rounded-full border border-white/20">
                    <Text className="text-white font-gotham-bold text-xs">
                      {report.date}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text className="text-white font-gotham-bold text-2xl leading-tight">
                    {report.name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <MapPin size={13} color="#34d399" />
                    <Text className="text-emerald-300 font-brandon text-xs ml-1">
                      {report.location} • {report.acres}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          {/* 4 Agronomic Key Metrics Gauges (White Cards, High Contrast) */}
          <View className="flex-row justify-between mb-4">
            <View className="w-[48%] bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-slate-500 font-gotham-bold text-[11px] uppercase">
                  Soil Moisture
                </Text>
                <Droplets size={16} color="#059669" />
              </View>
              <Text className="text-slate-900 font-gotham-bold text-2xl">
                {report.moisture}
              </Text>
              <Text className="text-emerald-700 font-brandon text-xs font-bold mt-0.5">
                Optimal Field Range
              </Text>
            </View>

            <View className="w-[48%] bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-slate-500 font-gotham-bold text-[11px] uppercase">
                  Soil pH
                </Text>
                <Sprout size={16} color="#2563eb" />
              </View>
              <Text className="text-slate-900 font-gotham-bold text-2xl">
                {report.ph}
              </Text>
              <Text className="text-blue-700 font-brandon text-xs font-bold mt-0.5">
                Neutral Balance
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between mb-4">
            <View className="w-[48%] bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-slate-500 font-gotham-bold text-[11px] uppercase">
                  Nitrogen Index
                </Text>
                <ShieldCheck size={16} color="#7c3aed" />
              </View>
              <Text className="text-slate-900 font-gotham-bold text-lg">
                {report.nitrogen}
              </Text>
              <Text className="text-purple-700 font-brandon text-xs font-bold mt-0.5">
                Bio-Enriched
              </Text>
            </View>

            <View className="w-[48%] bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-slate-500 font-gotham-bold text-[11px] uppercase">
                  Root Depth
                </Text>
                <FileCheck2 size={16} color="#ea580c" />
              </View>
              <Text className="text-slate-900 font-gotham-bold text-lg">
                {report.rootDepth}
              </Text>
              <Text className="text-orange-700 font-brandon text-xs font-bold mt-0.5">
                Healthy Taproots
              </Text>
            </View>
          </View>

          {/* Agronomist Observations & Recommendations */}
          <View className="bg-white rounded-[26px] p-5 shadow-sm border border-slate-200 mb-4">
            <Text className="text-slate-900 font-gotham-bold text-base mb-2">
              Agronomist Recommendations
            </Text>
            <Text className="text-slate-700 text-xs font-brandon leading-relaxed mb-4">
              {report.recommendation}
            </Text>

            <View className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 flex-row items-center">
              <CheckCircle2 size={18} color="#059669" className="mr-2" />
              <Text className="text-emerald-900 text-xs font-gotham-bold ml-1 flex-1">
                Digital Sign-off: Certified by Regional Officer
              </Text>
            </View>
          </View>

          {/* Action Button: Download Certified PDF */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleDownload}
            className="w-full bg-emerald-600 py-4 rounded-2xl items-center justify-center shadow-md shadow-emerald-700/25 flex-row mb-3"
          >
            <ArrowDownCircle size={18} color="#ffffff" className="mr-2" />
            <Text className="text-white font-gotham-bold text-base uppercase tracking-wider ml-1">
              Download Certified PDF Audit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
