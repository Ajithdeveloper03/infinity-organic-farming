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
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import {
  ChevronLeft,
  Bell,
  Minus,
  Plus,
  Star,
} from "lucide-react-native";
import { useLanguage } from "../../../context/LanguageContext";

export default function FarmerProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { t, language } = useLanguage();

  return (
    <View style={{ flex: 1, backgroundColor: "#e8f2ec" }}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <SafeAreaView>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 16 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center" }}
          >
            <ChevronLeft size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={{ color: "#000000", fontFamily: "Brandon-Bold", fontSize: 18 }}>Farm Details</Text>
          <TouchableOpacity
            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "#ffffff", alignItems: "center", justifyContent: "center" }}
          >
            <Bell size={20} color="#000000" />
            <View style={{ position: "absolute", top: 12, right: 12, width: 6, height: 6, borderRadius: 3, backgroundColor: "#ef4444" }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* PRODUCT SHOWCASE (360 Carousel style from Image 3) */}
        <View style={{ alignItems: "center", marginTop: 24, marginBottom: 32 }}>
          <Image
            source={require("../../../assets/images/image14.jpg")} // Use a placeholder for the plant
            style={{ width: 240, height: 240, borderRadius: 120 }}
            resizeMode="cover"
          />
          {/* Floating Platform effect */}
          <View style={{ width: 200, height: 20, borderRadius: 100, backgroundColor: "rgba(0,0,0,0.05)", transform: [{ scaleY: 0.3 }], marginTop: -10 }} />
          
          <View style={{ flexDirection: "row", gap: 12, marginTop: 24, paddingHorizontal: 24 }}>
            {[1,2,3,4].map((item, idx) => (
              <TouchableOpacity key={item} style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: "#ffffff", padding: 4, borderWidth: idx === 0 ? 2 : 0, borderColor: "#059669", alignItems: "center", justifyContent: "center" }}>
                 <Image source={require("../../../assets/images/image2.jpg")} style={{ width: "100%", height: "100%", borderRadius: 12 }} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* BOTTOM SHEET INFO */}
        <View style={{ flex: 1, backgroundColor: "#ffffff", borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 32 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <View>
              <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 26, letterSpacing: -0.5 }}>Lime Seedlings</Text>
              <Text style={{ color: "#059669", fontFamily: "Brandon-Bold", fontSize: 13, marginTop: 4 }}>Available in stock</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                <Star size={14} color="#d1d5db" fill="#d1d5db" />
                <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 13, marginLeft: 6 }}>4.9 (192)</Text>
              </View>
            </View>
            <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 22 }}>$30<Text style={{ color: "#64748b", fontSize: 14 }}>/pcs</Text></Text>
          </View>

          {/* Quantity Selector */}
          <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginBottom: 24 }}>
            <TouchableOpacity style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: "#059669", alignItems: "center", justifyContent: "center" }}>
              <Minus size={16} color="#ffffff" />
            </TouchableOpacity>
            <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 18, marginHorizontal: 16 }}>1pcs</Text>
            <TouchableOpacity style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: "#059669", alignItems: "center", justifyContent: "center" }}>
              <Plus size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 18, marginBottom: 8 }}>Description</Text>
          <Text style={{ color: "#64748b", fontFamily: "Brandon-Medium", fontSize: 14, lineHeight: 22, marginBottom: 24 }}>
            Limes are closely related to lemons. They even look similar to them. Lime tree harvest is... <Text style={{ color: "#059669", fontFamily: "Brandon-Bold" }}>Read More</Text>
          </Text>

          <Text style={{ color: "#0f172a", fontFamily: "Brandon-Bold", fontSize: 18, marginBottom: 16 }}>Related Products</Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            {[1,2,3,4].map((item) => (
              <View key={item} style={{ flex: 1, height: 80, borderRadius: 16, overflow: "hidden" }}>
                <Image source={require("../../../assets/images/image10.jpg")} style={{ width: "100%", height: "100%" }} />
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* STICKY ADD TO CART */}
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#ffffff", paddingHorizontal: 24, paddingTop: 16, paddingBottom: 32 }}>
        <TouchableOpacity style={{ backgroundColor: "#059669", borderRadius: 999, paddingVertical: 18, alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
          <Plus size={20} color="#ffffff" />
          <Text style={{ color: "#ffffff", fontFamily: "Brandon-Bold", fontSize: 16, marginLeft: 8 }}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
