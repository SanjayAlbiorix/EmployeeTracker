import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Section } from '../../components/layout/Section';
import { AppHeader } from '../../components/common/AppHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { mockLeaveRequests } from '../../data/mockData';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';
import { LeaveRequest } from '../../types/models';

const getStatusColor = (status: LeaveRequest['status']) => {
  switch (status) {
    case 'approved':
      return colors.success;
    case 'pending':
      return colors.warning;
    case 'rejected':
      return colors.error;
    default:
      return colors.textSecondary;
  }
};

const getStatusLabel = (status: LeaveRequest['status']) => {
  switch (status) {
    case 'approved':
      return 'Approved';
    case 'pending':
      return 'Pending';
    case 'rejected':
      return 'Rejected';
    default:
      return status;
  }
};

const getTypeLabel = (type: LeaveRequest['type']) => {
  switch (type) {
    case 'sick':
      return 'Sick Leave';
    case 'vacation':
      return 'Vacation';
    case 'personal':
      return 'Personal';
    case 'other':
      return 'Other';
    default:
      return type;
  }
};

interface LeaveCardProps {
  leaveRequest: LeaveRequest;
}

const LeaveCard: React.FC<LeaveCardProps> = ({ leaveRequest }) => {
  const statusColor = getStatusColor(leaveRequest.status);
  const statusLabel = getStatusLabel(leaveRequest.status);
  const typeLabel = getTypeLabel(leaveRequest.type);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={[styles.card, shadows.small]}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.employeeName}>{leaveRequest.employeeName}</Text>
          <Text style={styles.leaveType}>{typeLabel}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{statusLabel}</Text>
        </View>
      </View>

      <View style={styles.dateRange}>
        <Text style={styles.dateLabel}>
          {formatDate(leaveRequest.startDate)} - {formatDate(leaveRequest.endDate)}
        </Text>
      </View>

      {leaveRequest.reason && (
        <Text style={styles.reason}>{leaveRequest.reason}</Text>
      )}
    </View>
  );
};

export const LeaveManagementScreen: React.FC = () => {
  const leaveRequests = mockLeaveRequests;

  const stats = useMemo(() => {
    return {
      pending: leaveRequests.filter((lr) => lr.status === 'pending').length,
      approved: leaveRequests.filter((lr) => lr.status === 'approved').length,
      rejected: leaveRequests.filter((lr) => lr.status === 'rejected').length,
      total: leaveRequests.length,
    };
  }, [leaveRequests]);

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Leave Management" subtitle={`${stats.total} total requests`} />

      <Section marginBottom="md">
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.warning + '20' }]}>
            <Text style={[styles.statValue, { color: colors.warning }]}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.success + '20' }]}>
            <Text style={[styles.statValue, { color: colors.success }]}>{stats.approved}</Text>
            <Text style={styles.statLabel}>Approved</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.error + '20' }]}>
            <Text style={[styles.statValue, { color: colors.error }]}>{stats.rejected}</Text>
            <Text style={styles.statLabel}>Rejected</Text>
          </View>
        </View>
      </Section>

      {leaveRequests.length > 0 ? (
        <FlatList
          data={leaveRequests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <LeaveCard leaveRequest={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState title="No leave requests" message="Leave requests will appear here" />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  statValue: {
    ...typography.h2,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.label,
    color: colors.textSecondary,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  employeeName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  leaveType: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  statusText: {
    ...typography.label,
    fontWeight: '600',
  },
  dateRange: {
    marginBottom: spacing.sm,
  },
  dateLabel: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  reason: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

