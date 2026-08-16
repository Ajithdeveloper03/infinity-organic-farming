import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';

export default function EditProfileScreen() {
  const [form, setForm] = useState({
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
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-4">
             <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-lg font-gotham-bold">My Profile</Text>
        </View>

        <ScrollView className="flex-1 px-6 pt-8 bg-white">
          
          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">Full Name</Text>
          <View className="border-b border-gray-200 py-3 mb-6">
            <TextInput 
               className="text-gray-900 font-gotham-bold text-base p-0 m-0"
               value={form.fullName}
               onChangeText={(t) => setForm({...form, fullName: t})}
            />
          </View>

          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">Employee ID</Text>
          <View className="border-b border-gray-200 py-3 mb-6">
            <TextInput 
               className="text-gray-900 font-gotham-bold text-base p-0 m-0"
               value={form.empId}
               onChangeText={(t) => setForm({...form, empId: t})}
               editable={false}
            />
          </View>

          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">Mobile Number</Text>
          <View className="border-b border-gray-200 py-3 mb-6">
            <TextInput 
               className="text-gray-900 font-gotham-bold text-base p-0 m-0"
               value={form.mobile}
               onChangeText={(t) => setForm({...form, mobile: t})}
            />
          </View>

          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">Email</Text>
          <View className="border-b border-gray-200 py-3 mb-6">
            <TextInput 
               className="text-gray-900 font-gotham-bold text-base p-0 m-0"
               value={form.email}
               onChangeText={(t) => setForm({...form, email: t})}
            />
          </View>

          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">Department</Text>
          <View className="border-b border-gray-200 py-3 mb-10">
            <TextInput 
               className="text-gray-900 font-gotham-bold text-base p-0 m-0"
               value={form.department}
               onChangeText={(t) => setForm({...form, department: t})}
               editable={false}
            />
          </View>

          <View className="pb-12">
            <Button 
              title="Edit Profile" 
              onPress={() => router.back()}
              className="bg-[#396216]"
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
