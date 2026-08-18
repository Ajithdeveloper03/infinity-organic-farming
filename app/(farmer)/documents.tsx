import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, FileText, Download, Upload } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';

const documents = [
  { id: '1', title: 'Farming Agreement', size: 'PDF • 1.2 MB', date: 'Jan 12, 2025', type: 'agreements', color: '#15803d' },
  { id: '2', title: 'Land Document', size: 'PDF • 1.6 MB', date: 'Nov 20, 2024', type: 'land', color: '#15803d' },
  { id: '3', title: 'Aadhaar Card', size: 'PDF • 1.1 MB', date: 'Jun 08, 2024', type: 'other', color: '#3b82f6' },
  { id: '4', title: 'Bank Details', size: 'PDF • 0.8 MB', date: 'Jun 08, 2024', type: 'other', color: '#ef4444' },
];

export default function FarmerDocumentsScreen() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 bg-white flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-gotham-bold">Documents</Text>
      </View>

      <ScrollView className="flex-1 pb-24">
        
        {/* Tabs */}
        <View className="px-6 py-4 flex-row justify-between bg-white border-b border-gray-100">
          {['All', 'Agreements', 'Land', 'Other'].map((tab) => (
             <TouchableOpacity 
               key={tab}
               onPress={() => setActiveTab(tab)}
               className={`flex-1 items-center py-2 rounded-full ${activeTab === tab ? 'bg-[#15803d]' : 'bg-gray-100'} mx-1`}
             >
               <Text className={`font-gotham-bold text-[11px] ${activeTab === tab ? 'text-white' : 'text-gray-500'}`}>{tab}</Text>
             </TouchableOpacity>
          ))}
        </View>

        <View className="px-6 pt-6">
           
           {documents.map((doc) => (
             <View key={doc.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 flex-row items-center">
                <View className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl items-center justify-center mr-4">
                   <FileText size={24} color={doc.color} />
                </View>
                <View className="flex-1 pr-2">
                   <Text className="text-gray-900 font-gotham-bold text-base mb-1">{doc.title}</Text>
                   <Text className="text-gray-500 text-xs mb-1">{doc.size}</Text>
                   <Text className="text-gray-400 text-[10px]">{doc.date}</Text>
                </View>
                <TouchableOpacity className="w-10 h-10 items-center justify-center">
                   <Download size={20} color="#15803d" />
                </TouchableOpacity>
             </View>
           ))}

           <View className="mt-4">
             <Button 
               title="Upload Document" 
               onPress={() => {}}
               className="bg-[#15803d]"
               icon={<Upload size={20} color="#fff" className="mr-2" />}
             />
           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
