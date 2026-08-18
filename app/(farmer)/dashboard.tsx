import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Bell, Calendar, Leaf, FileText, HeadphonesIcon, History, ChevronRight, CloudSun, Wind, Droplets, Star } from 'lucide-react-native';

export default function FarmerDashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 pb-24" showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View className="px-6 pt-12 pb-6 flex-row justify-between items-center bg-white shadow-sm mb-6 rounded-b-3xl">
          <View className="flex-row items-center">
             <Image 
                source={{uri: 'https://ui-avatars.com/api/?name=Kuppusamy&background=15803d&color=fff'}}
                className="w-14 h-14 rounded-full mr-4 border-2 border-green-100"
             />
             <View>
                <Text className="text-gray-500 text-sm font-brandon-medium">Good Morning,</Text>
                <Text className="text-gray-900 text-xl font-gotham-bold tracking-tight">Kuppusamy 👋</Text>
             </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/(farmer)/notifications')} className="relative p-3 bg-gray-50 rounded-full">
            <Bell size={20} color="#374151" />
            <View className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
          </TouchableOpacity>
        </View>

        <View className="px-6">
          

          {/* Farm Overview Card */}
          <Text className="text-lg font-gotham-bold text-gray-900 mb-4">Farm Overview</Text>
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => router.push('/(farmer)/profile')}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8"
          >
            <View className="flex-row justify-between mb-2">
              <View className="items-center">
                <Text className="text-gray-900 font-gotham-bold text-3xl">2.5</Text>
                <Text className="text-gray-400 text-xs uppercase tracking-wider mt-1">Acres</Text>
              </View>
              <View className="w-px h-12 bg-gray-200" />
              <View className="items-center">
                <Text className="text-gray-900 font-gotham-bold text-xl mt-2">Vetiver</Text>
                <Text className="text-gray-400 text-xs uppercase tracking-wider mt-1">Crop Type</Text>
              </View>
              <View className="w-px h-12 bg-gray-200" />
              <View className="items-center">
                <Text className="text-[#15803d] font-gotham-bold text-xl mt-2">Good</Text>
                <Text className="text-gray-400 text-xs uppercase tracking-wider mt-1">Crop Health</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Upcoming Visit */}
          <Text className="text-lg font-gotham-bold text-gray-900 mb-4">Upcoming Visit</Text>
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-8">
             <View className="flex-row justify-between items-start mb-4">
               <View className="flex-row items-center flex-1">
                 <Image 
                    source={{uri: 'https://ui-avatars.com/api/?name=Arun+Kumar&background=ea580c&color=fff'}}
                    className="w-12 h-12 rounded-full mr-4"
                 />
                 <View>
                   <Text className="text-gray-900 font-gotham-bold text-base">Arun Kumar</Text>
                   <Text className="text-gray-500 text-xs mt-0.5">May 28, 2025 • 10:30 AM</Text>
                   <Text className="text-gray-400 text-[10px] uppercase mt-1 tracking-wider">Vetiver Farm - Block A</Text>
                 </View>
               </View>
               <View className="items-center bg-green-50 px-4 py-2 rounded-2xl">
                  <Text className="text-[#15803d] font-gotham-bold text-xl">15</Text>
                  <Text className="text-[#15803d] text-[10px] uppercase font-gotham-bold tracking-wider mt-0.5">Days</Text>
               </View>
             </View>
             <TouchableOpacity 
               activeOpacity={0.9}
               className="w-full bg-[#15803d] py-3 rounded-xl items-center"
             >
               <Text className="text-white font-gotham-bold">View Visit Details</Text>
             </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <Text className="text-lg font-gotham-bold text-gray-900 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between mb-8">
             {[
               { icon: History, label: 'Visits', route: '/(farmer)/history', color: '#15803d', bgHex: '#f0fdf4' },
               { icon: Leaf, label: 'Reports', route: '/(farmer)/recommendations', color: '#ea580c', bgHex: '#fff7ed' },
               { icon: Star, label: 'Rate FO', route: '/(farmer)/rate/v1', color: '#eab308', bgHex: '#fefce8' },
               { icon: HeadphonesIcon, label: 'Support', route: '/(farmer)/support', color: '#374151', bgHex: '#f3f4f6' }
             ].map((action, idx) => {
               const Icon = action.icon;
               return (
                 <TouchableOpacity key={idx} activeOpacity={0.8} onPress={() => router.push(action.route as any)} className="items-center w-1/4">
                    <View className="w-14 h-14 rounded-2xl items-center justify-center mb-2" style={{ backgroundColor: action.bgHex }}>
                       <Icon size={24} color={action.color} />
                    </View>
                    <Text className="text-gray-600 text-xs font-brandon-medium">{action.label}</Text>
                 </TouchableOpacity>
               );
             })}
          </View>

          {/* Recent Updates */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-gotham-bold text-gray-900">Recent Updates</Text>
            <TouchableOpacity onPress={() => router.push('/(farmer)/history')} className="bg-gray-100 px-3 py-1 rounded-full">
               <Text className="text-gray-600 text-xs font-gotham-bold">View All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-4">
             <View className="flex-row items-center mb-3">
               <View className="w-12 h-12 bg-green-50 rounded-full items-center justify-center mr-4">
                 <FileText size={20} color="#15803d" />
               </View>
               <View className="flex-1">
                 <Text className="text-gray-900 font-gotham-bold text-base mb-1">Visit Report Submitted</Text>
                 <Text className="text-gray-500 text-xs leading-4">Arun Kumar has submitted a report for your last visit.</Text>
               </View>
               <Text className="text-gray-400 text-[10px] uppercase font-gotham-bold tracking-wider ml-2">Aug 12</Text>
             </View>
             
             <View className="flex-row space-x-3 mt-2">
               <TouchableOpacity 
                 activeOpacity={0.8}
                 onPress={() => router.push('/(farmer)/recommendations')}
                 className="flex-1 bg-green-50 py-3 rounded-xl items-center border border-green-100"
               >
                 <Text className="text-[#15803d] font-gotham-bold text-xs">View Report</Text>
               </TouchableOpacity>
               <TouchableOpacity 
                 activeOpacity={0.8}
                 onPress={() => router.push('/(farmer)/rate/v1')}
                 className="flex-1 bg-orange-50 py-3 rounded-xl items-center border border-orange-100"
               >
                 <Text className="text-[#ea580c] font-gotham-bold text-xs">Rate Visit</Text>
               </TouchableOpacity>
             </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
