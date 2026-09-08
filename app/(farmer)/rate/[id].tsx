import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router, useLocalSearchParams } from "expo-router";

import { ChevronLeft, Star } from "lucide-react-native";

import { Button } from "../../../components/ui/Button";

import { showToast } from "../../../components/ui/ToastMessage";

export default function FarmerRateOfficerScreen() {
  /*
 eslint-disable-next-line @typescript-eslint/no-unused-vars  */
  const { id } = useLocalSearchParams();

  const [rating, setRating] = useState(4);

  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header - Transparent */}
        <View style={{ backgroundColor: "transparent" }} className="px-5 pt-2 pb-3 flex-row items-center justify-between z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-200 shadow-sm"
          >
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-lg font-gotham-bold">
            Rate Field Officer
          </Text>
          <View className="w-10" />
        </View>
        <ScrollView
          className="flex-1 px-6 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 10, alignItems: "center" }}
        >
          <View className="items-center mb-8">
            <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4 border-2 border-slate-200 shadow-sm overflow-hidden">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
                }}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-gray-900 text-2xl font-gotham-bold mb-1">
              Arun Kumar
            </Text>
            <Text className="text-gray-500 font-brandon-medium">
              Field Officer
            </Text>
          </View>
          <Text className="text-gray-900 font-gotham-bold text-lg mb-6">
            How was your experience?
          </Text>
          <View className="flex-row items-center justify-center space-x-2 mb-10 w-full px-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                className="p-1"
              >
                <Star
                  size={48}
                  color={star <= rating ? "#fbbf24" : "#d1d5db"}
                  fill={star <= rating ? "#fbbf24" : "transparent"}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View className="w-full mb-8">
            <Text className="text-gray-900 font-gotham-bold mb-3 text-left">
              Write a feedback (optional)
            </Text>
            <View className="border border-gray-200 rounded-xl px-4 py-3 bg-white h-32 w-full">
              <TextInput
                className="flex-1 text-gray-900"
                multiline
                textAlignVertical="top"
                placeholder="Share your feedback here..."
                placeholderTextColor="#9ca3af"
                value={feedback}
                onChangeText={setFeedback}
              />
            </View>
          </View>
          <View className="w-full">
            <Button
              title="Submit Rating"
              loading={loading}
              onPress={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  showToast({
                    title: "Feedback Submitted",
                    message: "Thank you for rating your Field Officer.",
                    type: "success",
                  });
                  router.back();
                }, 1000);
              }}
              className="bg-[#15803d]"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
