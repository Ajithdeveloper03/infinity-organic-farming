import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Animated, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { MapPin, CheckCircle2, Moon, Target, Route } from 'lucide-react-native';
import { Button } from '../../../components/ui/Button';
import { showToast } from '../../../components/ui/ToastMessage';
import { employeeProfile, dashboardStats } from '../../../data/mockData';

export default function ClockOutScreen() {
  const [loading, setLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClockOut = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast({ title: 'Clock Out Successful', message: 'Have a great evening!', type: 'success' });
      router.replace('/intro');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        
        <Animated.View style={{ opacity: fadeAnim }} className="flex-1 px-6 pt-12 pb-12 justify-center">
          
          <View className="mb-10 items-center">
            <View className="w-20 h-20 bg-indigo-50 rounded-full items-center justify-center mb-6">
              <Moon size={40} color="#4f46e5" />
            </View>
            <Text className="text-gray-900 font-gotham-bold text-2xl text-center mb-2">Good Evening,</Text>
            <Text className="text-gray-500 font-brandon text-base text-center px-4">Great work today, {employeeProfile.name}. Here is a summary of your day.</Text>
          </View>

          <View className="w-full mb-8 space-y-4">
            
            <View className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex-row items-center mb-4">
               <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-4">
                 <CheckCircle2 size={24} color="#15803d" />
               </View>
               <View className="flex-1">
                 <Text className="text-gray-900 font-gotham-bold text-base mb-1">Visits Completed</Text>
                 <Text className="text-gray-500 font-brandon text-xs">{dashboardStats.completed} out of {dashboardStats.totalVisits} visits completed</Text>
               </View>
               <Text className="text-[#15803d] font-gotham-bold text-xl">{dashboardStats.completed}</Text>
            </View>

            <View className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex-row items-center mb-4">
               <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mr-4">
                 <Route size={24} color="#ea580c" />
               </View>
               <View className="flex-1">
                 <Text className="text-gray-900 font-gotham-bold text-base mb-1">Distance Covered</Text>
                 <Text className="text-gray-500 font-brandon text-xs">Total distance tracked today</Text>
               </View>
               <Text className="text-[#ea580c] font-gotham-bold text-xl">42 km</Text>
            </View>

            <View className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex-row items-center">
               <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
                 <Target size={24} color="#3b82f6" />
               </View>
               <View className="flex-1">
                 <Text className="text-gray-900 font-gotham-bold text-base mb-1">Monthly Goal Progress</Text>
                 <Text className="text-gray-500 font-brandon text-xs">{dashboardStats.adminTarget.currentProgress} / {dashboardStats.adminTarget.monthlyGoal} achieved</Text>
               </View>
               <Text className="text-[#3b82f6] font-gotham-bold text-xl">{Math.round((dashboardStats.adminTarget.currentProgress / dashboardStats.adminTarget.monthlyGoal) * 100)}%</Text>
            </View>

          </View>

          <Button 
            title="Clock Out & Go Home" 
            onPress={handleClockOut}
            loading={loading}
            className="w-full py-4 rounded-xl bg-[#4f46e5]"
          />
          
          <TouchableOpacity onPress={() => router.back()} className="mt-6 items-center">
            <Text className="text-gray-500 font-gotham-bold">Wait, I have more visits</Text>
          </TouchableOpacity>
          
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
