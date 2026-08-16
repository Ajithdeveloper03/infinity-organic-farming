import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, MessageSquare, Star, Info } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';

const complaints = [
  { id: '1', title: 'Water Supply Issue', date: 'May 12, 2025', status: 'Open', color: 'text-blue-600', bg: 'bg-blue-100', icon: 'text-blue-500' },
  { id: '2', title: 'Pathway Repair', date: 'May 05, 2025', status: 'In Progress', color: 'text-orange-600', bg: 'bg-orange-100', icon: 'text-orange-500' },
  { id: '3', title: 'Payment Delay', date: 'Apr 28, 2025', status: 'Resolved', color: 'text-green-600', bg: 'bg-green-100', icon: 'text-green-500' },
];

export default function FarmerSupportScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 bg-white flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-bold">My Complaints</Text>
      </View>

      <ScrollView className="flex-1 pb-24">
        <View className="px-6 pt-6">
           
           {complaints.map((item) => (
             <View key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
                <View className="flex-row justify-between items-start mb-2">
                   <View className="flex-row items-center">
                      <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3 border border-gray-100">
                         <MessageSquare size={20} color="#6b7280" />
                      </View>
                      <View>
                        <Text className="text-gray-900 font-bold text-base">{item.title}</Text>
                        <Text className={`font-bold text-xs mt-1 ${item.color}`}>{item.status}</Text>
                      </View>
                   </View>
                </View>
                <View className="pl-14">
                  <Text className="text-gray-400 text-xs">{item.date}</Text>
                </View>
             </View>
           ))}

           <View className="mt-6">
             <Button 
               title="Raise New Complaint" 
               onPress={() => {}}
               className="bg-[#15803d]"
             />
           </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
