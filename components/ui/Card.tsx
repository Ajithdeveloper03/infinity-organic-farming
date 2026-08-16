import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card = ({ children, className = '', noPadding = false, ...props }: CardProps) => {
  return (
    <View
      className={`bg-white rounded-[24px] shadow-sm ${
        noPadding ? '' : 'p-5'
      } ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};
