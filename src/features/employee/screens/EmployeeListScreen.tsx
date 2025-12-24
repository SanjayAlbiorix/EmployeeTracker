import React, { memo, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Input from "@/ui/components/Input";
import Button from "@/ui/components/Button";
import EmployeeCard from "../components/EmployeeCard";
import { EmployeeScreenProps } from "@/types/navigation";
import TopBar from "@/ui/layout/TopBar";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import EmptyState from "@/ui/components/EmptyState";
import SkeletonCard from "@/ui/components/SkeletonCard";
import { useRoleStore } from "@/store/roleStore";

// Mock Data
const MOCK_EMPLOYEES = [
  { id: "1", name: "John Doe", role: "Software Engineer", department: "Engineering" },
  { id: "2", name: "Jane Smith", role: "HR Manager", department: "HR" },
  { id: "3", name: "Bob Johnson", role: "Product Designer", department: "Design" },
  { id: "4", name: "Alice Brown", role: "Marketing Specialist", department: "Marketing" },
  { id: "5", name: "Charlie Davis", role: "Backend Developer", department: "Engineering" },
];

type Props = EmployeeScreenProps<"EmployeeList">;

const EmployeeListScreen: React.FC<Props> = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const role = useRoleStore((state) => state.role);
  const isAdmin = role === 'admin';

  // UI States
  const isLoading = false;
  const employees = MOCK_EMPLOYEES;

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <ScreenContainer>
        <TopBar title="Employees" showSidebarToggle />
        <View style={styles.skeletonContainer}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      </ScreenContainer>
    );
  }

  if (employees.length === 0) {
    return (
      <ScreenContainer>
        <TopBar title="Employees" showSidebarToggle />
        {isAdmin ? (
            <EmptyState
            title="No employees yet"
            description="Invite employees to your organization"
            actionLabel="Invite Employee"
            onAction={() => {
                // Button does nothing yet
                console.log("Invite clicked");
            }}
            />
        ) : (
             <View style={styles.emptyContainer}>
                <Text variant="md" color={theme.colors.textSecondary} style={styles.emptyText}>
                    No employees found.
                </Text>
             </View>
        )}
      </ScreenContainer>
    );
  }

  const renderItem = ({ item }: { item: typeof MOCK_EMPLOYEES[0] }) => (
    <EmployeeCard
      name={item.name}
      role={item.role}
      department={item.department}
      onPress={() => navigation.navigate("EmployeeProfile", { employeeId: item.id })}
    />
  );

  return (
    <ScreenContainer scroll={false}>
      <TopBar title="Employees" showSidebarToggle />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.actionRow}>
             <View style={styles.flexOne}>
                <Input
                  placeholder="Search employees..."
                  value={search}
                  onChangeText={setSearch}
                />
             </View>
             {isAdmin && (
                 <Button 
                    title="Invite Employee" 
                    onPress={() => console.log("Invite clicked")}
                    style={styles.inviteButton}
                 />
             )}
          </View>
        </View>

        <FlatList
          data={filteredEmployees}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text variant="md" color={theme.colors.textSecondary} style={styles.emptyText}>
              No employees found.
            </Text>
          }
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
  searchContainer: {
    marginBottom: theme.spacing.md,
    width: "100%",
  },
  actionRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
    alignItems: "flex-start",
  },
  list: {
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    width: "100%",
  },
  skeletonContainer: {
  padding: theme.spacing.md,
  gap: theme.spacing.md,
},
flexOne: {
  flex: 1,
},
  emptyText: {
    textAlign: "center",
    marginTop: theme.spacing.lg,
  },
  emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing.xl,
  },
  inviteButton: {
      marginLeft: theme.spacing.sm,
      // Adjust height alignment if needed, usually Button has default height
  }

});

export default memo(EmployeeListScreen);
