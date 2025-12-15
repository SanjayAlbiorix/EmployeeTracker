import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppText } from './AppText';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { isWeb } from '../../utils/platform';

interface BackButtonProps {
  onPress?: () => void;
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  label = 'Back',
}) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (canGoBack) {
      navigation.goBack();
    }
  };

  if (!canGoBack && !onPress) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <AppText variant="body" style={styles.icon}>
        {isWeb ? '←' : '←'}
      </AppText>
      {isWeb && (
        <AppText variant="body" style={styles.label}>
          {label}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    minHeight: 44,
    minWidth: 44,
  },
  icon: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: '600',
    marginRight: spacing.xs,
  },
  label: {
    color: colors.primary,
    fontWeight: '500',
  },
});
