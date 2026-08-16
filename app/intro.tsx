import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Leaf, Users, ArrowRight, CheckCircle2, MapPin } from 'lucide-react-native';
import { Card } from '../components/ui/Card';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';

export default function IntroScreen() {
  const [role, setRole] = useState<'farmer' | 'employee'>('employee');

  const initialRegion = {
    latitude: 11.0200,
    longitude: 76.9500,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View className="flex-1 bg-white">
      {/* Decorative Map Background mimicking the layout's location selection */}
      <MapView
        provider={PROVIDER_DEFAULT}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        scrollEnabled={false}
        zoomEnabled={false}
      >
        <Marker coordinate={{ latitude: 11.0200, longitude: 76.9500 }}>
           <View className="bg-white p-2 rounded-full shadow-sm">
             <MapPin size={24} color="#8b8df2" />
           </View>
        </Marker>
      </MapView>

      <SafeAreaView className="flex-1 justify-between">
        
        {/* Header Section */}
        <View className="items-center pt-12">
          <View className="bg-white p-4 rounded-3xl mb-4 shadow-sm">
            <Image 
              source={require('../assets/images/logo.png')} 
              style={{ width: 80, height: 80 }} 
              resizeMode="contain" 
            />
          </View>
          <Card className="rounded-full py-3 px-6 shadow-md">
            <Text className="text-xl font-gotham-bold text-gray-900 text-center">
              Infinity Organics
            </Text>
          </Card>
        </View>

        {/* Bottom Sheet Card for Role Selection */}
        <View className="px-4 pb-8">
          <Card className="rounded-[32px] pt-8 pb-6 shadow-lg">
            <View className="items-center mb-6">
              <View className="bg-[#e8e8fc] p-4 rounded-full mb-4">
                <Users size={32} color="#8b8df2" />
              </View>
              <Text className="text-gray-900 font-gotham-bold text-2xl mb-2">Choose Your Role</Text>
              <Text className="text-gray-500 font-brandon text-center px-4">
                Select a role to personalize your profile and access your relevant dashboard.
              </Text>
            </View>

            <View className="space-y-3 mb-6">
              {/* Employee Card */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setRole('employee')}
                className={`flex-row items-center p-4 rounded-[20px] border-2 ${
                  role === 'employee' 
                    ? 'bg-[#e8e8fc] border-[#8b8df2]' 
                    : 'bg-gray-50 border-transparent'
                }`}
              >
                <View className={`p-3 rounded-full ${role === 'employee' ? 'bg-[#8b8df2]' : 'bg-gray-200'}`}>
                  <Users size={24} color={role === 'employee' ? '#fff' : '#6b7280'} />
                </View>
                <View className="flex-1 ml-4">
                  <Text className={`font-gotham-bold text-lg ${role === 'employee' ? 'text-[#8b8df2]' : 'text-gray-700'}`}>Field Officer</Text>
                  <Text className="text-gray-500 font-brandon text-xs mt-0.5">Manage visits & track activities</Text>
                </View>
                {role === 'employee' && (
                  <CheckCircle2 size={24} color="#8b8df2" />
                )}
              </TouchableOpacity>

              {/* Farmer Card */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setRole('farmer')}
                className={`flex-row items-center p-4 rounded-[20px] border-2 ${
                  role === 'farmer' 
                    ? 'bg-[#e8e8fc] border-[#8b8df2]' 
                    : 'bg-gray-50 border-transparent'
                }`}
              >
                <View className={`p-3 rounded-full ${role === 'farmer' ? 'bg-[#8b8df2]' : 'bg-gray-200'}`}>
                  <Leaf size={24} color={role === 'farmer' ? '#fff' : '#6b7280'} />
                </View>
                <View className="flex-1 ml-4">
                  <Text className={`font-gotham-bold text-lg ${role === 'farmer' ? 'text-[#8b8df2]' : 'text-gray-700'}`}>Farmer</Text>
                  <Text className="text-gray-500 font-brandon text-xs mt-0.5">View reports & farm progress</Text>
                </View>
                {role === 'farmer' && (
                  <CheckCircle2 size={24} color="#8b8df2" />
                )}
              </TouchableOpacity>
            </View>

            {/* Continue Button */}
            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={() => router.push({ pathname: '/(auth)/login', params: { role } })}
              className="w-full bg-[#8b8df2] py-4 rounded-full items-center shadow-sm flex-row justify-center"
            >
              <Text className="text-white font-gotham-bold text-lg tracking-wide mr-2">Continue</Text>
            </TouchableOpacity>

          </Card>
        </View>

      </SafeAreaView>
    </View>
  );
}
