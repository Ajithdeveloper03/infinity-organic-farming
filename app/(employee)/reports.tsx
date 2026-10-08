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
import {
  ChevronLeft,
  FileText,
  Download,
  Search,
  Filter,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function EmployeeReportsScreen() {
  const documents = [
    { id: "1", title: "Soil Analysis - Farm A", date: "Oct 8, 2026", size: "2.4 MB", type: "PDF", status: "Approved" },
    { id: "2", title: "Monthly Yield Forecast", date: "Oct 5, 2026", size: "1.1 MB", type: "DOCX", status: "Pending" },
    { id: "3", title: "Pesticide Usage Log", date: "Sep 28, 2026", size: "4.8 MB", type: "XLSX", status: "Approved" },
    { id: "4", title: "Muthuvel Farm Inspection", date: "Sep 15, 2026", size: "3.2 MB", type: "PDF", status: "Rejected" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#062214" }}>
      <StatusBar barStyle="light-content" />

      {/* BACKGROUND HEADER */}
      <View style={{ height: 320, width: "100%" }}>
        <ImageBackground
          source={require("../../assets/images/image10.jpg")} // Use a rich green/nature image
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(6, 34, 20, 0.4)", "rgba(6, 34, 20, 0.8)", "#f8faf9"]}
            locations={[0, 0.6, 1]}
            style={StyleSheet.absoluteFill}
          />
          <SafeAreaView style={{ flex: 1 }}>
            {/* HEADER CONTROLS */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16 }}>
              <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace("/(employee)/dashboard")} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }}>
                <ChevronLeft size={24} color="#ffffff" />
              </TouchableOpacity>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 18 }}>Documents</Text>
              <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }}>
                <Search size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* HERO TEXT */}
            <View style={{ paddingHorizontal: 24, marginTop: 40 }}>
              <Text style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Brandon-Medium", fontSize: 16, marginBottom: 8, letterSpacing: 1 }}>RECORDS & LOGS</Text>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 36, lineHeight: 42 }}>
                Manage Your{"\n"}Field Documents
              </Text>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>

      {/* BOTTOM SHEET CONTENT */}
      <View style={{ flex: 1, backgroundColor: "#f8faf9", marginTop: -20, borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 24, paddingTop: 32 }}>
        
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 18 }}>Recent Files</Text>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#e2e8f0", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 }}>
            <Filter size={14} color="#475569" style={{ marginRight: 4 }} />
            <Text style={{ color: "#475569", fontFamily: "Brandon-Bold", fontSize: 12 }}>Filter</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          <View style={{ gap: 16 }}>
            {documents.map((doc) => (
              <TouchableOpacity key={doc.id} style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", padding: 16, borderRadius: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 4 }}>
                {/* ICON */}
                <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: doc.type === "PDF" ? "#fee2e2" : doc.type === "DOCX" ? "#e0f2fe" : "#dcfce7", alignItems: "center", justifyContent: "center", marginRight: 16 }}>
                  <FileText size={24} color={doc.type === "PDF" ? "#ef4444" : doc.type === "DOCX" ? "#0ea5e9" : "#22c55e"} />
                </View>
                
                {/* DETAILS */}
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 16, marginBottom: 4 }} numberOfLines={1}>{doc.title}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 12 }}>{doc.date} • {doc.size}</Text>
                  </View>
                </View>

                {/* ACTION/STATUS */}
                <View style={{ alignItems: "flex-end" }}>
                  <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, backgroundColor: doc.status === "Approved" ? "#dcfce7" : doc.status === "Pending" ? "#fef3c7" : "#fee2e2", marginBottom: 8 }}>
                    <Text style={{ color: doc.status === "Approved" ? "#16a34a" : doc.status === "Pending" ? "#d97706" : "#ef4444", fontFamily: "Brandon-Bold", fontSize: 10 }}>{doc.status}</Text>
                  </View>
                  <TouchableOpacity>
                    <Download size={18} color="#94a3b8" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
