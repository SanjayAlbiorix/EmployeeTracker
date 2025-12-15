import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message, icon = '📋' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AppText variant="body" style={styles.icon}>
          {icon}
        </AppText>
      </View>
      <AppText variant="h3" style={styles.title}>
        {title}
      </AppText>
      {message && (
        <AppText variant="bodySmall" style={styles.message}>
          {message}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    minHeight: 300,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary + '10', // 10% opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 400,
  },
});
