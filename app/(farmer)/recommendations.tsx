import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Droplets, Leaf, Sprout, Bug, FileText, Calendar, Camera } from 'lucide-react-native';

const generalTips = [
  { id: '1', category: 'Irrigation', title: 'Irrigation Management', desc: 'Maintain regular irrigation for better root growth.', icon: Droplets, color: '#3b82f6', bg: 'bg-blue-50' },
  { id: '2', category: 'Soil', title: 'Organic Manure', desc: 'Apply compost or FYM every 45 days.', icon: Leaf, color: '#15803d', bg: 'bg-green-50' },
  { id: '3', category: 'Weed', title: 'Weed Management', desc: 'Remove weeds regularly to increase yield.', icon: Sprout, color: '#ea580c', bg: 'bg-orange-50' },
  { id: '4', category: 'Pest', title: 'Pest Control', desc: 'Use neem oil spray for natural pest control.', icon: Bug, color: '#ef4444', bg: 'bg-red-50' },
];

const visitReports = [
  { id: '101', date: 'Aug 12, 2025', officer: 'Arun Kumar', status: 'Good', recommendation: 'Crop health is excellent. Continue current irrigation schedule. Applied bio-fertilizer today.', hasPhotos: true },
  { id: '102', date: 'Jul 28, 2025', officer: 'Arun Kumar', status: 'Average', recommendation: 'Noticed slight weed growth. Recommended immediate weeding. Provided organic weedicide.', hasPhotos: false },
];

export default function FarmerRecommendationsScreen() {
  const [activeTab, setActiveTab] = useState<'reports' | 'tips'>('reports');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 bg-white flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-gotham-bold">Reports & Recommendations</Text>
      </View>

      <ScrollView className="flex-1 pb-24" showsVerticalScrollIndicator={false}>
        
        {/* Tab Switcher */}
        <View className="flex-row mx-6 mt-6 bg-gray-200/50 p-1 rounded-2xl mb-6">
          <TouchableOpacity 
            onPress={() => setActiveTab('reports')}
            activeOpacity={0.8}
            className={`flex-1 py-3 items-center rounded-xl ${activeTab === 'reports' ? 'bg-white shadow-sm' : ''}`}
          >
            <Text className={`font-gotham-bold text-sm ${activeTab === 'reports' ? 'text-[#15803d]' : 'text-gray-500'}`}>Visit Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('tips')}
            activeOpacity={0.8}
            className={`flex-1 py-3 items-center rounded-xl ${activeTab === 'tips' ? 'bg-white shadow-sm' : ''}`}
          >
            <Text className={`font-gotham-bold text-sm ${activeTab === 'tips' ? 'text-[#15803d]' : 'text-gray-500'}`}>General Tips</Text>
          </TouchableOpacity>
        </View>

        <View className="px-6">
           {activeTab === 'reports' && (
             <View>
               {visitReports.map((report) => (
                 <View key={report.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-4">
                    <View className="flex-row justify-between items-center mb-3 pb-3 border-b border-gray-50">
                      <View className="flex-row items-center">
                        <Calendar size={16} color="#6b7280" className="mr-2" />
                        <Text className="text-gray-900 font-gotham-bold">{report.date}</Text>
                      </View>
                      <View className={`px-3 py-1 rounded-full ${report.status === 'Good' ? 'bg-green-50' : 'bg-yellow-50'}`}>
                        <Text className={`${report.status === 'Good' ? 'text-[#15803d]' : 'text-yellow-600'} text-xs font-gotham-bold`}>{report.status}</Text>
                      </View>
                    </View>
                    
                    <View className="mb-4">
                      <Text className="text-gray-400 text-xs font-brandon-medium mb-1">Field Officer</Text>
                      <Text className="text-gray-900 font-gotham-bold text-sm">{report.officer}</Text>
                    </View>

                    <View className="bg-gray-50 p-4 rounded-2xl mb-4 border border-gray-100">
                      <Text className="text-gray-400 text-xs font-brandon-medium mb-2">Officer's Recommendation</Text>
                      <Text className="text-gray-700 font-brandon text-sm leading-5">{report.recommendation}</Text>
                    </View>

                    {report.hasPhotos && (
                      <View className="flex-row items-center">
                        <Camera size={16} color="#15803d" className="mr-2" />
                        <Text className="text-[#15803d] font-gotham-bold text-xs">2 Photos Attached</Text>
                      </View>
                    )}
                 </View>
               ))}
             </View>
           )}

           {activeTab === 'tips' && (
             <View>
               {generalTips.map((item) => {
                 const Icon = item.icon;
                 return (
                   <View key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 flex-row items-center">
                      <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${item.bg}`}>
                         <Icon size={24} color={item.color} />
                      </View>
                      <View className="flex-1 pr-2">
                         <Text className="text-gray-900 font-gotham-bold text-base mb-1">{item.title}</Text>
                         <Text className="text-gray-500 text-xs leading-4">{item.desc}</Text>
                      </View>
                   </View>
                 );
               })}
             </View>
           )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
