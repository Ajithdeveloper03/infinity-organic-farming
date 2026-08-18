import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';

export default function Step2OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleNext = () => {
    router.push('/(employee)/register-farmer/step3');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-12">
        {/* Header */}
        <View className="flex-row items-center mb-8">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-gotham-bold text-gray-900">Verify Your Number</Text>
        </View>

        <View className="items-center mb-8">
          <Text className="text-gray-500 text-base text-center font-brandon">
            Enter the 6-digit code sent to
          </Text>
          <Text className="text-gray-900 font-gotham-bold text-base mt-1">+91 9687846895</Text>
        </View>

        {/* OTP Inputs */}
        <View className="flex-row justify-between mb-8 px-2">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputs.current[index] = ref; }}
              className="w-12 h-14 border border-gray-300 rounded-xl text-center text-xl font-gotham-bold text-gray-900"
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        <View className="flex-row justify-center mb-12">
          <Text className="text-gray-500 font-brandon-medium">Resend OTP in </Text>
          <Text className="text-[#15803d] font-gotham-bold">00:25</Text>
        </View>

        {/* Real Image */}
        <View className="items-center justify-center h-48 mb-auto self-center">
          <Image 
            source={require('../../../assets/images/lock_phone.png')}
            style={{ width: 160, height: 160 }}
            resizeMode="contain"
          />
        </View>

        <View className="pb-8">
          <Button 
            title="Verify & Continue" 
            onPress={handleNext}
            className="bg-[#15803d]"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
