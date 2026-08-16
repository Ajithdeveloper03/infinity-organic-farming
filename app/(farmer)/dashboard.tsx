import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { Bell, Calendar, Leaf, FileText, HeadphonesIcon, History, ChevronRight } from 'lucide-react-native';

export default function FarmerDashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ImageBackground 
        source={{uri: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1200&auto=format&fit=crop'}}
        className="flex-1 w-full h-full"
      >
        {/* Subtle dark gradient for legibility */}
        <View className="absolute inset-0 bg-black/30" />
        
        <ScrollView className="flex-1 pb-24 z-10">
          
          {/* Header */}
          <View className="px-6 pt-12 pb-6 flex-row justify-between items-center">
            <View className="flex-row items-center">
               <Image 
                  source={{uri: 'https://ui-avatars.com/api/?name=Kuppusamy&background=15803d&color=fff'}}
                  className="w-12 h-12 rounded-full mr-3 border-2 border-white/50 shadow-sm"
               />
               <View>
                  <Text className="text-white/80 text-sm font-medium">Good Morning,</Text>
                  <Text className="text-white text-xl font-bold tracking-tight">Kuppusamy <Text>👋</Text></Text>
               </View>
            </View>
            <TouchableOpacity onPress={() => router.push('/(farmer)/notifications')} className="relative p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/20 shadow-sm">
              <Bell size={20} color="#fff" />
              <View className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-transparent" />
            </TouchableOpacity>
          </View>

          <View className="px-6 pt-2">
            
            {/* New Glass Weather Widget */}
            <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 mb-8 flex-row justify-between items-center">
               <View>
                 <Text className="text-white/80 text-sm font-medium mb-1 flex-row items-center">
                   <Text>☀️ Sunny Day</Text>
                 </Text>
                 <Text className="text-white font-extrabold text-5xl">30°C</Text>
                 <Text className="text-white/60 text-xs mt-1">Somanur, Tamil Nadu</Text>
               </View>
               <View className="items-end space-y-2">
                 <View className="bg-white/10 px-3 py-1.5 rounded-full flex-row items-center border border-white/10">
                   <Text className="text-white text-xs font-bold mr-2">Humidity</Text>
                   <Text className="text-white/80 text-xs">68%</Text>
                 </View>
                 <View className="bg-white/10 px-3 py-1.5 rounded-full flex-row items-center border border-white/10">
                   <Text className="text-white text-xs font-bold mr-2">Wind</Text>
                   <Text className="text-white/80 text-xs">12 km/h</Text>
                 </View>
               </View>
            </View>

            {/* Farm Overview Card (Glass) */}
            <Text className="text-lg font-bold text-white mb-4 drop-shadow-md">Farm Overview</Text>
            <TouchableOpacity 
              onPress={() => router.push('/(farmer)/farm')}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 mb-8"
            >
              <View className="flex-row justify-between mb-2">
                <View>
                  <Text className="text-white font-bold text-3xl">2.5</Text>
                  <Text className="text-white/70 text-xs uppercase tracking-wider mt-1">Acres</Text>
                </View>
                <View className="w-px h-12 bg-white/20" />
                <View>
                  <Text className="text-white font-bold text-xl mt-2">Vetiver</Text>
                  <Text className="text-white/70 text-xs uppercase tracking-wider mt-1">Crop Type</Text>
                </View>
                <View className="w-px h-12 bg-white/20" />
                <View>
                  <Text className="text-[#a3e635] font-bold text-xl mt-2">Good</Text>
                  <Text className="text-white/70 text-xs uppercase tracking-wider mt-1">Crop Health</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Upcoming Visit (Glass) */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-white drop-shadow-md">Upcoming Visit</Text>
            </View>
            <View className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-white/20 mb-8 flex-row items-center justify-between">
               <View className="flex-row items-center flex-1">
                 <Image 
                    source={{uri: 'https://ui-avatars.com/api/?name=Arun+Kumar&background=e87111&color=fff'}}
                    className="w-12 h-12 rounded-full mr-4 border border-white/30"
                 />
                 <View>
                   <Text className="text-white font-bold text-base">Arun Kumar</Text>
                   <Text className="text-white/70 text-xs mt-0.5">May 28, 2025 • 10:30 AM</Text>
                   <Text className="text-white/50 text-[10px] uppercase mt-1 tracking-wider">Vetiver Farm - Block A</Text>
                 </View>
               </View>
               <View className="items-center bg-[#15803d]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                  <Text className="text-white font-bold text-xl">15</Text>
                  <Text className="text-white/90 text-[10px] uppercase font-bold tracking-wider mt-0.5">Days</Text>
               </View>
            </View>

            {/* Quick Actions (Glass) */}
            <Text className="text-lg font-bold text-white mb-4 drop-shadow-md">Quick Actions</Text>
            <View className="flex-row justify-between mb-8">
               {[
                 { icon: History, label: 'Visits', route: '/(farmer)/history' },
                 { icon: Leaf, label: 'Tips', route: '/(farmer)/recommendations' },
                 { icon: FileText, label: 'Docs', route: '/(farmer)/documents' },
                 { icon: HeadphonesIcon, label: 'Support', route: '/(farmer)/support' }
               ].map((action, idx) => {
                 const Icon = action.icon;
                 return (
                   <TouchableOpacity key={idx} onPress={() => router.push(action.route as any)} className="items-center w-1/4">
                      <View className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl items-center justify-center shadow-lg border border-white/20 mb-3">
                         <Icon size={28} color="#fff" />
                      </View>
                      <Text className="text-white/90 text-xs font-medium tracking-wide">{action.label}</Text>
                   </TouchableOpacity>
                 );
               })}
            </View>

            {/* Recent Updates (Glass) */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-white drop-shadow-md">Recent Updates</Text>
              <TouchableOpacity onPress={() => router.push('/(farmer)/notifications')} className="bg-white/10 px-3 py-1 rounded-full border border-white/10">
                 <Text className="text-white text-xs font-bold">View All</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              onPress={() => router.push('/(farmer)/history')}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-white/20 mb-4 flex-row items-center"
            >
               <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-4 border border-white/10">
                 <FileText size={20} color="#fff" />
               </View>
               <View className="flex-1">
                 <Text className="text-white font-bold text-base mb-1">Visit Report Submitted</Text>
                 <Text className="text-white/70 text-xs leading-4">Arun Kumar has submitted a report for your last visit.</Text>
               </View>
               <Text className="text-white/50 text-[10px] uppercase font-bold tracking-wider ml-2">Aug 12</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
