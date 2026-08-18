import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, Image, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Phone, Lock, Eye, EyeOff, Square, CheckSquare } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../components/ui/Button';

// Custom Input for the exact design
const CustomInput = ({ 
  label, 
  value, 
  onChangeText, 
  icon, 
  secureTextEntry, 
  error 
}: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry;

  return (
    <View className="mb-4">
      <View className={`flex-row items-center border rounded-xl bg-white px-4 py-3 ${error ? 'border-red-500' : 'border-gray-200'}`}>
        <View className="mr-4">
          {icon}
        </View>
        <View className="flex-1">
          <Text className="text-gray-500 font-brandon text-xs mb-1">{label}</Text>
          <View className="flex-row items-center">
              <TextInput
              className="flex-1 text-base font-gotham-bold text-gray-900 p-0 m-0 leading-none"
              value={value}
              onChangeText={onChangeText}
              secureTextEntry={isPassword && !showPassword}
              placeholder={`Enter ${label}`}
              placeholderTextColor="#9ca3af"
              keyboardType={label === 'Mobile Number' ? 'phone-pad' : 'default'}
            />
          </View>
        </View>
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="pl-2">
            {showPassword ? <EyeOff size={24} color="#15803d" /> : <Eye size={24} color="#15803d" />}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>}
    </View>
  );
};

const schema = yup.object().shape({
  mobile: yup.string().required('Mobile number is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginScreen() {
  const { role } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { mobile: '', password: '' },
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'farmer') {
        router.replace('/(farmer)/dashboard');
      } else {
        router.replace('/(employee)/attendance/clock-in');
      }
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
          
          <View className="flex-1 px-6 pt-12 pb-8 bg-white items-center">
            
            {/* Logo area */}
            <View className="items-center mb-8 w-full mt-8">
               <Image 
                  source={require('../../assets/images/logo.png')}
                  style={{ width: 140, height: 140 }}
                  resizeMode="contain"
               />
               <Text className="text-[#15803d] text-xl font-gotham-bold mt-2 text-center tracking-widest">
                 INFINITY
               </Text>
               <Text className="text-[#ea580c] font-brandon text-sm mt-1">
                 —Organic Farming—
               </Text>
               <Text className="text-gray-500 font-brandon text-xs mt-1">
                 Way to Smart Farming
               </Text>
            </View>

            {/* Welcome Text */}
            <View className="w-full mb-8">
              <Text className="text-3xl font-gotham-bold text-gray-900 mb-2 text-center">Welcome Back!</Text>
              <Text className="text-gray-500 font-brandon text-base text-center">Please login to continue</Text>
            </View>

            {/* Form Area */}
            <View className="w-full">
              <Controller
                control={control}
                name="mobile"
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    label="Mobile Number"
                    value={value}
                    onChangeText={onChange}
                    icon={<Phone size={24} color="#6b7280" />}
                    error={errors.mobile?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <CustomInput
                    label="Password"
                    value={value}
                    onChangeText={onChange}
                    icon={<Lock size={24} color="#6b7280" />}
                    secureTextEntry={true}
                    error={errors.password?.message}
                  />
                )}
              />
              
              {/* Forgot Password */}
              <View className="items-end mb-8 mt-2">
                <TouchableOpacity>
                  <Text className="text-[#15803d] font-gotham-bold">Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <Button 
                title="Login" 
                onPress={handleSubmit(onSubmit)} 
                loading={loading}
                className="bg-[#15803d] py-4 rounded-xl shadow-md w-full"
              />
              
              <View className="mb-12" />
              
              <View className="flex-row justify-center pb-6">
                <Text className="text-gray-500 font-brandon text-sm">Don&apos;t have an account? </Text>
                <TouchableOpacity>
                  <Text className="text-[#15803d] font-gotham-bold text-sm">Contact Admin</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
