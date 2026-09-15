import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import {
  ChevronLeft,
  HelpCircle,
  Phone,
  MessageSquare,
  AlertCircle,
  Mail,
  ChevronRight,
} from "lucide-react-native";
import { useLanguage, LanguageTogglePill } from "../../context/LanguageContext";

export default function SupportScreen() {
  const { t, language } = useLanguage();
  const handleCall = () => {};

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      {/* Background image subtle overlay */}
      <ImageBackground
        source={require("../../assets/images/image4.jpg")}
        style={StyleSheet.absoluteFill}
        imageStyle={{ opacity: 0.12 }}
        resizeMode="cover"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        {/* Header - Neat Top Spacing and Alignment */}
        <View
          style={{ backgroundColor: "transparent" }}
          className="px-5 pt-3 pb-3 flex-row items-center justify-between z-10"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/95 items-center justify-center border border-slate-200 shadow-sm"
            activeOpacity={0.7}
          >
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-slate-900 text-lg font-gotham-bold">
            {language === "ta" ? "24/7 உதவி மையம்" : "24/7 Support Center"}
          </Text>
          <LanguageTogglePill />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 130, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5">
            <View className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-6 items-center">
              <View className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full items-center justify-center mb-3.5 shadow-xs">
                <HelpCircle size={32} color="#15803d" />
              </View>
              <Text className="text-slate-900 font-gotham-bold text-xl mb-1.5 text-center">
                {language === "ta" ? "நாங்கள் உங்களுக்கு எவ்வாறு உதவலாம்?" : "How can we help you?"}
              </Text>
              <Text className="text-slate-600 font-gotham-medium text-xs text-center leading-relaxed">
                {language === "ta"
                  ? "எங்கள் விவசாய ஆதரவுக் குழு 24/7 சேவையில் உள்ளது. வேளாண்மை நிபுணரை உடனடியாக தொடர்பு கொள்ளுங்கள்."
                  : "Our agronomy care team is available 24/7. Connect directly with an agronomy expert below."}
              </Text>
            </View>

            <Text className="text-base font-gotham-bold text-slate-900 mb-3.5">
              {language === "ta" ? "உடனடி உதவி" : "Immediate Assistance"}
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCall}
              className="bg-emerald-50/80 rounded-2xl p-4 shadow-sm border border-emerald-200/90 mb-3.5 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1 pr-2">
                <View className="w-11 h-11 bg-emerald-100 rounded-xl items-center justify-center mr-3.5 border border-emerald-300/80">
                  <Phone size={22} color="#15803d" />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-900 font-gotham-bold text-sm">
                    {language === "ta" ? "இலவச வேளாண்மை அழைப்பு" : "Call Agronomist Toll-Free"}
                  </Text>
                  <Text className="text-emerald-900 text-xs font-gotham-medium mt-0.5">
                    1800-123-4567 • {language === "ta" ? "24/7 இலவச சேவை" : "Free 24/7"}
                  </Text>
                </View>
              </View>
              <ChevronRight size={18} color="#15803d" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-sky-50/80 rounded-2xl p-4 shadow-sm border border-sky-200/90 mb-6 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1 pr-2">
                <View className="w-11 h-11 bg-sky-100 rounded-xl items-center justify-center mr-3.5 border border-sky-300/80">
                  <MessageSquare size={22} color="#0284c7" />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-900 font-gotham-bold text-sm">
                    {language === "ta" ? "வாட்ஸ்அப் உதவி மையம்" : "WhatsApp Agronomy Desk"}
                  </Text>
                  <Text className="text-sky-900 text-xs font-gotham-medium mt-0.5">
                    {language === "ta" ? "சான்றளிக்கப்பட்ட அதிகாரிகளுடன் உரையாடுங்கள்" : "Chat instantly with certified staff"}
                  </Text>
                </View>
              </View>
              <ChevronRight size={18} color="#0284c7" />
            </TouchableOpacity>

            <Text className="text-base font-gotham-bold text-slate-900 mb-3.5">
              {language === "ta" ? "மற்ற விருப்பங்கள்" : "Other Options"}
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-amber-50/80 rounded-2xl p-4 shadow-sm border border-amber-200/90 mb-3.5 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1 pr-2">
                <View className="w-11 h-11 bg-amber-100 rounded-xl items-center justify-center mr-3.5 border border-amber-300/80">
                  <AlertCircle size={22} color="#b45309" />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-900 font-gotham-bold text-sm">
                    {language === "ta" ? "களக் கோரிக்கை பதிவு" : "Raise a Field Query"}
                  </Text>
                  <Text className="text-amber-900 text-xs font-gotham-medium mt-0.5">
                    {language === "ta" ? "கள ஆய்வு குறித்து கேள்வி எழுப்புங்கள்" : "Report an issue with a recent visit"}
                  </Text>
                </View>
              </View>
              <ChevronRight size={18} color="#b45309" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-purple-50/80 rounded-2xl p-4 shadow-sm border border-purple-200/90 mb-4 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1 pr-2">
                <View className="w-11 h-11 bg-purple-100 rounded-xl items-center justify-center mr-3.5 border border-purple-300/80">
                  <Mail size={22} color="#7e22ce" />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-900 font-gotham-bold text-sm">
                    {language === "ta" ? "மின்னஞ்சல் ஆதரவு" : "Email Support"}
                  </Text>
                  <Text className="text-purple-900 text-xs font-gotham-medium mt-0.5">
                    support@infinityorganics.com
                  </Text>
                </View>
              </View>
              <ChevronRight size={18} color="#7e22ce" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

