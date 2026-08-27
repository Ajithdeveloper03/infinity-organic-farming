import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { ChevronLeft, MapPin, Navigation } from "lucide-react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { getTodayVisits } from "../../data/mockData";

const { width, height } = Dimensions.get("window");

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const visits = getTodayVisits();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const routeCoordinates = [];
  if (location) {
    routeCoordinates.push({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  visits.forEach((v) => {
    routeCoordinates.push({
      latitude: 11.6643 + (Math.random() * 0.05 - 0.025),
      longitude: 78.146 + (Math.random() * 0.05 - 0.025),
    });
  });

  return (
    <View className="flex-1 bg-gray-50 dark:bg-[#0A0A0C]">
      <SafeAreaView className="absolute top-0 left-0 right-0 z-10">
        <View className="px-5 pt-16 pb-4 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-12 h-12 bg-white/90 dark:bg-[#1C1C1E]/90 rounded-full items-center justify-center border border-white/10 shadow-lg"
            activeOpacity={0.8}
          >
            <ChevronLeft size={28} color="#fff" />
          </TouchableOpacity>
          <View className="bg-white/90 dark:bg-[#1C1C1E]/90 px-6 py-3 rounded-full border border-white/10 shadow-lg">
            <Text className="text-gray-900 dark:text-white font-gotham-bold text-base">
              Live Route Map
            </Text>
          </View>
          <View className="w-12 h-12" />
        </View>
      </SafeAreaView>

      <MapView
        style={{ width, height }}
        customMapStyle={darkMapStyle}
        initialRegion={{
          latitude: location ? location.coords.latitude : 11.6643,
          longitude: location ? location.coords.longitude : 78.146,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {routeCoordinates.length > 1 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#10b981"
            strokeWidth={4}
            lineDashPattern={[1]}
          />
        )}

        {visits.map((visit, index) => {
          const coord = routeCoordinates[location ? index + 1 : index];
          if (!coord) return null;
          return (
            <Marker
              key={visit.id}
              coordinate={coord}
              title={visit.farmer?.name}
              description={visit.status}
            >
              <View
                className={`w-8 h-8 rounded-full items-center justify-center border-2 border-white ${visit.status === "completed" ? "bg-green-500" : "bg-orange-500"}`}
              >
                <MapPin size={16} color="#fff" />
              </View>
            </Marker>
          );
        })}

        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <View className="w-12 h-12 bg-blue-500/20 rounded-full items-center justify-center border border-blue-500/30">
              <View className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500" />
            </View>
          </Marker>
        )}
      </MapView>

      <View className="absolute bottom-10 left-5 right-5 bg-white/90 dark:bg-[#1C1C1E]/90 rounded-[24px] p-5 border border-white/10 shadow-2xl">
        <View className="flex-row items-center mb-4">
          <View className="w-12 h-12 bg-green-500/20 rounded-full items-center justify-center mr-4">
            <Navigation size={24} color="#4ade80" />
          </View>
          <View>
            <Text className="text-gray-900 dark:text-white font-gotham-bold text-lg">
              {visits.length} Stops Today
            </Text>
            <Text className="text-[#9ca3af] font-brandon text-xs">
              {visits.filter((v) => v.status === "completed").length} completed,{" "}
              {visits.filter((v) => v.status === "pending").length} pending
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
