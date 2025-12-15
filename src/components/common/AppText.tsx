import React, { ReactNode } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { typography, TypographyVariant } from '../../theme/typography';
import { colors } from '../../theme/colors';

interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  children: ReactNode;
  color?: string;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  children,
  style,
  color,
  ...props
}) => {
  const textStyle = [
    typography[variant],
    color && { color },
    style,
  ];

  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
};
