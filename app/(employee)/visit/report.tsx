import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Check, Plus, ChevronDown, IndianRupee } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../../components/ui/Button';
import { showToast } from '../../../components/ui/ToastMessage';

export default function SubmitReportScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [notes, setNotes] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [amountCollected, setAmountCollected] = useState('');
  const [paymentMode, setPaymentMode] = useState<'Cash' | 'UPI' | 'None'>('None');
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=200&auto=format&fit=crop'
  ]);
  const [loading, setLoading] = useState(false);

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
    // Validation
    if (notes.trim().length < 5) {
      showToast({ title: 'Validation Error', message: 'Please provide valid observation notes.', type: 'error' });
      return;
    }
    if (paymentMode !== 'None' && (!amountCollected || isNaN(Number(amountCollected)) || Number(amountCollected) <= 0)) {
      showToast({ title: 'Validation Error', message: 'Please enter a valid amount collected.', type: 'error' });
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast({ title: 'Report Submitted', message: 'Securely transmitted report & payment details.', type: 'success' });
      router.push('/(employee)/visit/success');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        
        {/* Header */}
        <View className="px-6 pt-12 pb-4 flex-row items-center justify-between border-b border-gray-100">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} className="p-2 -ml-2">
             <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-gray-900 font-gotham-bold text-lg">Submit Report</Text>
          <View className="w-8" />
        </View>

        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          
          {/* Progress Steps */}
          <View className="flex-row items-center justify-between mb-8 px-4">
             {[1, 2, 3, 4].map((step, index) => (
               <React.Fragment key={step}>
                 <View className="w-6 h-6 rounded-full bg-[#15803d] items-center justify-center">
                    <Check size={12} color="#fff" strokeWidth={3} />
                 </View>
                 {index < 3 && <View className="flex-1 h-0.5 bg-[#15803d]" />}
               </React.Fragment>
             ))}
          </View>

          {/* Form Fields */}
          <Text className="text-gray-900 font-gotham-bold mb-2 ml-1">Crop Condition</Text>
          <TouchableOpacity activeOpacity={0.8} className="border border-gray-200 rounded-xl px-4 py-4 mb-6 flex-row justify-between items-center bg-gray-50 shadow-sm">
             <Text className="text-gray-900 font-brandon-medium text-base">Good</Text>
             <ChevronDown size={20} color="#6b7280" />
          </TouchableOpacity>

          <Text className="text-gray-900 font-gotham-bold mb-2 ml-1">Observations / Notes *</Text>
          <View className="border border-gray-200 rounded-xl px-4 py-3 mb-6 bg-gray-50 h-28 shadow-sm">
            <TextInput 
               className="flex-1 text-gray-900 font-brandon text-base"
               multiline
               textAlignVertical="top"
               placeholder="Enter detailed observations..."
               value={notes}
               onChangeText={setNotes}
            />
          </View>

          {/* Payment Details Section */}
          <View className="bg-orange-50 rounded-2xl p-5 mb-6 border border-orange-100 shadow-sm">
            <View className="flex-row items-center mb-4">
              <IndianRupee size={20} color="#ea580c" className="mr-2" />
              <Text className="text-gray-900 font-gotham-bold text-base">Payment / Collection Details</Text>
            </View>
            
            <View className="flex-row justify-between mb-4">
              {['None', 'Cash', 'UPI'].map((mode) => (
                <TouchableOpacity 
                  key={mode}
                  onPress={() => setPaymentMode(mode as any)}
                  className={`flex-1 py-2 rounded-lg items-center border mx-1 ${paymentMode === mode ? 'bg-orange-500 border-orange-500' : 'bg-white border-gray-200'}`}
                >
                  <Text className={`font-gotham-bold text-sm ${paymentMode === mode ? 'text-white' : 'text-gray-500'}`}>{mode}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {paymentMode !== 'None' && (
              <View className="border border-gray-200 rounded-xl px-4 py-3 bg-white flex-row items-center">
                <Text className="text-gray-500 font-gotham-bold text-lg mr-2">₹</Text>
                <TextInput 
                  className="flex-1 text-gray-900 font-gotham-bold text-lg"
                  placeholder="Amount Collected"
                  keyboardType="numeric"
                  value={amountCollected}
                  onChangeText={setAmountCollected}
                />
              </View>
            )}
          </View>

          {/* Photos */}
          <Text className="text-gray-900 font-gotham-bold mb-2 ml-1">Attach Evidence</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-6 py-1">
             {photos.map((uri, index) => (
               <Image 
                 key={index}
                 source={{ uri }}
                 className="w-24 h-24 rounded-xl mr-3"
               />
             ))}
             <TouchableOpacity activeOpacity={0.7} onPress={pickImage} className="w-24 h-24 rounded-xl border-2 border-dashed border-[#15803d] items-center justify-center bg-green-50 mr-6">
                <Plus size={28} color="#15803d" />
             </TouchableOpacity>
          </ScrollView>

          <Text className="text-gray-900 font-gotham-bold mb-2 ml-1">Recommendations</Text>
          <View className="border border-gray-200 rounded-xl px-4 py-3 mb-8 bg-gray-50 h-28 shadow-sm">
            <TextInput 
               className="flex-1 text-gray-900 font-brandon text-base"
               multiline
               textAlignVertical="top"
               placeholder="Optional recommendations..."
               value={recommendations}
               onChangeText={setRecommendations}
            />
          </View>

          <View className="pb-12 pt-4">
            <Button 
              title="Secure Submit Report" 
              onPress={handleSubmit}
              loading={loading}
              className="bg-[#15803d] py-4 rounded-xl shadow-md"
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
