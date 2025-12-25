import React, { useEffect, useRef } from "react";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../ui/theme";
import AuthNavigator from "../features/auth/navigation/AuthNavigator";
import OrgNavigator from "../features/org/navigation/OrgNavigator";
import AppShell from "./AppShell";
import UnauthenticatedLayout from "../ui/layout/UnauthenticatedLayout";
import VerifyScreen from "../features/auth/screens/VerifyScreen";
import RoleSelectScreen from "../features/org/screens/RoleSelectScreen";
import DashboardNavigator from "../features/dashboard/navigation/DashboardNavigator";
import LoadingScreen from "../ui/screens/LoadingScreen";
import Text from "../ui/components/Text";
import Button from "../ui/components/Button";
import { useAuthStore } from "../store/authStore";
import { useOrgStore } from "../store/orgStore";
import { useRoleStore } from "../store/roleStore";
const Navigation: React.FC = () => {
  const dummyNavigation = { navigate: () => {}, goBack: () => {} } as any;
  const dummyRoute = { key: "dummy", name: "Verify" } as any;
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isVerified = useAuthStore((s) => s.isVerified);
  const isAuthLoading = useAuthStore((s) => s.isLoading);
  const logout = useAuthStore((s) => s.logout);
  const role = useRoleStore((s) => s.role);
  const orgId = useOrgStore((s) => s.orgId);
  const orgHydrated = useOrgStore((s) => s.orgHydrated);
  const joinRequestStatus = useOrgStore((s) => s.joinRequestStatus);
  const hydrateOrganizationState = useOrgStore(
    (s) => s.hydrateOrganizationState
  );
  const hydrateEmployeeState = useOrgStore((s) => s.hydrateEmployeeState);
  const hasHydrated = useRef(false);
  useEffect(() => {
    // Reset hydration flag on logout
    if (!isAuthenticated) {
      hasHydrated.current = false;
      return;
    }
    if (isAuthenticated && isVerified && !hasHydrated.current && role) {
      hasHydrated.current = true;
      if (role === 'employee') {
        hydrateEmployeeState();
      } else {
        hydrateOrganizationState();
      }
    }
  }, [isAuthenticated, isVerified, role, hydrateOrganizationState, hydrateEmployeeState]);
  // Global loading guard
  if (isAuthLoading) {
    return <LoadingScreen />;
  }
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
      ) : !orgHydrated ? (
        // 🔥 CRITICAL FIX — WAIT FOR ORG HYDRATION
        <LoadingScreen />
      ) : role === 'employee' && joinRequestStatus === 'pending' ? (
        <UnauthenticatedLayout>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: theme.spacing.xl }}>
                <Text variant="xl" weight="bold" style={{ textAlign: 'center', marginBottom: theme.spacing.md }}>Waiting for approval</Text>
                <Text variant="md" color={theme.colors.textSecondary} style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
                    Your request to join an organization is pending admin approval. You will access the dashboard once approved.
                </Text>
                <Button title="Log Out" onPress={logout} variant="outline" />
            </View>
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