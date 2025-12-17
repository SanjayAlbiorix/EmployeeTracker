import React, { memo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import StatCard from "../components/StatCard";
import QuickActionCard from "../components/QuickActionCard";
import TopBar from "@/ui/layout/TopBar";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import SkeletonCard from "@/ui/components/SkeletonCard";

import { DashboardScreenProps } from "@/types/navigation";

type Props = DashboardScreenProps<"AdminDashboard">;

const AdminDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const isLoading = false;

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
      <TopBar title="Admin Dashboard" showSidebarToggle />
      <View style={styles.scrollContent}>

      <View style={styles.section}>
        <Text variant="lg" weight="bold" style={styles.sectionTitle}>Key Metrics</Text>
        <View style={styles.grid}>
          <StatCard title="Total Employees" value="124" subtext="+4 this month" />
          <StatCard title="Present Today" value="112" subtext="90% attendance" />
          <StatCard title="On Leave" value="8" subtext="Scheduled" />
          <StatCard title="Pending Approvals" value="5" subtext="Needs attention" />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="lg" weight="bold" style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.grid}>
          <QuickActionCard title="Add Employee" icon="person-add" onPress={() => navigation.navigate("Employees", { screen: "AddEmployee" })} />
          <QuickActionCard title="Approve Leave" icon="checkmark-circle" onPress={() => {}} />
          <QuickActionCard title="Run Payroll" icon="cash" onPress={() => {}} />
          <QuickActionCard title="Settings" icon="settings" onPress={() => {}} />
        </View>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap", // Enable wrapping
    gap: theme.spacing.md,
  },
});

export default memo(AdminDashboardScreen);
