import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { ChevronLeft, Lock } from "lucide-react-native";

export default function EditProfileScreen() {
  const [form] = useState({
    fullName: "Ramesh Kumar",
    empId: "EMP1008",
    mobile: "+91 98765 43210",
    email: "ramesh.kumar@infinity.com",
    department: "Field Operations",
  });
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
            activeOpacity={0.7}
            className="w-10 h-10 rounded-full bg-white items-center justify-center border border-gray-200 shadow-sm"
          >
            <ChevronLeft size={22} color="#0f172a" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-lg font-gotham-bold">
            My Profile
          </Text>
          <View className="w-10" />
        </View>
        <ScrollView
          className="flex-1 px-6 pt-4 bg-white"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 10 }}
        >
          <View className="bg-blue-50 p-4 rounded-xl mb-8 flex-row items-start border border-blue-100">
            <Lock size={20} color="#3b82f6" className="mt-0.5 mr-3" />
            <Text className="flex-1 text-blue-800 font-brandon text-sm leading-5">
              Your profile information is managed by the administrator. To
              update these details, please contact the IT or HR department.
            </Text>
          </View>
          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">
            Full Name
          </Text>
          <View className="border-b border-gray-200 py-3 mb-6 bg-gray-50 rounded-lg px-3">
            <TextInput
              className="text-gray-600 font-gotham-bold text-base p-0 m-0"
              value={form.fullName}
              editable={false}
            />
          </View>
          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">
            Employee ID
          </Text>
          <View className="border-b border-gray-200 py-3 mb-6 bg-gray-50 rounded-lg px-3">
            <TextInput
              className="text-gray-600 font-gotham-bold text-base p-0 m-0"
              value={form.empId}
              editable={false}
            />
          </View>
          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">
            Mobile Number
          </Text>
          <View className="border-b border-gray-200 py-3 mb-6 bg-gray-50 rounded-lg px-3">
            <TextInput
              className="text-gray-600 font-gotham-bold text-base p-0 m-0"
              value={form.mobile}
              editable={false}
            />
          </View>
          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">
            Email
          </Text>
          <View className="border-b border-gray-200 py-3 mb-6 bg-gray-50 rounded-lg px-3">
            <TextInput
              className="text-gray-600 font-gotham-bold text-base p-0 m-0"
              value={form.email}
              editable={false}
            />
          </View>
          <Text className="text-gray-400 text-xs font-brandon-medium mb-1 ml-1">
            Department
          </Text>
          <View className="border-b border-gray-200 py-3 mb-10 bg-gray-50 rounded-lg px-3">
            <TextInput
              className="text-gray-600 font-gotham-bold text-base p-0 m-0"
              value={form.department}
              editable={false}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
