import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, MoreHorizontal, MapPin, Navigation } from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';

export default function TrackingScreen() {
  const handleStop = () => {
    router.push('/(employee)/visit/report');
  };

  const initialRegion = {
    latitude: 11.0200,
    longitude: 76.9500,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const routeCoordinates = [
    { latitude: 11.0168, longitude: 76.9558 },
    { latitude: 11.0180, longitude: 76.9530 },
    { latitude: 11.0200, longitude: 76.9500 },
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Map Background */}
      <MapView
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
      >
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#8b8df2"
          strokeWidth={4}
        />
        <Marker coordinate={routeCoordinates[0]}>
           <View className="bg-white p-2 rounded-full shadow-sm">
             <MapPin size={20} color="#8b8df2" />
           </View>
        </Marker>
        <Marker coordinate={routeCoordinates[routeCoordinates.length - 1]}>
           <View className="bg-[#8b8df2] p-2 rounded-full shadow-sm border-2 border-white">
             <Navigation size={20} color="#fff" />
           </View>
        </Marker>
      </MapView>

      <SafeAreaView className="flex-1 justify-between">
        
        {/* Header & Top Card */}
        <View>
          <View className="px-6 pt-2 pb-4 flex-row justify-between items-center">
            <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
               <ChevronLeft size={24} color="#1f2937" />
            </TouchableOpacity>
            <Text className="font-gotham-bold text-lg text-gray-900">Tracking</Text>
            <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
               <MoreHorizontal size={24} color="#1f2937" />
            </TouchableOpacity>
          </View>

          <View className="px-4 mt-2">
            <Card className="flex-row items-center justify-between py-4">
              <View className="flex-row items-center">
                <View className="bg-[#e8e8fc] p-3 rounded-full mr-4">
                  <Navigation size={24} color="#8b8df2" />
                </View>
                <View>
                  <Text className="font-gotham-bold text-gray-900 text-base">Active Visit</Text>
                  <Text className="text-gray-500 text-xs font-brandon">Infinity Organics</Text>
                </View>
              </View>
              <View className="bg-[#e8e8fc] px-3 py-1.5 rounded-full">
                <Text className="text-[#8b8df2] font-gotham-bold text-xs">LIVE</Text>
              </View>
            </Card>
          </View>
        </View>

        {/* Bottom Panel */}
        <View className="px-4 pb-8">
          <Card className="rounded-[32px] pt-6 pb-6">
            <View className="items-center mb-6">
               <Text className="text-gray-500 text-sm font-brandon mb-1">Tracking Duration</Text>
               <Text className="text-[#8b8df2] font-gotham-bold text-4xl">01:25:36</Text>
            </View>

            <View className="flex-row justify-between px-4 mb-8">
               <View className="items-center">
                 <Text className="text-gray-900 font-gotham-bold text-lg">12.4</Text>
                 <Text className="text-gray-900 font-gotham-bold text-xs mb-1">km</Text>
                 <Text className="text-gray-400 text-xs font-brandon">Distance</Text>
               </View>
               <View className="w-px h-10 bg-gray-100" />
               <View className="items-center">
                 <Text className="text-gray-900 font-gotham-bold text-lg">45</Text>
                 <Text className="text-gray-900 font-gotham-bold text-xs mb-1">km/h</Text>
                 <Text className="text-gray-400 text-xs font-brandon">Speed</Text>
               </View>
               <View className="w-px h-10 bg-gray-100" />
               <View className="items-center">
                 <Text className="text-gray-900 font-gotham-bold text-lg">08:45</Text>
                 <Text className="text-gray-900 font-gotham-bold text-xs mb-1">AM</Text>
                 <Text className="text-gray-400 text-xs font-brandon">Start</Text>
               </View>
            </View>

            <Button 
              title="Stop Tracking" 
              onPress={handleStop}
            />
          </Card>
        </View>

      </SafeAreaView>
    </View>
  );
}
