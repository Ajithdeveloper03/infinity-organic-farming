import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  Bell,
  ThermometerSun,
  Droplets,
  Wind,
  CloudRain,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
} from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";

export default function FarmerRecommendationsScreen() {
  const { t, language } = useLanguage();

  const commodities = [
    { id: 1, name: "Rice", image: require("../../assets/images/image1.jpg") },
    { id: 2, name: "Corn", image: require("../../assets/images/image2.jpg") },
    { id: 3, name: "Grapes", image: require("../../assets/images/image5.jpg") },
    { id: 4, name: "Potato", image: require("../../assets/images/image6.jpg") },
  ];

  const tasks = [
    { id: 1, title: "Morning Field Inspection", desc: "Assess crop health, identify issues.", time: "Today, 10 AM", priority: "High Priority", image: require("../../assets/images/image10.jpg") },
    { id: 2, title: "Soil Moisture Monitoring", desc: "Check current water levels in sector B.", time: "Today, 2 PM", priority: "Normal", image: require("../../assets/images/image14.jpg") },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#0f0f0f" }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        
        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16 }}>
          <View>
            <Text style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Brandon-Medium", fontSize: 16 }}>
              {language === "ta" ? "வணக்கம்" : "Hello"}, <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold" }}>Kuppusamy</Text>
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#fbbf24", marginRight: 6 }} />
              <Text style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Brandon-Medium", fontSize: 12 }}>Central Valley</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" }}
            onPress={() => router.push("/(farmer)/dashboard")}
          >
            <Bell size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* BIG WEATHER WIDGET */}
          <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 56, letterSpacing: -2, lineHeight: 60 }}>32°</Text>
              <View style={{ marginLeft: 16 }}>
                <ThermometerSun size={32} color="#fbbf24" />
                <Text style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Brandon-Medium", fontSize: 12, marginTop: 4 }}>Sonoma County</Text>
              </View>
            </View>

            {/* Weather 4-Grid */}
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
              <View style={{ width: "47%", flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 100, padding: 8 }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                  <ThermometerSun size={18} color="#000000" />
                </View>
                <View>
                  <Text style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Brandon-Medium", fontSize: 11 }}>Soil temp</Text>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 13 }}>+23 C</Text>
                </View>
              </View>

              <View style={{ width: "47%", flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 100, padding: 8 }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                  <Droplets size={18} color="#000000" />
                </View>
                <View>
                  <Text style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Brandon-Medium", fontSize: 11 }}>Humidity</Text>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 13 }}>78%</Text>
                </View>
              </View>

              <View style={{ width: "47%", flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 100, padding: 8 }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                  <Wind size={18} color="#000000" />
                </View>
                <View>
                  <Text style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Brandon-Medium", fontSize: 11 }}>Wind</Text>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 13 }}>7 m/s</Text>
                </View>
              </View>

              <View style={{ width: "47%", flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 100, padding: 8 }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                  <CloudRain size={18} color="#000000" />
                </View>
                <View>
                  <Text style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Brandon-Medium", fontSize: 11 }}>Precipitation</Text>
                  <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 13 }}>0 mm</Text>
                </View>
              </View>
            </View>
          </View>

          {/* COMMODITIES & FOOD HORIZONTAL SCROLL */}
          <View style={{ marginTop: 40 }}>
            <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 18, paddingHorizontal: 24, marginBottom: 16 }}>
              Commodities & Food
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 20 }}>
              {commodities.map((item) => (
                <View key={item.id} style={{ alignItems: "center" }}>
                  <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: "rgba(255,255,255,0.05)", alignItems: "center", justifyContent: "center", marginBottom: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" }}>
                    <Image source={item.image} style={{ width: 40, height: 40, borderRadius: 20 }} />
                  </View>
                  <Text style={{ color: "rgba(255,255,255,0.7)", fontFamily: "Brandon-Medium", fontSize: 12 }}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* FARMER'S TASKS */}
          <View style={{ paddingHorizontal: 24, marginTop: 40 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 22 }}>Farmer's Tasks</Text>
              <Text style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Brandon-Medium", fontSize: 13 }}>Today ▼</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
              <View style={{ backgroundColor: "#ffffff", paddingHorizontal: 20, paddingVertical: 8, borderRadius: 999 }}>
                <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 13 }}>Today Task</Text>
              </View>
              <View style={{ backgroundColor: "rgba(255,255,255,0.1)", paddingHorizontal: 20, paddingVertical: 8, borderRadius: 999 }}>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Medium", fontSize: 13 }}>Team</Text>
              </View>
              <View style={{ backgroundColor: "rgba(255,255,255,0.1)", paddingHorizontal: 20, paddingVertical: 8, borderRadius: 999 }}>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Medium", fontSize: 13 }}>Programs</Text>
              </View>
            </View>

            <View style={{ gap: 20 }}>
              {tasks.map((task) => (
                <TouchableOpacity 
                  key={task.id}
                  activeOpacity={0.9}
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 24, padding: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                        <CheckCircle2 size={20} color="#000000" />
                      </View>
                      <View>
                        <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 16 }}>{task.title}</Text>
                        <Text style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Brandon-Medium", fontSize: 12, marginTop: 2 }}>{task.desc}</Text>
                      </View>
                    </View>
                    <MoreVertical size={20} color="rgba(255,255,255,0.5)" />
                  </View>
                  
                  <Image source={task.image} style={{ width: "100%", height: 140, borderRadius: 16, marginBottom: 16 }} />
                  
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)", paddingTop: 16 }}>
                    <View>
                      <Text style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Brandon-Medium", fontSize: 11 }}>Important Deadlin</Text>
                      <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 13, marginTop: 2 }}>{task.time}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Brandon-Medium", fontSize: 11 }}>Scheduled</Text>
                      <Text style={{ color: "#fbbf24", fontFamily: "Brandon-Bold", fontSize: 13, marginTop: 2 }}>{task.priority}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
