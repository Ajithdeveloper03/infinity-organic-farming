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
import * as Haptics from "expo-haptics";
import {
  ChevronLeft,
  Bell,
  Star,
  Settings,
  CircleCheck,
  ShieldCheck,
  Trophy,
} from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";

export default function FarmerProfileScreen() {
  const { t, language } = useLanguage();

  return (
    <View style={{ flex: 1, backgroundColor: "#f0fdf4" }}>
      <StatusBar barStyle="dark-content" />

      {/* TOP ILLUSTRATION / HERO (AgroPulse concept) */}
      <View style={{ height: 320, width: "100%", backgroundColor: "#e2e8f0" }}>
        <ImageBackground
          source={require("../../assets/images/image10.jpg")} // Use a bright farm image
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <SafeAreaView>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16 }}>
              <TouchableOpacity
                onPress={() => router.push("/(farmer)/dashboard")}
                style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.9)", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}
              >
                <ChevronLeft size={24} color="#0f172a" />
              </TouchableOpacity>
              
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 18, textShadowColor: "rgba(0,0,0,0.5)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>
                {language === "ta" ? "விவசாயி சுயவிவரம்" : "Green Valley Farm"}
              </Text>

              <TouchableOpacity
                style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.9)", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 }}
                onPress={() => router.push("/(farmer)/menu" as any)}
              >
                <Settings size={20} color="#0f172a" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{ marginTop: -40 }} // Overlap the hero
      >
        
        {/* GOLD MEMBER CARD */}
        <View style={{ marginHorizontal: 24, backgroundColor: "#ffffff", borderRadius: 32, padding: 24, shadowColor: "#059669", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.08, shadowRadius: 24, elevation: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fef3c7", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 }}>
              <Star size={14} color="#d97706" fill="#d97706" />
              <Text style={{ color: "#d97706", fontFamily: "Brandon-Bold", fontSize: 13, marginLeft: 6 }}>Gold member</Text>
            </View>
            <Text style={{ color: "#059669", fontFamily: "Brandon-Bold", fontSize: 13 }}>View Details ⟩</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "baseline", marginBottom: 12 }}>
            <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 42, letterSpacing: -1 }}>2,490</Text>
            <Text style={{ color: "#64748b", fontFamily: "Brandon-Bold", fontSize: 18, marginLeft: 6 }}>pts</Text>
          </View>
          
          <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 8 }}>
            <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 11 }}>250 points to <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold" }}>Platinum Member</Text></Text>
          </View>

          {/* Progress Bar */}
          <View style={{ height: 8, backgroundColor: "#f1f5f9", borderRadius: 4, overflow: "hidden", marginBottom: 24 }}>
            <View style={{ width: "85%", height: "100%", backgroundColor: "#f97316", borderRadius: 4 }} />
          </View>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity style={{ flex: 1, paddingVertical: 14, borderRadius: 999, borderWidth: 1.5, borderColor: "#e2e8f0", alignItems: "center" }}>
              <Text style={{ color: "#475569", fontFamily: "Brandon-Bold", fontSize: 14 }}>How to earn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, paddingVertical: 14, borderRadius: 999, backgroundColor: "#f97316", alignItems: "center", shadowColor: "#f97316", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 14 }}>Redeem Rewards</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PROFILE IDENTIFICATION CARD */}
        <View style={{ marginHorizontal: 24, marginTop: 24, backgroundColor: "#ffffff", borderRadius: 32, padding: 24, shadowColor: "#059669", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 4 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, overflow: "hidden", borderWidth: 3, borderColor: "#10b981" }}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" }} style={{ width: "100%", height: "100%" }} />
            </View>
            <View style={{ marginLeft: 20, flex: 1 }}>
              <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 24, letterSpacing: -0.5 }}>Kuppusamy M.</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                <ShieldCheck size={14} color="#10b981" />
                <Text style={{ color: "#10b981", fontFamily: "Brandon-Medium", fontSize: 12, marginLeft: 4 }}>VERIFIED • IO-FAR-2026</Text>
              </View>
              <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13, marginTop: 8 }}>+91 94111 11111</Text>
            </View>
          </View>
        </View>

        {/* QUICK ACTIONS / ACHIEVEMENTS */}
        <View style={{ marginHorizontal: 24, marginTop: 32 }}>
          <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 20, marginBottom: 16 }}>Achievements</Text>
          
          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", padding: 16, borderRadius: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 }}>
              <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: "#fef3c7", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                <Trophy size={28} color="#d97706" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16 }}>Top Producer 2025</Text>
                <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13, marginTop: 2 }}>Achieved highest yield in Delta Zone</Text>
              </View>
              <View style={{ backgroundColor: "#fef3c7", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
                <Text style={{ color: "#d97706", fontFamily: "Brandon-Bold", fontSize: 11 }}>+500 pts</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", padding: 16, borderRadius: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 }}>
              <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: "#dcfce7", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                <CircleCheck size={28} color="#15803d" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16 }}>100% Organic Certified</Text>
                <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13, marginTop: 2 }}>Maintained zero chemical usage</Text>
              </View>
              <View style={{ backgroundColor: "#fef3c7", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 }}>
                <Text style={{ color: "#d97706", fontFamily: "Brandon-Bold", fontSize: 11 }}>+250 pts</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
