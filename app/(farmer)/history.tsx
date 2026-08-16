import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, FileText, CheckCircle, Clock } from 'lucide-react-native';

const history = [
  { id: '1', name: 'Arun Kumar', initial: 'AK', date: 'May 11, 2025 • 10:30 AM', location: 'Vetiver Farm - Block A', status: 'Completed', type: 'completed' },
  { id: '2', name: 'Arun Kumar', initial: 'AK', date: 'Apr 26, 2025 • 10:15 AM', location: 'Vetiver Farm - Block A', status: 'Completed', type: 'completed' },
  { id: '3', name: 'Suresh Raj', initial: 'SR', date: 'Apr 11, 2025 • 11:00 AM', location: 'Vetiver Farm - Block A', status: 'Completed', type: 'completed' },
];

export default function FarmerHistoryScreen() {
  const [activeTab, setActiveTab] = React.useState('All');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-12 pb-4 bg-white flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-bold">Visit History</Text>
      </View>

      <ScrollView className="flex-1 pb-24">
        
        {/* Tabs */}
        <View className="px-6 py-4 flex-row justify-between bg-white border-b border-gray-100">
          {['All', 'Upcoming', 'Completed'].map((tab) => (
             <TouchableOpacity 
               key={tab}
               onPress={() => setActiveTab(tab)}
               className={`flex-1 items-center py-2 rounded-full ${activeTab === tab ? 'bg-[#15803d]' : 'bg-gray-100'} mx-1`}
             >
               <Text className={`font-bold ${activeTab === tab ? 'text-white' : 'text-gray-500'}`}>{tab}</Text>
             </TouchableOpacity>
          ))}
        </View>

        <View className="px-6 pt-6">
          {history.map((visit) => (
            <View key={visit.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
               <View className="flex-row justify-between items-start mb-3">
                 <View className="flex-row items-center">
                   <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                     <Text className="text-[#15803d] font-bold">{visit.initial}</Text>
                   </View>
                   <View>
                     <Text className="text-gray-900 font-bold">{visit.name}</Text>
                     <Text className="text-gray-500 text-xs">{visit.date}</Text>
                     <Text className="text-gray-400 text-xs">{visit.location}</Text>
                   </View>
                 </View>
                 <View className="bg-green-50 px-2 py-1 rounded">
                   <Text className="text-[#15803d] text-[10px] font-bold">{visit.status}</Text>
                 </View>
               </View>

               <TouchableOpacity 
                 onPress={() => router.push(`/(farmer)/visit/${visit.id}`)}
                 className="flex-row items-center justify-end pt-2 border-t border-gray-50"
               >
                 <Text className="text-gray-500 text-xs font-bold mr-1">View Report</Text>
                 <ChevronLeft size={16} color="#6b7280" style={{ transform: [{ rotate: '180deg' }] }} />
               </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
