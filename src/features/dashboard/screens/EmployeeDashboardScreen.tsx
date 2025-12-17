import React, { memo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import StatCard from "../components/StatCard";
import Card from "@/ui/components/Card";
import Button from "@/ui/components/Button";

import { DashboardScreenProps } from "@/types/navigation";

type Props = DashboardScreenProps<"EmployeeDashboard">;

const EmployeeDashboardScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
       <View style={styles.header}>
        <Text variant="xl" weight="bold">My Dashboard</Text>
        <Text variant="md" color={theme.colors.textSecondary}>Welcome back, Jane</Text>
      </View>

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
        <View style={styles.grid}>
          <StatCard title="Leave Balance" value="12" subtext="Days remaining" />
          <StatCard title="Overtime" value="4h" subtext="This month" />
          <StatCard title="Upcoming Holiday" value="New Year" subtext="Jan 1st" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    gap: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.sm,
  },
  section: {
    gap: theme.spacing.md,
  },
  sectionTitle: {
    marginBottom: theme.spacing.sm,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.md,
  },
  statusCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
});

export default memo(EmployeeDashboardScreen);
