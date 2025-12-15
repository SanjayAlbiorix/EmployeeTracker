import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { EmployeeListScreen } from '../screens/employees/EmployeeListScreen';
import { AttendanceScreen } from '../screens/attendance/AttendanceScreen';
import { LeaveManagementScreen } from '../screens/leave/LeaveManagementScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          ...typography.label,
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>📊</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Employees"
        component={EmployeeListScreen}
        options={{
          tabBarLabel: 'Employees',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>👥</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={AttendanceScreen}
        options={{
          tabBarLabel: 'Attendance',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>✓</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Leave"
        component={LeaveManagementScreen}
        options={{
          tabBarLabel: 'Leave',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>📅</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Text style={[styles.icon, { color }]}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
  },
});

