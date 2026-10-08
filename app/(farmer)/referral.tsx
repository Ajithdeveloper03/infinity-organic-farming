import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  Calendar,
  Zap,
  Clock,
  HeartPulse,
} from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";

export default function FarmerProgressScreen() {
  const { t, language } = useLanguage();

  return (
    <View style={{ flex: 1, backgroundColor: "#fbcfe8" }}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1 }}>
        
        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 }}>
          <TouchableOpacity onPress={() => router.push("/(farmer)/dashboard")} style={{ padding: 8 }}>
            <ChevronLeft size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 18 }}>Progress</Text>
          <TouchableOpacity style={{ padding: 8 }}>
            <Calendar size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* MAIN WHITE CARD */}
        <View style={{ flex: 1, backgroundColor: "#ffffff", borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingHorizontal: 24, paddingTop: 32 }}>
          
          {/* PILL TABS */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, marginBottom: 32 }}>
            <TouchableOpacity style={{ backgroundColor: "#f472b6", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 999 }}>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 13 }}>Overview</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#1f2937", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 999 }}>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 13 }}>Crops</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#1f2937", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 999 }}>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 13 }}>Themes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#1f2937", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 999 }}>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 13 }}>Activity</Text>
            </TouchableOpacity>
          </ScrollView>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
            
            {/* BIG PROGRESS CARD */}
            <View style={{ backgroundColor: "#bbf7d0", borderRadius: 24, padding: 24, flexDirection: "row", marginBottom: 32 }}>
              <View style={{ flex: 1, backgroundColor: "#22c55e", borderRadius: 16, padding: 20, marginRight: 20 }}>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 11, letterSpacing: 1, marginBottom: 4 }}>YIELD TARGET</Text>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 48, lineHeight: 52 }}>75%</Text>
              </View>
              <View style={{ width: "20%" }} /> {/* Represents the lighter portion of the card in Image 2 */}
            </View>

            {/* CROP MASTERY PROGRESS BARS */}
            <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 14, letterSpacing: 1, marginBottom: 20 }}>CROP MASTERY</Text>
            
            <View style={{ gap: 24, marginBottom: 40 }}>
              {/* Green Bar */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 1, height: 32, borderRadius: 16, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#000000", overflow: "hidden", flexDirection: "row" }}>
                  <View style={{ width: "100%", height: "100%", backgroundColor: "#4ade80", borderRadius: 16, borderWidth: 1, borderColor: "#000000" }} />
                </View>
                <View style={{ width: 24, height: 1, backgroundColor: "#000000" }} />
                <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 16, width: 48, textAlign: "right" }}>100%</Text>
              </View>

              {/* Pink Bar */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 1, height: 32, borderRadius: 16, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#000000", overflow: "hidden", flexDirection: "row" }}>
                  <View style={{ width: "80%", height: "100%", backgroundColor: "#f472b6", borderRadius: 16, borderWidth: 1, borderColor: "#000000" }} />
                </View>
                <View style={{ width: 24, height: 1, backgroundColor: "#000000" }} />
                <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 16, width: 48, textAlign: "right" }}>80%</Text>
              </View>

              {/* Yellow Bar */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 1, height: 32, borderRadius: 16, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#000000", overflow: "hidden", flexDirection: "row" }}>
                  <View style={{ width: "60%", height: "100%", backgroundColor: "#fef08a", borderRadius: 16, borderWidth: 1, borderColor: "#000000" }} />
                </View>
                <View style={{ width: 24, height: 1, backgroundColor: "#000000" }} />
                <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 16, width: 48, textAlign: "right" }}>60%</Text>
              </View>
            </View>

            {/* ACTIVITY THIS WEEK */}
            <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 14, letterSpacing: 1, marginBottom: 20 }}>ACTIVITY THIS WEEK</Text>
            
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 32 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Zap size={16} color="#000000" />
                <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 18, marginLeft: 8 }}>7</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Clock size={16} color="#000000" />
                <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 18, marginLeft: 8 }}>5h 23m</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <HeartPulse size={16} color="#000000" />
                <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 18, marginLeft: 8 }}>134 bpm</Text>
              </View>
            </View>

            {/* MOCK VERTICAL BAR CHART */}
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "flex-end", height: 120, gap: 8 }}>
              <View style={{ width: 12, height: "40%", backgroundColor: "#fef08a", borderRadius: 6 }} />
              <View style={{ width: 12, height: "60%", backgroundColor: "#4ade80", borderRadius: 6 }} />
              <View style={{ width: 12, height: "30%", backgroundColor: "#fef08a", borderRadius: 6 }} />
              <View style={{ width: 12, height: "80%", backgroundColor: "#f472b6", borderRadius: 6 }} />
              <View style={{ width: 12, height: "50%", backgroundColor: "#4ade80", borderRadius: 6 }} />
              <View style={{ width: 12, height: "100%", backgroundColor: "#f472b6", borderRadius: 6 }} />
              <View style={{ width: 12, height: "70%", backgroundColor: "#4ade80", borderRadius: 6 }} />
              <View style={{ width: 12, height: "40%", backgroundColor: "#fef08a", borderRadius: 6 }} />
            </View>
            
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
