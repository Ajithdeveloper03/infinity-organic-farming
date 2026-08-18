import React, { useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, MapPin } from 'lucide-react-native';
import { getVisitWithFarmer } from '../../../data/mockData';

export default function CheckInScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const visit = id ? getVisitWithFarmer(id) : null;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [pulseAnim]);

  if (!visit || !visit.farmer) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-4" activeOpacity={0.7}>
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <View className="flex-1 items-center -ml-8">
          <Text className="text-gray-900 font-gotham-bold text-lg">{visit.farmer.name}</Text>
          <Text className="text-gray-500 text-xs font-brandon" numberOfLines={1}>{visit.farmer.address}</Text>
        </View>
      </View>

      {/* Main Check In Area */}
      <View className="flex-1 items-center justify-center relative">
        
        {/* Ripple Rings Background */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }} className="absolute w-[300px] h-[300px] rounded-full bg-green-50" />
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }} className="absolute w-[220px] h-[220px] rounded-full bg-green-100" />

        {/* The Button */}
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => router.push({ pathname: '/(employee)/visit/tracking', params: { id: visit.id } })}
          className="w-40 h-40 bg-[#15803d] rounded-full items-center justify-center shadow-2xl elevation-10"
        >
          <MapPin size={48} color="#fff" strokeWidth={1.5} />
          <Text className="text-white font-gotham-bold mt-2 tracking-wide">Tap to Check In</Text>
        </TouchableOpacity>
        
      </View>

      {/* Footer Info */}
      <View className="flex-row justify-between items-center px-8 pb-12">
         <View>
           <Text className="text-gray-500 text-xs mb-1 font-brandon">Location Accuracy</Text>
           <Text className="text-[#15803d] font-gotham-bold text-sm">High (5m)</Text>
         </View>
         <View className="items-end">
           <Text className="text-gray-900 font-gotham-bold text-sm mb-1">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
           <Text className="text-gray-500 text-xs font-brandon">{new Date().toDateString()}</Text>
         </View>
      </View>

    </SafeAreaView>
  );
}
