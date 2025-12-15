import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Section } from '../../components/layout/Section';
import { PageHeader } from '../../components/common/PageHeader';
import { AppButton } from '../../components/common/AppButton';
import { AppText } from '../../components/common/AppText';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Tabs } from '../../components/common/Tabs';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useAttendanceStore } from '../../store/useAttendanceStore';
import { useAuthStore } from '../../store/useAuthStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
import { RootStackParamList } from '../../navigation/types';
import { RoleGuard } from '../../components/auth/RoleGuard';
import { PermissionHint } from '../../components/auth/PermissionHint';
import { isWeb } from '../../utils/platform';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type EmployeeDetailRouteProp = RouteProp<RootStackParamList, 'EmployeeDetail'>;

export const EmployeeDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EmployeeDetailRouteProp>();
  const { employeeId } = route.params;
  const [activeTab, setActiveTab] = useState('overview');

  const getEmployeeById = useEmployeeStore((state) => state.getEmployeeById);
  const getAttendanceByEmployee = useAttendanceStore(
    (state) => state.getAttendanceByEmployee
  );

  const employee = getEmployeeById(employeeId);
  const attendance = getAttendanceByEmployee(employeeId);

  const stats = useMemo(() => {
    const presentCount = attendance.filter((a) => a.status === 'present').length;
    const absentCount = attendance.filter((a) => a.status === 'absent').length;
    const lateCount = attendance.filter((a) => a.status === 'late').length;
    return { presentCount, absentCount, lateCount, total: attendance.length };
  }, [attendance]);

  if (!employee) {
    return (
      <ScreenContainer>
        <PageHeader title="Employee Not Found" />
        <Section>
          <AppText variant="body">Employee not found</AppText>
        </Section>
      </ScreenContainer>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleEdit = () => {
    navigation.navigate('AddEditEmployee', { employeeId });
  };

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'attendance', label: 'Attendance' },
    { key: 'leave', label: 'Leave' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'attendance':
        return (
          <View style={styles.tabContent}>
            <AppText variant="sectionHeader" style={styles.tabTitle}>
              Attendance History
            </AppText>
            <View style={styles.statsGrid}>
              <View style={[styles.statBox, shadows.small]}>
                <AppText variant="h2" style={{ color: colors.success }}>
                  {stats.presentCount}
                </AppText>
                <AppText variant="caption" style={{ color: colors.textSecondary }}>
                  Present Days
                </AppText>
              </View>
              <View style={[styles.statBox, shadows.small]}>
                <AppText variant="h2" style={{ color: colors.error }}>
                  {stats.absentCount}
                </AppText>
                <AppText variant="caption" style={{ color: colors.textSecondary }}>
                  Absent Days
                </AppText>
              </View>
              <View style={[styles.statBox, shadows.small]}>
                <AppText variant="h2" style={{ color: colors.warning }}>
                  {stats.lateCount}
                </AppText>
                <AppText variant="caption" style={{ color: colors.textSecondary }}>
                  Late Days
                </AppText>
              </View>
            </View>
          </View>
        );
      case 'leave':
        return (
          <View style={styles.tabContent}>
            <AppText variant="sectionHeader" style={styles.tabTitle}>
              Leave Records
            </AppText>
            <AppText variant="body" style={{ color: colors.textSecondary }}>
              No leave records available
            </AppText>
          </View>
        );
      default:
        return (
          <View style={styles.tabContent}>
            <View style={[styles.infoCard, shadows.small]}>
              <AppText variant="sectionHeader" style={styles.infoTitle}>
                Contact Information
              </AppText>
              <View style={styles.infoRow}>
                <AppText variant="label" style={styles.infoLabel}>
                  Email
                </AppText>
                <AppText variant="body" style={styles.infoValue}>
                  {employee.email}
                </AppText>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <AppText variant="label" style={styles.infoLabel}>
                  Phone
                </AppText>
                <AppText variant="body" style={styles.infoValue}>
                  {employee.phone}
                </AppText>
              </View>
            </View>

            <View style={[styles.infoCard, shadows.small]}>
              <AppText variant="sectionHeader" style={styles.infoTitle}>
                Employee Information
              </AppText>
              <View style={styles.infoRow}>
                <AppText variant="label" style={styles.infoLabel}>
                  Status
                </AppText>
                <StatusBadge status={employee.status} />
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <AppText variant="label" style={styles.infoLabel}>
                  Join Date
                </AppText>
                <AppText variant="body" style={styles.infoValue}>
                  {new Date(employee.joinDate).toLocaleDateString()}
                </AppText>
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <ScreenContainer scrollable={false}>
      <PageHeader
        title="Employee Details"
        rightActions={
          <>
            <RoleGuard allow={['admin']}>
              <AppButton title="Edit" onPress={handleEdit} variant="primary" />
            </RoleGuard>
            <RoleGuard allow={['manager']}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                 {isWeb && <PermissionHint text="Read Only" />}
                 <AppButton title="Edit" disabled variant="outline" onPress={() => {}} />
              </View>
            </RoleGuard>
          </>
        }
        showBack
        onBack={() => navigation.canGoBack() && navigation.goBack()}
        sticky
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Section>
          <View style={[styles.profileCard, shadows.medium]}>
            <View style={styles.profileHeader}>
              <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
                <AppText variant="h1" style={{ color: colors.primary, fontWeight: '700' }}>
                  {getInitials(employee.name)}
                </AppText>
                <View style={[styles.statusIndicator, { backgroundColor: colors.success }]} />
              </View>
              <View style={styles.profileInfo}>
                <AppText variant="pageTitle" style={styles.name}>
                  {employee.name}
                </AppText>
                <AppText variant="subtitle" style={styles.role}>
                  {employee.role}
                </AppText>
                <AppText variant="bodySmall" style={styles.department}>
                  {employee.department}
                </AppText>
                <View style={styles.statusContainer}>
                  <StatusBadge status={employee.status} />
                </View>
              </View>
            </View>
          </View>
        </Section>

        <Section>
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          {renderContent()}
        </Section>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.xl,
  },
  profileHeader: {
    flexDirection: isWeb ? 'row' : 'column',
    alignItems: isWeb ? 'center' : 'flex-start',
    gap: spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.surface,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  role: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  department: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  statusContainer: {
    alignSelf: 'flex-start',
  },
  tabContent: {
    paddingTop: spacing.md,
  },
  tabTitle: {
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statBox: {
    flex: 1,
    minWidth: 150,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  infoTitle: {
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    color: colors.textSecondary,
  },
  infoValue: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.sm,
  },
});
