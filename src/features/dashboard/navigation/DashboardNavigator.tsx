import React, { memo } from "react";
import { useRoleStore } from "@/store/roleStore";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import EmployeeDashboardScreen from "../screens/EmployeeDashboardScreen";
import { View, StyleSheet } from "react-native";
import Text from "@/ui/components/Text";

import { useNavigation } from "@react-navigation/native";
import { DashboardStackParamList } from "@/types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import EmployeeNavigator from "@/features/employee/navigation/EmployeeNavigator";
import AdminAttendanceScreen from "@/features/attendance/screens/AdminAttendanceScreen";
import EmployeeAttendanceScreen from "@/features/attendance/screens/EmployeeAttendanceScreen";
import AdminLeaveScreen from "@/features/leave/screens/AdminLeaveScreen";
import EmployeeLeaveScreen from "@/features/leave/screens/EmployeeLeaveScreen";
import RequestLeaveScreen from "@/features/leave/screens/RequestLeaveScreen";
import AdminPayrollScreen from "@/features/payroll/screens/AdminPayrollScreen";
import PayrollRunScreen from "@/features/payroll/screens/PayrollRunScreen";
import EmployeePayslipScreen from "@/features/payroll/screens/EmployeePayslipScreen";
import OrgSettingsScreen from "@/features/org/screens/OrgSettingsScreen";
import ProfileSettingsScreen from "@/features/employee/screens/ProfileSettingsScreen";
import PayrollListScreen from "@/features/payroll/screens/PayrollListScreen";
import PayslipListScreen from "@/features/payroll/screens/PayslipListScreen";

import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "@/ui/theme";

const Stack = createStackNavigator<DashboardStackParamList>();

const DashboardNavigator = () => {
  const role = useRoleStore((state) => state.role);
  const navigation = useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();
  
  
  if (role === "admin") {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="Employees" component={EmployeeNavigator} />
        <Stack.Screen name="Attendance" component={AdminAttendanceScreen} />
        <Stack.Screen name="Leaves" component={AdminLeaveScreen} />
        <Stack.Screen name="Payroll" component={AdminPayrollScreen} />
        <Stack.Screen name="PayrollRun" component={PayrollRunScreen} />
        <Stack.Screen name="OrgSettings" component={OrgSettingsScreen} />
        <Stack.Screen name="PayrollList" component={PayrollListScreen} />
      </Stack.Navigator>
    );
  }

  if (role === "employee") {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboardScreen} />
        <Stack.Screen name="Attendance" component={EmployeeAttendanceScreen} />
        <Stack.Screen name="Leaves" component={EmployeeLeaveScreen} />
        <Stack.Screen name="RequestLeave" component={RequestLeaveScreen} />
        <Stack.Screen name="Payslip" component={EmployeePayslipScreen} />
        <Stack.Screen name="PayslipList" component={PayslipListScreen} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
      </Stack.Navigator>
    );
  }

  // Fallback
  return (
    <View style={styles.container}>
        <Text variant="md" color={theme.colors.error}>Error: No role selected.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
});

export default memo(DashboardNavigator);
