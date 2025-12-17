import React, { memo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Card from "@/ui/components/Card";
import EmployeeInfoRow from "../components/EmployeeInfoRow";
import { EmployeeScreenProps } from "@/types/navigation";
import { Ionicons } from "@expo/vector-icons";
import TopBar from "@/ui/layout/TopBar";

type Props = EmployeeScreenProps<"EmployeeProfile">;

// Mock Data Lookup
const MOCK_DB: Record<string, any> = {
  "1": { name: "John Doe", role: "Software Engineer", department: "Engineering", email: "john@example.com", phone: "+1 234 567 890", joinDate: "2023-01-15", status: "Active" },
  "2": { name: "Jane Smith", role: "HR Manager", department: "HR", email: "jane@example.com", phone: "+1 987 654 321", joinDate: "2022-11-01", status: "Active" },
  "3": { name: "Bob Johnson", role: "Product Designer", department: "Design", email: "bob@example.com", phone: "+1 555 0199 88", joinDate: "2023-03-20", status: "Active" },
  "4": { name: "Alice Brown", role: "Marketing Specialist", department: "Marketing", email: "alice@example.com", phone: "+1 555 0123 45", joinDate: "2023-06-10", status: "On Leave" },
  "5": { name: "Charlie Davis", role: "Backend Developer", department: "Engineering", email: "charlie@example.com", phone: "+1 555 6789 01", joinDate: "2021-08-15", status: "Active" },
};

const EmployeeProfileScreen: React.FC<Props> = ({ route }) => {
  const { employeeId } = route.params;
  const employee = MOCK_DB[employeeId];

  if (!employee) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <TopBar title="Employee Profile" showBack />
        <View style={styles.container}>
            <Text variant="lg" color="red">Employee not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <TopBar title="Employee Profile" showBack />
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.headerCard}>
          <View style={styles.avatar}>
             <Ionicons name="person" size={40} color={theme.colors.textSecondary} />
          </View>
          <Text variant="xl" weight="bold" style={styles.name}>
            {employee.name}
          </Text>
          <Text variant="md" color={theme.colors.textSecondary}>
            {employee.role}
          </Text>
          <View style={styles.statusBadge}>
              <Text variant="xs" color={theme.colors.success} weight="bold">
                  {employee.status.toUpperCase()}
              </Text>
          </View>
        </Card>

        <View style={styles.section}>
          <Text variant="lg" weight="bold" style={styles.sectionTitle}>
            Basic Information
          </Text>
          <Card>
            <EmployeeInfoRow label="Department" value={employee.department} />
            <EmployeeInfoRow label="Email" value={employee.email} />
            <EmployeeInfoRow label="Phone" value={employee.phone} />
          </Card>
        </View>

        <View style={styles.section}>
          <Text variant="lg" weight="bold" style={styles.sectionTitle}>
            Employment Details
          </Text>
          <Card>
            <EmployeeInfoRow label="Employee ID" value={employeeId} />
            <EmployeeInfoRow label="Joining Date" value={employee.joinDate} />
            <EmployeeInfoRow label="Employment Type" value="Full-Time" />
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    gap: theme.spacing.xl,
    alignItems: "center",
  },
  headerCard: {
    alignItems: "center",
    padding: theme.spacing.xl,
    width: "100%",
    maxWidth: 600,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },
  name: {
    marginBottom: theme.spacing.xs,
  },
  statusBadge: {
    marginTop: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.success,
  },
  section: {
    width: "100%",
    maxWidth: 600,
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    marginBottom: theme.spacing.xs,
  },
});

export default memo(EmployeeProfileScreen);
