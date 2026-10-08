import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  ChevronLeft,
  MoreVertical,
  Maximize,
  Droplets,
  Leaf,
  Scan,
  Check,
} from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";

export default function FarmerHistoryScreen() {
  const { t, language } = useLanguage();

  const activities = [
    { id: 1, title: "Irrigation Completed", subtitle: "North Field • May 29, 8:30 AM", status: "Completed", type: "irrigation" },
    { id: 2, title: "Fertilizer Application", subtitle: "North Field • May 28, 2:15 PM", status: "Completed", type: "fertilizer" },
    { id: 3, title: "Drone Scouting", subtitle: "North Field • May 28, 9:45 AM", status: "Completed", type: "drone" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#062214" }}>
      <StatusBar barStyle="light-content" />

      {/* HEADER OVER MAP */}
      <SafeAreaView style={{ zIndex: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16 }}>
          <TouchableOpacity onPress={() => router.push("/(farmer)/dashboard")} style={{ padding: 8 }}>
            <ChevronLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 18 }}>North Field</Text>
            <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Brandon-Medium", fontSize: 12 }}>Corn • 32 ha</Text>
          </View>
          <TouchableOpacity style={{ padding: 8 }}>
            <MoreVertical size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* TOP MAP SECTION (Image 2 right panel concept) */}
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: 400 }}>
        <ImageBackground
          source={require("../../assets/images/image1.jpg")} // Use a drone view field image
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        >
          {/* Fading gradient to blend into the list */}
          <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 150, backgroundColor: "#062214", opacity: 0.8 }} />
        </ImageBackground>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 300, paddingBottom: 100 }}
      >
        <View style={{ backgroundColor: "#062214", borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 24, paddingTop: 32, minHeight: 600 }}>
          
          {/* Heatmap Mini Nav */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 32 }}>
            <TouchableOpacity style={{ alignItems: "center", gap: 8 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" }}>
                <Maximize size={20} color="#ffffff" />
              </View>
              <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Brandon-Medium", fontSize: 12 }}>Overview</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ alignItems: "center", gap: 8 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" }}>
                <Droplets size={20} color="#ffffff" />
              </View>
              <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Brandon-Medium", fontSize: 12 }}>Irrigation</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ alignItems: "center", gap: 8 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" }}>
                <Scan size={20} color="#ffffff" />
              </View>
              <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Brandon-Medium", fontSize: 12 }}>Scouting</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ alignItems: "center", gap: 8 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" }}>
                <Check size={20} color="#ffffff" />
              </View>
              <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Brandon-Medium", fontSize: 12 }}>Task</Text>
            </TouchableOpacity>
          </View>

          {/* RECENT ACTIVITY LIST (RECORDS) */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 18 }}>Recent Activity</Text>
            <Text style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Brandon-Bold", fontSize: 13 }}>View All</Text>
          </View>

          <View style={{ gap: 16 }}>
            {activities.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                style={{ flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.05)", padding: 16, borderRadius: 24, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" }}
              >
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: item.type === "irrigation" ? "#3b82f6" : item.type === "fertilizer" ? "#10b981" : "#f59e0b", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                  {item.type === "irrigation" ? <Droplets size={20} color="#ffffff" /> : item.type === "fertilizer" ? <Leaf size={20} color="#ffffff" /> : <Scan size={20} color="#ffffff" />}
                </View>
                
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 15, marginBottom: 4 }}>{item.title}</Text>
                  <Text style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Brandon-Medium", fontSize: 12 }}>{item.subtitle}</Text>
                </View>

                <View style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1, borderColor: "#059669" }}>
                  <Text style={{ color: "#059669", fontFamily: "Brandon-Bold", fontSize: 11 }}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
}
