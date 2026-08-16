import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Check, Plus, ChevronDown } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../../components/ui/Button';

export default function SubmitReportScreen() {
  const [notes, setNotes] = useState('Plants are healthy. Growth is good. No issues found.');
  const [recommendations, setRecommendations] = useState('Continue with current irrigation schedule. Apply organic manure.');
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=200&auto=format&fit=crop'
  ]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const handleSubmit = () => {
    router.push('/(employee)/visit/success');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        
        {/* Header */}
        <View className="px-6 pt-12 pb-4 flex-row items-center justify-between border-b border-gray-100">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
             <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-gray-900 font-gotham-bold text-lg">Submit Report</Text>
          <View className="w-8" />
        </View>

        <ScrollView className="flex-1 px-6 pt-6">
          
          {/* Progress Steps */}
          <View className="flex-row items-center justify-between mb-8 px-4">
             {[1, 2, 3, 4].map((step, index) => (
               <React.Fragment key={step}>
                 <View className="w-6 h-6 rounded-full bg-[#396216] items-center justify-center">
                    <Check size={12} color="#fff" />
                 </View>
                 {index < 3 && <View className="flex-1 h-0.5 bg-[#396216]" />}
               </React.Fragment>
             ))}
          </View>

          {/* Form Fields */}
          <Text className="text-gray-900 font-gotham-bold mb-2">Crop Condition</Text>
          <TouchableOpacity className="border border-gray-200 rounded-xl px-4 py-4 mb-6 flex-row justify-between items-center bg-gray-50">
             <Text className="text-gray-900 font-brandon-medium">Good</Text>
             <ChevronDown size={20} color="#6b7280" />
          </TouchableOpacity>

          <Text className="text-gray-900 font-gotham-bold mb-2">Notes</Text>
          <View className="border border-gray-200 rounded-xl px-4 py-3 mb-6 bg-gray-50 h-24">
            <TextInput 
               className="flex-1 text-gray-900"
               multiline
               textAlignVertical="top"
               value={notes}
               onChangeText={setNotes}
            />
          </View>

          {/* Photos */}
          <Text className="text-gray-900 font-gotham-bold mb-2">Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-6">
             {photos.map((uri, index) => (
               <Image 
                 key={index}
                 source={{ uri }}
                 className="w-20 h-20 rounded-xl mr-3"
               />
             ))}
             <TouchableOpacity onPress={pickImage} className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 items-center justify-center bg-gray-50 mr-6">
                <Plus size={24} color="#9ca3af" />
             </TouchableOpacity>
          </ScrollView>

          <Text className="text-gray-900 font-gotham-bold mb-2">Recommendations</Text>
          <View className="border border-gray-200 rounded-xl px-4 py-3 mb-8 bg-gray-50 h-24">
            <TextInput 
               className="flex-1 text-gray-900"
               multiline
               textAlignVertical="top"
               value={recommendations}
               onChangeText={setRecommendations}
            />
          </View>

          <View className="pb-12">
            <Button 
              title="Submit Report" 
              onPress={handleSubmit}
              className="bg-[#396216]"
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
