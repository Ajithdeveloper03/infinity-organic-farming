import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  Square,
  CheckSquare,
  ShieldCheck,
} from "lucide-react-native";

export default function LoginScreen() {
  const params = useLocalSearchParams();
  const role = (params?.role as string) || "employee";

  const [mobile, setMobile] = useState("9629567318");
  const [password, setPassword] = useState("Employee@1234");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!mobile.trim()) {
      setError("Please enter your mobile number");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Store user metadata for demo presentation
      await AsyncStorage.setItem("userName", "Harish");
      await AsyncStorage.setItem("userRegion", "Delta Zone");
      await AsyncStorage.setItem("userPhone", mobile);
    } catch (e) {
      console.log("Storage note:", e);
    }

    setTimeout(() => {
      setLoading(false);
      if (role === "farmer") {
        router.replace("/(farmer)/dashboard");
      } else {
        router.replace("/(employee)/attendance/clock-in");
      }
    }, 400);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.flexOne}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {/* Logo Area */}
            <View className="items-center mb-8 w-full mt-6">
              <View className="w-28 h-28 bg-white rounded-3xl p-2 items-center justify-center shadow-sm border border-gray-100">
                <Image
                  source={require("../../assets/images/logo.png")}
                  style={{ width: 90, height: 90 }}
                  resizeMode="contain"
                />
              </View>
              <Text className="text-[#15803d] text-xl font-gotham-bold mt-3 text-center tracking-widest">
                INFINITY
              </Text>
              <Text className="text-amber-600 font-brandon text-xs uppercase tracking-wider mt-0.5">
                — Organic Farming —
              </Text>
            </View>

            {/* Welcome Text */}
            <View className="w-full mb-6">
              <Text className="text-3xl font-gotham-bold text-gray-900 mb-1 text-center">
                Welcome Back!
              </Text>
              <Text className="text-gray-500 font-brandon text-base text-center">
                Sign in to your {role === "farmer" ? "Farmer" : "Field Officer"} account
              </Text>
            </View>

            {/* Error Banner */}
            {error ? (
              <View className="w-full bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                <Text className="text-red-700 text-xs font-brandon font-bold text-center">
                  {error}
                </Text>
              </View>
            ) : null}

            {/* Form Area */}
            <View className="w-full">
              {/* Mobile Input */}
              <View className="mb-4">
                <View className="flex-row items-center border border-gray-200 rounded-2xl bg-white px-4 py-3.5 shadow-sm">
                  <View className="mr-3.5">
                    <Phone size={22} color="#15803d" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-500 font-brandon text-xs mb-0.5">
                      Mobile Number
                    </Text>
                    <TextInput
                      className="text-base font-gotham-bold text-gray-900 p-0 m-0"
                      value={mobile}
                      onChangeText={(t) => {
                        setMobile(t);
                        if (error) setError("");
                      }}
                      placeholder="Enter mobile number"
                      placeholderTextColor="#9ca3af"
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-4">
                <View className="flex-row items-center border border-gray-200 rounded-2xl bg-white px-4 py-3.5 shadow-sm">
                  <View className="mr-3.5">
                    <Lock size={22} color="#15803d" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-500 font-brandon text-xs mb-0.5">
                      Password
                    </Text>
                    <TextInput
                      className="text-base font-gotham-bold text-gray-900 p-0 m-0"
                      value={password}
                      onChangeText={(t) => {
                        setPassword(t);
                        if (error) setError("");
                      }}
                      secureTextEntry={!showPassword}
                      placeholder="Enter password"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="p-1"
                    activeOpacity={0.7}
                  >
                    {showPassword ? (
                      <EyeOff size={22} color="#15803d" />
                    ) : (
                      <Eye size={22} color="#15803d" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remember Me & Forgot Password */}
              <View className="flex-row justify-between items-center mb-6 mt-1">
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.7}
                >
                  {rememberMe ? (
                    <CheckSquare size={19} color="#15803d" />
                  ) : (
                    <Square size={19} color="#6b7280" />
                  )}
                  <Text className="text-gray-700 ml-2 font-brandon text-sm">
                    Remember Me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-[#15803d] font-gotham-bold text-xs uppercase tracking-wider">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                className="bg-[#15803d] py-4 rounded-2xl items-center justify-center shadow-md flex-row"
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <>
                    <ShieldCheck size={20} color="#ffffff" className="mr-2" />
                    <Text className="text-white font-gotham-bold text-base tracking-wide">
                      Secure Login
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Credentials hint for demo */}
              <View className="mt-5 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <Text className="text-xs text-emerald-800 font-brandon text-center">
                  🔑 <Text className="font-gotham-bold">Demo Officer:</Text> 9629567318 / Employee@1234
                </Text>
              </View>

              {/* Footer */}
              <View className="flex-row justify-center mt-8 pb-4">
                <Text className="text-gray-500 font-brandon text-sm">
                  Don&apos;t have an account?{" "}
                </Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-[#15803d] font-gotham-bold text-sm">
                    Contact Admin
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  flexOne: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    alignItems: "center",
  },
});
