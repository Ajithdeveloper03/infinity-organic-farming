import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, UserPlus } from 'lucide-react-native';
import { mockVisits, getVisitWithFarmer } from '../../data/mockData';

export default function VisitsScreen() {
  const [activeTab, setActiveTab] = useState('Today');

  // Filter visits based on active tab
  const getFilteredVisits = () => {
    const todayStr = 'Aug 12, 2025'; // Mocked 'Today'
    let filteredIds: string[] = [];
    
    if (activeTab === 'Today') {
      filteredIds = mockVisits.filter(v => v.date === todayStr).map(v => v.id);
    } else if (activeTab === 'Upcoming') {
      filteredIds = mockVisits.filter(v => v.status === 'upcoming' || (v.status === 'pending' && v.date !== todayStr)).map(v => v.id);
    } else if (activeTab === 'Completed') {
      filteredIds = mockVisits.filter(v => v.status === 'completed').map(v => v.id);
    }

    return filteredIds.map(id => getVisitWithFarmer(id)).filter(v => v !== null);
  };

  const filteredVisits = getFilteredVisits();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 flex-row justify-between items-center bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2" activeOpacity={0.7}>
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-gotham-bold">Visit List</Text>
        <TouchableOpacity 
          onPress={() => router.push('/(employee)/register-farmer/step1')}
          className="p-2 -mr-2"
          activeOpacity={0.7}
        >
           <UserPlus size={24} color="#15803d" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        
        {/* Horizontal Scrollable Tabs */}
        <View className="py-6">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
          >
            {['Today', 'Upcoming', 'Completed'].map(tab => (
              <TouchableOpacity 
                key={tab}
                activeOpacity={0.8}
                onPress={() => setActiveTab(tab)}
                className={`py-2 px-6 rounded-full ${activeTab === tab ? 'bg-[#15803d]' : 'bg-white border border-gray-200 shadow-sm'}`}
              >
                <Text className={`font-gotham-bold text-sm ${activeTab === tab ? 'text-white' : 'text-gray-500'}`}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* List */}
        <View className="px-6 pb-24">
          {filteredVisits.length > 0 ? (
            filteredVisits.map((visit: any) => (
              <TouchableOpacity 
                key={visit.id}
                activeOpacity={0.8}
                onPress={() => router.push(`/(employee)/visit/${visit.id}`)}
                className="bg-white rounded-2xl p-4 flex-row items-center mb-4 shadow-sm border border-gray-50"
              >
                 <View className={`w-12 h-12 rounded-full ${visit.status === 'completed' ? 'bg-green-700' : visit.status === 'upcoming' ? 'bg-blue-600' : 'bg-orange-500'} items-center justify-center mr-4`}>
                   <Text className="text-white font-gotham-bold text-xl">{visit.farmer?.name.charAt(0)}</Text>
                 </View>
                 
                 <View className="flex-1">
                   <View className="flex-row justify-between items-center mb-1">
                     <Text className="text-gray-900 font-gotham-bold text-base">{visit.farmer?.name}</Text>
                     <Text className="text-gray-900 font-gotham-bold text-sm">{visit.time} &gt;</Text>
                   </View>
                   <View className="flex-row justify-between items-center mt-1">
                     <Text className="text-gray-500 text-xs font-brandon" numberOfLines={1}>{visit.farmer?.address}</Text>
                     <Text className={`${visit.status === 'completed' ? 'text-green-700' : visit.status === 'upcoming' ? 'text-blue-600' : 'text-orange-500'} font-gotham-bold text-xs uppercase`}>
                       {visit.status}
                     </Text>
                   </View>
                 </View>
              </TouchableOpacity>
            ))
          ) : (
            <View className="items-center justify-center py-10">
              <Text className="text-gray-500 font-brandon text-base">No visits found for this category.</Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
