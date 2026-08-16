import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, CheckCircle2 } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';

export default function FarmerMyFarmScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 bg-white flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-bold">My Farm</Text>
      </View>

      <ScrollView className="flex-1 pb-24">
        
        {/* Farm Image Banner */}
        <View className="h-64 relative bg-gray-200">
           <ImageBackground 
             source={{uri: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop'}}
             className="w-full h-full"
           >
              {/* Overlay Badge */}
              <View className="absolute bottom-6 left-6 bg-[#15803d] px-3 py-1.5 rounded-full flex-row items-center shadow-md">
                 <CheckCircle2 size={16} color="#fff" className="mr-1" />
                 <Text className="text-white font-bold text-xs">Verified Farm</Text>
              </View>
           </ImageBackground>
        </View>

        <View className="px-6 pt-6">
           <Text className="text-xl font-bold text-gray-900 mb-6">Farm Details</Text>
           
           <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
              
              <View className="flex-row justify-between py-4 border-b border-gray-100">
                 <View className="flex-row items-center">
                    <Text className="text-gray-500 font-medium w-32">Farm Name</Text>
                 </View>
                 <Text className="text-gray-900 font-bold flex-1 text-right">Kuppusamy Farm</Text>
              </View>

              <View className="flex-row justify-between py-4 border-b border-gray-100">
                 <View className="flex-row items-center">
                    <Text className="text-gray-500 font-medium w-32">Village</Text>
                 </View>
                 <Text className="text-gray-900 font-bold flex-1 text-right">Somanur</Text>
              </View>

              <View className="flex-row justify-between py-4 border-b border-gray-100">
                 <View className="flex-row items-center">
                    <Text className="text-gray-500 font-medium w-32">Block</Text>
                 </View>
                 <Text className="text-gray-900 font-bold flex-1 text-right">Coimbatore</Text>
              </View>

              <View className="flex-row justify-between py-4 border-b border-gray-100">
                 <View className="flex-row items-center">
                    <Text className="text-gray-500 font-medium w-32">Crop Type</Text>
                 </View>
                 <Text className="text-gray-900 font-bold flex-1 text-right">Vetiver</Text>
              </View>

              <View className="flex-row justify-between py-4 border-b border-gray-100">
                 <View className="flex-row items-center">
                    <Text className="text-gray-500 font-medium w-32">Soil Type</Text>
                 </View>
                 <Text className="text-gray-900 font-bold flex-1 text-right">Red Loamy</Text>
              </View>

              <View className="flex-row justify-between py-4 border-b border-gray-100">
                 <View className="flex-row items-center">
                    <Text className="text-gray-500 font-medium w-32">Irrigation</Text>
                 </View>
                 <Text className="text-gray-900 font-bold flex-1 text-right">Drip</Text>
              </View>

              <View className="flex-row justify-between py-4">
                 <View className="flex-row items-center">
                    <Text className="text-gray-500 font-medium w-32">Area</Text>
                 </View>
                 <Text className="text-gray-900 font-bold flex-1 text-right">2.5 Acres</Text>
              </View>

           </View>

           <Button 
             title="Update Farm Details" 
             onPress={() => {}}
             className="bg-[#15803d]"
           />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
