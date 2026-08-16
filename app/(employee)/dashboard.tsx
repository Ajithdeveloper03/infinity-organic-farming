import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Bell, MapPin } from 'lucide-react-native';

export default function DashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        
        {/* Header */}
        <View className="px-6 pt-12 pb-6 flex-row justify-between items-center bg-white shadow-sm">
          <View className="flex-row items-center">
             <Image 
                source={{uri: 'https://ui-avatars.com/api/?name=Ramesh+Kumar&background=396216&color=fff'}}
                className="w-12 h-12 rounded-full mr-3"
             />
             <View>
                <Text className="text-gray-500 text-sm font-brandon-medium">Good Morning,</Text>
                <Text className="text-gray-900 text-lg font-gotham-bold">Ramesh Kumar</Text>
             </View>
          </View>
          <TouchableOpacity className="relative p-2">
            <Bell size={24} color="#374151" />
            <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="px-6 pt-6">
          
          {/* Today&apos;s Summary */}
          <Text className="text-lg font-gotham-bold text-gray-900 mb-4">Today&apos;s Summary</Text>
          <Text className="text-gray-500 text-xs mb-4 font-brandon">Aug 12, 2025</Text>
          
          <View className="flex-row justify-between bg-white p-6 rounded-2xl shadow-sm mb-8">
            <View className="items-center">
               <Text className="text-[#396216] text-3xl font-gotham-bold mb-1">03</Text>
               <Text className="text-gray-500 text-xs font-brandon">Visits Today</Text>
            </View>
            <View className="w-px h-12 bg-gray-200" />
            <View className="items-center">
               <Text className="text-[#396216] text-3xl font-gotham-bold mb-1">02</Text>
               <Text className="text-gray-500 text-xs font-brandon">Completed</Text>
            </View>
            <View className="w-px h-12 bg-gray-200" />
            <View className="items-center">
               <Text className="text-[#e87111] text-3xl font-gotham-bold mb-1">01</Text>
               <Text className="text-gray-500 text-xs font-brandon">Pending</Text>
            </View>
          </View>

          {/* Next Visit */}
          <Text className="text-lg font-gotham-bold text-gray-900 mb-4">Next Visit</Text>
          
          <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-8">
             <View className="flex-row justify-between items-start mb-4">
               <View>
                 <Text className="text-gray-900 font-gotham-bold text-lg">Kuppusamy</Text>
                 <View className="flex-row items-center mt-1">
                   <MapPin size={14} color="#6b7280" />
                   <Text className="text-gray-500 text-sm ml-1 font-brandon">Vetiver Farm - Block A</Text>
                 </View>
               </View>
               <Text className="text-gray-900 font-gotham-bold text-base">10:30 AM</Text>
             </View>
             
             <TouchableOpacity 
               onPress={() => router.push('/(employee)/visit/1')}
               className="w-full bg-[#396216] py-3 rounded-xl items-center"
             >
               <Text className="text-white font-gotham-bold">View Details</Text>
             </TouchableOpacity>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
