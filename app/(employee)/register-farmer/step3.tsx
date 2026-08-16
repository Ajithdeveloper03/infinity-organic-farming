import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';

const BorderedInput = ({ label, value, onChangeText, placeholder, half = false }: any) => (
  <View className={`border border-gray-200 rounded-xl px-4 py-2 bg-white mb-4 ${half ? 'flex-1' : 'w-full'}`}>
    <Text className="text-gray-500 text-xs font-brandon-medium mb-1">{label}</Text>
    <TextInput
      className="text-base font-gotham-bold text-gray-900 p-0 m-0"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

export default function Step3Personal() {
  const [form, setForm] = useState({
    fullName: 'Ramesh Kumar',
    email: 'rameshkumar@gmail.com',
    mobile: '+91 9687846895',
    village: 'Thottipalayam',
    taluk: 'Coimbatore',
    district: 'Coimbatore',
    state: 'Tamilnadu',
    pincode: '621345',
  });

  const handleNext = () => {
    // We stop at Step 3 since the prompt mainly focused on the initial setup
    router.replace('/(employee)/dashboard');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView className="flex-1 px-6 pt-12">
          
          {/* Header */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <View>
              <Text className="text-xl font-gotham-bold text-gray-900">Farmer Registration</Text>
              <Text className="text-gray-400 text-sm font-brandon">Step 2 of 5</Text>
            </View>
          </View>

          {/* Stepper */}
          <View className="flex-row items-center justify-between mb-8 px-2">
            {[1, 2, 3, 4, 5].map((step, index) => (
              <React.Fragment key={step}>
                <View className={`w-8 h-8 rounded-full items-center justify-center ${step === 1 ? 'bg-[#396216]' : step === 2 ? 'bg-[#396216]' : 'bg-white border border-gray-300'}`}>
                  {step === 1 ? (
                    <Check size={16} color="#fff" />
                  ) : (
                    <Text className={step === 2 ? 'text-white font-gotham-bold' : 'text-gray-400 font-gotham-bold'}>{step}</Text>
                  )}
                </View>
                {index < 4 && <View className="flex-1 h-[1px] bg-gray-300" />}
              </React.Fragment>
            ))}
          </View>

          <Text className="text-xl font-gotham-bold text-gray-900 mb-6">Personal Details</Text>

          <BorderedInput label="Full Name" value={form.fullName} onChangeText={(t: string) => setForm({...form, fullName: t})} />
          <BorderedInput label="Email" value={form.email} onChangeText={(t: string) => setForm({...form, email: t})} />
          <BorderedInput label="Mobile Number" value={form.mobile} onChangeText={(t: string) => setForm({...form, mobile: t})} />
          
          <View className="flex-row space-x-4">
            <BorderedInput half label="Village" value={form.village} onChangeText={(t: string) => setForm({...form, village: t})} />
            <View className="w-4" />
            <BorderedInput half label="Taluk" value={form.taluk} onChangeText={(t: string) => setForm({...form, taluk: t})} />
          </View>

          <View className="flex-row space-x-4">
            <BorderedInput half label="District" value={form.district} onChangeText={(t: string) => setForm({...form, district: t})} />
            <View className="w-4" />
            <BorderedInput half label="State" value={form.state} onChangeText={(t: string) => setForm({...form, state: t})} />
          </View>

          <BorderedInput label="Pincode" value={form.pincode} onChangeText={(t: string) => setForm({...form, pincode: t})} />

          <View className="pb-8 mt-4">
            <Button 
              title="Next" 
              onPress={handleNext}
              className="bg-[#396216]"
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
