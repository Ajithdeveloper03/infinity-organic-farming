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
import { ChevronLeft, Star, CheckCircle2, Award, Sparkles } from "lucide-react-native";
import { showToast } from "../../../components/ui/ToastMessage";
import { useLanguage, LanguageTogglePill } from "../../../context/LanguageContext";

const QUICK_TAGS = [
  "Punctual & Polite",
  "Soil & pH Expert",
  "Clear Fertilizer Dosage",
  "Helpful Recommendations",
  "Practical Farm Guidance",
];

const RATING_LABELS: Record<number, string> = {
  1: "Needs Improvement",
  2: "Fair Experience",
  3: "Good Support",
  4: "Very Satisfied",
  5: "Exceptional Service",
};

export default function RateFieldOfficerScreen() {
  const { t, language } = useLanguage();
  const params = useLocalSearchParams<{ id?: string; officerName?: string }>();
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Soil & pH Expert",
    "Clear Fertilizer Dosage",
  ]);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const officerName = params.officerName || "Harish Kumar";

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast({
        title: language === "ta" ? "மதிப்பீடு சமர்ப்பிக்கப்பட்டது!" : "Rating Submitted!",
        message: language === "ta"
          ? `${officerName} அவர்களை மதிப்பிட்டமைக்கு நன்றி.`
          : `Thank you for rating ${officerName}. Your feedback helps maintain our high standards.`,
        type: "success",
      });
      router.replace("/(farmer)/dashboard" as any);
    }, 600);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header - Transparent */}
        <View
          style={{ backgroundColor: "transparent" }}
          className="px-5 pt-2 pb-3 flex-row items-center justify-between z-10"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-slate-200 shadow-sm"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>

          <Text className="text-lg font-gotham-bold text-slate-900">
            {t("rateOfficer", "Rate Field Officer")}
          </Text>

          <LanguageTogglePill />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            className="flex-1 px-5 pt-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 160, paddingTop: 6 }}
          >
            {/* Officer Profile Card (Medium Brightness & Elegance) */}
            <View className="bg-emerald-50/95 rounded-3xl p-6 mb-5 border border-emerald-200/90 shadow-xs items-center">
              <View className="relative mb-3">
                <View className="w-24 h-24 rounded-full overflow-hidden border-3 border-emerald-500 shadow-md bg-white">
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <View className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1 border-2 border-white">
                  <CheckCircle2 size={16} color="#fff" />
                </View>
              </View>

              <Text className="text-slate-900 font-gotham-bold text-xl mb-1">
                {officerName}
              </Text>

              <View className="flex-row items-center bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300 mb-1">
                <Award size={13} color="#059669" className="mr-1" />
                <Text className="text-emerald-900 font-gotham-bold text-xs uppercase tracking-wider">
                  Senior Agronomy Officer • Delta Zone
                </Text>
              </View>

              <Text className="text-slate-600 text-xs font-gotham-medium mt-1">
                Recent Field Inspection • Soil & Biomass Audit
              </Text>
            </View>

            {/* Star Rating Section */}
            <View className="bg-white rounded-3xl p-6 mb-5 border border-slate-200 shadow-sm items-center">
              <Text className="text-slate-900 font-gotham-bold text-base mb-1">
                How was your experience?
              </Text>
              <Text className="text-slate-500 text-xs font-gotham-medium mb-4">
                Tap a star to rate the advisory quality
              </Text>

              {/* Stars */}
              <View className="flex-row items-center justify-center mb-3">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= rating;
                  return (
                    <TouchableOpacity
                      key={star}
                      activeOpacity={0.7}
                      onPress={() => setRating(star)}
                      className="p-2"
                    >
                      <Star
                        size={36}
                        color={isFilled ? "#f59e0b" : "#cbd5e1"}
                        fill={isFilled ? "#f59e0b" : "transparent"}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Dynamic Rating Label */}
              <View className="bg-amber-50 border border-amber-200/80 px-4 py-1.5 rounded-full flex-row items-center">
                <Sparkles size={14} color="#d97706" className="mr-1.5" />
                <Text className="text-amber-800 font-gotham-bold text-xs tracking-wide">
                  {RATING_LABELS[rating] || "Very Satisfied"}
                </Text>
              </View>
            </View>

            {/* Quick Compliments / Feedback Tags */}
            <View className="bg-white rounded-3xl p-6 mb-5 border border-slate-200 shadow-sm">
              <Text className="text-slate-900 font-gotham-bold text-sm mb-1">
                What went especially well?
              </Text>
              <Text className="text-slate-500 text-xs font-gotham-medium mb-3">
                Select one or more highlights
              </Text>

              <View className="flex-row flex-wrap gap-2">
                {QUICK_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <TouchableOpacity
                      key={tag}
                      activeOpacity={0.75}
                      onPress={() => toggleTag(tag)}
                      className={`px-3.5 py-2 rounded-full border ${
                        isSelected
                          ? "bg-emerald-600 border-emerald-600 shadow-xs"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <Text
                        className={`text-xs font-gotham-bold ${
                          isSelected ? "text-white" : "text-slate-700"
                        }`}
                      >
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Optional Written Feedback */}
            <View className="bg-white rounded-3xl p-6 mb-5 border border-slate-200 shadow-sm">
              <Text className="text-slate-900 font-gotham-bold text-sm mb-1">
                Additional Comments (Optional)
              </Text>
              <Text className="text-slate-500 text-xs font-gotham-medium mb-3">
                Share any specific suggestions or questions for Harish
              </Text>

              <TextInput
                value={feedback}
                onChangeText={setFeedback}
                placeholder="Write your feedback here (e.g., dosage instructions were clear, arrived on time...)"
                placeholderTextColor="#94a3b8"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-gotham-medium text-xs leading-relaxed h-28"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#15803d] active:bg-[#166534] py-4 rounded-2xl items-center shadow-md border border-emerald-500/30"
            >
              <Text className="text-white font-gotham-bold text-base tracking-wide">
                {isSubmitting
                  ? (language === "ta" ? "சமர்ப்பிக்கிறது..." : "Submitting...")
                  : t("submitRating", "Submit Rating & Review")}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
