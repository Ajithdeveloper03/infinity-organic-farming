import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  Sprout,
  Droplets,
  Wind,
  Sun,
  ShieldCheck,
  AlertTriangle,
  Beaker,
  ThermometerSun
} from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";

export default function FarmerRecommendationsScreen() {
  const { t, language } = useLanguage();

  return (
    <View style={{ flex: 1, backgroundColor: "#062214" }}>
      <StatusBar barStyle="light-content" />

      {/* AMBIENT BACKGROUND */}
      <ImageBackground
        source={require("../../assets/images/image6.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(6, 34, 20, 0.6)", "rgba(6, 34, 20, 0.95)", "#062214"]}
          locations={[0, 0.4, 0.8]}
          style={StyleSheet.absoluteFill}
        />

        <SafeAreaView style={{ flex: 1 }}>
          
          {/* HEADER */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16 }}>
            <TouchableOpacity
              onPress={() => router.canGoBack() ? router.back() : router.replace("/(farmer)/dashboard")}
              style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }}
            >
              <ChevronLeft size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 18 }}>Expert Advisory</Text>
            <View style={{ width: 44 }} />
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 40, paddingBottom: 100 }}
          >
            {/* BIG HERO TEXT */}
            <View style={{ marginBottom: 40 }}>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 44, lineHeight: 48, letterSpacing: -1 }}>
                {language === "ta" ? "உங்கள்\nபரிந்துரைகள்" : "Tailored\nAgronomy"}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
                <ShieldCheck size={18} color="#4ade80" />
                <Text style={{ color: "#4ade80", fontFamily: "Brandon-Medium", fontSize: 14, marginLeft: 8 }}>Verified by Field Officer Ramesh</Text>
              </View>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Brandon-Medium", fontSize: 14, marginTop: 16, lineHeight: 24 }}>
                These recommendations are specifically generated for your 2.5 acre Vetiver crop based on yesterday's soil sample analysis and the upcoming week's meteorological forecast. 
              </Text>
            </View>

            {/* DETAILED ADVISORY: PEST CONTROL */}
            <View style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 32, padding: 24, borderWidth: 1, borderColor: "rgba(239,68,68,0.3)", marginBottom: 24 }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(239,68,68,0.2)", alignItems: "center", justifyContent: "center" }}>
                  <AlertTriangle size={24} color="#ef4444" />
                </View>
                <View style={{ marginLeft: 16, flex: 1 }}>
                  <Text style={{ color: "#ef4444", fontFamily: "Brandon-Bold", fontSize: 12, letterSpacing: 1 }}>IMMEDIATE ACTION</Text>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 20 }}>Fungal Prevention</Text>
                </View>
              </View>

              <Text style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Brandon-Medium", fontSize: 14, lineHeight: 24, marginBottom: 20 }}>
                Due to the sudden spike in humidity (currently at 78%) combined with high daytime temperatures, there is a severe risk of early-stage root rot and fungal sporulation in the dense areas of your Vetiver crop. 
                {"\n\n"}
                We strongly advise preparing a 1% Bordeaux mixture (Copper Sulphate and Slaked Lime) and applying it as a foliar spray across the northern sector of your estate. Do not apply during peak sunlight hours; aim for application post 4:30 PM to prevent leaf scorching.
              </Text>

              <TouchableOpacity style={{ backgroundColor: "#ef4444", borderRadius: 16, paddingVertical: 14, alignItems: "center", shadowColor: "#ef4444", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 14 }}>Order Bordeaux Components</Text>
              </TouchableOpacity>
            </View>

            {/* DETAILED ADVISORY: NUTRITION */}
            <View style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 32, padding: 24, borderWidth: 1, borderColor: "rgba(167,243,208,0.2)", marginBottom: 24 }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(167,243,208,0.1)", alignItems: "center", justifyContent: "center" }}>
                  <Beaker size={24} color="#a7f3d0" />
                </View>
                <View style={{ marginLeft: 16, flex: 1 }}>
                  <Text style={{ color: "#a7f3d0", fontFamily: "Brandon-Bold", fontSize: 12, letterSpacing: 1 }}>NUTRITION SCHEDULE</Text>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 20 }}>Nitrogen Top-Dressing</Text>
                </View>
              </View>

              <Text style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Brandon-Medium", fontSize: 14, lineHeight: 24, marginBottom: 20 }}>
                The lab results from your recent soil test indicate a mild nitrogen deficiency (N-level: 110 kg/ha, whereas optimal is 140 kg/ha for the maturation phase). To ensure maximum aromatic oil yield in the roots, a gentle top-dressing is required.
                {"\n\n"}
                Apply 50kg of enriched Organic Vermicompost mixed with neem cake per acre. The neem cake will act as a slow-release mechanism for the nitrogen while simultaneously warding off root nematodes.
              </Text>

              <TouchableOpacity style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 16, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" }}>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 14 }}>Purchase Enriched Vermicompost</Text>
              </TouchableOpacity>
            </View>

            {/* DETAILED ADVISORY: WEATHER IMPACT */}
            <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 24, marginTop: 16, marginBottom: 16 }}>Meteorological Impact</Text>
            
            <View style={{ flexDirection: "row", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" }}>
              <ThermometerSun size={32} color="#fbbf24" style={{ marginRight: 16 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 18, marginBottom: 8 }}>Incoming Heatwave</Text>
                <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Brandon-Medium", fontSize: 13, lineHeight: 20 }}>
                  Temperatures are expected to rise to 38°C over the weekend. Ensure your drip irrigation lines are flushed and functioning. Do not overwater; maintain a 60% soil moisture threshold.
                </Text>
              </View>
            </View>

          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
