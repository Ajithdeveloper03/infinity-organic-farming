import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from "react-native";
import {
  ChevronLeft,
  MapPin,
  Phone,
  MessageCircle,
  Sprout,
  Users,
  CheckCircle2,
} from "lucide-react-native";
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
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Background image subtle overlay */}
      <ImageBackground
        source={require("../../assets/images/image7.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.12 }}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header */}
        <View className="px-5 py-4 bg-white/95 border-b border-gray-100 flex-row items-center justify-between shadow-sm backdrop-blur-md">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center border border-gray-200"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#111827" />
          </TouchableOpacity>
          <Text className="text-lg font-gotham-bold text-gray-900">
            Registered Farmers
          </Text>
          <View className="w-10 items-end">
            {loading && <ActivityIndicator size="small" color="#15803d" />}
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Banner with Background Image */}
          <View className="p-5">
            <View className="rounded-3xl overflow-hidden shadow-md border border-green-800/20">
              <ImageBackground
                source={require("../../assets/images/image2.jpg")}
                className="w-full"
                resizeMode="cover"
              >
                <View className="p-6 bg-green-950/80">
                  <View className="flex-row items-center mb-2">
                    <Users size={20} color="#86efac" className="mr-2" />
                    <Text className="text-green-300 font-brandon font-bold text-xs uppercase tracking-widest">
                      Delta & Regional Network
                    </Text>
                  </View>
                  <Text className="text-white font-gotham-bold text-2xl mb-2">
                    Assigned Farm Portfolio
                  </Text>
                  <Text className="text-white/80 font-brandon text-xs leading-relaxed">
                    {farmers.length} active organic farmers registered under your supervision.
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* Farmers List */}
          <View className="px-5">
            <Text className="text-gray-900 font-gotham-bold text-base mb-3">
              Farmer Directory ({farmers.length})
            </Text>

            {farmers.map((farmer) => {
              const isActive = farmer.status === "Active";
              return (
                <View
                  key={farmer.id}
                  className="mb-4 p-5 rounded-2xl border bg-white border-gray-200 shadow-sm"
                >
                  <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-row items-center flex-1 pr-3">
                      <View className="w-13 h-13 rounded-2xl mr-3.5 border border-green-200 overflow-hidden bg-green-50 shadow-sm">
                        <Image
                          source={{
                            uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(farmer.name)}&background=15803d&color=fff`,
                          }}
                          className="w-full h-full"
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="font-gotham-bold text-base text-gray-900 mb-0.5">
                          {farmer.name}
                        </Text>
                        <View className="flex-row items-center">
                          <MapPin size={13} color="#4b5563" className="mr-1" />
                          <Text
                            className="text-xs text-gray-700 font-brandon"
                            numberOfLines={1}
                          >
                            {farmer.location}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      className={`px-3 py-1 rounded-full border ${
                        isActive
                          ? "bg-emerald-50 border-emerald-300"
                          : "bg-amber-50 border-amber-300"
                      }`}
                    >
                      <Text
                        className={`text-[11px] font-gotham-bold uppercase tracking-wider ${
                          isActive ? "text-emerald-800" : "text-amber-800"
                        }`}
                      >
                        {farmer.status}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                    <View className="flex-row items-center">
                      <Sprout size={15} color="#15803d" className="mr-1.5" />
                      <Text className="text-xs text-gray-800 font-gotham-bold">
                        {farmer.crops} • {farmer.acres} Acres
                      </Text>
                    </View>

                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() => Linking.openURL(`tel:${farmer.phone}`)}
                        className="w-9 h-9 rounded-xl bg-green-100 items-center justify-center border border-green-300 mr-2"
                        activeOpacity={0.7}
                      >
                        <Phone size={16} color="#15803d" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => Linking.openURL(`sms:${farmer.phone}`)}
                        className="w-9 h-9 rounded-xl bg-blue-100 items-center justify-center border border-blue-300"
                        activeOpacity={0.7}
                      >
                        <MessageCircle size={16} color="#2563eb" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
