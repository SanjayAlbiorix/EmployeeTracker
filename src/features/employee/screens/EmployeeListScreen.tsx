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
import RequireAdmin from "@/ui/guards/RequireAdmin";

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
  const [showSuccess, setShowSuccess] = useState(false);

  // UI States
  const isLoading = false;
  const employees = MOCK_EMPLOYEES;

  React.useEffect(() => {
    if (route.params?.newEmployee) {
        setShowSuccess(true);
        // Clear param to avoid showing again on simple focus if needed, 
        // but for now just hide the banner after delay
        const timer = setTimeout(() => setShowSuccess(false), 3000);
        return () => clearTimeout(timer);
    }
  }, [route.params?.newEmployee]);

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
      <RequireAdmin>
        <TopBar title="Employees" showSidebarToggle />
        <EmptyState
          title="No employees yet"
          description="Add your first employee to get started."
          actionLabel="Add Employee"
          onAction={() => navigation.navigate("Employees", { screen: "AddEmployee" })}
        />
      </RequireAdmin>
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
    <RequireAdmin>
    <ScreenContainer scroll={false}>
      <TopBar title="Employees" showSidebarToggle />
      <View style={styles.container}>
        {showSuccess && (
            <View style={styles.successBanner}>
                <Text color={theme.colors.success} weight="bold">Employee added successfully!</Text>
            </View>
        )}
        <View style={styles.searchContainer}>
          <View style={styles.actionRow}>
             <View style={styles.flexOne}>
                <Input
                  placeholder="Search employees..."
                  value={search}
                  onChangeText={setSearch}
                />
             </View>
             {/* Redundant check if RequireAdmin guards the screen, but safe to keep */}
             <Button 
                title="Add Employee" 
                onPress={() => navigation.navigate("Employees", { screen: "AddEmployee" })}
                style={styles.addButton}
 
              />
          </View>
        </View>

        <FlatList
          data={filteredEmployees}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text variant="md" color={theme.colors.textSecondary} style={styles.emptyText}
>
              No employees found.
            </Text>
          }
        />
      </View>
    </ScreenContainer>
    </RequireAdmin>
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
  successBanner: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.success,
    borderWidth: 1,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.spacing.sm,
    width: "100%",
    alignItems: "center",
  },
  skeletonContainer: {
  padding: theme.spacing.md,
  gap: theme.spacing.md,
},
flexOne: {
  flex: 1,
},
addButton: {
  height: 48,
  justifyContent: "center",
},
emptyText: {
  textAlign: "center",
  marginTop: theme.spacing.lg,
},

});

export default memo(EmployeeListScreen);
