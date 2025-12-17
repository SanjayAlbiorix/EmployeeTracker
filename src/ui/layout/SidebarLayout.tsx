import React from "react";
import { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import Text from "../components/Text";

type Props = {
  activeRoute?: string;
  onClose?: () => void;
};

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamList } from "@/types/navigation";

import { useRoleStore } from "@/store/roleStore";

type SidebarItemConfig = {
  key: string;
  label: string;
  roles: ("admin" | "employee")[];
  route: keyof DashboardStackParamList;
  params?: any;
};

const SIDEBAR_ITEMS: SidebarItemConfig[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    roles: ["admin", "employee"],
    route: "AdminDashboard", // Ideally this should be dynamic based on role, but for now sidebar click can route to generic entry or we handle it in onPress
  },
  {
    key: "employees",
    label: "Employees",
    roles: ["admin"],
    route: "Employees",
    params: { screen: "EmployeeList" },
  },
  {
    key: "attendance",
    label: "Attendance",
    roles: ["admin", "employee"],
    route: "Attendance",
  },
  {
    key: "leave_requests",
    label: "Leave Requests",
    roles: ["admin"],
    route: "Leaves",
  },
  {
    key: "my_leaves",
    label: "My Leaves",
    roles: ["employee"],
    route: "Leaves",
  },
  {
    key: "payroll",
    label: "Payroll",
    roles: ["admin"],
    route: "Payroll",
  },
  {
    key: "payslip",
    label: "Payslip",
    roles: ["employee"],
    route: "Payslip",
  },
];

const SidebarLayout: React.FC<Props> = ({ activeRoute, onClose }) => {
  const navigation = useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();
  const role = useRoleStore((s) => s.role);

  const handleNavigation = (route: keyof DashboardStackParamList, params?: any) => {
    // @ts-ignore - navigation overloads
    navigation.navigate(route, params);
    onClose?.();
  };

  // Special case: Redirect "Dashboard" click based on role
  // This is a UI-layer fix to ensure "Dashboard" link goes to the right place
  const getRouteForRule = (item: SidebarItemConfig) => {
      if (item.key === "dashboard") {
          return role === "employee" ? "EmployeeDashboard" : "AdminDashboard";
      }
      return item.route;
  }

  const visibleItems = SIDEBAR_ITEMS.filter((item) =>
    role ? item.roles.includes(role) : false
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
         <Text variant="xl" weight="bold" color={theme.colors.surface}>
            HRMS
         </Text>
      </View>
      
      <View style={styles.navContainer}>
        {visibleItems.map((item) => (
            <TouchableOpacity 
                key={item.key} 
                style={styles.navItem} 
                onPress={() => handleNavigation(getRouteForRule(item), item.params)}
            >
                <Text color={theme.colors.surface}>{item.label}</Text>
            </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: theme.colors.textPrimary, // Dark sidebar
    height: "100%",
    padding: theme.spacing.md,
  },
  logoContainer: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.sm,
  },
  navContainer: {
    gap: theme.spacing.md,
  },
  navItem: {
    padding: theme.spacing.sm,
    borderRadius: theme.spacing.xs,
  },
});

export default memo(SidebarLayout);
