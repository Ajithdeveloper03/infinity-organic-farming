import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight, User, CalendarDays, MapPin, FileText, Menu } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 flex-row items-center justify-between bg-white border-b border-gray-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-4">
             <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-lg font-gotham-bold">Profile</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(employee)/menu')} className="p-2 -mr-2">
           <Menu size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        
        {/* Profile Card */}
        <View className="items-center bg-white py-8 border-b border-gray-100 shadow-sm mb-6">
           <Image 
             source={{uri: 'https://ui-avatars.com/api/?name=Ramesh+Kumar&background=396216&color=fff&size=200'}}
             className="w-24 h-24 rounded-full mb-4"
           />
           <Text className="text-gray-900 text-xl font-gotham-bold mb-1">Ramesh Kumar</Text>
           <Text className="text-gray-500 text-sm mb-4 font-brandon">Field Officer</Text>
           
           <View className="flex-row items-center mb-2">
             <Text className="text-gray-400 text-xs w-16 font-brandon">Phone</Text>
             <Text className="text-gray-900 font-brandon-medium">+91 98765 43210</Text>
           </View>
           <View className="flex-row items-center">
             <Text className="text-gray-400 text-xs w-16 font-brandon">Email</Text>
             <Text className="text-gray-900 font-brandon-medium">ramesh.kumar@infinity.com</Text>
           </View>
        </View>

        {/* Menu Items */}
        <View className="bg-white rounded-2xl mx-6 shadow-sm border border-gray-50 overflow-hidden mb-24">
          
          <TouchableOpacity 
            onPress={() => router.push('/(employee)/edit-profile')}
            className="flex-row items-center p-4 border-b border-gray-100"
          >
             <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-4">
                <User size={20} color="#374151" />
             </View>
             <Text className="flex-1 text-gray-900 font-brandon-medium">My Profile</Text>
             <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/(employee)/attendance')}
            className="flex-row items-center p-4 border-b border-gray-100"
          >
             <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-4">
                <CalendarDays size={20} color="#374151" />
             </View>
             <Text className="flex-1 text-gray-900 font-brandon-medium">Attendance</Text>
             <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/(employee)/visits')}
            className="flex-row items-center p-4 border-b border-gray-100"
          >
             <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-4">
                <MapPin size={20} color="#374151" />
             </View>
             <Text className="flex-1 text-gray-900 font-brandon-medium">My Visits</Text>
             <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/(employee)/reports')}
            className="flex-row items-center p-4"
          >
             <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-4">
                <FileText size={20} color="#374151" />
             </View>
             <Text className="flex-1 text-gray-900 font-brandon-medium">Reports</Text>
             <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
