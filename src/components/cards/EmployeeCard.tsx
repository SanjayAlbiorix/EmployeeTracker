import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AnimatedCard } from '../common/AnimatedCard';
import { AppText } from '../common/AppText';
import { StatusBadge } from '../common/StatusBadge';
import { Employee } from '../../types/models';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface EmployeeCardProps {
  employee: Employee;
  onPress: () => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onPress }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AnimatedCard onPress={onPress} style={styles.card}>
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
          <AppText variant="body" style={styles.avatarText}>
            {getInitials(employee.name)}
          </AppText>
        </View>
      </View>
      <View style={styles.content}>
        <AppText variant="h3" style={styles.name}>
          {employee.name}
        </AppText>
        <AppText variant="bodySmall" style={styles.role}>
          {employee.role}
        </AppText>
        <AppText variant="caption" style={styles.department}>
          {employee.department}
        </AppText>
        <View style={styles.statusContainer}>
          <StatusBadge status={employee.status} size="small" />
        </View>
      </View>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
  },
  avatarContainer: {
    marginRight: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.primary,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  role: {
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  department: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  statusContainer: {
    alignSelf: 'flex-start',
  },
});
