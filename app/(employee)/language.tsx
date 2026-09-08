import React, { useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ChevronLeft, Check } from "lucide-react-native";
import { router } from "expo-router";

const languages = [
  { id: 'en', name: 'English' },
  { id: 'te', name: 'Telugu - తెలుగు' },
  { id: 'hi', name: 'Hindi - हिन्दी' },
  { id: 'ta', name: 'Tamil - தமிழ்' },
];

export default function LanguageScreen() {
  const [selectedLang, setSelectedLang] = useState('en');

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-5 pt-4 pb-4 flex-row items-center border-b border-gray-200 bg-white">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center -ml-2"
            accessibilityRole="button"
          >
            <ChevronLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-lg font-gotham-bold text-gray-900 mr-8">
            Select Language
          </Text>
        </View>

        <ScrollView className="flex-1 px-5 pt-6">
          <View className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {languages.map((lang, index) => (
              <TouchableOpacity
                key={lang.id}
                onPress={() => setSelectedLang(lang.id)}
                className={`flex-row items-center justify-between p-4 ${
                  index !== languages.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                accessibilityRole="button"
              >
                <Text className={`text-base font-brandon ${selectedLang === lang.id ? 'text-blue-600 font-bold' : 'text-gray-900'}`}>
                  {lang.name}
                </Text>
                {selectedLang === lang.id && (
                  <Check size={20} color="#3b82f6" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
