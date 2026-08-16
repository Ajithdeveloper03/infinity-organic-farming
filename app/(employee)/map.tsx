import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Filter } from 'lucide-react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { Card } from '../../components/ui/Card';

export default function AllVisitsMapScreen() {
  const initialRegion = {
    latitude: 11.0168,
    longitude: 76.9558,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markers = [
    { id: '1', coordinate: { latitude: 11.02, longitude: 76.95 }, title: 'Kuppusamy', description: 'Vetiver Farm - Block A' },
    { id: '2', coordinate: { latitude: 11.01, longitude: 76.96 }, title: 'Subramani', description: 'Vetiver Farm - Block B' },
    { id: '3', coordinate: { latitude: 11.03, longitude: 76.94 }, title: 'Muthuvel', description: 'Vetiver Farm - Block C' },
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Header Overlay */}
      <View className="absolute top-12 left-0 right-0 z-10 px-6 flex-row justify-between items-center pointer-events-box-none">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
        >
           <ChevronLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-gotham-bold bg-white/90 px-6 py-2 rounded-full shadow-sm">All Visits</Text>
        <TouchableOpacity 
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
        >
           <Filter size={20} color="#1f2937" />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView 
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor="#8b8df2"
          />
        ))}
      </MapView>

      {/* Bottom Card Overlay */}
      <SafeAreaView className="absolute bottom-0 left-0 right-0 pointer-events-box-none">
        <View className="px-4 pb-6">
          <Card className="rounded-[32px] flex-row justify-between items-center shadow-lg py-5 px-6">
             <View>
                <Text className="text-gray-900 font-gotham-bold text-lg mb-0.5">3 Active Visits</Text>
                <Text className="text-gray-500 text-sm font-brandon">Scheduled for Today</Text>
             </View>
             <TouchableOpacity 
               onPress={() => router.push('/(employee)/visits')}
               className="bg-[#e8e8fc] px-5 py-3 rounded-full"
             >
               <Text className="text-[#8b8df2] font-gotham-bold text-sm">View List</Text>
             </TouchableOpacity>
          </Card>
        </View>
      </SafeAreaView>
    </View>
  );
}
