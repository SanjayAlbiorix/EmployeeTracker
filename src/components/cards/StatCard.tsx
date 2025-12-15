import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../common/AppText';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
  color?: string;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = colors.primary,
  trend,
}) => {
  const colorSoft = color === colors.primary ? colors.primarySoft :
                    color === colors.success ? colors.successSoft :
                    color === colors.warning ? colors.warningSoft :
                    color === colors.error ? colors.errorSoft : colors.primarySoft;

  return (
    <View style={[styles.card, shadows.card, { backgroundColor: colorSoft + '15' }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <AppText variant="label" style={styles.title}>
            {title}
          </AppText>
          {icon && (
            <View style={[styles.iconContainer, { backgroundColor: colorSoft }]}>
              <AppText variant="body" style={[styles.icon, { color }]}>
                {icon}
              </AppText>
            </View>
          )}
        </View>
        <View style={styles.valueRow}>
          <AppText variant="pageTitle" style={[styles.value, { color }]}>
            {value}
          </AppText>
        </View>
        {trend && (
          <View style={styles.trend}>
            <View style={[
              styles.trendIndicator,
              { backgroundColor: trend.isPositive ? colors.successSoft : colors.errorSoft }
            ]}>
              <AppText
                variant="caption"
                style={[
                  styles.trendText,
                  { color: trend.isPositive ? colors.success : colors.error }
                ]}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </AppText>
            </View>
            <AppText variant="caption" style={styles.trendLabel}>
              {trend.label}
            </AppText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.lg,
    flex: 1,
    minWidth: 200,
    marginHorizontal: spacing.xs,
    marginBottom: spacing.md,
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  title: {
    flex: 1,
    color: colors.textSecondary,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  valueRow: {
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  trendIndicator: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  trendText: {
    fontWeight: '600',
  },
  trendLabel: {
    color: colors.textSecondary,
  },
});

