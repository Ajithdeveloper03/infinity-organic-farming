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
  ChevronLeft,
  Bell,
  ArrowRight,
  Plus,
  FileText,
} from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";

export default function FarmerDocumentsScreen() {
  const { t, language } = useLanguage();

  const documents = [
    { id: 1, date: "May 24 . 5:43pm", title: "Organic Certificate Q2", desc: "Excellent harvest, the grapes have a rich flavor and aroma", image: require("../../assets/images/image10.jpg") },
    { id: 2, title: "Soil Health Report", date: "May 20 . 2:15pm", desc: "Excellent harvest, the grapes have a rich flavor and aroma", image: require("../../assets/images/image2.jpg") },
    { id: 3, title: "Yield Prediction", date: "May 18 . 9:00am", desc: "Excellent harvest, the grapes have a rich flavor and aroma", image: require("../../assets/images/image14.jpg") },
    { id: 4, title: "NOC Document", date: "May 10 . 4:30pm", desc: "Excellent harvest, the grapes have a rich flavor and aroma", image: require("../../assets/images/image1.jpg") },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#e2ebe6" }}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <SafeAreaView>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 }}>
          <TouchableOpacity onPress={() => router.push("/(farmer)/dashboard")} style={{ padding: 8 }}>
            <ChevronLeft size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 18 }}>Documents & Notes</Text>
          <TouchableOpacity style={{ padding: 8 }}>
            <Bell size={20} color="#000000" />
            <View style={{ position: "absolute", top: 10, right: 10, width: 6, height: 6, borderRadius: 3, backgroundColor: "#ef4444" }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* GREEN HERO CARD */}
        <View style={{ marginHorizontal: 24, backgroundColor: "#065f33", borderRadius: 24, padding: 24, marginBottom: 32, shadowColor: "#065f33", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View>
              <Text style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Brandon-Medium", fontSize: 14, marginBottom: 8 }}>Certifications Status</Text>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 36, letterSpacing: -1 }}>100%</Text>
              <Text style={{ color: "rgba(255,255,255,0.9)", fontFamily: "Brandon-Medium", fontSize: 16, marginTop: 4 }}>Compliant</Text>
            </View>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" }}>
              <FileText size={32} color="#ffffff" />
            </View>
          </View>
          <Text style={{ color: "rgba(255,255,255,0.9)", fontFamily: "Brandon-Medium", fontSize: 13, marginTop: 20 }}>
            Today is a good day to apply for your annual organic renewal.
          </Text>
        </View>

        {/* BOTTOM SHEET FOR NOTES */}
        <View style={{ flex: 1, backgroundColor: "#ffffff", borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 32, minHeight: 500 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 22 }}>Notes</Text>
            <TouchableOpacity style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: "#f1f5f9", alignItems: "center", justifyContent: "center" }}>
              <ArrowRight size={16} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* TIMELINE LIST */}
          <View style={{ gap: 24 }}>
            {documents.map((doc) => (
              <View key={doc.id} style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Image source={doc.image} style={{ width: 72, height: 72, borderRadius: 16, marginRight: 16 }} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 16 }}>{doc.date}</Text>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13, marginTop: 4, lineHeight: 20 }}>
                    {doc.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>

        </View>

      </ScrollView>

      {/* FLOATING ACTION BUTTON */}
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#ffffff", paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}>
        <TouchableOpacity style={{ backgroundColor: "#065f33", borderRadius: 999, paddingVertical: 18, alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
          <Plus size={20} color="#ffffff" />
          <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 16, marginLeft: 8 }}>Add New Note</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
