import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { BackButton } from './BackButton';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
import { isWeb } from '../../utils/platform';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightActions?: ReactNode;
  sticky?: boolean;
  showBack?: boolean;
  onBack?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  rightActions,
  sticky = false,
  showBack = false,
  onBack,
}) => {
  return (
    <View
      style={[
        styles.container,
        sticky && isWeb && styles.sticky,
        !sticky && shadows.header,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.left}>
          {showBack && <BackButton onPress={onBack} />}
          <View style={styles.titleContainer}>
            <AppText variant="pageTitle" style={styles.title}>
              {title}
            </AppText>
            {subtitle && (
              <AppText variant="subtitle" style={styles.subtitle}>
                {subtitle}
              </AppText>
            )}
          </View>
        </View>
        {rightActions && <View style={styles.right}>{rightActions}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    ...(isWeb && {
      position: 'sticky' as any,
      top: 0,
      zIndex: 100,
    }),
  },
  sticky: {
    ...shadows.header,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});

