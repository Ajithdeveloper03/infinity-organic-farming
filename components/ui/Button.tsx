import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  textClassName?: string;
  icon?: React.ReactNode;
}

export const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  className = '',
  textClassName = '',
  icon,
}: ButtonProps) => {
  const baseStyle = 'flex-row justify-center items-center rounded-full py-4 px-6';
  
  let variantStyle = '';
  let textStyle = 'text-base font-gotham-bold text-center';

  switch (variant) {
    case 'primary':
      variantStyle = 'bg-[#15803d] active:bg-[#7a7ce0]';
      textStyle += ' text-white';
      break;
    case 'secondary':
      variantStyle = 'bg-[#e8e8fc] active:bg-[#d1d1f8]';
      textStyle += ' text-[#15803d]';
      break;
    case 'outline':
      variantStyle = 'border-2 border-[#15803d] bg-transparent active:bg-[#e8e8fc]';
      textStyle += ' text-[#15803d]';
      break;
  }

  const disabledStyle = disabled || loading ? 'opacity-50' : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseStyle} ${variantStyle} ${disabledStyle} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#15803d'} />
      ) : (
        <>
          {icon && icon}
          <Text className={`${textStyle} ${textClassName}`}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
