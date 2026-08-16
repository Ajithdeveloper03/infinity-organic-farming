import React, { forwardRef, useState } from 'react';
import { TextInput, View, Text, TextInputProps, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  secureTextEntry?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, icon, secureTextEntry, className = '', ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = secureTextEntry;

    return (
      <View className={`mb-4 ${className}`}>
        {label && <Text className="text-gray-700 font-medium mb-1">{label}</Text>}
        
        <View
          className={`flex-row items-center border rounded-xl bg-white px-3 h-14 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          {icon && <View className="mr-2">{icon}</View>}
          
          <TextInput
            ref={ref}
            className="flex-1 text-base text-gray-900 h-full"
            placeholderTextColor="#9ca3af"
            secureTextEntry={isPassword && !isPasswordVisible}
            {...props}
          />

          {isPassword && (
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="p-2"
            >
              {isPasswordVisible ? (
                <EyeOff size={20} color="#6b7280" />
              ) : (
                <Eye size={20} color="#6b7280" />
              )}
            </TouchableOpacity>
          )}
        </View>

        {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';
