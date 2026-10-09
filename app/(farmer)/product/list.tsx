import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  TextInput
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  Search,
  SlidersHorizontal,
  Star,
  Leaf
} from "lucide-react-native";

export default function MarketplaceScreen() {
  const insets = useSafeAreaInsets();

  const products = [
    { id: "1", name: "Premium Bio-Fertilizer", category: "Nutrition", price: "₹1,200", unit: "5 kg", rating: 4.8, img: require("../../../assets/images/image10.jpg"), color: "#ecfdf5" },
    { id: "2", name: "Pure Neem Extract", category: "Pest Control", price: "₹450", unit: "1 Ltr", rating: 4.9, img: require("../../../assets/images/image6.jpg"), color: "#fffbeb" },
    { id: "3", name: "Vetiver KS-1 Seeds", category: "Seeds", price: "₹850", unit: "Pack", rating: 4.7, img: require("../../../assets/images/image14.jpg"), color: "#eff6ff" },
    { id: "4", name: "Organic Compost", category: "Soil Health", price: "₹600", unit: "10 kg", rating: 4.5, img: require("../../../assets/images/image3.jpg"), color: "#fef2f2" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar barStyle="dark-content" />

      {/* Unique Asymmetrical Header Background */}
      <View style={{ position: "absolute", top: 0, right: 0, width: "70%", height: 300, backgroundColor: "#f0fdf4", borderBottomLeftRadius: 150 }} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 24, paddingTop: Math.max(insets.top, 10), paddingBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace("/(farmer)/dashboard")} style={{ padding: 10, backgroundColor: "#ffffff", borderRadius: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 4 }}>
              <ChevronLeft size={24} color="#0f172a" />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: "#10b981", borderRadius: 16, shadowColor: "#10b981", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 4 }}>
              <Leaf size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 32, lineHeight: 40, marginBottom: 8 }}>
            Organic{"\n"}Marketplace
          </Text>
          <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 15, marginBottom: 24 }}>
            Certified inputs for your farm
          </Text>

          {/* SEARCH & FILTER */}
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 32 }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "#ffffff", borderRadius: 20, paddingHorizontal: 16, height: 56, shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 4, borderWidth: 1, borderColor: "#f1f5f9" }}>
              <Search size={20} color="#94a3b8" />
              <TextInput
                placeholder="Search fertilizers, seeds..."
                placeholderTextColor="#94a3b8"
                style={{ flex: 1, marginLeft: 12, fontFamily: "Brandon-Bold", fontSize: 16, color: "#0f172a" }}
              />
            </View>
            <TouchableOpacity style={{ width: 56, height: 56, backgroundColor: "#0f172a", borderRadius: 20, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 16, elevation: 4 }}>
              <SlidersHorizontal size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}>
          
          {/* CATEGORIES */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 32, marginHorizontal: -24, paddingHorizontal: 24 }}>
            {["All Products", "Nutrition", "Pest Control", "Seeds", "Tools"].map((cat, idx) => (
              <TouchableOpacity key={idx} style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: idx === 0 ? "#10b981" : "#f1f5f9", borderRadius: 999, marginRight: 12 }}>
                <Text style={{ color: idx === 0 ? "#ffffff" : "#64748b", fontFamily: "Brandon-Bold", fontSize: 14 }}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* STAGGERED GRID (MASONRY-STYLE) */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            
            {/* Left Column */}
            <View style={{ width: "48%", gap: 16 }}>
              {products.filter((_, idx) => idx % 2 === 0).map((prod) => (
                <TouchableOpacity key={prod.id} onPress={() => router.push(`/(farmer)/product/${prod.id}`)} style={{ backgroundColor: prod.color, borderRadius: 24, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 12, elevation: 2 }}>
                  <View style={{ width: "100%", height: 140, borderRadius: 16, overflow: "hidden", marginBottom: 12, backgroundColor: "#ffffff" }}>
                    <Image source={prod.img} style={{ width: "100%", height: "100%" }} />
                  </View>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Bold", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>{prod.category}</Text>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16, lineHeight: 22, marginBottom: 12 }}>{prod.name}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View>
                      <Text style={{ color: "#10b981", fontFamily: "Brandon-Bold", fontSize: 18 }}>{prod.price}</Text>
                      <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 11 }}>per {prod.unit}</Text>
                    </View>
                    <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: "#0f172a", alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ color: "#ffffff", fontSize: 20, lineHeight: 22 }}>+</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Right Column (Offset slightly down) */}
            <View style={{ width: "48%", gap: 16, marginTop: 40 }}>
              {products.filter((_, idx) => idx % 2 !== 0).map((prod) => (
                <TouchableOpacity key={prod.id} onPress={() => router.push(`/(farmer)/product/${prod.id}`)} style={{ backgroundColor: prod.color, borderRadius: 24, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 12, elevation: 2 }}>
                  <View style={{ width: "100%", height: 160, borderRadius: 16, overflow: "hidden", marginBottom: 12, backgroundColor: "#ffffff" }}>
                    <Image source={prod.img} style={{ width: "100%", height: "100%" }} />
                  </View>
                  <Text style={{ color: "#64748b", fontFamily: "Brandon-Bold", fontSize: 11, textTransform: "uppercase", marginBottom: 4 }}>{prod.category}</Text>
                  <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 16, lineHeight: 22, marginBottom: 12 }}>{prod.name}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View>
                      <Text style={{ color: "#10b981", fontFamily: "Brandon-Bold", fontSize: 18 }}>{prod.price}</Text>
                      <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 11 }}>per {prod.unit}</Text>
                    </View>
                    <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: "#0f172a", alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ color: "#ffffff", fontSize: 20, lineHeight: 22 }}>+</Text>
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
