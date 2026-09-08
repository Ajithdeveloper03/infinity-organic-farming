import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  Linking,
  TextInput,
} from "react-native";
import {
  ChevronLeft,
  MapPin,
  Phone,
  MessageCircle,
  Sprout,
  Users,
  Search,
  UserPlus,
  ShieldCheck,
} from "lucide-react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
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
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      name: "Kandasamy",
      phone: "+91 9422222222",
      location: "Pollachi, Coimbatore",
      crops: "Vetiver, Pepper",
      status: "Active",
      acres: "2.0",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: "3",
      name: "Lakshmi Devi",
      phone: "+91 9444444444",
      location: "Udumalpet, Tirupur",
      crops: "Vetiver",
      status: "Pending Approval",
      acres: "1.5",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: "4",
      name: "Murugan S",
      phone: "+91 9455555555",
      location: "Thanjavur Delta Zone",
      crops: "Organic Paddy & Vetiver",
      status: "Active",
      acres: "5.0",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.get("/employee/farmers");
        if (res?.status === "success" && res?.farmers && res.farmers.length > 0) {
          const colors = ["#2563eb", "#7c3aed", "#059669", "#ea580c", "#db2777"];
          const mapped = res.farmers.map((f: any, i: number) => ({
            id: String(f.id),
            name: f.name || "Farmer",
            phone: f.phone || "",
            location: f.land_address || "Tamil Nadu",
            crops: "Vetiver",
            status: f.kyc_status === "verified" ? "Active" : "Pending Approval",
            acres: f.land_acres ? String(f.land_acres) : "2.5",
            color: colors[i % colors.length],
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

  const filtered = farmers.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <ImageBackground
        source={require("../../assets/images/image7.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.12 }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.4)", "rgba(248, 250, 252, 0.85)", "#f8fafc"]}
          style={StyleSheet.absoluteFill}
        />

        <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
          {/* Header - Strictly Transparent Background (Light Mode) */}
          <View
            style={{ backgroundColor: "transparent" }}
            className="px-5 pt-2 pb-3 flex-row items-center justify-between z-10"
          >
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-200 shadow-sm"
              activeOpacity={0.7}
            >
              <ChevronLeft size={22} color="#0f172a" />
            </TouchableOpacity>

            <Text className="text-lg font-gotham-bold text-slate-900">
              Farmer Directory
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/(employee)/register-farmer/step1" as any)}
              className="w-10 h-10 rounded-full bg-emerald-600 items-center justify-center shadow-md shadow-emerald-700/25"
            >
              <UserPlus size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Search Bar (Light Mode) */}
            <View className="px-5 mb-4">
              <View className="flex-row items-center bg-white px-3.5 py-2.5 rounded-full border border-slate-200 shadow-sm">
                <Search size={18} color="#64748b" />
                <TextInput
                  placeholder="Search farmers by name or village..."
                  placeholderTextColor="#94a3b8"
                  value={search}
                  onChangeText={setSearch}
                  className="flex-1 ml-2 text-slate-900 font-brandon text-sm py-0"
                />
              </View>
            </View>

            {/* Hero Summary Card with Bottom-to-Top White Gradient */}
            <View className="px-5 mb-5">
              <View className="rounded-[28px] overflow-hidden shadow-md bg-slate-900">
                <ImageBackground
                  source={require("../../assets/images/image3.jpg")}
                  className="w-full h-44"
                  resizeMode="cover"
                >
                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(0, 0, 0, 0.45)",
                      "rgba(10, 15, 25, 0.94)",
                    ]}
                    locations={[0, 0.35, 1]}
                    style={StyleSheet.absoluteFill}
                  />

                  <View className="flex-1 p-5 justify-between">
                    <View className="flex-row items-center bg-emerald-500 px-3 py-1 rounded-full self-start shadow-sm">
                      <Users size={14} color="#ffffff" />
                      <Text className="text-white font-gotham-bold text-[11px] ml-1.5 uppercase tracking-wider">
                        Assigned Landholders
                      </Text>
                    </View>

                    <View>
                      <Text className="text-white font-gotham-bold text-2xl mb-1">
                        {farmers.length} Enrolled Farmers
                      </Text>
                      <Text className="text-emerald-300 font-brandon text-xs">
                        Cultivating 13.0+ Acres of Organic Certified Vetiver
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            </View>

            {/* Farmers List (White Cards with Vibrant Colored Initials & Deep Dark Text) */}
            <View className="px-5">
              {filtered.map((farmer, idx) => (
                <View
                  key={farmer.id || idx}
                  className="bg-white rounded-[24px] p-4 mb-3.5 border border-slate-200 shadow-sm"
                >
                  <View className="flex-row items-center mb-3">
                    {/* Circular Avatar with Online Free Photo */}
                    <View
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 26,
                        overflow: "hidden",
                        borderWidth: 2,
                        borderColor: "#e2e8f0",
                        backgroundColor: "#f1f5f9",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2,
                      }}
                    >
                      <Image
                        source={{
                          uri:
                            farmer.photo ||
                            [
                              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
                              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
                              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
                            ][idx % 5],
                        }}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                      />
                    </View>

                    <View className="flex-1">
                      <View className="flex-row items-center">
                        <Text className="text-slate-900 font-gotham-bold text-base">
                          {farmer.name}
                        </Text>
                        <ShieldCheck size={15} color="#059669" className="ml-1.5" />
                      </View>
                      <View className="flex-row items-center mt-0.5">
                        <MapPin size={12} color="#64748b" />
                        <Text className="text-slate-600 font-brandon text-xs ml-1">
                          {farmer.location}
                        </Text>
                      </View>
                    </View>

                    <View className="bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <Text className="text-emerald-800 font-gotham-bold text-xs">
                        {farmer.acres} Acres
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center pt-2.5 border-t border-slate-100">
                    <View className="flex-row items-center">
                      <Sprout size={14} color="#059669" />
                      <Text className="text-slate-700 font-gotham-bold text-xs ml-1.5">
                        {farmer.crops}
                      </Text>
                    </View>

                    <View className="flex-row space-x-2">
                      <TouchableOpacity
                        onPress={() => Linking.openURL(`tel:${farmer.phone}`)}
                        className="w-9 h-9 rounded-full bg-emerald-50 items-center justify-center border border-emerald-200 mr-2"
                      >
                        <Phone size={16} color="#059669" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => Linking.openURL(`https://wa.me/${farmer.phone.replace(/[^0-9]/g, "")}`)}
                        className="w-9 h-9 rounded-full bg-emerald-600 items-center justify-center shadow-sm"
                      >
                        <MessageCircle size={16} color="#ffffff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
