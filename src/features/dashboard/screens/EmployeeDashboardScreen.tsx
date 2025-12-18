import React, { memo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import StatCard from "../components/StatCard";
import QuickActionCard from "../components/QuickActionCard";
import Card from "@/ui/components/Card";
import Button from "@/ui/components/Button";

import ScreenContainer from "@/ui/layout/ScreenContainer";
import TopBar from "@/ui/layout/TopBar";
import { ResponsiveGrid } from "@/ui/layout/ResponsiveGrid";

import { DashboardScreenProps } from "@/types/navigation";
import { useOrgStore } from "@/store/orgStore";

type Props = DashboardScreenProps<"EmployeeDashboard">;

const EmployeeDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const orgName = "Acme Corp"; // Placeholder

  return (
    <ScreenContainer scroll>
       <TopBar title="Dashboard" subtitle={orgName} showSidebarToggle />
       <View style={styles.content}>

      <View style={styles.section}>
        <Card style={styles.statusCard}>
             <View>
                <Text variant="lg" weight="bold">Today's Status</Text>
                <Text variant="md" color={theme.colors.textSecondary}>You are not punched in</Text>
             </View>
             <Button title="Punch In" onPress={() => {}} style={{ width: 120 }} />
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="lg" weight="bold" style={styles.sectionTitle}>My Stats</Text>
        <ResponsiveGrid>
          <StatCard title="Leave Balance" value="12" subtext="Days remaining" />
          <StatCard title="Overtime" value="4h" subtext="This month" />
          <StatCard title="Upcoming Holiday" value="New Year" subtext="Jan 1st" />
        </ResponsiveGrid>
      </View>

      <View style={styles.section}>
        <Text variant="lg" weight="bold" style={styles.sectionTitle}>Quick Actions</Text>
        <ResponsiveGrid>
          <QuickActionCard title="Request Leave" icon="calendar" onPress={() => navigation.navigate("RequestLeave")} />
          <QuickActionCard title="My Payslips" icon="document-text" onPress={() => navigation.navigate("PayslipList")} />
          <QuickActionCard title="My Profile" icon="person" onPress={() => navigation.navigate("ProfileSettings")} /> 
        </ResponsiveGrid>
      </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: theme.spacing.md,
    gap: theme.spacing.xl,
  },
  section: {
    gap: theme.spacing.md,
  },
  sectionTitle: {
    marginBottom: theme.spacing.sm,
  },
  statusCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
});

export default memo(EmployeeDashboardScreen);
