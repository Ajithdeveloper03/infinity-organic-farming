import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, MapPin, ChevronRight, Calendar } from "lucide-react-native";
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-5 pt-16 pb-4 flex-row items-center border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft size={28} color="#111827" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-xl font-gotham-bold text-gray-900">
            Assigned Visits
          </Text>
          <Text className="text-xs text-gray-400 font-brandon">
            {visits.length} farmer visits scheduled
          </Text>
        </View>
        {loading && <ActivityIndicator size="small" color="#15803d" />}
      </View>
      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {visits.map((visit) => {
          const timeParts = (visit.time || "10:00 AM").split(" ");
          const farmerName = visit.farmerName || visit.farmer?.name || "Farmer";
          const address = visit.address || visit.farmer?.address || "Tamil Nadu";
          const visitId = visit.id;

          return (
            <TouchableOpacity
              key={visitId}
              activeOpacity={0.8}
              onPress={() => router.push(`/(employee)/visit/${visitId}` as any)}
              className="flex-row items-center bg-white p-4 rounded-[20px] mb-3 border border-gray-100 shadow-sm"
            >
              <View className="w-16 h-16 rounded-[14px] bg-green-50 items-center justify-center mr-4 border border-green-100">
                <Text className="text-[#10b981] font-gotham-bold text-sm">
                  {timeParts[0]}
                </Text>
                <Text className="text-gray-400 font-brandon text-[10px] uppercase">
                  {timeParts[1] || "AM"}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-gotham-bold text-base mb-1">
                  {farmerName}
                </Text>
                <View className="flex-row items-center">
                  <MapPin size={12} color="#8E8E93" />
                  <Text className="text-[#8E8E93] text-xs ml-1 font-brandon" numberOfLines={1}>
                    {address}
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
