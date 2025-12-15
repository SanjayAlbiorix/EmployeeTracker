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
import { RoleGuard } from '../../components/auth/RoleGuard';

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
        <RoleGuard allow={['employee']}>
          <View style={styles.statsContainer}>
            <StatCard
              title="My Grade"
              value="A"
              icon="⭐"
              color={colors.primary}
            />
            <StatCard
              title="Present Days"
              value={stats.presentToday}
              icon="✓"
              color={colors.success}
            />
            <StatCard
              title="Leave Balance"
              value={12}
              icon="📅"
              color={colors.warning}
            />
            <StatCard
              title="Absent Days"
              value={0}
              icon="✗"
              color={colors.error}
            />
          </View>
        </RoleGuard>

        <RoleGuard allow={['manager']}>
          <View style={styles.statsContainer}>
            <StatCard
              title="Team Members"
              value={5}
              icon="👥"
              color={colors.primary}
            />
            <StatCard
              title="Team Present"
              value={4}
              icon="✓"
              color={colors.success}
            />
            <StatCard
              title="Pending Requests"
              value={2}
              icon="📝"
              color={colors.warning}
            />
             <StatCard
              title="Team Absent"
              value={1}
              icon="✗"
              color={colors.error}
            />
          </View>
        </RoleGuard>

        <RoleGuard allow={['admin']}>
          {stats.totalEmployees > 0 ? (
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
          ) : (
            <View style={[styles.welcomeCard, shadows.medium]}>
              <AppText variant="h2" style={styles.welcomeTitle}>
                Welcome to Employee Tracker
              </AppText>
              <AppText variant="body" style={styles.welcomeText}>
                Get started by adding your first employee to the system. Track attendance, manage leave, and keep your team organized.
              </AppText>
            </View>
          )}
        </RoleGuard>
      </Section>

      <View style={styles.contentRow}>
        <Section style={styles.leftColumn}>
          <View style={styles.sectionHeaderContainer}>
            <AppText variant="sectionHeader" style={styles.sectionTitle}>
              Today's Overview
            </AppText>
          </View>
          <View style={[styles.overviewCard, shadows.small]}>
            <View style={styles.overviewItem}>
              <View>
                <AppText variant="body" style={styles.overviewLabel}>Present</AppText>
                <AppText variant="caption" style={styles.overviewSublabel}>Checked in today</AppText>
              </View>
              <View style={styles.overviewValue}>
                <AppText variant="h2" style={{ color: colors.success }}>{stats.presentToday}</AppText>
                <StatusBadge status="present" size="small" />
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.overviewItem}>
              <View>
                <AppText variant="body" style={styles.overviewLabel}>Absent</AppText>
                <AppText variant="caption" style={styles.overviewSublabel}>Not checked in</AppText>
              </View>
              <View style={styles.overviewValue}>
                <AppText variant="h2" style={{ color: colors.error }}>{stats.absent}</AppText>
                <StatusBadge status="absent" size="small" />
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.overviewItem}>
              <View>
                <AppText variant="body" style={styles.overviewLabel}>On Leave</AppText>
                <AppText variant="caption" style={styles.overviewSublabel}>Approved leave</AppText>
              </View>
              <View style={styles.overviewValue}>
                <AppText variant="h2" style={{ color: colors.warning }}>{stats.onLeave}</AppText>
                <StatusBadge status="on_leave" size="small" />
              </View>
            </View>
          </View>
        </Section>

        <Section style={styles.rightColumn}>
          <View style={styles.sectionHeaderContainer}>
            <AppText variant="sectionHeader" style={styles.sectionTitle}>
              Recent Activity
            </AppText>
          </View>
          {recentActivity.length > 0 ? (
            <View style={[styles.activityList, shadows.small]}>
              {recentActivity.map((activity, index) => (
                <View key={activity.id} style={[
                  styles.activityItem,
                  index === recentActivity.length - 1 && { borderBottomWidth: 0 }
                ]}>
                  <View style={styles.timelineContainer}>
                    <View style={[styles.timelineDot, { backgroundColor: activity.status === 'present' ? colors.success : colors.error }]} />
                    {index !== recentActivity.length - 1 && <View style={styles.timelineLine} />}
                  </View>
                  <View style={styles.activityContent}>
                    <View style={styles.activityHeader}>
                      <AppText variant="body" style={styles.activityName}>
                        {activity.employeeName}
                      </AppText>
                      <AppText variant="caption" style={styles.activityTime}>
                         {activity.checkIn || '09:00 AM'}
                      </AppText>
                    </View>
                    <View style={styles.activityStatusRow}>
                      <StatusBadge
                        status={activity.status === 'present' ? 'present' : 'absent'}
                        size="small"
                      />
                      <AppText variant="caption" style={styles.activityDetail}>
                        {activity.status === 'present' ? 'Marked present' : 'Marked absent'}
                      </AppText>
                    </View>
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
  sectionHeaderContainer: {
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.textPrimary,
  },
  overviewCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  overviewItem: {
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overviewLabel: {
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 2,
  },
  overviewSublabel: {
    color: colors.textSecondary,
  },
  overviewValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },
  activityList: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    gap: spacing.md,
  },
  timelineContainer: {
    alignItems: 'center',
    width: 16,
    paddingTop: 6,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginTop: 4,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  activityName: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: 15,
  },
  activityTime: {
    color: colors.textTertiary,
  },
  activityStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  activityDetail: {
    color: colors.textSecondary,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 150,
  },
  emptyText: {
    color: colors.textSecondary,
  },
  welcomeCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary + '20',
  },
  welcomeTitle: {
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  welcomeText: {
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: 22,
  },
});
