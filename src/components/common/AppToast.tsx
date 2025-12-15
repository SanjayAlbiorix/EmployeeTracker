import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

type ToastType = 'success' | 'error' | 'info';

interface AppToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
}

const getToastConfig = (type: ToastType) => {
  switch (type) {
    case 'success':
      return {
        backgroundColor: colors.successSoft,
        borderColor: colors.success,
        icon: '✓',
      };
    case 'error':
      return {
        backgroundColor: colors.errorSoft,
        borderColor: colors.error,
        icon: '✕',
      };
    case 'info':
      return {
        backgroundColor: colors.primarySoft,
        borderColor: colors.primary,
        icon: 'ℹ',
      };
  }
};

export const AppToast: React.FC<AppToastProps> = ({
  visible,
  message,
  type = 'info',
}) => {
  if (!visible) return null;

  const config = getToastConfig(type);

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      exiting={FadeOutUp.duration(300)}
      style={[
        styles.container,
        {
          backgroundColor: config.backgroundColor,
          borderLeftColor: config.borderColor,
        },
        shadows.medium,
      ]}
    >
      <View style={styles.iconContainer}>
        <AppText variant="body" style={[styles.icon, { color: config.borderColor }]}>
          {config.icon}
        </AppText>
      </View>
      <AppText variant="body" style={styles.message}>
        {message}
      </AppText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  icon: {
    fontWeight: '700',
  },
  message: {
    flex: 1,
    color: colors.textPrimary,
  },
});

