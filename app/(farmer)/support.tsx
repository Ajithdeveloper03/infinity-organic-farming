import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  MessageSquare,
  PhoneCall,
  HelpCircle,
  BookOpen,
  Home,
  LayoutGrid,
  BarChart2,
  User,
  ChevronLeft,
} from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";

export default function FarmerSupportScreen() {
  const { t, language } = useLanguage();

  return (
    <View style={{ flex: 1, backgroundColor: "#f1f5f4" }}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <SafeAreaView style={{ backgroundColor: "#065f33", borderBottomLeftRadius: 32, borderBottomRightRadius: 32, paddingBottom: 60 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16 }}>
          <TouchableOpacity onPress={() => router.push("/(farmer)/dashboard")} style={{ padding: 8 }}>
            <ChevronLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 18 }}>Help & Support</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: -40 }}>
        
        {/* BIG STATUS CARD (Weather widget style from Image 4) */}
        <View style={{ marginHorizontal: 24, backgroundColor: "#ffffff", borderRadius: 32, padding: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 5, marginBottom: 32 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <View>
              <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 48, letterSpacing: -1 }}>24/7</Text>
              <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13 }}>Avg. Response: 2m</Text>
            </View>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "#e8f2ec", alignItems: "center", justifyContent: "center" }}>
              <MessageSquare size={28} color="#065f33" fill="#065f33" />
            </View>
          </View>
          
          <View style={{ height: 1, backgroundColor: "#f1f5f9", marginBottom: 24 }} />
          
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 12 }}>Available Agents</Text>
              <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 16, marginTop: 4 }}>12 Online</Text>
            </View>
            <View>
              <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 12 }}>Agronomists</Text>
              <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 16, marginTop: 4 }}>3 Active</Text>
            </View>
            <View>
              <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 12 }}>Status</Text>
              <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 16, marginTop: 4 }}>All Good</Text>
            </View>
          </View>
        </View>

        {/* HELP BY CATEGORY GRID */}
        <View style={{ marginHorizontal: 24, marginBottom: 32 }}>
          <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 20, marginBottom: 16 }}>Help by Category</Text>
          
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity style={{ alignItems: "center", backgroundColor: "#ffffff", padding: 16, borderRadius: 24, width: "23%", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#e0f2fe", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <PhoneCall size={20} color="#0284c7" />
              </View>
              <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 12 }}>Call Us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: "center", backgroundColor: "#ffffff", padding: 16, borderRadius: 24, width: "23%", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#dcfce7", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <MessageSquare size={20} color="#16a34a" />
              </View>
              <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 12 }}>Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: "center", backgroundColor: "#ffffff", padding: 16, borderRadius: 24, width: "23%", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#fef3c7", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <HelpCircle size={20} color="#d97706" />
              </View>
              <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 12 }}>FAQ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: "center", backgroundColor: "#ffffff", padding: 16, borderRadius: 24, width: "23%", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#fce7f3", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <BookOpen size={20} color="#db2777" />
              </View>
              <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 12 }}>Manuals</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TUTORIALS SCROLL */}
        <View style={{ marginBottom: 100 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, marginBottom: 16 }}>
            <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 20 }}>Video Tutorials</Text>
            <Text style={{ color: "#065f33", fontFamily: "Brandon-Bold", fontSize: 13 }}>View all</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 16 }}>
            <View style={{ width: 200, height: 120, borderRadius: 24, overflow: "hidden" }}>
              <Image source={require("../../assets/images/image1.jpg")} style={{ width: "100%", height: "100%" }} />
              <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, backgroundColor: "rgba(0,0,0,0.5)" }}>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 12 }}>How to apply Bio-Fertilizer</Text>
              </View>
            </View>
            <View style={{ width: 200, height: 120, borderRadius: 24, overflow: "hidden" }}>
              <Image source={require("../../assets/images/image5.jpg")} style={{ width: "100%", height: "100%" }} />
              <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 12, backgroundColor: "rgba(0,0,0,0.5)" }}>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 12 }}>Drone Scouting Basics</Text>
              </View>
            </View>
          </ScrollView>
        </View>

      </ScrollView>

      {/* BOTTOM NAV BAR */}
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#ffffff", borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 32, paddingVertical: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 10 }}>
        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => router.push("/(farmer)/dashboard" as any)}>
          <Home size={24} color="#065f33" />
          <Text style={{ color: "#065f33", fontFamily: "Brandon-Bold", fontSize: 11, marginTop: 4 }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => router.push("/(farmer)/farm" as any)}>
          <LayoutGrid size={24} color="#94a3b8" />
          <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 11, marginTop: 4 }}>All Farms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => router.push("/(farmer)/history" as any)}>
          <BarChart2 size={24} color="#94a3b8" />
          <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 11, marginTop: 4 }}>Statistic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => router.push("/(farmer)/profile" as any)}>
          <User size={24} color="#94a3b8" />
          <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 11, marginTop: 4 }}>My Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
