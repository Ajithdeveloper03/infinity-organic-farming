import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

const reports = [
  { id: '1', name: 'Kuppusamy', date: 'Aug 12, 2025', location: 'Block A', status: 'Completed', statusColor: 'text-green-700', image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=200&auto=format&fit=crop' },
  { id: '2', name: 'Subramani', date: 'Aug 10, 2025', location: 'Block D', status: 'Completed', statusColor: 'text-green-700', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=200&auto=format&fit=crop' },
  { id: '3', name: 'Muthuvel', date: 'Aug 08, 2025', location: 'Block C', status: 'Completed', statusColor: 'text-green-700', image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=200&auto=format&fit=crop' },
  { id: '4', name: 'Perumal', date: 'Aug 05, 2025', location: 'Block B', status: 'Pending', statusColor: 'text-[#e87111]', image: 'https://images.unsplash.com/photo-1599427301097-6a4a11b6d176?q=80&w=200&auto=format&fit=crop' },
];

export default function ReportsScreen() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 flex-row items-center bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-4">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-gotham-bold">Reports</Text>
      </View>

      <ScrollView className="flex-1">
        
        {/* Tabs */}
        <View className="flex-row justify-between px-6 py-6">
          {['All', 'This Week', 'This Month'].map(tab => (
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
          {reports.map((report) => (
            <TouchableOpacity 
              key={report.id}
              className="bg-white rounded-2xl p-4 flex-row items-center mb-4 shadow-sm border border-gray-50"
            >
               <Image 
                 source={{uri: report.image}}
                 className="w-16 h-16 rounded-xl mr-4"
               />
               
               <View className="flex-1">
                 <View className="flex-row justify-between items-start mb-1">
                   <Text className="text-gray-900 font-gotham-bold text-base">{report.name}</Text>
                   <Text className={`${report.statusColor} font-gotham-bold text-xs`}>{report.status}</Text>
                 </View>
                 <Text className="text-gray-500 text-xs mb-1 font-brandon">{report.location}</Text>
                 <Text className="text-gray-400 text-[10px] font-brandon">{report.date}</Text>
               </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
