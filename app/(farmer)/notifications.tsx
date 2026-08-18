import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Bell, Calendar, FileText, Leaf, IndianRupee } from 'lucide-react-native';

const notifications = [
  { id: '1', title: 'Upcoming Visit Reminder', desc: 'Arun Kumar will visit your farm on May 28, 2025.', time: '15m ago', icon: Calendar, color: '#ea580c', bg: 'bg-orange-50' },
  { id: '2', title: 'Visit Report Submitted', desc: 'Arun Kumar has submitted the visit report.', time: '2h ago', icon: FileText, color: '#3b82f6', bg: 'bg-blue-50' },
  { id: '3', title: 'Irrigation Recommendation', desc: 'New recommendation available for your farm.', time: '1d ago', icon: Leaf, color: '#15803d', bg: 'bg-green-50' },
  { id: '4', title: 'Payment Received', desc: '₹5,000 received on May 10, 2025 for last cycle.', time: '2d ago', icon: IndianRupee, color: '#15803d', bg: 'bg-green-50' },
];

export default function FarmerNotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 bg-white flex-row items-center justify-between border-b border-gray-100">
        <View className="flex-row items-center">
           <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2">
              <ChevronLeft size={24} color="#000" />
           </TouchableOpacity>
           <Text className="text-gray-900 text-lg font-gotham-bold">Notifications</Text>
        </View>
        <TouchableOpacity>
           <Text className="text-[#15803d] font-gotham-bold text-sm">Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 pb-24">
        <View className="px-6 pt-6">
           
           {notifications.map((notif) => {
             const Icon = notif.icon;
             return (
               <View key={notif.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 flex-row">
                  <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 mt-1 ${notif.bg}`}>
                     <Icon size={24} color={notif.color} />
                  </View>
                  <View className="flex-1">
                     <View className="flex-row justify-between items-start mb-1">
                        <Text className="text-gray-900 font-gotham-bold text-base flex-1 pr-2">{notif.title}</Text>
                        <Text className="text-gray-400 text-xs mt-1">{notif.time}</Text>
                     </View>
                     <Text className="text-gray-500 text-sm leading-5">{notif.desc}</Text>
                  </View>
               </View>
             );
           })}

           <TouchableOpacity className="bg-gray-100 py-4 rounded-xl items-center mt-4">
              <Text className="text-gray-600 font-gotham-bold">Mark all as read</Text>
           </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
