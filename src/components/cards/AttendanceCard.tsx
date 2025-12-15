import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Attendance } from '../../types/models';
import { Employee } from '../../types/models';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';

interface AttendanceCardProps {
  attendance: Attendance;
  employee?: Employee;
  onToggle?: () => void;
}

const getStatusColor = (status: Attendance['status']) => {
  switch (status) {
    case 'present':
      return colors.success;
    case 'absent':
      return colors.error;
    case 'late':
      return colors.warning;
    case 'half_day':
      return colors.warning;
    default:
      return colors.textSecondary;
  }
};

const getStatusLabel = (status: Attendance['status']) => {
  switch (status) {
    case 'present':
      return 'Present';
    case 'absent':
      return 'Absent';
    case 'late':
      return 'Late';
    case 'half_day':
      return 'Half Day';
    default:
      return status;
  }
};

export const AttendanceCard: React.FC<AttendanceCardProps> = ({
  attendance,
  employee,
  onToggle,
}) => {
  const statusColor = getStatusColor(attendance.status);
  const statusLabel = getStatusLabel(attendance.status);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const employeeName = employee?.name || 'Unknown Employee';

  return (
    <TouchableOpacity
      style={[styles.card, shadows.small]}
      onPress={onToggle}
      activeOpacity={onToggle ? 0.7 : 1}
    >
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
          <Text style={styles.avatarText}>{getInitials(employeeName)}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{employeeName}</Text>
        {employee && <Text style={styles.role}>{employee.role}</Text>}
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
        </View>
        {attendance.checkIn && (
          <Text style={styles.time}>
            Check-in: {attendance.checkIn}
            {attendance.checkOut && ` • Check-out: ${attendance.checkOut}`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
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
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  name: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  role: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  statusText: {
    ...typography.label,
    fontWeight: '600',
  },
  time: {
    ...typography.label,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});

