import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Dimensions
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Bell,
  MapPin,
  UserPlus,
  CalendarDays,
  FileText,
  ClipboardCheck,
  Users,
  CheckCircle2,
  Navigation,
  LogOut,
  Camera,
  History,
  ShieldCheck,
  ArrowRight
} from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function EmployeeDashboardScreen() {
  const insets = useSafeAreaInsets();
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [userName, setUserName] = useState("Field Officer");

  useEffect(() => {
    (async () => {
      const status = await AsyncStorage.getItem("isClockedIn");
      const name = await AsyncStorage.getItem("userName");
      if (status === "true") setIsClockedIn(true);
      if (name) setUserName(name);
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#020617" }}>
      <StatusBar barStyle="light-content" />

      {/* FULL-SCREEN CINEMATIC DRONE MAP BACKGROUND */}
      <ImageBackground
        source={require("../../assets/images/image12.jpg")}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      >
        {/* Heavy Dark Gradient Overlay for maximum text contrast */}
        <LinearGradient
          colors={["rgba(2, 6, 23, 0.7)", "rgba(2, 6, 23, 0.9)", "#020617"]}
          style={StyleSheet.absoluteFill}
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150, paddingTop: Math.max(insets.top, 20) + 10 }}>
          
          {/* HEADER PROFILE */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, marginBottom: 32 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => router.push("/(employee)/profile")} style={{ width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: "#38bdf8", padding: 2, marginRight: 16 }}>
                <Image source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" }} style={{ width: "100%", height: "100%", borderRadius: 28 }} />
                <View style={{ position: "absolute", bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, backgroundColor: isClockedIn ? "#4ade80" : "#f87171", borderWidth: 2, borderColor: "#020617" }} />
              </TouchableOpacity>
              <View>
                <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 13, letterSpacing: 1, marginBottom: 2 }}>WELCOME BACK</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#f8fafc", fontFamily: "Brandon-Bold", fontSize: 22 }}>{userName}</Text>
                  <ShieldCheck size={18} color="#38bdf8" style={{ marginLeft: 6 }} />
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={() => router.push("/(employee)/notifications")} style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" }}>
              <Bell size={22} color="#f8fafc" />
              <View style={{ position: "absolute", top: 12, right: 12, width: 10, height: 10, borderRadius: 5, backgroundColor: "#ef4444", borderWidth: 2, borderColor: "rgba(255,255,255,0.2)" }} />
            </TouchableOpacity>
          </View>

          {/* DUTY STATUS & METRICS BOARD */}
          <View style={{ marginHorizontal: 24, backgroundColor: "rgba(30, 41, 59, 0.7)", borderRadius: 32, padding: 24, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", marginBottom: 32, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <View>
                <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Bold", fontSize: 12, letterSpacing: 1, marginBottom: 4 }}>STATUS</Text>
                <Text style={{ color: isClockedIn ? "#4ade80" : "#f87171", fontFamily: "Brandon-Bold", fontSize: 28 }}>{isClockedIn ? "ON DUTY" : "OFF DUTY"}</Text>
              </View>
              <TouchableOpacity 
                onPress={() => router.push(isClockedIn ? "/(employee)/attendance/clock-out" : "/(employee)/attendance/clock-in")}
                style={{ backgroundColor: isClockedIn ? "rgba(239,68,68,0.2)" : "rgba(74,222,128,0.2)", paddingHorizontal: 20, paddingVertical: 12, borderRadius: 999, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: isClockedIn ? "rgba(239,68,68,0.4)" : "rgba(74,222,128,0.4)" }}
              >
                {isClockedIn ? <LogOut size={18} color="#fca5a5" /> : <CheckCircle2 size={18} color="#4ade80" />}
                <Text style={{ color: isClockedIn ? "#fca5a5" : "#4ade80", fontFamily: "Brandon-Bold", fontSize: 15, marginLeft: 8 }}>
                  {isClockedIn ? "Clock Out" : "Clock In"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 20, padding: 20 }}>
              <View style={{ flex: 1, alignItems: "center", borderRightWidth: 1, borderRightColor: "rgba(255,255,255,0.1)" }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                  <Users size={16} color="#94a3b8" style={{ marginRight: 6 }} />
                  <Text style={{ color: "#f8fafc", fontFamily: "Brandon-Bold", fontSize: 24 }}>12</Text>
                </View>
                <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 12 }}>Assigned</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center", borderRightWidth: 1, borderRightColor: "rgba(255,255,255,0.1)" }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                  <CheckCircle2 size={16} color="#4ade80" style={{ marginRight: 6 }} />
                  <Text style={{ color: "#4ade80", fontFamily: "Brandon-Bold", fontSize: 24 }}>4</Text>
                </View>
                <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 12 }}>Visited</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                  <MapPin size={16} color="#fca5a5" style={{ marginRight: 6 }} />
                  <Text style={{ color: "#fca5a5", fontFamily: "Brandon-Bold", fontSize: 24 }}>8</Text>
                </View>
                <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 12 }}>Pending</Text>
              </View>
            </View>
          </View>

          {/* QUICK ACTIONS ROW */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 24, marginBottom: 32 }}>
            <TouchableOpacity onPress={() => router.push("/(employee)/register-farmer")} style={{ flex: 1, backgroundColor: "rgba(2,132,199,0.2)", borderRadius: 24, padding: 16, alignItems: "center", borderWidth: 1, borderColor: "rgba(2,132,199,0.5)", marginRight: 6 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(2,132,199,0.4)", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <UserPlus size={24} color="#7dd3fc" />
              </View>
              <Text style={{ color: "#f8fafc", fontFamily: "Brandon-Bold", fontSize: 13, textAlign: "center" }}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(employee)/my-farmers")} style={{ flex: 1, backgroundColor: "rgba(22,163,74,0.2)", borderRadius: 24, padding: 16, alignItems: "center", borderWidth: 1, borderColor: "rgba(22,163,74,0.5)", marginHorizontal: 6 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(22,163,74,0.4)", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <Users size={24} color="#86efac" />
              </View>
              <Text style={{ color: "#f8fafc", fontFamily: "Brandon-Bold", fontSize: 13, textAlign: "center" }}>Farmers</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(employee)/report/select-method")} style={{ flex: 1, backgroundColor: "rgba(202,138,4,0.2)", borderRadius: 24, padding: 16, alignItems: "center", borderWidth: 1, borderColor: "rgba(202,138,4,0.5)", marginLeft: 6 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(202,138,4,0.4)", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <FileText size={24} color="#fde047" />
              </View>
              <Text style={{ color: "#f8fafc", fontFamily: "Brandon-Bold", fontSize: 13, textAlign: "center" }}>Reports</Text>
            </TouchableOpacity>
          </View>

          {/* TODAY'S VISITS COMPONENT */}
          <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <Text style={{ color: "#f8fafc", fontFamily: "Brandon-Bold", fontSize: 20 }}>Today's Field Visits</Text>
              <TouchableOpacity onPress={() => router.push("/(employee)/map")}>
                <Text style={{ color: "#38bdf8", fontFamily: "Brandon-Bold", fontSize: 13, textTransform: "uppercase" }}>View Map</Text>
              </TouchableOpacity>
            </View>

            <View style={{ gap: 16 }}>
              {/* Active Visit */}
              <TouchableOpacity onPress={() => router.push("/(employee)/visit/1")} activeOpacity={0.8} style={{ backgroundColor: "rgba(30, 41, 59, 0.8)", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "rgba(56, 189, 248, 0.4)" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                      <Text style={{ color: "#f8fafc", fontFamily: "Brandon-Bold", fontSize: 20 }}>Ramesh Kumar</Text>
                      <View style={{ backgroundColor: "rgba(239,68,68,0.2)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginLeft: 12 }}>
                        <Text style={{ color: "#fca5a5", fontFamily: "Brandon-Bold", fontSize: 10 }}>PRIORITY</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <MapPin size={14} color="#94a3b8" />
                      <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 14, marginLeft: 6 }}>Annur North (12km away)</Text>
                    </View>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={{ color: "#38bdf8", fontFamily: "Brandon-Bold", fontSize: 16 }}>11:30 AM</Text>
                    <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 12 }}>Scheduled</Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 12 }}>
                  <TouchableOpacity onPress={() => router.push("/(employee)/visit/tracking")} style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Navigation size={18} color="#f8fafc" style={{ marginRight: 8 }} />
                    <Text style={{ color: "#f8fafc", fontFamily: "Brandon-Bold", fontSize: 15 }}>Navigate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => router.push("/(employee)/visit/check-in")} style={{ flex: 1, backgroundColor: "#10b981", borderRadius: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Camera size={18} color="#ffffff" style={{ marginRight: 8 }} />
                    <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 15 }}>Check-in</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* MODULE GRID (MANAGEMENT TOOLS) */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ color: "#f8fafc", fontFamily: "Brandon-Bold", fontSize: 20, marginBottom: 20 }}>Management Tools</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
              {[
                { title: "Task List", icon: ClipboardCheck, color: "#a78bfa", route: "/(employee)/tasks" },
                { title: "Work Calendar", icon: CalendarDays, color: "#f472b6", route: "/(employee)/calendar" },
                { title: "Attendance", icon: CheckCircle2, color: "#34d399", route: "/(employee)/attendance-hub" },
                { title: "Farmer DB", icon: Users, color: "#60a5fa", route: "/(employee)/my-farmers" },
                { title: "Registration", icon: UserPlus, color: "#fbbf24", route: "/(employee)/register-farmer/step1" },
                { title: "Itinerary", icon: MapPin, color: "#38bdf8", route: "/(employee)/visits" },
                { title: "History", icon: History, color: "#94a3b8", route: "/(employee)/visit-history" },
                { title: "Reports", icon: FileText, color: "#2dd4bf", route: "/(employee)/reports" },
              ].map((tool, index) => (
                <TouchableOpacity onPress={() => router.push(tool.route as any)} key={index} style={{ width: "48%", backgroundColor: "rgba(30, 41, 59, 0.6)", borderRadius: 24, padding: 16, marginBottom: 16, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.05)" }}>
                  <View style={{ width: 44, height: 44, borderRadius: 16, backgroundColor: "rgba(0,0,0,0.3)", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                    <tool.icon size={22} color={tool.color} />
                  </View>
                  <Text style={{ color: "#f8fafc", fontFamily: "Brandon-Bold", fontSize: 14, flex: 1 }}>{tool.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </ScrollView>
      </ImageBackground>
    </View>
  );
}
