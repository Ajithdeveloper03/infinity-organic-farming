import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  ChevronLeft,
  MapPin,
  ChevronRight,
  Calendar,
  Clock,
  CheckCircle2,
  ListTodo,
} from "lucide-react-native";
import { getTodayVisits } from "../../data/mockData";
import { api } from "../../services/api";

export default function VisitsScreen() {
  const [visits, setVisits] = useState<any[]>(getTodayVisits());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.get("/employee/visits");
        if (res?.status === "success" && res?.visits && res.visits.length > 0) {
          setVisits(res.visits);
        }
      } catch (e) {
        console.log("Visits fetch notice:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const completedCount = visits.filter((v) => v.status === "completed").length;
  const pendingCount = visits.length - completedCount;

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
          <View className="items-center">
            <Text className="text-lg font-gotham-bold text-gray-900">
              Assigned Field Visits
            </Text>
            <Text className="text-xs text-green-700 font-brandon font-bold">
              {visits.length} Visits Scheduled Today
            </Text>
          </View>
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
                source={require("../../assets/images/image5.jpg")}
                className="w-full"
                resizeMode="cover"
              >
                <View className="p-6 bg-green-950/80">
                  <View className="flex-row items-center mb-2">
                    <ListTodo size={20} color="#86efac" className="mr-2" />
                    <Text className="text-green-300 font-brandon font-bold text-xs uppercase tracking-widest">
                      Daily Inspection Route
                    </Text>
                  </View>
                  <Text className="text-white font-gotham-bold text-2xl mb-4">
                    Assigned Farmers
                  </Text>

                  <View className="flex-row justify-between bg-white/10 rounded-2xl p-4 border border-white/20">
                    <View className="items-center flex-1">
                      <Text className="text-white/75 text-xs font-brandon">Total</Text>
                      <Text className="text-white font-gotham-bold text-xl mt-0.5">
                        {visits.length}
                      </Text>
                    </View>
                    <View className="w-px bg-white/20 h-full" />
                    <View className="items-center flex-1">
                      <Text className="text-white/75 text-xs font-brandon">Done</Text>
                      <Text className="text-emerald-300 font-gotham-bold text-xl mt-0.5">
                        {completedCount}
                      </Text>
                    </View>
                    <View className="w-px bg-white/20 h-full" />
                    <View className="items-center flex-1">
                      <Text className="text-white/75 text-xs font-brandon">Remaining</Text>
                      <Text className="text-amber-300 font-gotham-bold text-xl mt-0.5">
                        {pendingCount}
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>

          {/* Visits List */}
          <View className="px-5">
            <Text className="text-gray-900 font-gotham-bold text-base mb-3">
              Today's Field Schedule
            </Text>

            {visits.map((visit) => {
              const timeParts = (visit.time || "10:00 AM").split(" ");
              const farmerName = visit.farmerName || visit.farmer?.name || "Farmer";
              const address = visit.address || visit.farmer?.address || "Annur, Coimbatore";
              const isDone = visit.status === "completed";

              return (
                <TouchableOpacity
                  key={visit.id}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/(employee)/visit/${visit.id}` as any)}
                  className="bg-white p-5 rounded-2xl mb-3.5 border border-gray-200 shadow-sm"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center flex-1 pr-3">
                      <View className="w-14 h-14 rounded-2xl bg-green-100 border border-green-300 items-center justify-center mr-3.5">
                        <Text className="text-green-800 font-gotham-bold text-sm">
                          {timeParts[0]}
                        </Text>
                        <Text className="text-green-700 font-brandon-bold text-[10px] uppercase">
                          {timeParts[1] || "AM"}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-900 font-gotham-bold text-base mb-0.5">
                          {farmerName}
                        </Text>
                        <View className="flex-row items-center">
                          <MapPin size={13} color="#4b5563" className="mr-1" />
                          <Text
                            className="text-gray-700 text-xs font-brandon"
                            numberOfLines={1}
                          >
                            {address}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      className={`px-3 py-1 rounded-full border ${
                        isDone
                          ? "bg-emerald-50 border-emerald-300"
                          : "bg-amber-50 border-amber-300"
                      }`}
                    >
                      <Text
                        className={`text-[11px] font-gotham-bold uppercase tracking-wider ${
                          isDone ? "text-emerald-800" : "text-amber-800"
                        }`}
                      >
                        {isDone ? "Completed" : "Pending"}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                    <Text className="text-gray-600 font-brandon text-xs">
                      Inspection Type: General Routine & Soil Check
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-green-800 font-gotham-bold text-xs uppercase tracking-wider mr-1">
                        Start Visit
                      </Text>
                      <ChevronRight size={16} color="#15803d" />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
