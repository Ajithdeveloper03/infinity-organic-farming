import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  Droplets,
  ThermometerSun,
  Leaf,
  Scan,
  Activity,
  Wind,
  Layers,
  FlaskConical
} from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";

export default function FarmerFarmScreen() {
  const { t, language } = useLanguage();

  return (
    <View style={{ flex: 1, backgroundColor: "#062214" }}>
      <StatusBar barStyle="light-content" />

      {/* FULL-SCREEN IMMERSIVE BACKGROUND */}
      <ImageBackground
        source={require("../../assets/images/image2.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(6, 34, 20, 0.4)", "rgba(6, 34, 20, 0.9)", "#062214", "#062214"]}
          locations={[0, 0.4, 0.8, 1]}
          style={StyleSheet.absoluteFill}
        />

        <SafeAreaView style={{ flex: 1 }}>
          {/* HEADER */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16 }}>
            <TouchableOpacity
              onPress={() => router.push("/(farmer)/dashboard")}
              style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }}
            >
              <ChevronLeft size={24} color="#ffffff" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.3)" }}
            >
              <Scan size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 40, paddingBottom: 100 }}
          >
            {/* BIG HERO TEXT */}
            <View style={{ marginBottom: 40 }}>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 48, lineHeight: 52, letterSpacing: -1 }}>
                {language === "ta" ? "உங்கள்\nதோட்டம்" : "Kuppusamy\nEstate"}
              </Text>
              <Text style={{ color: "#a7f3d0", fontFamily: "Brandon-Bold", fontSize: 20, marginTop: 8 }}>
                {language === "ta" ? "முழுமையான நிலப்பரப்பு பகுப்பாய்வு" : "Comprehensive Land Analysis"}
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Brandon-Medium", fontSize: 14, marginTop: 16, lineHeight: 24 }}>
                {language === "ta" 
                  ? "உங்கள் 2.5 ஏக்கர் நிலத்தின் முழுமையான தரவுகள். மண் வளம், நீர் மேலாண்மை மற்றும் பயிர் ஆரோக்கியம் ஆகியவற்றை செயற்கை நுண்ணறிவு மூலம் கண்காணிக்கிறோம்." 
                  : "Deep dive into your 2.5-acre estate. We utilize AI-driven telemetry to monitor soil health, hydration levels, and overall crop vitality in real-time."}
              </Text>
            </View>

            {/* PRIMARY METRICS GRID */}
            <View style={{ gap: 16, marginBottom: 32 }}>
              <View style={{ flexDirection: "row", gap: 16 }}>
                <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" }}>
                  <Layers size={24} color="#a7f3d0" style={{ marginBottom: 12 }} />
                  <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Brandon-Medium", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Total Area</Text>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 32, marginTop: 4 }}>2.5 <Text style={{ fontSize: 16, color: "#a7f3d0" }}>ac</Text></Text>
                </View>
                
                <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" }}>
                  <Leaf size={24} color="#4ade80" style={{ marginBottom: 12 }} />
                  <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Brandon-Medium", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Active Crop</Text>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 24, marginTop: 4, lineHeight: 32 }}>Vetiver</Text>
                </View>
              </View>
            </View>

            {/* DETAILED EXPLANATION SECTION: SOIL HEALTH */}
            <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 24, marginBottom: 16 }}>Soil & Hydration Profile</Text>
            
            <View style={{ backgroundColor: "#ffffff", borderRadius: 32, padding: 24, marginBottom: 32 }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <View style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 6, borderColor: "#059669", alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#05180d", fontFamily: "Brandon-Bold", fontSize: 22 }}>70%</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 20 }}>
                  <Text style={{ color: "#05180d", fontFamily: "Brandon-Bold", fontSize: 20 }}>Optimal Moisture</Text>
                  <Text style={{ color: "#059669", fontFamily: "Brandon-Medium", fontSize: 14, marginTop: 2 }}>Irrigation not required</Text>
                </View>
              </View>

              <Text style={{ color: "#475569", fontFamily: "Brandon-Medium", fontSize: 14, lineHeight: 22, marginBottom: 24 }}>
                The volumetric water content (VWC) of your topsoil is currently stable at 70%. The deep-root nature of the Vetiver crop is retaining moisture effectively despite the recent heatwave. We recommend holding off on any manual irrigation for the next 48 hours to prevent root rot and allow natural aeration.
              </Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#f1f5f9", paddingTop: 20 }}>
                <View style={{ alignItems: "center" }}>
                  <ThermometerSun size={20} color="#ea580c" />
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16, marginTop: 8 }}>32°C</Text>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 11 }}>Temp</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <FlaskConical size={20} color="#0284c7" />
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16, marginTop: 8 }}>6.8</Text>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 11 }}>pH Level</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Wind size={20} color="#0891b2" />
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16, marginTop: 8 }}>12 km/h</Text>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 11 }}>Wind</Text>
                </View>
              </View>
            </View>

            {/* DETAILED EXPLANATION SECTION: VITALITY */}
            <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 24, marginBottom: 16 }}>Crop Vitality Analysis</Text>
            
            <View style={{ backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 32, padding: 24, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                <Activity size={24} color="#a7f3d0" />
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 18, marginLeft: 12 }}>Growth Phase: Maturation</Text>
              </View>
              
              <Text style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Brandon-Medium", fontSize: 14, lineHeight: 24, marginBottom: 20 }}>
                Your Vetiver crop has successfully entered the secondary maturation phase. The leaf tensile strength indicates excellent bio-silica absorption. However, slight nitrogen deficiency was detected in the northern sector of the estate. 
                {"\n\n"}
                Applying a mild organic bio-compost top-dressing within the next 5 days will ensure the root oils develop maximum aromatic concentration before the scheduled harvest next month.
              </Text>

              <TouchableOpacity onPress={() => router.push("/(farmer)/crop-health")} style={{ backgroundColor: "#ffffff", borderRadius: 16, paddingVertical: 14, alignItems: "center" }}>
                <Text style={{ color: "#062214", fontFamily: "Brandon-Bold", fontSize: 14 }}>View detailed NPK Charts</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
