import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  Menu,
  Bell,
  Search,
  Heart,
  ShoppingBag,
} from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";

export default function FarmerOrdersScreen() {
  const { t, language } = useLanguage();

  const products = [
    { id: 1, title: "Organic Seeds", price: "$15.00", badge: "50%", image: require("../../assets/images/image10.jpg") },
    { id: 2, title: "Bio Fertilizer", price: "$24.00", badge: "New", image: require("../../assets/images/image14.jpg") },
    { id: 3, title: "Lime Sapling", price: "$30.00", badge: "", image: require("../../assets/images/image6.jpg") },
    { id: 4, title: "Neem Oil", price: "$12.00", badge: "Hot", image: require("../../assets/images/image2.jpg") },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#f8faf9" }}>
      <StatusBar barStyle="dark-content" />

      {/* Subtle dotted background pattern */}
      <View style={{ ...StyleSheet.absoluteFill as any, opacity: 0.03, zIndex: 0 }}>
        {/* Placeholder for dotted SVG, using a solid color for now */}
      </View>

      <SafeAreaView style={{ flex: 1, zIndex: 10 }}>
        
        {/* HEADER */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16 }}>
          <TouchableOpacity style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
            <Menu size={20} color="#0f172a" />
          </TouchableOpacity>
          
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center", marginRight: -12, zIndex: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
              <Bell size={20} color="#0f172a" />
              <View style={{ position: "absolute", top: 12, right: 14, width: 8, height: 8, borderRadius: 4, backgroundColor: "#0f172a", borderWidth: 2, borderColor: "#ffffff" }} />
            </TouchableOpacity>
            <View style={{ width: 48, height: 48, borderRadius: 24, overflow: "hidden", borderWidth: 2, borderColor: "#ffffff" }}>
              <Image source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" }} style={{ width: "100%", height: "100%" }} />
            </View>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          
          {/* BIG TYPOGRAPHY */}
          <View style={{ paddingHorizontal: 24, marginTop: 32, marginBottom: 24 }}>
            <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 40, lineHeight: 46 }}>
              {language === "ta" ? "இயற்கை\nவிவசாயம்" : "Start Your Nature\nBalance to Naturally"}
            </Text>
          </View>

          {/* SEARCH BAR */}
          <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 12, elevation: 3 }}>
              <View style={{ paddingHorizontal: 16 }}>
                <Search size={20} color="#94a3b8" />
              </View>
              <TextInput
                placeholder="Let's Go Find Essentials..."
                placeholderTextColor="#94a3b8"
                style={{ flex: 1, fontFamily: "Brandon-Medium", fontSize: 16, color: "#0f172a" }}
              />
              <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "#000000", alignItems: "center", justifyContent: "center" }}>
                <Menu size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* PILL FILTERS */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, gap: 12, marginBottom: 32 }}>
            <TouchableOpacity style={{ backgroundColor: "#000000", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 999 }}>
              <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 14 }}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#ffffff", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 999, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 }}>
              <Text style={{ color: "#64748b", fontFamily: "Brandon-Bold", fontSize: 14 }}>Seeds</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#ffffff", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 999, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 }}>
              <Text style={{ color: "#64748b", fontFamily: "Brandon-Bold", fontSize: 14 }}>Fertilizers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: "#ffffff", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 999, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 }}>
              <Text style={{ color: "#64748b", fontFamily: "Brandon-Bold", fontSize: 14 }}>Tools</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* PRODUCT GRID */}
          <View style={{ paddingHorizontal: 24 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 18 }}>Popular Product</Text>
              <Text style={{ color: "#94a3b8", fontFamily: "Brandon-Medium", fontSize: 14 }}>See all</Text>
            </View>

            <View style={{ gap: 20 }}>
              {products.map((item) => (
                <View key={item.id} style={{ height: 240, borderRadius: 32, overflow: "hidden", backgroundColor: "#f1f5f9" }}>
                  <Image source={item.image} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                  
                  {/* Floating Top Elements */}
                  <View style={{ position: "absolute", top: 16, left: 16, right: 16, flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.2)", borderWidth: 1, borderColor: "rgba(255,255,255,0.4)", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }}>
                      <Heart size={20} color="#ffffff" />
                    </TouchableOpacity>
                    {item.badge ? (
                      <View style={{ backgroundColor: "rgba(255,255,255,0.2)", borderWidth: 1, borderColor: "rgba(255,255,255,0.4)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, backdropFilter: "blur(10px)", alignSelf: "flex-start" }}>
                        <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 11 }}>{item.badge}</Text>
                      </View>
                    ) : null}
                  </View>

                  {/* Floating Bottom Info */}
                  <View style={{ position: "absolute", bottom: 16, left: 16, right: 16, backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 24, padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backdropFilter: "blur(10px)", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" }}>
                    <View>
                      <Text style={{ color: "#ffffff", fontFamily: "Brandon-Medium", fontSize: 14, marginBottom: 4 }}>{item.title}</Text>
                      <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 20 }}>{item.price}</Text>
                    </View>
                    <TouchableOpacity style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.15)", borderWidth: 1, borderColor: "rgba(255,255,255,0.3)", alignItems: "center", justifyContent: "center" }}>
                      <ShoppingBag size={20} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
          
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
