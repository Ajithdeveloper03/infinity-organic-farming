import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  Star,
  Leaf,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguage } from "../../../context/LanguageContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FarmerRateScreen() {
  const { t, language } = useLanguage();

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <SafeAreaView style={{ zIndex: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* TOP CONTENT (Smart Solutions Concept from Image 1 Left) */}
      <View style={{ paddingHorizontal: 32, paddingTop: 40 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#e2e8f0", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
            <Leaf size={20} color="#059669" />
          </View>
          <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 24 }}>Infinity Organics</Text>
        </View>

        <Text style={{ color: "#059669", fontFamily: "Brandon-Bold", fontSize: 36, lineHeight: 40 }}>
          Smart <Text style={{ color: "#000000" }}>Solutions</Text>
        </Text>
        <Text style={{ color: "#059669", fontFamily: "Brandon-Bold", fontSize: 36, lineHeight: 40, marginTop: -4 }}>
          Modern <Text style={{ color: "#000000" }}>Farmers</Text>
        </Text>

        <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 14, marginTop: 16, lineHeight: 22 }}>
          Empowering farmers with smart tools for better yields and decisions. How was our officer's visit today?
        </Text>
      </View>

      {/* RATING CARD */}
      <View style={{ marginHorizontal: 32, marginTop: 40, backgroundColor: "#ffffff", borderRadius: 32, padding: 32, shadowColor: "#059669", shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.1, shadowRadius: 32, elevation: 12, zIndex: 10 }}>
        <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 20, textAlign: "center", marginBottom: 24 }}>Rate Visit Experience</Text>
        
        <View style={{ flexDirection: "row", justifyContent: "center", gap: 12, marginBottom: 32 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star}>
              <Star size={32} color={star <= 4 ? "#fbbf24" : "#e2e8f0"} fill={star <= 4 ? "#fbbf24" : "transparent"} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={{ backgroundColor: "#059669", borderRadius: 999, paddingVertical: 16, alignItems: "center", flexDirection: "row", justifyContent: "center" }}
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.push("/(farmer)/dashboard" as any);
          }}
        >
          <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 16, marginRight: 8 }}>Submit Feedback</Text>
          <CheckCircle2 size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* BOTTOM ILLUSTRATION */}
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%" }}>
        <Image
          source={require("../../../assets/images/image6.jpg")} // Use tractor image
          style={{ width: "100%", height: "100%", opacity: 0.9 }}
          resizeMode="cover"
        />
        {/* Fading gradient upwards into white */}
        <LinearGradient
          colors={["#ffffff", "rgba(255,255,255,0.7)", "transparent"]}
          style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100 }}
        />
      </View>
    </View>
  );
}
