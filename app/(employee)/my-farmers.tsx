import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, ActivityIndicator } from "react-native";
import { ChevronLeft, MapPin, Phone, MessageCircle, Sprout } from "lucide-react-native";
import { router } from "expo-router";
import { api } from "../../services/api";

export default function MyFarmersScreen() {
  const [farmers, setFarmers] = useState<any[]>([
    {
      id: "1",
      name: "Muthusamy",
      phone: "+91 9411111111",
      location: "Annur, Coimbatore",
      crops: "Vetiver, Turmeric",
      status: "Active",
      acres: "4.5",
    },
    {
      id: "2",
      name: "Kandasamy",
      phone: "+91 9422222222",
      location: "Pollachi, Coimbatore",
      crops: "Vetiver, Pepper",
      status: "Active",
      acres: "2.0",
    },
    {
      id: "3",
      name: "Lakshmi Devi",
      phone: "+91 9444444444",
      location: "Udumalpet, Tirupur",
      crops: "Vetiver",
      status: "Pending Approval",
      acres: "1.5",
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.get("/employee/farmers");
        if (res?.status === "success" && res?.farmers && res.farmers.length > 0) {
          const mapped = res.farmers.map((f: any) => ({
            id: String(f.id),
            name: f.name || "Farmer",
            phone: f.phone || "",
            location: f.land_address || "Tamil Nadu",
            crops: "Vetiver",
            status: f.kyc_status === "verified" ? "Active" : "Pending Approval",
            acres: f.land_acres ? String(f.land_acres) : "2.5",
          }));
          setFarmers(mapped);
        }
      } catch (err) {
        console.log("My farmers fetch notice:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-5 py-4 flex-row items-center justify-between border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 rounded-full">
          <ChevronLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-xl font-gotham-bold text-gray-900">
          My Farmers
        </Text>
        <View className="w-10 items-end">
          {loading && <ActivityIndicator size="small" color="#15803d" />}
        </View>
      </View>

      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        {farmers.map((farmer) => (
          <View 
            key={farmer.id}
            className="mb-4 p-4 rounded-2xl border bg-white border-gray-100 shadow-sm"
          >
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-row items-center flex-1 pr-2">
                <View className="w-12 h-12 rounded-full mr-3 border border-gray-200 overflow-hidden bg-gray-100">
                  <Image
                    source={{
                      uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(farmer.name)}&background=15803d&color=fff`,
                    }}
                    className="w-full h-full"
                  />
                </View>
                <View>
                  <Text className="font-gotham-bold text-base text-gray-900">
                    {farmer.name}
                  </Text>
                  <View className="flex-row items-center mt-0.5">
                    <MapPin size={12} color="#6b7280" />
                    <Text className="text-xs text-gray-500 font-brandon ml-1" numberOfLines={1}>
                      {farmer.location}
                    </Text>
                  </View>
                </View>
              </View>
              <View className={`px-2.5 py-1 rounded-full ${farmer.status === "Active" ? "bg-green-100" : "bg-amber-100"}`}>
                <Text className={`text-[10px] font-gotham-bold ${farmer.status === "Active" ? "text-green-700" : "text-amber-700"}`}>
                  {farmer.status}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
              <View className="flex-row items-center">
                <Sprout size={14} color="#15803d" />
                <Text className="text-xs text-gray-600 font-brandon ml-1.5">
                  {farmer.crops} ({farmer.acres} Acres)
                </Text>
              </View>
              <View className="flex-row items-center space-x-2">
                <TouchableOpacity 
                  onPress={() => Linking.openURL(`tel:${farmer.phone}`)}
                  className="w-8 h-8 rounded-full bg-green-50 items-center justify-center border border-green-100 mr-2"
                >
                  <Phone size={14} color="#15803d" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => Linking.openURL(`sms:${farmer.phone}`)}
                  className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center border border-blue-100"
                >
                  <MessageCircle size={14} color="#3b82f6" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
