import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Edit2 } from "lucide-react-native";

export default function CropHealthDetailsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" />

      {/* Top ambient glow inspired by Image 2 */}
      <View style={{ position: "absolute", top: -100, left: 0, right: 0, height: 300, alignItems: "center" }}>
        <View style={{ width: 300, height: 300, borderRadius: 150, backgroundColor: "rgba(167, 243, 208, 0.4)", transform: [{ scaleY: 0.5 }], filter: "blur(40px)" }} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        
        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16, paddingBottom: 20 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
            <ArrowLeft size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 18 }}>Crop Health Details</Text>
          <View>
            <Text style={{ color: "#64748b", fontFamily: "Brandon-Bold", fontSize: 14, textAlign: "right" }}>09:01</Text>
            <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 12 }}>26.01.26</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 80 }}>
          
          <Text style={{ color: "#334155", fontFamily: "Brandon-Medium", fontSize: 16, textAlign: "center", lineHeight: 24, marginHorizontal: 20, marginBottom: 32, marginTop: 10 }}>
            If you want to increase the Crop Vitality Level next month, add more nitrogen-based bio-fertilizers.
          </Text>

          {/* CROP IMAGE CARD */}
          <View style={{ backgroundColor: "#ffffff", borderRadius: 32, padding: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 10, marginBottom: 24 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <View>
                <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 22 }}>Vetiver Extract</Text>
                <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 14, marginTop: 4 }}>Roots • Leaves • Stem • Soil</Text>
              </View>
              <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#f1f5f9", alignItems: "center", justifyContent: "center" }}>
                <Edit2 size={16} color="#3b82f6" />
              </TouchableOpacity>
            </View>

            <View style={{ width: "100%", height: 200, borderRadius: 24, overflow: "hidden", marginBottom: 20 }}>
              <Image source={require("../../assets/images/image2.jpg")} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
            </View>

            <Text style={{ color: "#334155", fontFamily: "Brandon-Medium", fontSize: 15, textAlign: "center", lineHeight: 22 }}>
              Current yield is showing robust root development. Bio-silica absorption is optimal.
            </Text>
          </View>

          {/* SOIL pH SPECTRUM (Inspired by "Eat the rainbow" in Image 2) */}
          <View style={{ backgroundColor: "#ffffff", borderRadius: 32, padding: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 10, marginBottom: 24 }}>
            <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 18, marginBottom: 16 }}>Soil pH Spectrum</Text>
            
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", height: 60 }}>
              {[
                { color: "#ef4444", label: "Highly Ac", fill: "40%" },
                { color: "#f97316", label: "Acidic", fill: "20%" },
                { color: "#eab308", label: "Slight", fill: "100%" },
                { color: "#10b981", label: "Neutral", fill: "100%" },
                { color: "#3b82f6", label: "Alkaline", fill: "60%" },
                { color: "#f1f5f9", label: "Highly Al", fill: "0%" },
              ].map((item, idx) => (
                <View key={idx} style={{ alignItems: "center", width: "15%" }}>
                  <View style={{ width: "100%", height: 40, backgroundColor: "#f1f5f9", borderRadius: 8, overflow: "hidden", justifyContent: "flex-end", marginBottom: 8 }}>
                    <View style={{ width: "100%", height: item.fill, backgroundColor: item.color }} />
                  </View>
                  <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 10 }}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* MACRONUTRIENT BREAKDOWN (NPK) */}
          <View style={{ backgroundColor: "#ffffff", borderRadius: 32, padding: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 10 }}>
            <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 18, marginBottom: 20 }}>Macronutrient breakdown</Text>
            
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 18 }}>High</Text>
                <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 13, marginTop: 4 }}>Nitrogen</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 18 }}>Low</Text>
                <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 13, marginTop: 4 }}>Phosphorus</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 18 }}>Low</Text>
                <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 13, marginTop: 4 }}>Potassium</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 18 }}>High</Text>
                <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 13, marginTop: 4 }}>Organic</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
