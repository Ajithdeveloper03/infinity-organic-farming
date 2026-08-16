import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

export default function AttendanceScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 flex-row items-center border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-4">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-gotham-bold">Attendance</Text>
      </View>

      <ScrollView className="flex-1 bg-white">
        
        {/* Calendar Header */}
        <View className="py-6 items-center">
           <Text className="text-gray-900 font-gotham-bold text-lg">August 2025</Text>
        </View>

        {/* Days of Week */}
        <View className="flex-row justify-between px-6 mb-4">
           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
             <Text key={day} className="text-gray-400 font-brandon-medium text-xs w-8 text-center">{day}</Text>
           ))}
        </View>

        {/* Calendar Grid Mockup */}
        <View className="px-6 mb-8">
           <View className="flex-row justify-between mb-4">
              <Text className="text-gray-300 w-8 text-center font-brandon">27</Text>
              <Text className="text-gray-300 w-8 text-center font-brandon">28</Text>
              <Text className="text-gray-300 w-8 text-center font-brandon">29</Text>
              <Text className="text-gray-300 w-8 text-center font-brandon">30</Text>
              <Text className="text-gray-300 w-8 text-center font-brandon">31</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">1</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">2</Text>
           </View>
           <View className="flex-row justify-between mb-4">
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">3</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">4</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">5</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">6</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">7</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">8</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">9</Text>
           </View>
           <View className="flex-row justify-between mb-4 items-center">
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">10</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">11</Text>
              
              {/* Highlighted Today */}
              <View className="w-8 h-8 rounded-full bg-[#396216] items-center justify-center">
                 <Text className="text-white font-gotham-bold">12</Text>
              </View>

              <Text className="text-gray-900 font-brandon-medium w-8 text-center">13</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">14</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">15</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">16</Text>
           </View>
           <View className="flex-row justify-between mb-4">
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">17</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">18</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">19</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">20</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">21</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">22</Text>
              <Text className="text-gray-900 font-brandon-medium w-8 text-center">23</Text>
           </View>
        </View>

        {/* Selected Date Details */}
        <View className="px-6">
           <Text className="text-gray-900 font-gotham-bold text-lg mb-6">Aug 12, 2025</Text>
           
           <View className="flex-row items-center mb-6">
             <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center mr-4">
                <View className="w-3 h-3 bg-[#396216] rounded-full" />
             </View>
             <View className="flex-1">
               <Text className="text-gray-900 font-gotham-bold">Check In</Text>
             </View>
             <Text className="text-gray-500 font-brandon-medium">08:32 AM</Text>
           </View>

           <View className="flex-row items-center">
             <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center mr-4">
                <View className="w-3 h-3 bg-gray-400 rounded-full" />
             </View>
             <View className="flex-1">
               <Text className="text-gray-900 font-gotham-bold">Check Out</Text>
             </View>
             <Text className="text-gray-500 font-brandon-medium">--:--</Text>
           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
