import React, { memo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import StatCard from "../components/StatCard";
import QuickActionCard from "../components/QuickActionCard";
import TopBar from "@/ui/layout/TopBar";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import SkeletonCard from "@/ui/components/SkeletonCard";
import { ResponsiveGrid } from "@/ui/layout/ResponsiveGrid";

import { DashboardScreenProps } from "@/types/navigation";
import { useOrgStore } from "@/store/orgStore";

type Props = DashboardScreenProps<"AdminDashboard">;

const AdminDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const isLoading = false;
  // In a real app, you might look up the org details from the ID or have it in the store
  const orgId = useOrgStore((state) => state.orgId);
  const orgName = "Acme Corp"; // Placeholder or derived from store if available

  if (isLoading) {
    return (
      <ScreenContainer>
        <TopBar title="Admin Dashboard" showSidebarToggle />
        <View style={{ padding: theme.spacing.md, gap: theme.spacing.md }}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll>
      <TopBar title="Dashboard" subtitle={orgName} showSidebarToggle />
      <View style={styles.scrollContent}>

      <View style={styles.section}>
        <Text variant="lg" weight="bold" style={styles.sectionTitle}>Key Metrics</Text>
        <ResponsiveGrid>
          <StatCard title="Total Employees" value="124" subtext="+4 this month" />
          <StatCard title="Present Today" value="112" subtext="90% attendance" />
          <StatCard title="On Leave" value="8" subtext="Scheduled" />
          <StatCard title="Pending Approvals" value="5" subtext="Needs attention" />
        </ResponsiveGrid>
      </View>

      <View style={styles.section}>
        <Text variant="lg" weight="bold" style={styles.sectionTitle}>Quick Actions</Text>
        <ResponsiveGrid>
          <QuickActionCard 
            title="Invite Employee" 
            icon="person-add" 
            onPress={() => navigation.navigate("OrgSettings")} 
          />
          <QuickActionCard title="Approve Leave" icon="checkmark-circle" onPress={() => navigation.navigate("Leaves")} />
          <QuickActionCard title="Run Payroll" icon="cash" onPress={() => navigation.navigate("PayrollRun")} />
          <QuickActionCard title="Settings" icon="settings" onPress={() => navigation.navigate("OrgSettings")} />
        </ResponsiveGrid>
      </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.md,
    gap: theme.spacing.xl,
  },
  section: {
    gap: theme.spacing.md,
  },
  sectionTitle: {
    marginBottom: theme.spacing.sm,
  },

});

export default memo(AdminDashboardScreen);
