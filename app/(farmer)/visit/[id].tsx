import React from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import {
  ChevronLeft,
  CheckCircle2,
  Calendar,
  MapPin,
  Camera,
  Star,
  Download,
  Sprout,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { showToast } from "../../../components/ui/ToastMessage";

const visitsData: Record<string, any> = {
  "1": {
    officer: "Harish",
    officerRole: "Field Officer • Delta Zone",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    date: "May 11, 2026 • 10:30 AM",
    location: "Vetiver Farm - Block A, Annur",
    status: "Completed",
    cropCondition: "Optimal Root Development",
    notes:
      "Rhizosphere inspected at multiple cross-sections. Root depth reached 45cm with dense lateral rootlets. Drip cycle functioning normally.",
    recommendation:
      "Continue morning drip irrigation. Apply organic bio-tonic for root vigor in 10 days.",
    photos: [
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&auto=format&fit=crop&q=80",
    ],
  },
  "2": {
    officer: "Hemath",
    officerRole: "Field Officer • Delta Zone",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    date: "Apr 26, 2026 • 10:15 AM",
    location: "Vetiver Farm - Block A, Annur",
    status: "Completed",
    cropCondition: "Calibrated Moisture (6.8 pH)",
    notes:
      "Drip lateral lines pressure-checked. Moisture penetration uniform across all rows. Soil mineral conductivity verified optimal.",
    recommendation:
      "Drip irrigation pattern calibrated. Soil pH verified optimal. No weed competition observed.",
    photos: [
      "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=300&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=300&auto=format&fit=crop&q=80",
    ],
  },
  "3": {
    officer: "Murugan",
    officerRole: "Field Officer • Delta Zone",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    date: "Apr 11, 2026 • 11:00 AM",
    location: "Vetiver Farm - Block B, Annur",
    status: "Completed",
    cropCondition: "Baseline Establishment",
    notes:
      "Baseline crop count verified. Seedling survival rate is 98.4%. Organic manure quantity successfully allocated.",
    recommendation:
      "Organic manure allocation approved and delivered to farm shed. Begin light irrigation cycle.",
    photos: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&auto=format&fit=crop&q=80",
    ],
  },
};

export default function FarmerVisitReportScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const visit = visitsData[id as string] || visitsData["1"];

  const handleDownload = () => {
    showToast({
      title: "PDF Audit Downloaded",
      message: `Inspection audit report #${id || "1"} downloaded.`,
      type: "success",
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Background image subtle overlay */}
      <ImageBackground
        source={require("../../../assets/images/image4.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.1 }}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header - Transparent */}
        <View
          style={{ backgroundColor: "transparent" }}
          className="px-5 pt-2 pb-3 flex-row items-center justify-between z-10"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/95 items-center justify-center border border-slate-200 shadow-sm"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-slate-900 text-lg font-gotham-bold">
            Visit Audit Detail
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 6 }}
        >
          {/* Top Landscape Image */}
          <View className="px-5 mb-5">
            <View className="h-56 rounded-3xl overflow-hidden shadow-sm border border-emerald-800/20 relative">
              <Image
                source={require("../../../assets/images/image2.jpg")}
                className="w-full h-full"
                resizeMode="cover"
              />
              <LinearGradient
                colors={["transparent", "rgba(6,44,30,0.88)"]}
                style={StyleSheet.absoluteFill}
              />
              <View className="absolute bottom-4 left-5 right-5 flex-row justify-between items-end">
                <View className="flex-1 pr-2">
                  <View className="flex-row items-center mb-1">
                    <MapPin size={13} color="#a7f3d0" className="mr-1" />
                    <Text className="text-emerald-300 font-gotham-bold text-xs uppercase tracking-wider">
                      {visit.location}
                    </Text>
                  </View>
                  <Text className="text-white font-gotham-bold text-xl drop-shadow-sm">
                    {visit.cropCondition}
                  </Text>
                </View>
                <View className="bg-emerald-500/25 px-3 py-1 rounded-full border border-emerald-400/50 flex-row items-center">
                  <CheckCircle2 size={12} color="#34d399" className="mr-1" />
                  <Text className="text-emerald-300 font-gotham-bold text-[10px] uppercase tracking-wider">
                    {visit.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Inspector Details Card */}
          <View className="px-5 mb-4">
            <View className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/40 mr-3 shadow-xs">
                  <Image
                    source={{ uri: visit.photo }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-slate-900 font-gotham-bold text-base">
                      {visit.officer}
                    </Text>
                    <BadgeCheck size={16} color="#10b981" className="ml-1" />
                  </View>
                  <Text className="text-emerald-800 font-gotham-medium text-xs">
                    {visit.officerRole}
                  </Text>
                  <Text className="text-slate-400 font-gotham-medium text-[10px] mt-0.5">
                    {visit.date}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Audit Observations */}
          <View className="px-5 mb-4">
            <View className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <Text className="text-slate-900 font-gotham-bold text-sm mb-2">
                Field Officer Notes & Observations
              </Text>
              <Text className="text-slate-700 font-gotham-medium text-xs leading-relaxed mb-4">
                {visit.notes}
              </Text>

              <View className="bg-emerald-50/80 rounded-xl p-3.5 border border-emerald-200/90">
                <Text className="text-emerald-950 font-gotham-bold text-xs uppercase tracking-wider mb-1">
                  Prescribed Recommendation
                </Text>
                <Text className="text-emerald-800 font-gotham-medium text-xs leading-relaxed">
                  {visit.recommendation}
                </Text>
              </View>
            </View>
          </View>

          {/* Photos */}
          <View className="px-5 mb-6">
            <Text className="text-slate-900 font-gotham-bold text-base mb-3">
              Inspection Photos ({visit.photos.length})
            </Text>
            <View className="flex-row gap-3">
              {visit.photos.map((uri: string, i: number) => (
                <View
                  key={i}
                  className="flex-1 h-32 rounded-2xl overflow-hidden shadow-xs border border-slate-200 bg-slate-100"
                >
                  <Image
                    source={{ uri }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Actions */}
          <View className="px-5 gap-3">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push(`/(farmer)/rate/v1` as any)}
              className="rounded-2xl overflow-hidden shadow-sm"
            >
              <LinearGradient
                colors={["#15803d", "#047857"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingVertical: 15, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
              >
                <Star size={18} color="#fff" fill="#fff" className="mr-2" />
                <Text className="text-white font-gotham-bold text-sm tracking-wide">
                  Rate Field Officer
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleDownload}
              className="bg-white border border-slate-200 py-3.5 rounded-2xl items-center flex-row justify-center shadow-xs"
            >
              <Download size={17} color="#15803d" className="mr-2" />
              <Text className="text-emerald-800 font-gotham-bold text-xs uppercase tracking-wider">
                Download Full Audit (PDF)
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}


