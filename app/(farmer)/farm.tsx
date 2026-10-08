import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import {
  ChevronLeft,
  Droplets,
  Thermometer,
  Wind,
  Leaf,
  Scan,
  Map,
} from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";

export default function FarmerFarmScreen() {
  const { t, language } = useLanguage();

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" />

      {/* FULL-SCREEN IMMERSIVE BACKGROUND (Rooted in Nature concept) */}
      <ImageBackground
        source={require("../../assets/images/image2.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.5)", "#05180d"]}
          locations={[0, 0.4, 0.9]}
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
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 60, paddingBottom: 100 }}
          >
            {/* BIG HERO TEXT */}
            <View style={{ marginBottom: 40 }}>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 52, lineHeight: 56, letterSpacing: -1 }}>
                {language === "ta" ? "இயற்கையில்\nவேரூன்றியது" : "Rooted in\nNature"}
              </Text>
              <Text style={{ color: "#a7f3d0", fontFamily: "Brandon-Bold", fontSize: 24, marginTop: 8 }}>
                {language === "ta" ? "எதிர்காலத்தை வளர்ப்போம்" : "Growing the Future"}
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Brandon-Medium", fontSize: 14, marginTop: 16, lineHeight: 22, width: "80%" }}>
                {language === "ta" ? "பூமியை மதித்து வளங்களை பாதுகாக்கும் ஸ்மார்ட் விவசாயம்." : "Being rooted in nature means respecting the earth, protecting its resources."}
              </Text>
            </View>

            {/* GLASSMORPHISM STATS GRID */}
            <View style={{ gap: 16 }}>
              {/* Top Row */}
              <View style={{ flexDirection: "row", gap: 16 }}>
                <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" }}>
                  <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Brandon-Medium", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Total Area</Text>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 32, marginTop: 8 }}>130 <Text style={{ fontSize: 16, color: "#a7f3d0" }}>ac</Text></Text>
                </View>
                
                <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" }}>
                  <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Brandon-Medium", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Active Plants</Text>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 32, marginTop: 8 }}>14k</Text>
                </View>
              </View>

              {/* Moisture Level Card */}
              <View style={{ backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 32, padding: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 6, borderColor: "#059669", alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "#05180d", fontFamily: "Brandon-Bold", fontSize: 22 }}>70%</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 20 }}>
                  <Text style={{ color: "#05180d", fontFamily: "Brandon-Bold", fontSize: 22 }}>Moisture Level</Text>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13, marginTop: 4 }}>Optimal range for current crop stage</Text>
                </View>
              </View>

              {/* Gallery Grid */}
              <View style={{ marginTop: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 20 }}>Plants for your garden</Text>
                  <Text style={{ color: "#a7f3d0", fontFamily: "Brandon-Bold", fontSize: 13 }}>View all</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Image source={require("../../assets/images/image1.jpg")} style={{ flex: 1, height: 120, borderRadius: 20 }} />
                  <Image source={require("../../assets/images/image5.jpg")} style={{ flex: 1, height: 120, borderRadius: 20 }} />
                  <Image source={require("../../assets/images/image6.jpg")} style={{ flex: 1, height: 120, borderRadius: 20 }} />
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>

        {/* FLOATING ACTION DOCK */}
        <View style={{ position: "absolute", bottom: 40, left: 0, right: 0, alignItems: "center" }}>
          <View style={{ backgroundColor: "rgba(0,0,0,0.7)", borderRadius: 999, flexDirection: "row", padding: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(20px)" }}>
            <TouchableOpacity style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#059669", alignItems: "center", justifyContent: "center" }}>
              <Leaf size={22} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" }}>
              <Map size={22} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" }}>
              <Thermometer size={22} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" }}>
              <Droplets size={22} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

      </ImageBackground>
    </View>
  );
}
