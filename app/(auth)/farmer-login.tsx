import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, Image, TextInput, Animated } from 'react-native';
import { router } from 'expo-router';
import { Phone, ArrowLeft, ArrowRight } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { showToast } from '../../components/ui/ToastMessage';

export default function FarmerLoginScreen() {
  const [step, setStep] = useState<1 | 2>(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const otpInputs = useRef<Array<TextInput | null>>([]);
  
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleSendOtp = () => {
    if (mobile.length < 10) {
      showToast({ title: 'Invalid Number', message: 'Please enter a valid 10-digit mobile number.', type: 'error' });
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      showToast({ title: 'OTP Sent', message: 'Simulated OTP is 1234', type: 'info', duration: 4000 });
      
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
    }, 1000);
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp !== '1234') {
      showToast({ title: 'Invalid OTP', message: 'Please enter the correct OTP (1234).', type: 'error' });
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(farmer)/dashboard');
    }, 1000);
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-advance
    if (text.length === 1 && index < 3) {
      otpInputs.current[index + 1]?.focus();
    }
    // Auto-verify if last digit
    if (text.length === 1 && index === 3) {
      // Small timeout to let state update
      setTimeout(() => {}, 100);
    }
  };

  const handleOtpKeyPress = ({ nativeEvent }: any, index: number) => {
    if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        
        {/* Header */}
        <View className="px-6 pt-6 flex-row items-center">
          <TouchableOpacity onPress={() => step === 2 ? setStep(1) : router.back()} className="p-2 -ml-2" activeOpacity={0.7}>
            <ArrowLeft size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
          <View className="flex-1 px-6 bg-white items-center">
            
            {/* Logo area */}
            <View className="items-center mb-8 w-full mt-4">
               <Image 
                  source={require('../../assets/images/logo.png')}
                  style={{ width: 120, height: 120 }}
                  resizeMode="contain"
               />
               <Text className="text-[#15803d] text-lg font-gotham-bold mt-2 text-center tracking-widest">
                 INFINITY
               </Text>
            </View>

            {/* Sliding Form Container */}
            <View className="w-full overflow-hidden" style={{ minHeight: 300 }}>
              
              {/* Step 1: Mobile Number */}
              {step === 1 && (
                <Animated.View style={{ opacity: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }), width: '100%' }}>
                  <View className="w-full mb-8">
                    <Text className="text-3xl font-gotham-bold text-gray-900 mb-2 text-center">Farmer Login</Text>
                    <Text className="text-gray-500 font-brandon text-base text-center">Enter your registered mobile number</Text>
                  </View>

                  <View className="mb-8">
                    <View className="flex-row items-center border border-gray-200 rounded-xl bg-gray-50 px-4 py-3">
                      <Phone size={24} color="#6b7280" className="mr-3" />
                      <Text className="text-gray-900 font-gotham-bold text-base mr-2">+91</Text>
                      <View className="w-px h-6 bg-gray-300 mr-3" />
                      <TextInput
                        className="flex-1 text-base font-gotham-bold text-gray-900 p-0 m-0 leading-none"
                        value={mobile}
                        onChangeText={setMobile}
                        placeholder="Mobile Number"
                        placeholderTextColor="#9ca3af"
                        keyboardType="phone-pad"
                        maxLength={10}
                        autoFocus
                      />
                    </View>
                  </View>

                  <Button 
                    title="Send OTP" 
                    onPress={handleSendOtp} 
                    loading={loading}
                    className="bg-[#15803d] py-4 rounded-xl shadow-md w-full"
                  />
                </Animated.View>
              )}

              {/* Step 2: OTP Verification */}
              {step === 2 && (
                <Animated.View style={{ opacity: slideAnim, width: '100%' }}>
                  <View className="w-full mb-8">
                    <Text className="text-3xl font-gotham-bold text-gray-900 mb-2 text-center">Verify OTP</Text>
                    <Text className="text-gray-500 font-brandon text-base text-center">We've sent a 4-digit code to</Text>
                    <Text className="text-[#15803d] font-gotham-bold text-base text-center mt-1">+91 {mobile}</Text>
                  </View>

                  <View className="flex-row justify-center space-x-4 mb-10">
                    {[0, 1, 2, 3].map((index) => (
                      <TextInput
                        key={index}
                        ref={(ref: any) => { otpInputs.current[index] = ref; }}
                        style={{
                          width: 56,
                          height: 56,
                          borderWidth: 2,
                          borderRadius: 16,
                          textAlign: 'center',
                          fontSize: 24,
                          fontFamily: 'Gotham-Bold', // Ensure you use the correct fontFamily string defined in your project
                          borderColor: otp[index] ? '#15803d' : '#e5e7eb',
                          backgroundColor: otp[index] ? '#f0fdf4' : '#f9fafb',
                          color: otp[index] ? '#15803d' : '#111827'
                        }}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={otp[index]}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        onKeyPress={(e) => handleOtpKeyPress(e, index)}
                        autoFocus={index === 0}
                      />
                    ))}
                  </View>

                  <Button 
                    title="Verify & Proceed" 
                    onPress={handleVerifyOtp} 
                    loading={loading}
                    className="bg-[#15803d] py-4 rounded-xl shadow-md w-full"
                  />
                  
                  <View className="flex-row justify-center mt-6">
                    <Text className="text-gray-500 font-brandon text-sm">Didn't receive code? </Text>
                    <TouchableOpacity>
                      <Text className="text-[#ea580c] font-gotham-bold text-sm">Resend in 30s</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              )}

            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
