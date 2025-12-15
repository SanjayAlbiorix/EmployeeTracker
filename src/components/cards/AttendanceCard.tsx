import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AnimatedCard } from '../common/AnimatedCard';
import { Attendance } from '../../types/models';
import { Employee } from '../../types/models';
import { AppText } from '../common/AppText';
import { StatusBadge } from '../common/StatusBadge';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface AttendanceCardProps {
  attendance: Attendance;
  employee?: Employee;
  onToggle?: () => void;
}

const getAttendanceStatus = (status: Attendance['status']): 'present' | 'absent' | 'late' | 'pending' => {
  switch (status) {
    case 'present':
      return 'present';
    case 'absent':
      return 'absent';
    case 'late':
      return 'late';
    case 'half_day':
      return 'pending';
    default:
      return 'absent';
  }
};

export const AttendanceCard: React.FC<AttendanceCardProps> = ({
  attendance,
  employee,
  onToggle,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const employeeName = employee?.name || 'Unknown Employee';
  const statusForBadge = getAttendanceStatus(attendance.status);

  return (
    <AnimatedCard
      style={styles.card}
      onPress={onToggle}
      disabled={!onToggle}
    >
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
          <AppText variant="bodySmall" style={styles.avatarText}>
            {getInitials(employeeName)}
          </AppText>
        </View>
      </View>
      <View style={styles.content}>
        <AppText variant="body" style={styles.name}>
          {employeeName}
        </AppText>
        {employee && (
          <AppText variant="caption" style={styles.role}>
            {employee.role}
          </AppText>
        )}
        <View style={styles.statusContainer}>
          <StatusBadge status={statusForBadge} size="small" />
        </View>
        {attendance.checkIn && (
          <AppText variant="caption" style={styles.time}>
            Check-in: {attendance.checkIn}
            {attendance.checkOut && ` • Check-out: ${attendance.checkOut}`}
          </AppText>
        )}
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
    minHeight: 44,
  },
  avatarContainer: {
    marginRight: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  role: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  lateLabel: {
    color: colors.warning,
    fontWeight: '500',
  },
  time: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
