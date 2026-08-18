import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { CheckCircle2, Leaf, Users } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../components/ui/Card';

export default function IntroScreen() {
  const [role, setRole] = useState<'farmer' | 'employee'>('employee');

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('../assets/images/intro_bg.png')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        <View className="flex-1 bg-black/40">
          <SafeAreaView className="flex-1 justify-between">

            {/* Header Section */}
            <View className="items-center pt-16">
              <View className="bg-white/95 p-4 rounded-3xl mb-4 shadow-lg">
                <Image
                  source={require('../assets/images/logo.png')}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
              </View>
              <Card className="rounded-full py-3 px-6 shadow-xl bg-white/95">
                <Text className="text-xl font-gotham-bold text-[#15803d] text-center tracking-wide">
                  Infinity Organics
                </Text>
              </Card>
            </View>

            {/* Bottom Sheet Card for Role Selection (Glassmorphism) */}
            <View className="px-4 pb-8">
              <BlurView intensity={80} tint="light" style={styles.glassCard} className="rounded-[32px] overflow-hidden pt-8 pb-6 border border-white/40 shadow-2xl">
                <View className="items-center mb-6">
                  <View className="bg-white/50 p-4 rounded-full mb-4 shadow-sm border border-white/60">
                    <Users size={32} color="#15803d" />
                  </View>
                  <Text className="text-gray-900 font-gotham-bold text-2xl mb-2">Choose Your Role</Text>
                  <Text className="text-gray-800 font-brandon text-center px-4">
                    Select a role to personalize your profile and access your relevant dashboard.
                  </Text>
                </View>

                <View className="space-y-3 mb-6 px-4">
                  {/* Employee Card */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setRole('employee')}
                    className={`flex-row items-center p-4 rounded-[20px] border-2 mb-3 ${role === 'employee'
                      ? 'bg-white/80 border-[#15803d] shadow-sm'
                      : 'bg-white/40 border-transparent'
                      }`}
                  >
                    <View className={`p-3 rounded-full ${role === 'employee' ? 'bg-[#15803d]' : 'bg-gray-200/80'}`}>
                      <Users size={24} color={role === 'employee' ? '#fff' : '#4b5563'} />
                    </View>
                    <View className="flex-1 ml-4">
                      <Text className={`font-gotham-bold text-lg ${role === 'employee' ? 'text-[#15803d]' : 'text-gray-800'}`}>Field Officer</Text>
                      <Text className="text-gray-600 font-brandon text-xs mt-0.5">Manage visits & track activities</Text>
                    </View>
                    {role === 'employee' && (
                      <CheckCircle2 size={24} color="#15803d" />
                    )}
                  </TouchableOpacity>

                  {/* Farmer Card */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setRole('farmer')}
                    className={`flex-row items-center p-4 rounded-[20px] border-2 ${role === 'farmer'
                      ? 'bg-white/80 border-[#15803d] shadow-sm'
                      : 'bg-white/40 border-transparent'
                      }`}
                  >
                    <View className={`p-3 rounded-full ${role === 'farmer' ? 'bg-[#15803d]' : 'bg-gray-200/80'}`}>
                      <Leaf size={24} color={role === 'farmer' ? '#fff' : '#4b5563'} />
                    </View>
                    <View className="flex-1 ml-4">
                      <Text className={`font-gotham-bold text-lg ${role === 'farmer' ? 'text-[#15803d]' : 'text-gray-800'}`}>Farmer</Text>
                      <Text className="text-gray-600 font-brandon text-xs mt-0.5">View reports & farm progress</Text>
                    </View>
                    {role === 'farmer' && (
                      <CheckCircle2 size={24} color="#15803d" />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Continue Button */}
                <View className="px-4">
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      if (role === 'farmer') {
                        router.push('/(auth)/farmer-login');
                      } else {
                        router.push({ pathname: '/(auth)/login', params: { role: 'employee' } });
                      }
                    }}
                    className="w-full bg-[#15803d] py-4 rounded-full items-center shadow-md flex-row justify-center"
                  >
                    <Text className="text-white font-gotham-bold text-lg tracking-wide">Continue</Text>
                  </TouchableOpacity>
                </View>

              </BlurView>
            </View>

          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  }
});
