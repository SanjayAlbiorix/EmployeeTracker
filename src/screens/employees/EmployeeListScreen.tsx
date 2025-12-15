import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Section } from '../../components/layout/Section';
import { AppHeader } from '../../components/common/AppHeader';
import { AppInput } from '../../components/common/AppInput';
import { EmployeeCard } from '../../components/cards/EmployeeCard';
import { EmptyState } from '../../components/common/EmptyState';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { RootStackParamList, TabParamList } from '../../navigation/types';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Employees'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export const EmployeeListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const employees = useEmployeeStore((state) => state.employees);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return employees;
    const query = searchQuery.toLowerCase();
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.role.toLowerCase().includes(query) ||
        emp.department.toLowerCase().includes(query)
    );
  }, [employees, searchQuery]);

  const handleEmployeePress = (employeeId: string) => {
    navigation.navigate('EmployeeDetail', { employeeId });
  };

  const handleAddEmployee = () => {
    navigation.navigate('AddEditEmployee', {});
  };

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader
        title="Employees"
        subtitle={`${employees.length} total employees`}
        rightAction={{
          label: '+ Add',
          onPress: handleAddEmployee,
        }}
      />

      <Section marginBottom="md">
        <AppInput
          placeholder="Search employees..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </Section>

      {filteredEmployees.length > 0 ? (
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
      ) : (
        <EmptyState
          title="No employees found"
          message={searchQuery ? 'Try adjusting your search' : 'Add your first employee'}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={handleAddEmployee}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: spacing.xl,
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 32,
    color: colors.white,
    fontWeight: '300',
  },
});

