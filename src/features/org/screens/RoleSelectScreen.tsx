import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Card from "@/ui/components/Card";
import { useRoleStore } from "@/store/roleStore";



const RoleSelectScreen: React.FC = () => {
  const setRole = useRoleStore((state) => state.setRole);

  const handleAdminSelect = () => {
    setRole("admin");
  };

  const handleEmployeeSelect = () => {
    setRole("employee");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="xl" weight="bold" style={styles.title}>
          Select Your Role
        </Text>
        <Text variant="md" color={theme.colors.textSecondary} style={styles.subtitle}>
          How will you use this workspace?
        </Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.cardWrapper} onPress={handleAdminSelect}>
            <Card style={styles.card}>
              <Text variant="lg" weight="bold" color={theme.colors.primary}>Admin</Text>
              <Text variant="sm" color={theme.colors.textSecondary} style={styles.desc}>
                Manage company settings, employees, and payroll.
              </Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardWrapper} onPress={handleEmployeeSelect}>
            <Card style={styles.card}>
              <Text variant="lg" weight="bold" color={theme.colors.success}>Employee</Text>
              <Text variant="sm" color={theme.colors.textSecondary} style={styles.desc}>
                View payslips, request leave, and update profile.
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    maxWidth: 600,
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },
  row: {
    flexDirection: "row", // Responsive check might be needed for small mobile, but for now assuming row for "large cards" effect
    flexWrap: "wrap",
    gap: theme.spacing.md,
    justifyContent: "center",
  },
  cardWrapper: {
    flex: 1,
    minWidth: 250,
  },
  card: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  desc: {
    textAlign: "center",
    marginTop: theme.spacing.sm,
  },
});

export default memo(RoleSelectScreen);
