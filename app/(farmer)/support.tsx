import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, MessageSquare, Phone, Mail, HelpCircle, AlertCircle } from 'lucide-react-native';

export default function FarmerSupportScreen() {
  const handleCall = () => {
    // In a real app, this would use Linking.openURL('tel:+1234567890')
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Header */}
      <View className="px-6 pt-12 pb-4 bg-white flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2">
           <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-gray-900 text-lg font-gotham-bold">24/7 Support Center</Text>
      </View>

      <ScrollView className="flex-1 pb-24" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
           
           <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 items-center">
             <View className="w-16 h-16 bg-green-50 rounded-full items-center justify-center mb-4">
               <HelpCircle size={32} color="#15803d" />
             </View>
             <Text className="text-gray-900 font-gotham-bold text-xl mb-2 text-center">How can we help you?</Text>
             <Text className="text-gray-500 font-brandon text-center">
               Our support team is available 24/7. Choose an option below to connect with us immediately.
             </Text>
           </View>

           <Text className="text-lg font-gotham-bold text-gray-900 mb-4">Immediate Assistance</Text>

           <TouchableOpacity 
             activeOpacity={0.8}
             onPress={handleCall}
             className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4 flex-row items-center"
           >
              <View className="w-12 h-12 bg-green-50 rounded-full items-center justify-center mr-4 border border-green-100">
                 <Phone size={24} color="#15803d" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-gotham-bold text-base">Call Toll-Free</Text>
                <Text className="text-gray-500 text-xs font-brandon-medium">1800-123-4567</Text>
              </View>
           </TouchableOpacity>

           <TouchableOpacity 
             activeOpacity={0.8}
             className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-8 flex-row items-center"
           >
              <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mr-4 border border-blue-100">
                 <MessageSquare size={24} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-gotham-bold text-base">WhatsApp Support</Text>
                <Text className="text-gray-500 text-xs font-brandon-medium">Chat with an expert</Text>
              </View>
           </TouchableOpacity>

           <Text className="text-lg font-gotham-bold text-gray-900 mb-4">Other Options</Text>

           <TouchableOpacity 
             activeOpacity={0.8}
             className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4 flex-row items-center"
           >
              <View className="w-12 h-12 bg-orange-50 rounded-full items-center justify-center mr-4 border border-orange-100">
                 <AlertCircle size={24} color="#ea580c" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-gotham-bold text-base">Raise a Complaint</Text>
                <Text className="text-gray-500 text-xs font-brandon-medium">Report an issue with a recent visit</Text>
              </View>
           </TouchableOpacity>

           <TouchableOpacity 
             activeOpacity={0.8}
             className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4 flex-row items-center"
           >
              <View className="w-12 h-12 bg-purple-50 rounded-full items-center justify-center mr-4 border border-purple-100">
                 <Mail size={24} color="#a855f7" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-900 font-gotham-bold text-base">Email Us</Text>
                <Text className="text-gray-500 text-xs font-brandon-medium">support@infinityorganics.com</Text>
              </View>
           </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
