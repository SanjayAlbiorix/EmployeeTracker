import React, { memo, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Input from "@/ui/components/Input";
import Button from "@/ui/components/Button";
import EmployeeCard from "../components/EmployeeCard";
import { EmployeeScreenProps } from "@/types/navigation";
import TopBar from "@/ui/layout/TopBar";

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

  React.useEffect(() => {
    if (route.params?.newEmployee) {
        setShowSuccess(true);
        // Clear param to avoid showing again on simple focus if needed, 
        // but for now just hide the banner after delay
        const timer = setTimeout(() => setShowSuccess(false), 3000);
        return () => clearTimeout(timer);
    }
  }, [route.params?.newEmployee]);

  const filteredEmployees = MOCK_EMPLOYEES.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: typeof MOCK_EMPLOYEES[0] }) => (
    <EmployeeCard
      name={item.name}
      role={item.role}
      department={item.department}
      onPress={() => navigation.navigate("EmployeeProfile", { employeeId: item.id })}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <TopBar title="Employees" />
      <View style={styles.container}>
        {showSuccess && (
            <View style={styles.successBanner}>
                <Text color={theme.colors.success} weight="bold">Employee added successfully!</Text>
            </View>
        )}
        <View style={styles.searchContainer}>
          <View style={styles.actionRow}>
             <View style={{ flex: 1 }}>
                <Input
                  placeholder="Search employees..."
                  value={search}
                  onChangeText={setSearch}
                />
             </View>
             <Button 
                title="Add Employee" 
                onPress={() => navigation.navigate("AddEmployee")}
                style={{ height: 48, justifyContent: 'center' }} 
             />
          </View>
        </View>

        <FlatList
          data={filteredEmployees}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text variant="md" color={theme.colors.textSecondary} style={{ textAlign: 'center', marginTop: 20 }}>
              No employees found.
            </Text>
          }
        />
      </View>
    </View>
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
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },
  actionRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
    alignItems: "flex-start", // Align top so button matches input height if necessary, or center
  },
  list: {
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
  },
  successBanner: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.success,
    borderWidth: 1,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.spacing.sm,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
});

export default memo(EmployeeListScreen);
