import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight, User, Leaf, History, FileText, Lightbulb, MessageSquare, HeadphonesIcon, Settings, LogOut } from 'lucide-react-native';

const menuItems = [
  { id: '1', title: 'My Profile', icon: User, route: '/(farmer)/profile' },
  { id: '2', title: 'My Farm Details', icon: Leaf, route: '/(farmer)/farm' },
  { id: '3', title: 'Visit History', icon: History, route: '/(farmer)/history' },
  { id: '4', title: 'Visit Reports', icon: FileText, route: '/(farmer)/history' },
  { id: '5', title: 'Farming Tips', icon: Lightbulb, route: '/(farmer)/recommendations' },
  { id: '6', title: 'Documents', icon: FileText, route: '/(farmer)/documents' },
  { id: '7', title: 'Complaints', icon: MessageSquare, route: '/(farmer)/support' },
  { id: '8', title: 'Support', icon: HeadphonesIcon, route: '/(farmer)/support' },
  { id: '9', title: 'Settings', icon: Settings, route: null },
];

export default function FarmerMenuScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 bg-white flex-row items-center border-b border-gray-100 justify-center">
        <Text className="text-gray-900 text-lg font-gotham-bold">Menu</Text>
      </View>

      <ScrollView className="flex-1 pb-24">
        
        <View className="bg-white rounded-2xl mx-6 mt-6 shadow-sm border border-gray-50 mb-6 overflow-hidden">
           
           {menuItems.map((item) => {
             const Icon = item.icon;
             return (
               <TouchableOpacity 
                 key={item.id}
                 onPress={() => {
                   if (item.route) router.push(item.route as any);
                 }}
                 className="flex-row items-center p-4 border-b border-gray-50"
               >
                  <Icon size={20} color="#374151" className="mr-4" />
                  <Text className="flex-1 text-gray-900 font-brandon-medium">{item.title}</Text>
                  <ChevronRight size={20} color="#d1d5db" />
               </TouchableOpacity>
             );
           })}

           <TouchableOpacity onPress={() => router.replace('/intro')} className="flex-row items-center p-4">
              <LogOut size={20} color="#dc2626" className="mr-4" />
              <Text className="flex-1 text-red-600 font-gotham-bold">Logout</Text>
           </TouchableOpacity>

        </View>

        {/* Promo Banner */}
        <View className="px-6 mb-12">
          <TouchableOpacity className="h-32 rounded-3xl overflow-hidden shadow-sm">
             <ImageBackground 
                source={{uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop'}}
                className="w-full h-full justify-end p-5"
             >
                <View className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <Text className="text-white font-gotham-bold text-lg relative z-10">Healthy Vetiver</Text>
                <Text className="text-green-300 text-sm relative z-10">Better Soil. Better Future.</Text>
             </ImageBackground>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
