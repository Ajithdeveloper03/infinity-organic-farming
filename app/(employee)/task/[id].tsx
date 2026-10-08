import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft, CheckCircle2, Clock, MapPin, AlertCircle, Upload, Camera } from "lucide-react-native";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();

  // Mock data for task details based on id
  const task = {
    id,
    title: id === "1" ? "Soil Analysis" : "Meet Farmer Muthu",
    farm: id === "1" ? "Farm A - South Block" : "Muthuvel's Organic Farm",
    status: id === "1" ? "In Progress" : "Pending",
    due: id === "1" ? "2 hours" : "Today at 4 PM",
    description: id === "1" 
      ? "Collect 5 soil samples from the south block. Test for pH, moisture, and nitrogen levels. Upload the results immediately."
      : "Discuss the new irrigation schedule and review the recent crop health report with Muthuvel.",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf2f8" }}>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, backgroundColor: "#ffffff", borderRadius: 999, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
            <ChevronLeft size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 18 }}>Task Details</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, paddingBottom: 120 }}>
          
          {/* TITLE CARD */}
          <View style={{ backgroundColor: "#ffffff", borderRadius: 24, padding: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 4, marginBottom: 24 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
              <View style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backgroundColor: task.status === "In Progress" ? "#dcfce7" : "#fef3c7" }}>
                <Text style={{ color: task.status === "In Progress" ? "#16a34a" : "#d97706", fontFamily: "Brandon-Bold", fontSize: 11 }}>{task.status}</Text>
              </View>
              <View style={{ flex: 1 }} />
              <Clock size={16} color="#ef4444" />
              <Text style={{ color: "#ef4444", fontFamily: "Brandon-Bold", fontSize: 13, marginLeft: 4 }}>Due in {task.due}</Text>
            </View>

            <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 24, marginBottom: 8 }}>{task.title}</Text>
            
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
              <MapPin size={16} color="#64748b" />
              <Text style={{ color: "#475569", fontFamily: "Brandon-Medium", fontSize: 15, marginLeft: 6 }}>{task.farm}</Text>
            </View>
          </View>

          {/* DESCRIPTION */}
          <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 15, letterSpacing: 1, marginBottom: 12 }}>INSTRUCTIONS</Text>
          <View style={{ backgroundColor: "#ffffff", borderRadius: 24, padding: 24, marginBottom: 24 }}>
            <Text style={{ color: "#475569", fontFamily: "Brandon-Medium", fontSize: 16, lineHeight: 24 }}>
              {task.description}
            </Text>
          </View>

          {/* ACTIONS */}
          <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 15, letterSpacing: 1, marginBottom: 12 }}>EVIDENCE / ACTIONS</Text>
          <View style={{ flexDirection: "row", gap: 16, marginBottom: 24 }}>
            <TouchableOpacity style={{ flex: 1, backgroundColor: "#ffffff", borderRadius: 24, padding: 20, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#e2e8f0", borderStyle: "dashed" }}>
              <Camera size={32} color="#94a3b8" style={{ marginBottom: 8 }} />
              <Text style={{ color: "#475569", fontFamily: "Brandon-Bold", fontSize: 13 }}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ flex: 1, backgroundColor: "#ffffff", borderRadius: 24, padding: 20, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#e2e8f0", borderStyle: "dashed" }}>
              <Upload size={32} color="#94a3b8" style={{ marginBottom: 8 }} />
              <Text style={{ color: "#475569", fontFamily: "Brandon-Bold", fontSize: 13 }}>Upload File</Text>
            </TouchableOpacity>
          </View>

          {/* COMPLETE BUTTON */}
          <TouchableOpacity style={{ width: "100%", backgroundColor: "#15803d", borderRadius: 999, paddingVertical: 20, alignItems: "center", flexDirection: "row", justifyContent: "center", shadowColor: "#15803d", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 }}>
            <CheckCircle2 size={20} color="#ffffff" style={{ marginRight: 8 }} />
            <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 16 }}>Mark as Completed</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
