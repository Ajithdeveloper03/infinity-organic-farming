import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, UserPlus } from 'lucide-react-native';

const visits = [
  { id: '1', name: 'Kuppusamy', time: '10:30 AM', location: 'Vetiver Farm - Block A', status: 'Pending', initial: 'K', color: 'bg-green-700' },
  { id: '2', name: 'Subramani', time: '01:00 PM', location: 'Vetiver Farm - Block D', status: 'Pending', initial: 'S', color: 'bg-green-600' },
  { id: '3', name: 'Muthuvel', time: '03:30 PM', location: 'Vetiver Farm - Block C', status: 'Pending', initial: 'M', color: 'bg-green-500' },
];

export default function VisitsScreen() {
  const [activeTab, setActiveTab] = useState('Today');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 flex-row justify-between items-center bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-gotham-bold">Today&apos;s Visit List</Text>
        <TouchableOpacity 
          onPress={() => router.push('/(employee)/register-farmer/step1')}
          className="p-2 -mr-2"
        >
           <UserPlus size={24} color="#396216" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        
        {/* Tabs */}
        <View className="flex-row justify-between px-6 py-6">
          {['Today', 'Upcoming', 'Completed'].map(tab => (
            <TouchableOpacity 
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`py-2 px-6 rounded-full ${activeTab === tab ? 'bg-[#396216]' : 'bg-gray-100'}`}
            >
              <Text className={`font-gotham-bold text-sm ${activeTab === tab ? 'text-white' : 'text-gray-500'}`}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* List */}
        <View className="px-6 pb-24">
          {visits.map((visit) => (
            <TouchableOpacity 
              key={visit.id}
              onPress={() => router.push(`/(employee)/visit/${visit.id}`)}
              className="bg-white rounded-2xl p-4 flex-row items-center mb-4 shadow-sm border border-gray-50"
            >
               <View className={`w-12 h-12 rounded-full ${visit.color} items-center justify-center mr-4`}>
                 <Text className="text-white font-gotham-bold text-xl">{visit.initial}</Text>
               </View>
               
               <View className="flex-1">
                 <View className="flex-row justify-between items-center mb-1">
                   <Text className="text-gray-900 font-gotham-bold text-base">{visit.name}</Text>
                   <Text className="text-gray-900 font-gotham-bold text-sm">{visit.time} &gt;</Text>
                 </View>
                 <View className="flex-row justify-between items-center mt-1">
                   <Text className="text-gray-500 text-xs font-brandon">{visit.location}</Text>
                   <Text className="text-[#e87111] font-gotham-bold text-xs">{visit.status}</Text>
                 </View>
               </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
