import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight, User, CalendarDays, MapPin, FileText, CloudOff, PhoneCall, Settings, LogOut } from 'lucide-react-native';

export default function MenuScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 flex-row items-center border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-4">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-gotham-bold">Menu</Text>
      </View>

      <ScrollView className="flex-1 bg-white pt-4">
        
        <View className="px-6 mb-12">
          
          <TouchableOpacity onPress={() => router.push('/(employee)/edit-profile')} className="flex-row items-center py-4 border-b border-gray-100">
             <User size={20} color="#374151" className="mr-4" />
             <Text className="flex-1 text-gray-900 font-brandon-medium">My Profile</Text>
             <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(employee)/attendance')} className="flex-row items-center py-4 border-b border-gray-100">
             <CalendarDays size={20} color="#374151" className="mr-4" />
             <Text className="flex-1 text-gray-900 font-brandon-medium">Attendance</Text>
             <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(employee)/visits')} className="flex-row items-center py-4 border-b border-gray-100">
             <MapPin size={20} color="#374151" className="mr-4" />
             <Text className="flex-1 text-gray-900 font-brandon-medium">My Visits</Text>
             <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(employee)/reports')} className="flex-row items-center py-4 border-b border-gray-100">
             <FileText size={20} color="#374151" className="mr-4" />
             <Text className="flex-1 text-gray-900 font-brandon-medium">Reports</Text>
             <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100">
             <CloudOff size={20} color="#374151" className="mr-4" />
             <Text className="flex-1 text-gray-900 font-brandon-medium">Offline Data</Text>
             <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100">
             <PhoneCall size={20} color="#374151" className="mr-4" />
             <Text className="flex-1 text-gray-900 font-brandon-medium">Emergency Contact</Text>
             <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100">
             <Settings size={20} color="#374151" className="mr-4" />
             <Text className="flex-1 text-gray-900 font-brandon-medium">Settings</Text>
             <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/intro')} className="flex-row items-center py-4 pt-6">
             <LogOut size={20} color="#dc2626" className="mr-4" />
             <Text className="flex-1 text-red-600 font-brandon-medium">Logout</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
