import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  Search,
  MapPin,
  Sprout,
  Users,
  Phone,
  MoreVertical,
} from "lucide-react-native";

export default function EmployeeMyFarmersScreen() {
  const farmers = [
    { id: 1, name: "Kuppusamy M.", location: "Delta Zone A", acres: "12 Acres", crop: "Paddy", image: require("../../assets/images/image1.jpg"), status: "Healthy" },
    { id: 2, name: "Rajesh Kumar", location: "River Side Farm", acres: "8 Acres", crop: "Sugarcane", image: require("../../assets/images/image2.jpg"), status: "Needs Attention" },
    { id: 3, name: "Senthil N.", location: "North Hills", acres: "5 Acres", crop: "Cotton", image: require("../../assets/images/image10.jpg"), status: "Healthy" },
    { id: 4, name: "Muthuvel", location: "East Valley", acres: "15 Acres", crop: "Groundnut", image: require("../../assets/images/image6.jpg"), status: "Harvesting" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#f8faf9" }}>
      <StatusBar barStyle="dark-content" />

      {/* TOP ILLUSTRATION / HERO */}
      <View style={{ height: 280, width: "100%", backgroundColor: "#e2e8f0" }}>
        <ImageBackground
          source={require("../../assets/images/image14.jpg")} // Farm field image
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <View style={{ flex: 1, backgroundColor: "rgba(21,128,61,0.7)" }}>
            <SafeAreaView>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16 }}>
                <TouchableOpacity
                  onPress={() => router.canGoBack() ? router.back() : router.replace("/(employee)/dashboard")}
                  style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}
                >
                  <ChevronLeft size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 18 }}>Farmer Management</Text>
                <TouchableOpacity
                  style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" }}
                >
                  <Users size={20} color="#ffffff" />
                </TouchableOpacity>
              </View>

              <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
                <Text style={{ color: "rgba(255,255,255,0.8)", fontFamily: "Brandon-Medium", fontSize: 14, letterSpacing: 1, marginBottom: 4 }}>TOTAL FARMERS ASSIGNED</Text>
                <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 48, lineHeight: 54 }}>124</Text>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
      </View>

      {/* SEARCH BAR LAYERED OVER EDGE */}
      <View style={{ paddingHorizontal: 24, marginTop: -28, zIndex: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", borderRadius: 16, paddingHorizontal: 16, height: 56, shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 16, elevation: 8 }}>
          <Search size={20} color="#94a3b8" />
          <TextInput 
            placeholder="Search farmers or zones..."
            placeholderTextColor="#94a3b8"
            style={{ flex: 1, marginLeft: 12, fontFamily: "Brandon-Medium", fontSize: 16, color: "#0f172a" }}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 120 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 18 }}>Assigned Portfolio</Text>
        </View>

        <View style={{ gap: 16 }}>
          {farmers.map((farmer) => (
            <TouchableOpacity key={farmer.id} activeOpacity={0.8} style={{ backgroundColor: "#ffffff", borderRadius: 24, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 4 }}>
              <View style={{ flexDirection: "row" }}>
                {/* AVATAR */}
                <Image source={farmer.image} style={{ width: 64, height: 64, borderRadius: 20, marginRight: 16 }} />
                
                {/* INFO */}
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 18 }}>{farmer.name}</Text>
                    <TouchableOpacity>
                      <MoreVertical size={20} color="#94a3b8" />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                    <MapPin size={12} color="#64748b" />
                    <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13, marginLeft: 4 }}>{farmer.location}</Text>
                  </View>
                </View>
              </View>

              <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 16 }} />

              {/* STATS & ACTIONS */}
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f0fdf4", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
                    <Sprout size={14} color="#16a34a" />
                    <Text style={{ color: "#16a34a", fontFamily: "Brandon-Bold", fontSize: 12, marginLeft: 4 }}>{farmer.crop}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f1f5f9", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
                    <Text style={{ color: "#475569", fontFamily: "Brandon-Bold", fontSize: 12 }}>{farmer.acres}</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: "#15803d", alignItems: "center", justifyContent: "center" }}>
                  <Phone size={16} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

    </View>
  );
}
