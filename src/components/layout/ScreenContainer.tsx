import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { getMaxContentWidth, isWeb } from '../../utils/platform';

interface ScreenContainerProps {
  children: ReactNode;
  style?: any;
  scrollable?: boolean;
  backgroundColor?: string;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  scrollable = false,
  backgroundColor = colors.background,
}) => {
  const content = (
    <View style={[styles.container, { backgroundColor }, style]}>
      <View style={styles.content}>{children}</View>
    </View>
  );

  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>{content}</SafeAreaView>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    ...(isWeb && {
      maxWidth: getMaxContentWidth(),
      width: '100%',
      alignSelf: 'center',
    }),
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
});

