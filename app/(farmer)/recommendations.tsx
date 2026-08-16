import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Droplets, Leaf, Sprout, Bug } from 'lucide-react-native';

const recommendations = [
  { id: '1', category: 'Irrigation', title: 'Irrigation Management', desc: 'Maintain regular irrigation for better root growth.', icon: Droplets, color: '#3b82f6', bg: 'bg-blue-50' },
  { id: '2', category: 'Soil', title: 'Organic Manure', desc: 'Apply compost or FYM every 45 days.', icon: Leaf, color: '#15803d', bg: 'bg-green-50' },
  { id: '3', category: 'Weed', title: 'Weed Management', desc: 'Remove weeds regularly to increase yield.', icon: Sprout, color: '#e87111', bg: 'bg-orange-50' },
  { id: '4', category: 'Pest', title: 'Pest Control', desc: 'Use neem oil spray for natural pest control.', icon: Bug, color: '#ef4444', bg: 'bg-red-50' },
];

export default function FarmerRecommendationsScreen() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 bg-white flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-bold">Farming Recommendations</Text>
      </View>

      <ScrollView className="flex-1 pb-24">
        
        {/* Tabs */}
        <View className="px-6 py-4 flex-row justify-between bg-white border-b border-gray-100">
          {['All', 'Vetiver', 'Irrigation', 'Soil'].map((tab) => (
             <TouchableOpacity 
               key={tab}
               onPress={() => setActiveTab(tab)}
               className={`flex-1 items-center py-2 rounded-full ${activeTab === tab ? 'bg-[#15803d]' : 'bg-gray-100'} mx-1`}
             >
               <Text className={`font-bold text-[11px] ${activeTab === tab ? 'text-white' : 'text-gray-500'}`}>{tab}</Text>
             </TouchableOpacity>
          ))}
        </View>

        <View className="px-6 pt-6">
           <Text className="text-lg font-bold text-gray-900 mb-6">Farming Tips</Text>
           
           {recommendations.map((item) => {
             const Icon = item.icon;
             return (
               <View key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 flex-row items-center">
                  <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${item.bg}`}>
                     <Icon size={24} color={item.color} />
                  </View>
                  <View className="flex-1 pr-2">
                     <Text className="text-gray-900 font-bold text-base mb-1">{item.title}</Text>
                     <Text className="text-gray-500 text-xs leading-4">{item.desc}</Text>
                  </View>
               </View>
             );
           })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
