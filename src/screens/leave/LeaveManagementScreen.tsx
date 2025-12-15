import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Section } from '../../components/layout/Section';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusUpdateModal } from '../../components/common/StatusUpdateModal';
import { AppButton } from '../../components/common/AppButton';
import { AppText } from '../../components/common/AppText';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { useLeaveStore } from '../../store/useLeaveStore';
import { LeaveRequest } from '../../types/models';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';

interface LeaveCardProps {
  leaveRequest: LeaveRequest;
  onUpdateStatus: (leaveRequest: LeaveRequest) => void;
}

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

const LeaveCard: React.FC<LeaveCardProps> = ({ leaveRequest, onUpdateStatus }) => {
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
        <View style={styles.employeeInfo}>
          <AppText variant="body" style={styles.employeeName}>
            {leaveRequest.employeeName}
          </AppText>
          <AppText variant="caption" style={styles.leaveType}>
            {typeLabel}
          </AppText>
        </View>
        <StatusBadge status={leaveRequest.status} />
      </View>

      <View style={styles.dateRange}>
        <AppText variant="bodySmall" style={styles.dateLabel}>
          {formatDate(leaveRequest.startDate)} - {formatDate(leaveRequest.endDate)}
        </AppText>
      </View>

      {leaveRequest.reason && (
        <AppText variant="caption" style={styles.reason}>
          {leaveRequest.reason}
        </AppText>
      )}

      <View style={styles.cardActions}>
        <AppButton
          title="Update Status"
          onPress={() => onUpdateStatus(leaveRequest)}
          variant="outline"
          style={styles.updateButton}
        />
      </View>
    </View>
  );
};

export const LeaveManagementScreen: React.FC = () => {
  const leaveRequests = useLeaveStore((state) => state.leaveRequests);
  const updateLeaveStatus = useLeaveStore((state) => state.updateLeaveStatus);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const stats = useMemo(() => {
    return {
      pending: leaveRequests.filter((lr) => lr.status === 'pending').length,
      approved: leaveRequests.filter((lr) => lr.status === 'approved').length,
      rejected: leaveRequests.filter((lr) => lr.status === 'rejected').length,
      total: leaveRequests.length,
    };
  }, [leaveRequests]);

  const handleUpdateStatus = (leaveRequest: LeaveRequest) => {
    setSelectedLeave(leaveRequest);
    setModalVisible(true);
  };

  const handleConfirmStatus = (status: LeaveRequest['status']) => {
    if (selectedLeave) {
      updateLeaveStatus(selectedLeave.id, status);
    }
    setSelectedLeave(null);
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedLeave(null);
  };

  return (
    <ScreenContainer scrollable={false}>
      <PageHeader
        title="Leave Management"
        subtitle={`${stats.total} total requests`}
        sticky
      />

      <Section marginBottom="md">
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.warningSoft }]}>
            <AppText variant="h2" style={[styles.statValue, { color: colors.warning }]}>
              {stats.pending}
            </AppText>
            <AppText variant="label" style={styles.statLabel}>
              Pending
            </AppText>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.successSoft }]}>
            <AppText variant="h2" style={[styles.statValue, { color: colors.success }]}>
              {stats.approved}
            </AppText>
            <AppText variant="label" style={styles.statLabel}>
              Approved
            </AppText>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.errorSoft }]}>
            <AppText variant="h2" style={[styles.statValue, { color: colors.error }]}>
              {stats.rejected}
            </AppText>
            <AppText variant="label" style={styles.statLabel}>
              Rejected
            </AppText>
          </View>
        </View>
      </Section>

      {leaveRequests.length > 0 ? (
        <FlatList
          data={leaveRequests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LeaveCard leaveRequest={item} onUpdateStatus={handleUpdateStatus} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState
          title="No leave requests"
          message="Leave requests will appear here when employees submit them"
        />
      )}

      <StatusUpdateModal
        visible={modalVisible}
        leaveRequest={selectedLeave}
        onClose={handleCloseModal}
        onConfirm={handleConfirmStatus}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
  },
  statValue: {
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  statLabel: {
    color: colors.textSecondary,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
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
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  leaveType: {
    color: colors.textSecondary,
  },
  dateRange: {
    marginBottom: spacing.sm,
  },
  dateLabel: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  reason: {
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },
  cardActions: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  updateButton: {
    alignSelf: 'flex-start',
  },
});
