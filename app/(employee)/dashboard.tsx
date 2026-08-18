import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { Bell, MapPin, Target, ClipboardList, ChevronRight, UserPlus, FileText, AlertCircle } from 'lucide-react-native';
import * as Location from 'expo-location';
import { employeeProfile, dashboardStats, getTodayVisits } from '../../data/mockData';
import { showToast } from '../../components/ui/ToastMessage';

export default function DashboardScreen() {
  const [locationGranted, setLocationGranted] = useState<boolean | null>(null);
  
  const todayVisits = getTodayVisits();
  const nextVisit = todayVisits.find(v => v.status === 'pending') || todayVisits[0];

  const currentHour = new Date().getHours();
  let greeting = 'Good Morning';
  if (currentHour >= 12 && currentHour < 17) greeting = 'Good Afternoon';
  else if (currentHour >= 17) greeting = 'Good Evening';

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationGranted(false);
        showToast({
          title: 'Location Disabled',
          message: 'Please enable location services for live tracking.',
          type: 'error',
          duration: 5000
        });
      } else {
        setLocationGranted(true);
      }
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      
      {/* Location Warning Banner */}
      {locationGranted === false && (
        <View className="bg-red-50 p-4 flex-row items-center border-b border-red-100">
          <AlertCircle size={20} color="#ef4444" />
          <View className="ml-3 flex-1">
            <Text className="text-red-800 font-gotham-bold text-xs">Location Required</Text>
            <Text className="text-red-600 font-brandon text-xs">Tracking disabled. Please enable GPS.</Text>
          </View>
        </View>
      )}

      {/* Separate Header with plain background and light shadow */}
      <View className="bg-white px-6 pt-14 pb-4 shadow-sm border-b border-gray-100 z-10">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Image 
                source={{uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeProfile.name)}&background=15803d&color=fff&size=200`}}
                className="w-12 h-12 rounded-full mr-3 border border-gray-200"
            />
            <View>
                <Text className="text-gray-500 text-xs font-brandon-medium uppercase tracking-wider">{greeting}</Text>
                <Text className="text-gray-900 text-lg font-gotham-bold">{employeeProfile.name}</Text>
            </View>
          </View>
          <TouchableOpacity className="p-2 bg-gray-50 rounded-full border border-gray-100" activeOpacity={0.7}>
            <Bell size={20} color="#1f2937" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 pt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Today's Schedule with Image Background */}
        <View className="px-4 mb-6">
          <View className="rounded-[24px] overflow-hidden shadow-md border border-gray-100 bg-white">
            <ImageBackground 
              source={require('../../assets/images/image2.jpg')}
              className="w-full h-48"
              imageStyle={{ opacity: 0.9 }}
            >
              <View className="absolute inset-0 bg-black/60" />

              <View className="flex-1 p-5 justify-between">
                <Text className="text-white text-2xl font-gotham-bold">Today's Schedule</Text>
                
                <View className="flex-row items-center justify-between bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30">
                  <View className="items-center flex-1">
                    <Text className="text-white text-2xl font-gotham-bold leading-7">{dashboardStats.totalVisits}</Text>
                    <Text className="text-gray-200 text-[10px] font-brandon uppercase tracking-widest">Total</Text>
                  </View>
                  <View className="w-px h-8 bg-white/30" />
                  <View className="items-center flex-1">
                    <Text className="text-green-300 text-2xl font-gotham-bold leading-7">{dashboardStats.completed}</Text>
                    <Text className="text-gray-200 text-[10px] font-brandon uppercase tracking-widest">Completed</Text>
                  </View>
                  <View className="w-px h-8 bg-white/30" />
                  <View className="items-center flex-1">
                    <Text className="text-orange-300 text-2xl font-gotham-bold leading-7">{dashboardStats.pending}</Text>
                    <Text className="text-gray-200 text-[10px] font-brandon uppercase tracking-widest">Pending</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>

        {/* Next Visit List / Card */}
        {nextVisit && (
          <View className="px-4 mb-8">
            <Text className="text-lg font-gotham-bold text-gray-900 mb-3 ml-1">Up Next</Text>
            
            <View className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100 flex-row">
              <Image 
                source={require('../../assets/images/image3.jpg')}
                className="w-1/3 h-full"
              />
              
              <View className="flex-1 p-4">
                <View className="flex-row justify-between items-center mb-2">
                  <View className="bg-orange-50 px-2 py-1 rounded-md">
                    <Text className="text-[#ea580c] font-gotham-bold text-xs">{nextVisit.time}</Text>
                  </View>
                </View>
                
                <Text className="text-gray-900 font-gotham-bold text-lg mb-1" numberOfLines={1}>{nextVisit.farmer?.name}</Text>
                
                <View className="flex-row items-center mb-4">
                  <MapPin size={12} color="#6b7280" />
                  <Text className="text-gray-500 text-xs ml-1 font-brandon" numberOfLines={1}>{nextVisit.farmer?.address}</Text>
                </View>
                
                <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={() => router.push(`/(employee)/visit/${nextVisit.id}` as any)}
                  className="bg-[#15803d] py-2.5 rounded-xl items-center flex-row justify-center"
                >
                  <Text className="text-white font-gotham-bold text-sm mr-1">Start Visit</Text>
                  <ChevronRight size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Grid Navigations (Visit History, Register Farmer, etc.) */}
        <View className="px-4 mb-12">
          <Text className="text-lg font-gotham-bold text-gray-900 mb-3 ml-1">Quick Actions</Text>
          
          <View className="flex-row flex-wrap justify-between">
            {/* Register Farmer */}
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => router.push('/(employee)/register-farmer/step1' as any)}
              className="w-[48%] bg-green-50 p-4 rounded-[20px] mb-4 shadow-sm border border-green-100 items-center justify-center"
            >
              <View className="w-12 h-12 bg-white rounded-full items-center justify-center mb-3 shadow-sm">
                <UserPlus size={24} color="#15803d" />
              </View>
              <Text className="text-green-900 font-gotham-bold text-sm text-center">Register{'\n'}New Farmer</Text>
            </TouchableOpacity>

            {/* Visit History */}
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => router.push('/(employee)/visits' as any)}
              className="w-[48%] bg-blue-50 p-4 rounded-[20px] mb-4 shadow-sm border border-blue-100 items-center justify-center"
            >
              <View className="w-12 h-12 bg-white rounded-full items-center justify-center mb-3 shadow-sm">
                <ClipboardList size={24} color="#3b82f6" />
              </View>
              <Text className="text-blue-900 font-gotham-bold text-sm text-center">Visit{'\n'}History</Text>
            </TouchableOpacity>

            {/* Performance/Target */}
            <TouchableOpacity 
              activeOpacity={0.7}
              className="w-[48%] bg-orange-50 p-4 rounded-[20px] mb-4 shadow-sm border border-orange-100 items-center justify-center"
            >
              <View className="w-12 h-12 bg-white rounded-full items-center justify-center mb-3 shadow-sm">
                <Target size={24} color="#ea580c" />
              </View>
              <Text className="text-orange-900 font-gotham-bold text-sm text-center">Monthly{'\n'}Target</Text>
            </TouchableOpacity>

            {/* My Reports */}
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => router.push('/(employee)/reports' as any)}
              className="w-[48%] bg-purple-50 p-4 rounded-[20px] mb-4 shadow-sm border border-purple-100 items-center justify-center"
            >
              <View className="w-12 h-12 bg-white rounded-full items-center justify-center mb-3 shadow-sm">
                <FileText size={24} color="#a855f7" />
              </View>
              <Text className="text-purple-900 font-gotham-bold text-sm text-center">My{'\n'}Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
