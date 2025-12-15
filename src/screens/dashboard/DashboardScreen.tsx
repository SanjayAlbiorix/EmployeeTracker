import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Section } from '../../components/layout/Section';
import { StatCard } from '../../components/cards/StatCard';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useAttendanceStore } from '../../store/useAttendanceStore';
import { useAuthStore } from '../../store/useAuthStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const DashboardScreen: React.FC = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const attendance = useAttendanceStore((state) => state.attendance);
  const user = useAuthStore((state) => state.user);

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = useMemo(
    () => attendance.filter((a) => a.date === today),
    [attendance, today]
  );

  const stats = useMemo(() => {
    const present = todayAttendance.filter((a) => a.status === 'present').length;
    const absent = todayAttendance.filter((a) => a.status === 'absent').length;
    const onLeave = employees.filter((e) => e.status === 'on_leave').length;

    return {
      totalEmployees: employees.length,
      presentToday: present,
      onLeave,
      absent,
    };
  }, [employees, todayAttendance]);

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
      };
    });
  }, [todayAttendance, employees]);

  return (
    <ScreenContainer scrollable>
      <Section>
        <Text style={styles.greeting}>
          {greeting}, {user?.name || 'Admin'} 👋
        </Text>
        <Text style={styles.subtitle}>Here's what's happening today</Text>
      </Section>

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

      <Section>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {recentActivity.length > 0 ? (
          <View style={styles.activityList}>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityContent}>
                  <Text style={styles.activityName}>{activity.employeeName}</Text>
                  <Text style={styles.activityStatus}>
                    {activity.status === 'present' ? 'Present' : 'Absent'}
                    {activity.checkIn && ` • Checked in at ${activity.checkIn}`}
                  </Text>
                </View>
                <View
                  style={[
                    styles.activityDot,
                    {
                      backgroundColor:
                        activity.status === 'present' ? colors.success : colors.error,
                    },
                  ]}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No activity today</Text>
          </View>
        )}
      </Section>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  greeting: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  activityList: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  activityStatus: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
});

