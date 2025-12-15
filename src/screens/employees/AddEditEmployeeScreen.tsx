import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Section } from '../../components/layout/Section';
import { PageHeader } from '../../components/common/PageHeader';
import { AppInput } from '../../components/common/AppInput';
import { AppButton } from '../../components/common/AppButton';
import { useEmployeeStore } from '../../store/useEmployeeStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type AddEditEmployeeRouteProp = RouteProp<RootStackParamList, 'AddEditEmployee'>;

export const AddEditEmployeeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AddEditEmployeeRouteProp>();
  const { employeeId } = route.params || {};

  const getEmployeeById = useEmployeeStore((state) => state.getEmployeeById);
  const addEmployee = useEmployeeStore((state) => state.addEmployee);
  const updateEmployee = useEmployeeStore((state) => state.updateEmployee);

  const existingEmployee = employeeId ? getEmployeeById(employeeId) : null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    if (existingEmployee) {
      setName(existingEmployee.name);
      setEmail(existingEmployee.email);
      setPhone(existingEmployee.phone);
      setRole(existingEmployee.role);
      setDepartment(existingEmployee.department);
    }
  }, [existingEmployee]);

  const handleSave = () => {
    if (!name || !email || !phone || !role || !department) {
      return;
    }

    if (employeeId && existingEmployee) {
      updateEmployee(employeeId, {
        name,
        email,
        phone,
        role,
        department,
      });
    } else {
      addEmployee({
        name,
        email,
        phone,
        role,
        department,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
      });
    }

    navigation.goBack();
  };

  return (
    <ScreenContainer scrollable={false}>
      <PageHeader
        title={employeeId ? 'Edit Employee' : 'Add Employee'}
        showBack
        onBack={() => navigation.canGoBack() && navigation.goBack()}
        sticky
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Section>
            <AppInput
              label="Full Name"
              placeholder="Enter full name"
              value={name}
              onChangeText={setName}
            />
            <AppInput
              label="Email"
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <AppInput
              label="Phone"
              placeholder="Enter phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <AppInput
              label="Role"
              placeholder="Enter role (e.g., Developer, Manager)"
              value={role}
              onChangeText={setRole}
            />
            <AppInput
              label="Department"
              placeholder="Enter department"
              value={department}
              onChangeText={setDepartment}
            />
          </Section>

          <Section marginBottom="xl">
            <AppButton
              title={employeeId ? 'Update Employee' : 'Add Employee'}
              onPress={handleSave}
              variant="primary"
            />
          </Section>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

