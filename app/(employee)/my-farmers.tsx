import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  Linking,
  TextInput,
} from "react-native";
import {
  ChevronLeft,
  MapPin,
  Phone,
  MessageCircle,
  Sprout,
  Users,
  Search,
  UserPlus,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
} from "lucide-react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { mockFarmers, CustomerType } from "../../data/mockData";
import { useLanguage, LanguageTogglePill } from "../../context/LanguageContext";
import { api } from "../../services/api";

export default function MyFarmersScreen() {
  const { t, language } = useLanguage();
  const [farmers, setFarmers] = useState<any[]>(mockFarmers);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "both" | "crop" | "fertilizer">("all");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/employee/farmers");
        if (res?.status === "success" && res?.farmers && res.farmers.length > 0) {
          const mapped = res.farmers.map((f: any, i: number) => ({
            id: String(f.id),
            name: f.name || "Farmer",
            phone: f.phone || "+91 94111 11111",
            address: f.land_address || "Tamil Nadu",
            cropType: f.crop_type || "Vetiver",
            customerType: (i % 3 === 0 ? "both" : i % 3 === 1 ? "crop" : "fertilizer") as CustomerType,
            farmArea: f.land_acres ? `${f.land_acres} Acres` : "3.0 Acres",
            cropDetails: f.crop_details || "Certified Organic Plot",
            fertilizerDetails: f.fertilizer_details || "Organic Vermicompost & Bio-NPK",
            recentOrder: f.recent_order || "50kg Bio-NPK Granules",
            photo: [
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
            ][i % 6],
          }));
          setFarmers(mapped);
        }
      } catch (err) {
        console.log("Farmers fallback to mockData:", err);
      }
    })();
  }, []);

  const filtered = farmers.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      (f.address && f.address.toLowerCase().includes(search.toLowerCase())) ||
      (f.cropType && f.cropType.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;
    if (selectedFilter === "both") return f.customerType === "both";
    if (selectedFilter === "crop") return f.customerType === "crop" || f.customerType === "both";
    if (selectedFilter === "fertilizer") return f.customerType === "fertilizer" || f.customerType === "both";
    return true;
  });

  const bothCount = farmers.filter((f) => f.customerType === "both").length;
  const cropCount = farmers.filter((f) => f.customerType === "crop").length;
  const fertCount = farmers.filter((f) => f.customerType === "fertilizer").length;

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ImageBackground
        source={require("../../assets/images/image7.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.12 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.4)", "rgba(248, 250, 252, 0.85)", "#f8fafc"]}
          style={StyleSheet.absoluteFill}
        />

        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
          {/* Header - Transparent */}
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

            <View className="items-center">
              <Text className="text-lg font-gotham-bold text-slate-900">
                {language === "ta" ? "விவசாயிகள் பட்டியல்" : "Farmer & Client Directory"}
              </Text>
              <Text className="text-[11px] text-emerald-700 font-gotham-bold">
                {language === "ta" ? "பயிர் & உர வாடிக்கையாளர்கள்" : "Crop Cultivators & Fertilizer Buyers"}
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              <LanguageTogglePill />
              <TouchableOpacity
                onPress={() => router.push("/(employee)/register-farmer/step1" as any)}
                className="w-10 h-10 rounded-full bg-emerald-600 items-center justify-center shadow-md shadow-emerald-700/25"
              >
                <UserPlus size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 150, paddingTop: 6 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Search Bar */}
            <View className="px-5 mb-3.5">
              <View className="flex-row items-center bg-white px-3.5 py-2.5 rounded-full border border-slate-200 shadow-sm">
                <Search size={18} color="#64748b" />
                <TextInput
                  placeholder={language === "ta" ? "விவசாயி, பயிர் அல்லது மாவட்டம் தேடவும்..." : "Search by farmer name, crop, or district..."}
                  placeholderTextColor="#94a3b8"
                  value={search}
                  onChangeText={setSearch}
                  className="flex-1 ml-2 text-slate-900 font-brandon text-sm py-0"
                />
              </View>
            </View>

            {/* Mingle Category Filter Pills */}
            <View className="px-5 mb-4">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {[
                  { key: "all", label: language === "ta" ? `அனைத்தும் (${farmers.length})` : `All (${farmers.length})` },
                  { key: "both", label: language === "ta" ? `இருவகை வாடிக்கையாளர்கள் (${bothCount})` : `Dual Customers (${bothCount})` },
                  { key: "crop", label: language === "ta" ? `பயிர் விவசாயிகள் (${bothCount + cropCount})` : `Crop Growers (${bothCount + cropCount})` },
                  { key: "fertilizer", label: language === "ta" ? `உர வாடிக்கையாளர்கள் (${bothCount + fertCount})` : `Fertilizer Buyers (${bothCount + fertCount})` },
                ].map((item) => {
                  const isActive = selectedFilter === item.key;
                  return (
                    <TouchableOpacity
                      key={item.key}
                      activeOpacity={0.8}
                      onPress={() => setSelectedFilter(item.key as any)}
                      className={`px-4 py-2 rounded-full border shadow-xs ${
                        isActive
                          ? "bg-[#15803d] border-[#15803d]"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <Text
                        className={`text-xs font-gotham-bold ${
                          isActive ? "text-white" : "text-slate-700"
                        }`}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Hero Summary Card: Breakdown of Customers */}
            <View className="px-5 mb-5">
              <View className="rounded-[28px] overflow-hidden shadow-md bg-slate-900">
                <ImageBackground
                  source={require("../../assets/images/image3.jpg")}
                  className="w-full h-44"
                  resizeMode="cover"
                >
                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(0, 0, 0, 0.45)",
                      "rgba(10, 15, 25, 0.94)",
                    ]}
                    locations={[0, 0.35, 1]}
                    style={StyleSheet.absoluteFill}
                  />

                  <View className="flex-1 p-5 justify-between">
                    <View className="flex-row items-center bg-emerald-500 px-3 py-1 rounded-full self-start shadow-sm">
                      <Users size={14} color="#ffffff" />
                      <Text className="text-white font-gotham-bold text-[11px] ml-1.5 uppercase tracking-wider">
                        Integrated Agronomy Network
                      </Text>
                    </View>

                    <View>
                      <Text className="text-white font-gotham-bold text-2xl mb-1">
                        {farmers.length} {language === "ta" ? "பதிவுசெய்த வாடிக்கையாளர்கள்" : "Total Enrolled Clients"}
                      </Text>
                      <View className="flex-row items-center flex-wrap gap-2 mt-1">
                        <View className="bg-emerald-500/30 px-2.5 py-0.5 rounded-full border border-emerald-400/40">
                          <Text className="text-emerald-200 font-gotham-bold text-[10px]">
                            {bothCount} {language === "ta" ? "இருவகை (பயிர் + உரம்)" : "Dual (Crop + Fert)"}
                          </Text>
                        </View>
                        <View className="bg-sky-500/30 px-2.5 py-0.5 rounded-full border border-sky-400/40">
                          <Text className="text-sky-200 font-gotham-bold text-[10px]">
                            {cropCount} {language === "ta" ? "பயிர் மட்டும்" : "Exclusive Crops"}
                          </Text>
                        </View>
                        <View className="bg-amber-500/30 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                          <Text className="text-amber-200 font-gotham-bold text-[10px]">
                            {fertCount} {language === "ta" ? "உர வாடிக்கையாளர்கள்" : "Bio-Input Buyers"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </View>

            {/* Farmers List (Minimal Overview Cards with Navigation) */}
            <View className="px-5">
              {filtered.map((farmer, idx) => {
                const cardThemes = [
                  { bg: "bg-emerald-50/90", border: "border-emerald-200/90", tagColor: "#047857" },
                  { bg: "bg-sky-50/90", border: "border-sky-200/90", tagColor: "#0284c7" },
                  { bg: "bg-amber-50/90", border: "border-amber-200/90", tagColor: "#b45309" },
                  { bg: "bg-purple-50/90", border: "border-purple-200/90", tagColor: "#7e22ce" },
                ];
                const theme = cardThemes[idx % cardThemes.length];

                return (
                  <TouchableOpacity
                    key={farmer.id || idx}
                    activeOpacity={0.88}
                    onPress={() =>
                      router.push(`/(employee)/farmer/${farmer.id}` as any)
                    }
                    className={`${theme.bg} rounded-[22px] p-4 mb-3 border ${theme.border} shadow-xs`}
                  >
                    <View className="flex-row items-center mb-2.5">
                      {/* Avatar */}
                      <View
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 26,
                          overflow: "hidden",
                          borderWidth: 2,
                          borderColor: "#ffffff",
                          backgroundColor: "#f1f5f9",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 12,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.08,
                          shadowRadius: 3,
                          elevation: 2,
                        }}
                      >
                        <Image
                          source={{
                            uri:
                              farmer.photo ||
                              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                          }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                        />
                      </View>

                      <View className="flex-1">
                        <View className="flex-row items-center">
                          <Text className="text-slate-900 font-gotham-bold text-base">
                            {farmer.name}
                          </Text>
                          <ShieldCheck size={15} color="#059669" className="ml-1.5" />
                        </View>
                        <View className="flex-row items-center mt-0.5">
                          <MapPin size={12} color="#64748b" />
                          <Text
                            className="text-slate-600 font-brandon text-xs ml-1"
                            numberOfLines={1}
                          >
                            {farmer.address}
                          </Text>
                        </View>
                      </View>

                      <View className="bg-white/90 px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
                        <Text className="text-emerald-800 font-gotham-bold text-xs">
                          {farmer.farmArea || "3.0 Acres"}
                        </Text>
                      </View>
                    </View>

                    {/* Customer Category Badges */}
                    <View className="flex-row flex-wrap items-center gap-1.5 mb-2.5">
                      {(farmer.customerType === "both" || farmer.customerType === "crop") && (
                        <View className="flex-row items-center bg-emerald-100/90 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                          <Sprout size={11} color="#047857" className="mr-1" />
                          <Text className="text-emerald-900 font-gotham-bold text-[10px] uppercase tracking-wider">
                            {t("cropType", "Crop")}: {farmer.cropType}
                          </Text>
                        </View>
                      )}

                      {(farmer.customerType === "both" || farmer.customerType === "fertilizer") && (
                        <View className="flex-row items-center bg-amber-100/90 border border-amber-300 px-2.5 py-0.5 rounded-full">
                          <Package size={11} color="#b45309" className="mr-1" />
                          <Text className="text-amber-900 font-gotham-bold text-[10px] uppercase tracking-wider">
                            {t("fertilizerCustomer", "Fertilizer Buyer")}
                          </Text>
                        </View>
                      )}

                      {farmer.customerType === "both" && (
                        <View className="bg-purple-100/90 border border-purple-300 px-2 py-0.5 rounded-full">
                          <Text className="text-purple-900 font-gotham-bold text-[9px] uppercase tracking-widest">
                            ★ {t("dualClient", "Dual Client")}
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Action Bar (Navigate to detail / Quick Contacts) */}
                    <View className="flex-row justify-between items-center pt-2 border-t border-slate-200/70">
                      <View className="flex-row items-center">
                        <Text className="text-[#15803d] font-gotham-bold text-xs mr-1">
                          {t("viewDossier", "View Dossier")}
                        </Text>
                        <ChevronLeft
                          size={14}
                          color="#15803d"
                          style={{ transform: [{ rotate: "180deg" }] }}
                        />
                      </View>

                      <View className="flex-row items-center space-x-2">
                        <TouchableOpacity
                          onPress={() => Linking.openURL(`tel:${farmer.phone}`)}
                          className="w-8 h-8 rounded-full bg-emerald-50 items-center justify-center border border-emerald-200 mr-2"
                        >
                          <Phone size={14} color="#059669" />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(
                              `https://wa.me/${farmer.phone.replace(/[^0-9]/g, "")}`
                            )
                          }
                          className="w-8 h-8 rounded-full bg-emerald-600 items-center justify-center shadow-xs"
                        >
                          <MessageCircle size={14} color="#ffffff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
