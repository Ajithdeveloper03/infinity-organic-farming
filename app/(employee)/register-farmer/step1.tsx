import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Phone } from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';

export default function Step1Mobile() {
  const [mobile, setMobile] = useState('');

  const handleNext = () => {
    if (mobile.length > 5) {
      router.push('/(employee)/register-farmer/step2');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-12">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-gotham-bold text-gray-900">Create Account</Text>
            <Text className="text-gray-400 text-sm font-brandon">Let&apos;s get you started</Text>
          </View>
        </View>

        {/* Stepper */}
        <View className="flex-row items-center justify-between mb-10 px-2">
          {[1, 2, 3, 4, 5].map((step, index) => (
            <React.Fragment key={step}>
              <View className={`w-8 h-8 rounded-full items-center justify-center ${step === 1 ? 'bg-[#15803d]' : 'bg-white border border-gray-300'}`}>
                <Text className={step === 1 ? 'text-white font-gotham-bold' : 'text-gray-400 font-gotham-bold'}>{step}</Text>
              </View>
              {index < 4 && <View className="flex-1 h-[1px] bg-gray-300" />}
            </React.Fragment>
          ))}
        </View>

        {/* Real Image */}
        <View className="items-center justify-center h-48 mb-6 self-center">
          <Image 
            source={require('../../../assets/images/shield_phone.png')}
            style={{ width: 160, height: 160 }}
            resizeMode="contain"
          />
        </View>

        <View className="items-center mb-8">
          <Text className="text-xl font-gotham-bold text-gray-900 mb-2">Enter your mobile number</Text>
          <Text className="text-gray-400 font-brandon">We&apos;ll send you a verification code</Text>
        </View>

        {/* Input */}
        <View className="border border-gray-200 rounded-xl px-4 py-3 flex-row items-center mb-8 bg-white">
          <Phone size={24} color="#6b7280" className="mr-4" />
          <View className="flex-1">
            <Text className="text-gray-500 text-xs font-brandon-medium mb-1">Mobile Number</Text>
            <TextInput
              className="text-base font-gotham-bold text-gray-900 p-0 m-0"
              placeholder="+91 XXXXX XXXXX"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
            />
          </View>
        </View>

        <Button 
          title="Send OTP" 
          onPress={handleNext}
          className="bg-[#15803d]"
        />
      </View>
    </SafeAreaView>
  );
}
