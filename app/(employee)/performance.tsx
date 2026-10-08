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
import {
  ChevronLeft,
  Award,
  Target,
  TrendingUp,
  Activity,
} from "lucide-react-native";

export default function EmployeePerformanceScreen() {
  const kpis = [
    { label: "Tasks Completed", value: "85%", target: "90%", icon: <Target size={20} color="#0284c7" />, color: "#e0f2fe" },
    { label: "Farmer Onboarded", value: "12", target: "15/mo", icon: <Award size={20} color="#16a34a" />, color: "#dcfce7" },
    { label: "Avg Visit Time", value: "45m", target: "60m", icon: <Activity size={20} color="#9333ea" />, color: "#f3e8ff" },
    { label: "Compliance Score", value: "98%", target: "100%", icon: <TrendingUp size={20} color="#ea580c" />, color: "#ffedd5" },
  ];

  const rankings = [
    { rank: "4", name: "Yvonne Brown", pts: "174 pts", trend: "up", image: require("../../assets/images/image1.jpg") },
    { rank: "5", name: "Paul King", pts: "172 pts", trend: "up", image: require("../../assets/images/image2.jpg") },
    { rank: "6", name: "Robert Hernandez", pts: "141 pts", trend: "down", image: require("../../assets/images/image10.jpg") },
    { rank: "7", name: "Shirley Morgan", pts: "136 pts", trend: "up", image: require("../../assets/images/image6.jpg") },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#ea580c" }}>
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={{ flex: 1 }}>
        
        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16 }}>
          <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace("/(employee)/dashboard")} style={{ padding: 8, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 999 }}>
            <ChevronLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 18 }}>Performance & KPIs</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 0 }}>
          
          {/* YOUR KPI SECTION */}
          <View style={{ paddingHorizontal: 24, marginTop: 32, marginBottom: 24 }}>
            <Text style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Brandon-Medium", fontSize: 14, letterSpacing: 1, marginBottom: 16 }}>YOUR MONTHLY TARGETS</Text>
            
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 16 }}>
              {kpis.map((kpi, idx) => (
                <View key={idx} style={{ width: "47%", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" }}>
                  <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: kpi.color, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                    {kpi.icon}
                  </View>
                  <Text style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Brandon-Bold", fontSize: 12 }}>{kpi.label}</Text>
                  <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: 4 }}>
                    <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 24 }}>{kpi.value}</Text>
                    <Text style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Brandon-Medium", fontSize: 12, marginLeft: 4 }}>/ {kpi.target}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* PODIUM SECTION */}
          <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
            <Text style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Brandon-Medium", fontSize: 14, letterSpacing: 1, marginBottom: 16 }}>REGIONAL LEADERBOARD</Text>
          </View>

          <View style={{ height: 260, flexDirection: "row", alignItems: "flex-end", justifyContent: "center", paddingHorizontal: 16 }}>
            
            {/* Rank 2 (Left) */}
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ width: 56, height: 56, borderRadius: 28, overflow: "hidden", borderWidth: 3, borderColor: "#ffffff", marginBottom: 8, zIndex: 10 }}>
                <Image source={require("../../assets/images/image14.jpg")} style={{ width: "100%", height: "100%" }} />
              </View>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 12 }}>Lois Parker</Text>
              <View style={{ backgroundColor: "#ffffff", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, marginVertical: 8, zIndex: 10 }}>
                <Text style={{ color: "#ea580c", fontFamily: "Brandon-Bold", fontSize: 10 }}>311 pts</Text>
              </View>
              <View style={{ width: "90%", height: 100, backgroundColor: "#f97316", borderTopLeftRadius: 16, borderTopRightRadius: 16, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 32 }}>2</Text>
              </View>
            </View>

            {/* Rank 1 (Center) */}
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ width: 72, height: 72, borderRadius: 36, overflow: "hidden", borderWidth: 3, borderColor: "#ffffff", marginBottom: 8, zIndex: 10 }}>
                <Image source={require("../../assets/images/image12.jpg")} style={{ width: "100%", height: "100%" }} />
              </View>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 14 }}>Lydia Price</Text>
              <View style={{ backgroundColor: "#ffffff", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, marginVertical: 8, zIndex: 10 }}>
                <Text style={{ color: "#ea580c", fontFamily: "Brandon-Bold", fontSize: 12 }}>413 pts</Text>
              </View>
              <View style={{ width: "95%", height: 140, backgroundColor: "#fb923c", borderTopLeftRadius: 16, borderTopRightRadius: 16, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 40 }}>1</Text>
              </View>
            </View>

            {/* Rank 3 (Right) */}
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ width: 56, height: 56, borderRadius: 28, overflow: "hidden", borderWidth: 3, borderColor: "#ffffff", marginBottom: 8, zIndex: 10 }}>
                <Image source={require("../../assets/images/image15.jpg")} style={{ width: "100%", height: "100%" }} />
              </View>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 12 }}>Mary Clark</Text>
              <View style={{ backgroundColor: "#ffffff", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, marginVertical: 8, zIndex: 10 }}>
                <Text style={{ color: "#ea580c", fontFamily: "Brandon-Bold", fontSize: 10 }}>227 pts</Text>
              </View>
              <View style={{ width: "90%", height: 80, backgroundColor: "#f97316", borderTopLeftRadius: 16, borderTopRightRadius: 16, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 32 }}>3</Text>
              </View>
            </View>

          </View>

          {/* REMAINING LIST SHEET */}
          <View style={{ backgroundColor: "#ffffff", borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, paddingBottom: 100, minHeight: 400 }}>
            {rankings.map((r, i) => (
              <View key={i} style={{ flexDirection: "row", alignItems: "center", paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#f1f5f9" }}>
                <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Bold", fontSize: 16, width: 30 }}>{r.rank}</Text>
                <Image source={r.image} style={{ width: 44, height: 44, borderRadius: 22, marginRight: 16 }} />
                <Text style={{ flex: 1, color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16 }}>{r.name}</Text>
                <Text style={{ color: "#ea580c", fontFamily: "Brandon-Bold", fontSize: 14 }}>{r.pts}</Text>
              </View>
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
