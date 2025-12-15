import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../../theme/spacing';

interface SectionProps {
  children: ReactNode;
  style?: any;
  marginBottom?: keyof typeof spacing;
}

export const Section: React.FC<SectionProps> = ({
  children,
  style,
  marginBottom = 'lg',
}) => {
  return (
    <View style={[styles.section, { marginBottom: spacing[marginBottom] }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
  },
});

