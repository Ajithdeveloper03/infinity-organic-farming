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
} from "lucide-react-native";

export default function EmployeeProfileScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fdf8f5" }}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1 }}>
        
        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace("/(employee)/dashboard")} style={{ marginRight: 16, backgroundColor: "#ffffff", padding: 8, borderRadius: 999, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
              <ChevronLeft size={24} color="#000000" />
            </TouchableOpacity>
            <View>
              <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 20 }}>My Profile</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => router.push("/(employee)/menu")} style={{ backgroundColor: "#ffffff", padding: 8, borderRadius: 999, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
            <Settings size={24} color="#475569" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>
          
          {/* PROFILE CARD */}
          <View style={{ backgroundColor: "#ffffff", borderRadius: 32, padding: 24, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 8, marginBottom: 32 }}>
            <View style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: "#16a34a", padding: 4, marginBottom: 16 }}>
              <Image source={require("../../assets/images/image1.jpg")} style={{ width: "100%", height: "100%", borderRadius: 45 }} />
            </View>
            <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 24, marginBottom: 4 }}>Robert Walker</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
              <ShieldCheck size={16} color="#16a34a" />
              <Text style={{ color: "#16a34a", fontFamily: "Brandon-Medium", fontSize: 14, marginLeft: 4 }}>Senior Field Officer</Text>
            </View>

            <TouchableOpacity onPress={() => router.push("/(employee)/edit-profile")} style={{ backgroundColor: "#f1f5f9", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 999, flexDirection: "row", alignItems: "center" }}>
              <Edit3 size={16} color="#475569" />
              <Text style={{ color: "#475569", fontFamily: "Brandon-Bold", fontSize: 14, marginLeft: 8 }}>Edit Details</Text>
            </TouchableOpacity>
          </View>

          {/* MASSIVE METRICS CARD */}
          <LinearGradient
            colors={["#15803d", "#16a34a"]}
            style={{ borderRadius: 32, padding: 24, shadowColor: "#15803d", shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.3, shadowRadius: 24, elevation: 12, marginBottom: 32 }}
          >
            <Text style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Brandon-Bold", fontSize: 14, letterSpacing: 1, marginBottom: 24 }}>YOUR IMPACT SUMMARY</Text>
            
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                  <Users size={24} color="#ffffff" />
                </View>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 24 }}>124</Text>
                <Text style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Brandon-Medium", fontSize: 12, textAlign: "center" }}>Farmers{"\n"}Managed</Text>
              </View>

              <View style={{ width: 1, backgroundColor: "rgba(255,255,255,0.2)", marginHorizontal: 8 }} />

              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                  <Map size={24} color="#ffffff" />
                </View>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 24 }}>4.2k</Text>
                <Text style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Brandon-Medium", fontSize: 12, textAlign: "center" }}>Acres{"\n"}Covered</Text>
              </View>

              <View style={{ width: 1, backgroundColor: "rgba(255,255,255,0.2)", marginHorizontal: 8 }} />

              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                  <Tractor size={24} color="#ffffff" />
                </View>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 24 }}>18</Text>
                <Text style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Brandon-Medium", fontSize: 12, textAlign: "center" }}>Active{"\n"}Zones</Text>
              </View>
            </View>
          </LinearGradient>

          {/* LIST ITEMS */}
          <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 18, marginBottom: 16 }}>Assigned Territories</Text>
          <View style={{ backgroundColor: "#ffffff", borderRadius: 24, padding: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 4 }}>
            {["Delta Zone A", "North Hills Sector", "East Valley Region"].map((zone, i) => (
              <View key={i} style={{ flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: i === 2 ? 0 : 1, borderBottomColor: "#f1f5f9" }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#f0fdf4", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                  <Map size={20} color="#16a34a" />
                </View>
                <Text style={{ flex: 1, color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16 }}>{zone}</Text>
              </View>
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
