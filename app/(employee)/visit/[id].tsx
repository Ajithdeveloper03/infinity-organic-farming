import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';
import { getVisitWithFarmer } from '../../../data/mockData';
import { showToast } from '../../../components/ui/ToastMessage';

export default function VisitDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const visit = id ? getVisitWithFarmer(id) : null;

  useEffect(() => {
    if (visit?.status === 'upcoming') {
      showToast({
        title: 'Upcoming Visit Reminder',
        message: `Next visit for ${visit.farmer?.name} is in 5 days. Please be prepared.`,
        type: 'info',
        duration: 4000
      });
    }
  }, [visit?.status]);

  if (!visit || !visit.farmer) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500 font-brandon">Visit details not found.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-[#15803d] px-6 py-2 rounded-lg">
          <Text className="text-white font-gotham-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 flex-row items-center bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-4" activeOpacity={0.7}>
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        
        <View className="w-10 h-10 bg-green-700 rounded-full items-center justify-center mr-3">
           <Text className="text-white font-gotham-bold text-lg">{visit.farmer.name.charAt(0)}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 font-gotham-bold text-base">{visit.farmer.name}</Text>
          <Text className="text-gray-500 text-xs font-brandon" numberOfLines={1}>{visit.farmer.address}</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        
        {/* Info List */}
        <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 mb-6">
           
           <View className="flex-row justify-between py-3 border-b border-gray-100">
              <Text className="text-gray-500 font-brandon-medium text-sm">Visit Date</Text>
              <Text className="text-gray-900 font-gotham-bold text-sm">{visit.date}</Text>
           </View>

           <View className="flex-row justify-between py-3 border-b border-gray-100">
              <Text className="text-gray-500 font-brandon-medium text-sm">Visit Time</Text>
              <Text className="text-gray-900 font-gotham-bold text-sm">{visit.time}</Text>
           </View>

           <View className="flex-row justify-between py-3 border-b border-gray-100">
              <Text className="text-gray-500 font-brandon-medium text-sm">Farm Area</Text>
              <Text className="text-gray-900 font-gotham-bold text-sm">{visit.farmer.farmArea}</Text>
           </View>

           <View className="flex-row justify-between py-3 border-b border-gray-100">
              <Text className="text-gray-500 font-brandon-medium text-sm">Crop Type</Text>
              <Text className="text-gray-900 font-gotham-bold text-sm">{visit.farmer.cropType}</Text>
           </View>

           <View className="flex-row justify-between py-3 border-b border-gray-100">
              <Text className="text-gray-500 font-brandon-medium text-sm">Previous Visit</Text>
              <Text className="text-gray-900 font-gotham-bold text-sm">{visit.previousVisitDate || 'N/A'}</Text>
           </View>

           <View className="flex-row justify-between py-3 border-b border-gray-100">
              <Text className="text-gray-500 font-brandon-medium text-sm">Visit Frequency</Text>
              <Text className="text-gray-900 font-gotham-bold text-sm">{visit.visitFrequency}</Text>
           </View>

           <View className="pt-4">
              <Text className="text-gray-900 font-gotham-bold mb-1">Remarks</Text>
              <Text className="text-gray-500 text-sm leading-5 font-brandon">
                {visit.remarks || 'No specific remarks for this visit.'}
              </Text>
           </View>

        </View>

        {/* Start Visit Button - navigates to Check In (Screen 5) */}
        {visit.status !== 'completed' && (
          <View className="pb-24">
            <Button 
              title="Start Visit Workflow" 
              onPress={() => router.push({ pathname: '/(employee)/visit/check-in', params: { id: visit.id } })}
              className="bg-[#15803d]"
            />
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
