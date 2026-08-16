import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight, User, LogOut, MapPin, Shield } from 'lucide-react-native';

export default function FarmerProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 bg-white flex-row items-center justify-center border-b border-gray-100">
        <Text className="text-gray-900 text-lg font-bold">My Profile</Text>
      </View>

      <ScrollView className="flex-1 pb-24">
        
        {/* Banner and Profile Card */}
        <View className="bg-white mx-6 mt-6 rounded-3xl overflow-hidden shadow-sm border border-gray-100">
           {/* Top Landscape Banner */}
           <View className="h-32 bg-gray-200">
             <Image 
               source={{uri: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop'}}
               className="w-full h-full"
             />
           </View>

           {/* Profile Picture (overlapping) */}
           <View className="items-center -mt-12 mb-3">
             <View className="w-24 h-24 bg-white rounded-full p-1 shadow-sm">
                <Image 
                  source={{uri: 'https://ui-avatars.com/api/?name=Kuppusamy&background=15803d&color=fff&size=200'}}
                  className="w-full h-full rounded-full"
                />
             </View>
           </View>

           {/* Details */}
           <View className="items-center px-6 mb-6">
             <Text className="text-gray-900 text-xl font-bold mb-1">Kuppusamy</Text>
             <Text className="text-gray-500 font-medium mb-6">Farmer ID: FM10008</Text>

             <View className="w-full">
               <View className="flex-row items-center py-3 border-b border-gray-50">
                 <View className="w-8 h-8 rounded-full items-center justify-center mr-3">
                   <Text>📱</Text>
                 </View>
                 <View>
                   <Text className="text-gray-400 text-xs">Mobile Number</Text>
                   <Text className="text-gray-900 font-medium">+91 98765 43210</Text>
                 </View>
               </View>

               <View className="flex-row items-center py-3 border-b border-gray-50">
                 <View className="w-8 h-8 rounded-full items-center justify-center mr-3">
                   <Text>📍</Text>
                 </View>
                 <View>
                   <Text className="text-gray-400 text-xs">Village</Text>
                   <Text className="text-gray-900 font-medium">Somanur</Text>
                 </View>
               </View>

               <View className="flex-row items-center py-3 border-b border-gray-50">
                 <View className="w-8 h-8 rounded-full items-center justify-center mr-3">
                   <Text>🏢</Text>
                 </View>
                 <View>
                   <Text className="text-gray-400 text-xs">Block</Text>
                   <Text className="text-gray-900 font-medium">Coimbatore</Text>
                 </View>
               </View>

               <View className="flex-row items-center py-3 mb-4">
                 <View className="w-8 h-8 rounded-full items-center justify-center mr-3">
                   <Text>📏</Text>
                 </View>
                 <View>
                   <Text className="text-gray-400 text-xs">Area</Text>
                   <Text className="text-gray-900 font-medium">2.5 Acres</Text>
                 </View>
               </View>
             </View>

             <TouchableOpacity className="w-full bg-[#15803d] py-4 rounded-xl items-center">
               <Text className="text-white font-bold">Edit Profile</Text>
             </TouchableOpacity>

           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
