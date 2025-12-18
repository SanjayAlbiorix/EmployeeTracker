import React, { useEffect } from "react";
import { memo } from "react";
import { View, StyleSheet, Platform, useWindowDimensions } from "react-native";
import { theme } from "../ui/theme";
import Text from "../ui/components/Text";
import { Ionicons } from "@expo/vector-icons";
import AuthNavigator from "../features/auth/navigation/AuthNavigator";
import OrgNavigator from "../features/org/navigation/OrgNavigator";
import AppShell from "./AppShell";
import UnauthenticatedLayout from "../ui/layout/UnauthenticatedLayout";
import VerifyScreen from "../features/auth/screens/VerifyScreen";
import RoleSelectScreen from "../features/org/screens/RoleSelectScreen";
import DashboardNavigator from "../features/dashboard/navigation/DashboardNavigator";
import LoadingScreen from "../ui/screens/LoadingScreen";
import { useAuthStore } from "../store/authStore";
import { useOrgStore } from "../store/orgStore";
import { useRoleStore } from "../store/roleStore";

import { useNavigation } from "@react-navigation/native";

const Navigation: React.FC = () => {
    // We use a cast here because these screens are rendered conditionally outside a navigator
    // but strict typing enforces navigation/route props.
    // Since they are conditionally rendered at root, they don't have a history stack in this context.
    const dummyNavigation = { navigate: () => {}, goBack: () => {} } as any;
    const dummyRoute = { key: 'dummy', name: 'dummy' } as any;

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isVerified = useAuthStore((state) => state.isVerified);
    const orgId = useOrgStore((state) => state.orgId);
    const role = useRoleStore((state) => state.role);

    // Initial check or loading state could be added here if needed for hydration
    
  return (
    <>
      {!isAuthenticated ? (
         <UnauthenticatedLayout>
            <AuthNavigator />
         </UnauthenticatedLayout>
      ) : !isVerified ? (
         <UnauthenticatedLayout>
            <VerifyScreen navigation={dummyNavigation} route={dummyRoute} /> 
         </UnauthenticatedLayout>
      ) : !role ? (
         <UnauthenticatedLayout>
            <RoleSelectScreen />
         </UnauthenticatedLayout>
      ) : !orgId ? (
         <UnauthenticatedLayout>
            <OrgNavigator />
         </UnauthenticatedLayout>
      ) : (
         <AppShell>
            <DashboardNavigator />
         </AppShell>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
});

export default memo(Navigation);
