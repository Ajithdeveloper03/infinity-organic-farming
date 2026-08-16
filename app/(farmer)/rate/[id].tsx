import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Star } from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';

export default function FarmerRateOfficerScreen() {
  const { id } = useLocalSearchParams();
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        
        {/* Header */}
        <View className="px-6 pt-12 pb-4 bg-white flex-row items-center border-b border-gray-100">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 mr-2">
             <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-lg font-bold">Rate Field Officer</Text>
        </View>

        <ScrollView className="flex-1 px-6 pt-12 pb-24 items-center">
          
          <View className="items-center mb-8">
             <View className="w-24 h-24 bg-green-50 rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm">
               <Image 
                  source={{uri: 'https://ui-avatars.com/api/?name=Arun+Kumar&background=15803d&color=fff&size=200'}}
                  className="w-full h-full rounded-full"
               />
             </View>
             <Text className="text-gray-900 text-2xl font-bold mb-1">Arun Kumar</Text>
             <Text className="text-gray-500 font-medium">Field Officer</Text>
          </View>

          <Text className="text-gray-900 font-bold text-lg mb-6">How was your experience?</Text>

          <View className="flex-row items-center justify-center space-x-2 mb-10 w-full px-4">
             {[1, 2, 3, 4, 5].map((star) => (
               <TouchableOpacity 
                 key={star} 
                 onPress={() => setRating(star)}
                 className="p-1"
               >
                 <Star 
                   size={48} 
                   color={star <= rating ? "#fbbf24" : "#d1d5db"} 
                   fill={star <= rating ? "#fbbf24" : "transparent"} 
                 />
               </TouchableOpacity>
             ))}
          </View>

          <View className="w-full mb-8">
            <Text className="text-gray-900 font-bold mb-3 text-left">Write a feedback (optional)</Text>
            <View className="border border-gray-200 rounded-xl px-4 py-3 bg-white h-32 w-full">
              <TextInput 
                 className="flex-1 text-gray-900"
                 multiline
                 textAlignVertical="top"
                 placeholder="Share your feedback here..."
                 placeholderTextColor="#9ca3af"
                 value={feedback}
                 onChangeText={setFeedback}
              />
            </View>
          </View>

          <View className="w-full">
            <Button 
              title="Submit Rating" 
              onPress={() => {
                alert('Rating Submitted!');
                router.back();
              }}
              className="bg-[#15803d]"
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
