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

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<DashboardStackParamList>();

const DashboardNavigator = () => {
  const role = useRoleStore((state) => state.role);
  const navigation = useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();
  
  // Mock route for employee since they are rendered directly
  const employeeRoute = { key: 'EmployeeDashboard', name: 'EmployeeDashboard' } as any;

  if (role === "admin") {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="Employees" component={EmployeeNavigator} />
      </Stack.Navigator>
    );
  }

  if (role === "employee") {
    // Employee flow remains simple for now
    return <EmployeeDashboardScreen navigation={navigation as unknown as NativeStackNavigationProp<DashboardStackParamList, "EmployeeDashboard">} route={employeeRoute} />;
  }

  // Fallback if role is somehow missing despite navigation logic
  return (
    <View style={styles.container}>
        <Text variant="md" color="red">Error: No role selected.</Text>
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
