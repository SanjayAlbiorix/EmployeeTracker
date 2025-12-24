import React, { useEffect, useRef } from "react";
import { memo } from "react";
import { StyleSheet } from "react-native";
import { theme } from "../ui/theme";

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

const Navigation: React.FC = () => {
  const dummyNavigation = { navigate: () => {}, goBack: () => {} } as any;
  const dummyRoute = { key: "dummy", name: "Verify" } as any;

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isVerified = useAuthStore((s) => s.isVerified);
  const isAuthLoading = useAuthStore((s) => s.isLoading);

  const role = useRoleStore((s) => s.role);

  const orgId = useOrgStore((s) => s.orgId);
  const orgHydrated = useOrgStore((s) => s.orgHydrated);
  const hydrateOrganizationState = useOrgStore(
    (s) => s.hydrateOrganizationState
  );

  const hasHydrated = useRef(false);

  useEffect(() => {
    // Reset hydration flag on logout
    if (!isAuthenticated) {
      hasHydrated.current = false;
      return;
    }

    // Hydrate org state ONCE per authenticated session
    if (isAuthenticated && isVerified && !hasHydrated.current) {
      hasHydrated.current = true;
      hydrateOrganizationState();
    }
  }, [isAuthenticated, isVerified, hydrateOrganizationState]);

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
