import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Section } from '../../components/layout/Section';
import { PageHeader } from '../../components/common/PageHeader';
import { FilterBar } from '../../components/common/FilterBar';
import { AppButton } from '../../components/common/AppButton';
import { DataTable, Column } from '../../components/common/DataTable';
import { EmployeeCard } from '../../components/cards/EmployeeCard';
import { RoleGuard } from '../../components/auth/RoleGuard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AppText } from '../../components/common/AppText';
import { EmptyState } from '../../components/common/EmptyState';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Employee } from '../../types/models';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
import { isWeb } from '../../utils/platform';
import { RootStackParamList, TabParamList } from '../../navigation/types';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Employees'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const EmployeeListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const employees = useEmployeeStore((state) => state.employees);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredEmployees = useMemo(() => {
    let filtered = employees;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query) ||
          emp.role.toLowerCase().includes(query) ||
          emp.department.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((emp) => emp.status === statusFilter);
    }

    return filtered;
  }, [employees, searchQuery, statusFilter]);

  const handleEmployeePress = (employeeId: string) => {
    navigation.navigate('EmployeeDetail', { employeeId });
  };

  const handleAddEmployee = () => {
    navigation.navigate('AddEditEmployee', {});
  };

  const handleSelect = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedIds(filteredEmployees.map((emp) => emp.id));
    } else {
      setSelectedIds([]);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const columns: Column<Employee>[] = [
    {
      key: 'name',
      label: 'Employee',
      width: 250,
      render: (employee) => (
        <View style={styles.tableCell}>
          <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
            <AppText variant="caption" style={{ color: colors.primary, fontWeight: '700' }}>
              {getInitials(employee.name)}
            </AppText>
          </View>
          <View style={styles.tableCellContent}>
            <AppText variant="body" style={{ fontWeight: '600', color: colors.textPrimary }}>
              {employee.name}
            </AppText>
            <AppText variant="caption" style={{ color: colors.textSecondary }}>
              {employee.email}
            </AppText>
          </View>
        </View>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      width: 200,
      render: (employee) => (
        <AppText variant="body" style={{ color: colors.textPrimary }}>
          {employee.role}
        </AppText>
      ),
    },
    {
      key: 'department',
      label: 'Department',
      width: 180,
      render: (employee) => (
        <AppText variant="body" style={{ color: colors.textSecondary }}>
          {employee.department}
        </AppText>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      width: 120,
      render: (employee) => <StatusBadge status={employee.status} size="small" />,
    },
  ];

  const statusFilters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'On Leave', value: 'on_leave' },
  ];

  const rightActions = (
    <RoleGuard allow={['admin']}>
      <AppButton
        title="+ Add Employee"
        onPress={handleAddEmployee}
        variant="primary"
      />
    </RoleGuard>
  );

  return (
    <ScreenContainer scrollable={false}>
      <PageHeader
        title="Employees"
        subtitle={`${employees.length} total employees`}
        rightActions={isWeb ? rightActions : undefined}
        sticky
      />

      <Section marginBottom="md">
        <FilterBar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search employees..."
          filters={statusFilters.map((filter) => ({
            label: filter.label,
            value: filter.value,
            active: statusFilter === filter.value,
            onPress: () => setStatusFilter(filter.value),
          }))}
          rightActions={!isWeb ? rightActions : undefined}
        />
      </Section>

      {selectedIds.length > 0 && (
        <View style={styles.selectionBar}>
          <AppText variant="body" style={styles.selectionText}>
            {selectedIds.length} selected
          </AppText>
          <AppButton
            title="Clear"
            onPress={() => setSelectedIds([])}
            variant="outline"
            style={styles.selectionButton}
          />
        </View>
      )}

      {filteredEmployees.length > 0 ? (
        isWeb ? (
          <DataTable
            data={filteredEmployees}
            columns={columns}
            keyExtractor={(item) => item.id}
            onRowPress={(item) => handleEmployeePress(item.id)}
            selectable
            selectedIds={selectedIds}
            onSelect={handleSelect}
            selectAll={selectedIds.length === filteredEmployees.length && filteredEmployees.length > 0}
            onSelectAll={handleSelectAll}
            emptyMessage="No employees found"
          />
        ) : (
          <FlatList
            data={filteredEmployees}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EmployeeCard
                employee={item}
                onPress={() => handleEmployeePress(item.id)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )
      ) : (
        <EmptyState
          title="No employees found"
          message={searchQuery || statusFilter !== 'all' ? 'Try adjusting your filters' : 'Add your first employee'}
        />
      )}

      {!isWeb && (
        <RoleGuard allow={['admin']}>
          <TouchableOpacity style={styles.fab} onPress={handleAddEmployee}>
            <AppText variant="body" style={styles.fabText}>+</AppText>
          </TouchableOpacity>
        </RoleGuard>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: spacing.xl,
  },
  selectionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.primarySoft,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 8,
  },
  selectionText: {
    color: colors.primary,
    fontWeight: '600',
  },
  selectionButton: {
    minWidth: 80,
  },
  tableCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableCellContent: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.fab,
  },
  fabText: {
    fontSize: 32,
    color: colors.white,
    fontWeight: '300',
  },
});
