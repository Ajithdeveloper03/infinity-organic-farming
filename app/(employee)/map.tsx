import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Filter, MapPin } from 'lucide-react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from '../../components/MapView';
import { Card } from '../../components/ui/Card';
import { getTodayVisits } from '../../data/mockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

export default function AllVisitsMapScreen() {
  const mapRef = useRef<MapView>(null);
  const visits = getTodayVisits();
  const [activeVisitIndex, setActiveVisitIndex] = useState(0);

  const initialRegion = {
    latitude: 11.0168,
    longitude: 76.9558,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    
    if (index !== activeVisitIndex && index < visits.length) {
      setActiveVisitIndex(index);
      const visit = visits[index];
      if (visit && visit.farmer) {
        mapRef.current?.animateToRegion({
          latitude: visit.farmer.latitude,
          longitude: visit.farmer.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }, 500);
      }
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header Overlay */}
      <View className="absolute top-12 left-0 right-0 z-10 px-6 flex-row justify-between items-center pointer-events-box-none">
        <TouchableOpacity 
          onPress={() => router.back()} 
          activeOpacity={0.7}
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
        >
           <ChevronLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-gotham-bold bg-white/90 px-6 py-2 rounded-full shadow-sm">All Visits</Text>
        <TouchableOpacity 
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
          activeOpacity={0.7}
        >
           <Filter size={20} color="#1f2937" />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView 
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        {visits.map((visit, index) => visit.farmer && (
          <Marker
            key={visit.id}
            coordinate={{ latitude: visit.farmer.latitude, longitude: visit.farmer.longitude }}
            title={visit.farmer.name}
            description={visit.farmer.address}
            pinColor={index === activeVisitIndex ? "#ea580c" : "#15803d"}
          />
        ))}
      </MapView>

      {/* Bottom Carousel Overlay */}
      <SafeAreaView className="absolute bottom-0 left-0 right-0 pointer-events-box-none">
        <View className="pb-6">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToInterval={width}
            decelerationRate="fast"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingHorizontal: width * 0.1 }}
          >
            {visits.map((visit) => visit.farmer && (
              <View key={visit.id} style={{ width: CARD_WIDTH, marginHorizontal: width * 0.05 }}>
                <Card className="rounded-[24px] p-5 shadow-lg flex-row items-center bg-white/95">
                  <View className="w-12 h-12 bg-green-700 rounded-full items-center justify-center mr-4">
                    <Text className="text-white font-gotham-bold text-xl">{visit.farmer.name.charAt(0)}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-900 font-gotham-bold text-lg mb-0.5">{visit.farmer.name}</Text>
                    <View className="flex-row items-center">
                      <MapPin size={12} color="#6b7280" />
                      <Text className="text-gray-500 text-xs font-brandon ml-1" numberOfLines={1}>{visit.farmer.address}</Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    onPress={() => router.push(`/(employee)/visit/${visit.id}`)}
                    className="bg-[#15803d] w-10 h-10 rounded-full items-center justify-center ml-2"
                  >
                    <ChevronLeft size={20} color="#fff" style={{ transform: [{ rotate: '180deg' }] }} />
                  </TouchableOpacity>
                </Card>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
