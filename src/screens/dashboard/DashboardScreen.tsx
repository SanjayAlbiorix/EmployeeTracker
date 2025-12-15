import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Section } from '../../components/layout/Section';
import { PageHeader } from '../../components/common/PageHeader';
import { StatCard } from '../../components/cards/StatCard';
import { AppText } from '../../components/common/AppText';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useAttendanceStore } from '../../store/useAttendanceStore';
import { useAuthStore } from '../../store/useAuthStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';

export const DashboardScreen: React.FC = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const attendance = useAttendanceStore((state) => state.attendance);
  const user = useAuthStore((state) => state.user);

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const todayAttendance = useMemo(
    () => attendance.filter((a) => a.date === today),
    [attendance, today]
  );

  const yesterdayAttendance = useMemo(
    () => attendance.filter((a) => a.date === yesterday),
    [attendance, yesterday]
  );

  const stats = useMemo(() => {
    const present = todayAttendance.filter((a) => a.status === 'present').length;
    const absent = todayAttendance.filter((a) => a.status === 'absent').length;
    const onLeave = employees.filter((e) => e.status === 'on_leave').length;
    const yesterdayPresent = yesterdayAttendance.filter((a) => a.status === 'present').length;

    const presentTrend = yesterdayPresent > 0
      ? ((present - yesterdayPresent) / yesterdayPresent) * 100
      : 0;

    return {
      totalEmployees: employees.length,
      presentToday: present,
      onLeave,
      absent,
      presentTrend: {
        value: Math.abs(presentTrend),
        label: 'vs yesterday',
        isPositive: presentTrend >= 0,
      },
    };
  }, [employees, todayAttendance, yesterdayAttendance]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }, []);

  const recentActivity = useMemo(() => {
    return todayAttendance.slice(0, 5).map((a) => {
      const employee = employees.find((e) => e.id === a.employeeId);
      return {
        id: a.id,
        employeeName: employee?.name || 'Unknown',
        status: a.status,
        checkIn: a.checkIn,
        employee,
      };
    });
  }, [todayAttendance, employees]);

  return (
    <ScreenContainer scrollable>
      <PageHeader
        title={`${greeting}, ${user?.name || 'Admin'}`}
        subtitle="Here's what's happening today"
        sticky
      />

      <Section>
        <View style={styles.statsContainer}>
          <StatCard
            title="Total Employees"
            value={stats.totalEmployees}
            icon="👥"
            color={colors.primary}
          />
          <StatCard
            title="Present Today"
            value={stats.presentToday}
            icon="✓"
            color={colors.success}
            trend={stats.presentTrend}
          />
          <StatCard
            title="On Leave"
            value={stats.onLeave}
            icon="📅"
            color={colors.warning}
          />
          <StatCard
            title="Absent"
            value={stats.absent}
            icon="✗"
            color={colors.error}
          />
        </View>
      </Section>

      <View style={styles.contentRow}>
        <Section style={styles.leftColumn}>
          <AppText variant="sectionHeader" style={styles.sectionTitle}>
            Attendance Overview
          </AppText>
          <View style={[styles.overviewCard, shadows.small]}>
            <View style={styles.overviewItem}>
              <AppText variant="body" style={styles.overviewLabel}>
                Present
              </AppText>
              <View style={styles.overviewValue}>
                <AppText variant="h2" style={{ color: colors.success }}>
                  {stats.presentToday}
                </AppText>
                <StatusBadge status="present" size="small" />
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.overviewItem}>
              <AppText variant="body" style={styles.overviewLabel}>
                Absent
              </AppText>
              <View style={styles.overviewValue}>
                <AppText variant="h2" style={{ color: colors.error }}>
                  {stats.absent}
                </AppText>
                <StatusBadge status="absent" size="small" />
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.overviewItem}>
              <AppText variant="body" style={styles.overviewLabel}>
                On Leave
              </AppText>
              <View style={styles.overviewValue}>
                <AppText variant="h2" style={{ color: colors.warning }}>
                  {stats.onLeave}
                </AppText>
                <StatusBadge status="on_leave" size="small" />
              </View>
            </View>
          </View>
        </Section>

        <Section style={styles.rightColumn}>
          <AppText variant="sectionHeader" style={styles.sectionTitle}>
            Recent Activity
          </AppText>
          {recentActivity.length > 0 ? (
            <View style={[styles.activityList, shadows.small]}>
              {recentActivity.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <View style={styles.activityContent}>
                    <View style={styles.activityHeader}>
                      <AppText variant="body" style={styles.activityName}>
                        {activity.employeeName}
                      </AppText>
                      <StatusBadge
                        status={activity.status === 'present' ? 'present' : 'absent'}
                        size="small"
                      />
                    </View>
                    {activity.checkIn && (
                      <AppText variant="caption" style={styles.activityTime}>
                        Checked in at {activity.checkIn}
                      </AppText>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <AppText variant="body" style={styles.emptyText}>
                No activity today
              </AppText>
            </View>
          )}
        </Section>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  contentRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    flexWrap: 'wrap',
  },
  leftColumn: {
    flex: 1,
    minWidth: 300,
  },
  rightColumn: {
    flex: 1,
    minWidth: 300,
  },
  sectionTitle: {
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  overviewCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
  },
  overviewItem: {
    paddingVertical: spacing.md,
  },
  overviewLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  overviewValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.xs,
  },
  activityList: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  activityItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  activityName: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  activityTime: {
    color: colors.textSecondary,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  emptyText: {
    color: colors.textSecondary,
  },
});
