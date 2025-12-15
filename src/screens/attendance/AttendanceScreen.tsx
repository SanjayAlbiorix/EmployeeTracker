import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Section } from '../../components/layout/Section';
import { AppHeader } from '../../components/common/AppHeader';
import { AttendanceCard } from '../../components/cards/AttendanceCard';
import { EmptyState } from '../../components/common/EmptyState';
import { useAttendanceStore } from '../../store/useAttendanceStore';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export const AttendanceScreen: React.FC = () => {
  const employees = useEmployeeStore((state) => state.employees);
  const attendance = useAttendanceStore((state) => state.attendance);
  const markPresent = useAttendanceStore((state) => state.markPresent);
  const markAbsent = useAttendanceStore((state) => state.markAbsent);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const dateAttendance = useMemo(() => {
    return attendance
      .filter((a) => a.date === selectedDate)
      .map((a) => {
        const employee = employees.find((e) => e.id === a.employeeId);
        return { ...a, employee };
      });
  }, [attendance, selectedDate, employees]);

  const employeesWithoutAttendance = useMemo(() => {
    const attendedIds = dateAttendance.map((a) => a.employeeId);
    return employees.filter((e) => !attendedIds.includes(e.id));
  }, [employees, dateAttendance]);

  const allAttendance = useMemo(() => {
    const withAttendance = dateAttendance.map((a) => ({
      attendance: a,
      employee: a.employee,
    }));

    const withoutAttendance = employeesWithoutAttendance.map((employee) => ({
      attendance: {
        id: `temp-${employee.id}`,
        employeeId: employee.id,
        date: selectedDate,
        status: 'absent' as const,
      },
      employee,
    }));

    return [...withAttendance, ...withoutAttendance];
  }, [dateAttendance, employeesWithoutAttendance, selectedDate]);

  const handleToggleAttendance = (employeeId: string, currentStatus: string) => {
    if (currentStatus === 'present' || currentStatus === 'late') {
      markAbsent(employeeId, selectedDate);
    } else {
      markPresent(employeeId, selectedDate);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Attendance" subtitle={formatDate(selectedDate)} />

      <Section marginBottom="md">
        <View style={styles.dateSelector}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              const prevDate = new Date(selectedDate);
              prevDate.setDate(prevDate.getDate() - 1);
              setSelectedDate(prevDate.toISOString().split('T')[0]);
            }}
          >
            <Text style={styles.dateButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.dateDisplay}>
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          </View>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              const nextDate = new Date(selectedDate);
              nextDate.setDate(nextDate.getDate() + 1);
              const today = new Date().toISOString().split('T')[0];
              if (nextDate.toISOString().split('T')[0] <= today) {
                setSelectedDate(nextDate.toISOString().split('T')[0]);
              }
            }}
          >
            <Text style={styles.dateButtonText}>→</Text>
          </TouchableOpacity>
        </View>
      </Section>

      {allAttendance.length > 0 ? (
        <FlatList
          data={allAttendance}
          keyExtractor={(item) => item.attendance.id}
          renderItem={({ item }) => (
            <AttendanceCard
              attendance={item.attendance}
              employee={item.employee}
              onToggle={() =>
                handleToggleAttendance(
                  item.attendance.employeeId,
                  item.attendance.status
                )
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState title="No employees found" message="Add employees to track attendance" />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: spacing.sm,
  },
  dateButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  dateButtonText: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '600',
  },
  dateDisplay: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  dateText: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
});

