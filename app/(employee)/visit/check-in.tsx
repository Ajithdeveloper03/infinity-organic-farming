import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, MapPin } from 'lucide-react-native';

export default function CheckInScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-4">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <View className="flex-1 items-center -ml-8">
          <Text className="text-gray-900 font-gotham-bold text-lg">Kuppusamy</Text>
          <Text className="text-gray-500 text-xs font-brandon">Vetiver Farm - Block A</Text>
        </View>
      </View>

      {/* Main Check In Area */}
      <View className="flex-1 items-center justify-center relative">
        
        {/* Ripple Rings Background */}
        <View className="absolute w-[300px] h-[300px] rounded-full bg-green-50" />
        <View className="absolute w-[220px] h-[220px] rounded-full bg-green-100" />

        {/* The Button */}
        <TouchableOpacity 
          onPress={() => router.push('/(employee)/visit/tracking')}
          className="w-40 h-40 bg-[#396216] rounded-full items-center justify-center shadow-2xl elevation-10"
        >
          <MapPin size={48} color="#fff" strokeWidth={1.5} />
          <Text className="text-white font-gotham-bold mt-2">Tap to Check In</Text>
        </TouchableOpacity>
        
      </View>

      {/* Footer Info */}
      <View className="flex-row justify-between items-center px-8 pb-12">
         <View>
           <Text className="text-gray-500 text-xs mb-1 font-brandon">Location Accuracy</Text>
           <Text className="text-[#396216] font-gotham-bold text-sm">High (5m)</Text>
         </View>
         <View className="items-end">
           <Text className="text-gray-900 font-gotham-bold text-sm mb-1">10:32 AM</Text>
           <Text className="text-gray-500 text-xs font-brandon">Aug 12, 2025</Text>
         </View>
      </View>

    </SafeAreaView>
  );
}
