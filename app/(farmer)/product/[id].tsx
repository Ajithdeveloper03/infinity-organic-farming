import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, TouchableOpacity, Image, useColorScheme } from "react-native";
import { ChevronLeft, ShoppingBag, Star, Shield, Leaf } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function ProductDetailsScreen() {
  const isDark = useColorScheme() === "dark";
  const { id } = useLocalSearchParams();

  // Dummy product data
  const product = {
    id,
    name: "Organic Fertilizer & Nutrient Boost",
    category: "Nutrients",
    price: "₹850",
    rating: 4.8,
    reviews: 124,
    description: "Premium organic fertilizer enriched with essential macro and micro nutrients. Perfect for enhancing soil health and boosting crop yield naturally without harmful chemicals.",
    features: [
      "100% Organic certified",
      "Improves soil structure",
      "Increases water retention",
      "Safe for all crop types"
    ]
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-[#0A0A0C]" : "bg-gray-50"}`}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="relative h-80">
          <Image
            source={require("../../../assets/images/image3.jpg")}
            className="w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.5)", "transparent"]}
            className="absolute top-0 left-0 right-0 h-24"
          />
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="absolute top-12 left-5 w-10 h-10 bg-white/20 rounded-full items-center justify-center backdrop-blur-md border border-white/30"
          >
            <ChevronLeft size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View className={`-mt-8 rounded-t-[32px] px-6 pt-8 pb-32 ${isDark ? "bg-[#0A0A0C]" : "bg-white"}`}>
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-blue-500 font-gotham-bold text-xs uppercase tracking-widest">
              {product.category}
            </Text>
            <View className="flex-row items-center bg-yellow-500/10 px-2 py-1 rounded-lg">
              <Star size={12} color="#f59e0b" fill="#f59e0b" />
              <Text className="text-yellow-600 font-gotham-bold text-xs ml-1">
                {product.rating} <Text className="font-brandon">({product.reviews})</Text>
              </Text>
            </View>
          </View>

          <Text className={`text-2xl font-gotham-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            {product.name}
          </Text>

          <Text className="text-green-500 font-gotham-bold text-3xl mb-6">
            {product.price}
          </Text>

          <Text className={`text-lg font-gotham-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            Description
          </Text>
          <Text className={`font-brandon text-base leading-6 mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {product.description}
          </Text>

          <View className="mb-6 flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-green-50 items-center justify-center mr-4">
              <Leaf size={24} color="#10b981" />
            </View>
            <View className="flex-1">
              <Text className={`font-gotham-bold text-base ${isDark ? "text-white" : "text-gray-900"}`}>
                Eco-Friendly
              </Text>
              <Text className={`font-brandon text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Sustainably sourced ingredients
              </Text>
            </View>
          </View>
          
          <View className="mb-6 flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center mr-4">
              <Shield size={24} color="#3b82f6" />
            </View>
            <View className="flex-1">
              <Text className={`font-gotham-bold text-base ${isDark ? "text-white" : "text-gray-900"}`}>
                Quality Assured
              </Text>
              <Text className={`font-brandon text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Tested and certified
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className={`absolute bottom-0 left-0 right-0 p-5 pb-8 ${isDark ? "bg-[#0A0A0C]/90" : "bg-white/90"} backdrop-blur-lg border-t ${isDark ? "border-white/10" : "border-gray-100"}`}>
        <TouchableOpacity 
          className="bg-green-600 rounded-full py-4 flex-row justify-center items-center shadow-lg shadow-green-600/30"
          activeOpacity={0.9}
        >
          <ShoppingBag size={20} color="#fff" />
          <Text className="text-white font-gotham-bold text-lg ml-2">
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
