import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Lock } from 'lucide-react-native';

export default function EditProfileScreen() {
  const [form] = useState({
    fullName: 'Ramesh Kumar',
    empId: 'EMP1008',
    mobile: '+91 98765 43210',
    email: 'ramesh.kumar@infinity.com',
    department: 'Field Operations',
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        
        {/* Header */}
        <View className="px-6 pt-12 pb-4 flex-row items-center border-b border-gray-100 bg-white">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} className="p-2 -ml-2 mr-4">
             <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-lg font-gotham-bold">My Profile</Text>
        </View>

        <ScrollView className="flex-1 px-6 pt-8 bg-white" showsVerticalScrollIndicator={false}>
          
          <View className="bg-blue-50 p-4 rounded-xl mb-8 flex-row items-start border border-blue-100">
            <Lock size={20} color="#3b82f6" className="mt-0.5 mr-3" />
            <Text className="flex-1 text-blue-800 font-brandon text-sm leading-5">
              Your profile information is managed by the administrator. To update these details, please contact the IT or HR department.
            </Text>
          </View>

          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">Full Name</Text>
          <View className="border-b border-gray-200 py-3 mb-6 bg-gray-50 rounded-lg px-3">
            <TextInput 
               className="text-gray-600 font-gotham-bold text-base p-0 m-0"
               value={form.fullName}
               editable={false}
            />
          </View>

          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">Employee ID</Text>
          <View className="border-b border-gray-200 py-3 mb-6 bg-gray-50 rounded-lg px-3">
            <TextInput 
               className="text-gray-600 font-gotham-bold text-base p-0 m-0"
               value={form.empId}
               editable={false}
            />
          </View>

          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">Mobile Number</Text>
          <View className="border-b border-gray-200 py-3 mb-6 bg-gray-50 rounded-lg px-3">
            <TextInput 
               className="text-gray-600 font-gotham-bold text-base p-0 m-0"
               value={form.mobile}
               editable={false}
            />
          </View>

          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">Email</Text>
          <View className="border-b border-gray-200 py-3 mb-6 bg-gray-50 rounded-lg px-3">
            <TextInput 
               className="text-gray-600 font-gotham-bold text-base p-0 m-0"
               value={form.email}
               editable={false}
            />
          </View>

          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">Department</Text>
          <View className="border-b border-gray-200 py-3 mb-10 bg-gray-50 rounded-lg px-3">
            <TextInput 
               className="text-gray-600 font-gotham-bold text-base p-0 m-0"
               value={form.department}
               editable={false}
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
