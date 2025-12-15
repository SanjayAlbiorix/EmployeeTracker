import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Section } from '../../components/layout/Section';
import { AppHeader } from '../../components/common/AppHeader';
import { AppButton } from '../../components/common/AppButton';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useAttendanceStore } from '../../store/useAttendanceStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type EmployeeDetailRouteProp = RouteProp<RootStackParamList, 'EmployeeDetail'>;

export const EmployeeDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EmployeeDetailRouteProp>();
  const { employeeId } = route.params;
  const getEmployeeById = useEmployeeStore((state) => state.getEmployeeById);
  const getAttendanceByEmployee = useAttendanceStore(
    (state) => state.getAttendanceByEmployee
  );

  const employee = getEmployeeById(employeeId);
  const attendance = getAttendanceByEmployee(employeeId);

  if (!employee) {
    return (
      <ScreenContainer>
        <AppHeader title="Employee Not Found" showBack onBack={() => navigation.goBack()} />
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

  const presentCount = attendance.filter((a) => a.status === 'present').length;
  const absentCount = attendance.filter((a) => a.status === 'absent').length;

  const handleEdit = () => {
    navigation.navigate('AddEditEmployee', { employeeId });
  };

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Employee Details" showBack onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Section>
          <View style={[styles.profileCard, shadows.medium]}>
            <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
              <Text style={styles.avatarText}>{getInitials(employee.name)}</Text>
            </View>
            <Text style={styles.name}>{employee.name}</Text>
            <Text style={styles.role}>{employee.role}</Text>
            <Text style={styles.department}>{employee.department}</Text>
          </View>
        </Section>

        <Section>
          <View style={[styles.infoCard, shadows.small]}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{employee.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{employee.phone}</Text>
            </View>
          </View>
        </Section>

        <Section>
          <View style={[styles.infoCard, shadows.small]}>
            <Text style={styles.sectionTitle}>Employee Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={[styles.infoValue, { color: colors.primary }]}>
                {employee.status === 'active'
                  ? 'Active'
                  : employee.status === 'on_leave'
                  ? 'On Leave'
                  : 'Inactive'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Join Date</Text>
              <Text style={styles.infoValue}>
                {new Date(employee.joinDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </Section>

        <Section>
          <View style={[styles.infoCard, shadows.small]}>
            <Text style={styles.sectionTitle}>Attendance Summary</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{presentCount}</Text>
                <Text style={styles.statLabel}>Present</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{absentCount}</Text>
                <Text style={styles.statLabel}>Absent</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{attendance.length}</Text>
                <Text style={styles.statLabel}>Total Days</Text>
              </View>
            </View>
          </View>
        </Section>

        <Section marginBottom="xl">
          <AppButton title="Edit Employee" onPress={handleEdit} variant="primary" />
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
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    ...typography.h1,
    color: colors.primary,
    fontWeight: '700',
  },
  name: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  role: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  department: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  infoCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    ...typography.label,
    color: colors.textSecondary,
  },
  infoValue: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    ...typography.label,
    color: colors.textSecondary,
  },
});

