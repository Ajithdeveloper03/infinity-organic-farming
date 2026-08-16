import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, CheckCircle2 } from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';

export default function FarmerVisitReportScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 bg-white flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-bold">Visit Report</Text>
      </View>

      <ScrollView className="flex-1 pb-24">
        
        {/* Banner Image */}
        <Image 
           source={{uri: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop'}}
           className="w-full h-48"
        />

        <View className="px-6 -mt-8">
           
           <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <View className="flex-row justify-between items-start mb-6 pb-6 border-b border-gray-100">
                 <View>
                   <Text className="text-gray-900 font-bold text-lg">Visit by Arun Kumar</Text>
                   <Text className="text-gray-500 text-sm mt-1">May 11, 2025 • 10:30 AM</Text>
                   <Text className="text-gray-400 text-xs mt-1">Vetiver Farm - Block A</Text>
                 </View>
                 <View className="bg-green-50 px-3 py-1.5 rounded-full">
                   <Text className="text-[#15803d] font-bold text-xs">Completed</Text>
                 </View>
              </View>

              <View className="mb-6">
                 <View className="flex-row items-center mb-2">
                    <CheckCircle2 size={16} color="#15803d" />
                    <Text className="text-gray-900 font-bold ml-2">Crop Condition</Text>
                 </View>
                 <Text className="text-gray-600 pl-6">Good</Text>
              </View>

              <View className="mb-6">
                 <View className="flex-row items-center mb-2">
                    <CheckCircle2 size={16} color="#15803d" />
                    <Text className="text-gray-900 font-bold ml-2">Notes</Text>
                 </View>
                 <Text className="text-gray-600 pl-6 leading-5">Plants are healthy and growing well. Growth is as per the schedule. No pest issues observed.</Text>
              </View>

              <View className="mb-6">
                 <Text className="text-gray-900 font-bold mb-3">Photos</Text>
                 <View className="flex-row space-x-2">
                    <Image source={{uri: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=100&h=100&fit=crop'}} className="w-16 h-16 rounded-xl mr-2" />
                    <Image source={{uri: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=100&h=100&fit=crop'}} className="w-16 h-16 rounded-xl mr-2" />
                    <View className="w-16 h-16 bg-gray-100 rounded-xl items-center justify-center border border-gray-200">
                       <Text className="text-gray-500 font-bold">+4</Text>
                    </View>
                 </View>
              </View>

              <View className="bg-green-50 rounded-xl p-4">
                 <Text className="text-gray-900 font-bold mb-2">Recommendations</Text>
                 <Text className="text-gray-700 leading-5">Continue with current irrigation schedule. Apply organic manure in next cycle.</Text>
              </View>
           </View>

           <Button 
             title="Rate Field Officer" 
             onPress={() => router.push(`/(farmer)/rate/${id}`)}
             className="bg-[#15803d] mb-4"
           />

           <Button 
             title="View Full Report (PDF)" 
             onPress={() => {}}
             className="bg-transparent border-2 border-[#15803d]"
             textClassName="text-[#15803d]"
           />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
