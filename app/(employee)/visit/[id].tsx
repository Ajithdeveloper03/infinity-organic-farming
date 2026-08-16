import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';

export default function VisitDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 flex-row items-center bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-4">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        
        <View className="w-10 h-10 bg-green-700 rounded-full items-center justify-center mr-3">
           <Text className="text-white font-gotham-bold text-lg">K</Text>
        </View>
        <View>
          <Text className="text-gray-900 font-gotham-bold text-base">Kuppusamy</Text>
          <Text className="text-gray-500 text-xs font-brandon">Vetiver Farm - Block A</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        
        {/* Info List */}
        <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 mb-6">
           
           <View className="flex-row justify-between py-3 border-b border-gray-100">
              <Text className="text-gray-500 font-brandon-medium text-sm">Visit Date</Text>
              <Text className="text-gray-900 font-gotham-bold text-sm">Aug 12, 2025</Text>
           </View>

           <View className="flex-row justify-between py-3 border-b border-gray-100">
              <Text className="text-gray-500 font-brandon-medium text-sm">Visit Time</Text>
              <Text className="text-gray-900 font-gotham-bold text-sm">10:30 AM</Text>
           </View>

           <View className="flex-row justify-between py-3 border-b border-gray-100">
              <Text className="text-gray-500 font-brandon-medium text-sm">Farm Area</Text>
              <Text className="text-gray-900 font-gotham-bold text-sm">2.5 Acres</Text>
           </View>

           <View className="flex-row justify-between py-3 border-b border-gray-100">
              <Text className="text-gray-500 font-brandon-medium text-sm">Crop Type</Text>
              <Text className="text-gray-900 font-gotham-bold text-sm">Vetiver</Text>
           </View>

           <View className="flex-row justify-between py-3 border-b border-gray-100">
              <Text className="text-gray-500 font-brandon-medium text-sm">Previous Visit</Text>
              <Text className="text-gray-900 font-gotham-bold text-sm">Jul 28, 2025</Text>
           </View>

           <View className="flex-row justify-between py-3 border-b border-gray-100">
              <Text className="text-gray-500 font-brandon-medium text-sm">Visit Frequency</Text>
              <Text className="text-gray-900 font-gotham-bold text-sm">Every 15 Days</Text>
           </View>

           <View className="pt-4">
              <Text className="text-gray-900 font-gotham-bold mb-1">Remarks</Text>
              <Text className="text-gray-500 text-sm leading-5 font-brandon">
                Regular field inspection and growth monitoring. Check for sufficient irrigation in Block A.
              </Text>
           </View>

        </View>

        {/* Start Visit Button - navigates to Check In (Screen 5) */}
        <View className="pb-24">
          <Button 
            title="Start Visit Workflow" 
            onPress={() => router.push('/(employee)/visit/check-in')}
            className="bg-[#396216]"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
