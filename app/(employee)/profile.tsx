import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronLeft,
  Settings,
  ShieldCheck,
  Map,
  Users,
  Tractor,
  LogOut,
  Edit3,
  Award,
  CalendarDays,
  Target,
  ArrowRight
} from "lucide-react-native";

export default function EmployeeProfileScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#062214" }}>
      <StatusBar barStyle="light-content" />

      {/* Cinematic Drone Map Background */}
      <ImageBackground
        source={require("../../assets/images/image2.jpg")}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(6, 34, 20, 0.75)", "rgba(6, 34, 20, 0.95)", "#062214"]}
          locations={[0, 0.3, 1]}
          style={StyleSheet.absoluteFill}
        />
        
        {/* Glow */}
        <View style={{ position: "absolute", top: "15%", left: "50%", marginLeft: -150, width: 300, height: 300, borderRadius: 150, backgroundColor: "rgba(16, 185, 129, 0.15)", filter: "blur(60px)" }} />

        <SafeAreaView style={{ flex: 1 }}>
          
          {/* HEADER */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 }}>
            <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace("/(employee)/dashboard")} style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: 8, borderRadius: 999 }}>
              <ChevronLeft size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 20 }}>Officer Profile</Text>
            <TouchableOpacity onPress={() => router.push("/(employee)/menu")} style={{ backgroundColor: "rgba(255,255,255,0.1)", padding: 8, borderRadius: 999 }}>
              <Settings size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 150 }}>
            
            {/* FLOATING ID BADGE */}
            <View style={{ marginTop: 24, marginBottom: 32, alignItems: "center" }}>
              <View style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 40, padding: 32, width: "100%", alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", shadowColor: "#000", shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.3, shadowRadius: 30, elevation: 15 }}>
                
                {/* ID Header Ribbon */}
                <View style={{ position: "absolute", top: 0, backgroundColor: "#10b981", paddingHorizontal: 20, paddingVertical: 6, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 12, letterSpacing: 2 }}>OFFICER ID: FO-902</Text>
                </View>

                {/* Avatar */}
                <View style={{ width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: "rgba(16, 185, 129, 0.5)", padding: 4, marginTop: 20, marginBottom: 16 }}>
                  <Image source={require("../../assets/images/image1.jpg")} style={{ width: "100%", height: "100%", borderRadius: 55 }} />
                  {/* Verified Badge */}
                  <View style={{ position: "absolute", bottom: 0, right: 0, backgroundColor: "#10b981", borderRadius: 12, padding: 4, borderWidth: 2, borderColor: "#062214" }}>
                    <ShieldCheck size={16} color="#ffffff" />
                  </View>
                </View>

                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 28, marginBottom: 4 }}>Robert Walker</Text>
                <Text style={{ color: "#4ade80", fontFamily: "Brandon-Medium", fontSize: 16, marginBottom: 24 }}>Senior Field Agronomist</Text>

                {/* Edit Action */}
                <TouchableOpacity onPress={() => router.push("/(employee)/edit-profile")} style={{ backgroundColor: "rgba(255,255,255,0.1)", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 999, flexDirection: "row", alignItems: "center" }}>
                  <Edit3 size={16} color="#ffffff" />
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 14, marginLeft: 8 }}>Update ID Credentials</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* IMPACT METRICS (Glass Grid) */}
            <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 20, marginBottom: 16 }}>Operational Impact</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 32 }}>
              {[
                { icon: Users, label: "Farmers Managed", value: "124", color: "#3b82f6" },
                { icon: Map, label: "Acres Covered", value: "4.2k", color: "#10b981" },
                { icon: Target, label: "Reports Filed", value: "892", color: "#f59e0b" },
                { icon: Award, label: "Resolution Rate", value: "98%", color: "#ec4899" },
              ].map((metric, idx) => (
                <View key={idx} style={{ width: "48%", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.05)" }}>
                  <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: `${metric.color}20`, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                    <metric.icon size={20} color={metric.color} />
                  </View>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 24, marginBottom: 4 }}>{metric.value}</Text>
                  <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Brandon-Medium", fontSize: 13 }}>{metric.label}</Text>
                </View>
              ))}
            </View>

            {/* PERFORMANCE HISTORY QUICK LINK */}
            <TouchableOpacity onPress={() => router.push("/(employee)/performance")} style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", borderRadius: 24, padding: 24, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "rgba(16, 185, 129, 0.3)" }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#10b981", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                <CalendarDays size={24} color="#ffffff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 18, marginBottom: 4 }}>Performance History</Text>
                <Text style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Brandon-Medium", fontSize: 13 }}>View your monthly KPIs & schedules</Text>
              </View>
              <ArrowRight size={20} color="#10b981" />
            </TouchableOpacity>

          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
