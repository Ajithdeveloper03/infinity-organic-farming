import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { ArrowLeft, Star, Send } from "lucide-react-native";

export default function RateVisitScreen() {
  const [rating, setRating] = useState(0);

  const [feedback, setFeedback] = useState("");

  const isDark = false;

  const handleSubmit = () => {
    // In the future, this will hit the Laravel backend
    router.replace({
      pathname: "/success",
      params: {
        message: "Thank you for your feedback! Your rating has been submitted.",
        redirect: "/(farmer)/dashboard",
      },
    });
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6 pt-2"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
        >
          {/* Header */}
          <View className="flex-row items-center mb-10">
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-4 p-2 bg-gray-50 rounded-full"
              activeOpacity={0.7}
            >
              <ArrowLeft size={24} color={isDark ? "#fff" : "#000"} />
            </TouchableOpacity>
            <View>
              <Text className="text-xl font-gotham-bold text-gray-900">
                Rate Field Officer
              </Text>
              <Text className="text-gray-500 text-xs font-brandon uppercase tracking-wider mt-1">
                Visit on Aug 12, 2025
              </Text>
            </View>
          </View>
          <View className="items-center mb-10">
            <View className="w-24 h-24 bg-orange-100 rounded-full items-center justify-center mb-4">
              <Text className="text-4xl font-gotham-bold text-orange-600">
                AK
              </Text>
            </View>
            <Text className="text-2xl font-gotham-bold text-gray-900 mb-2">
              Arun Kumar
            </Text>
            <Text className="text-gray-500 font-brandon text-center px-4">
              How would you rate the knowledge and support provided during this
              visit?
            </Text>
          </View>
          {/* Star Rating */}
          <View className="flex-row justify-center space-x-4 mb-10">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                activeOpacity={0.7}
              >
                <Star
                  size={48}
                  color={
                    star <= rating ? "#facc15" : isDark ? "#333" : "#e5e7eb"
                  }
                  fill={star <= rating ? "#facc15" : "transparent"}
                />
              </TouchableOpacity>
            ))}
          </View>
          {/* Feedback Text */}
          <View className="mb-8">
            <Text className="text-gray-900 font-gotham-bold mb-3">
              Additional Comments (Optional)
            </Text>
            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-gray-900 font-brandon-medium min-h-[120px]"
              placeholder="Tell us what went well or what could be improved..."
              placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
              multiline
              textAlignVertical="top"
              value={feedback}
              onChangeText={setFeedback}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleSubmit}
            disabled={rating === 0}
            className={`w-full py-4 rounded-[20px] items-center shadow-md flex-row justify-center mb-8 ${rating > 0 ? "bg-[#15803d]" : "bg-gray-300"}`}
          >
            <Text
              className={`font-gotham-bold text-lg tracking-wide mr-2 ${rating > 0 ? "text-gray-900" : "text-gray-500"}`}
            >
              Submit Rating
            </Text>
            <Send
              size={20}
              color={rating > 0 ? "#fff" : isDark ? "#6b7280" : "#9ca3af"}
            />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

