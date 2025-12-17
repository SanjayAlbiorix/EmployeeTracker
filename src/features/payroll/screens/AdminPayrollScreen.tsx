import React, { memo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import TopBar from "@/ui/layout/TopBar";
import EmptyState from "@/ui/components/EmptyState";
import Button from "@/ui/components/Button";
import { theme } from "@/ui/theme";
import { usePayrollStore } from "../store/payrollStore";
import PayrollCard from "../components/PayrollCard";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const AdminPayrollScreen: React.FC<Props> = () => {
  const { payslips, markAsPaid } = usePayrollStore();
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: typeof payslips[0] }) => (
    <PayrollCard 
        payslip={item} 
        onMarkPaid={() => markAsPaid(item.id)}
    />
  );

  return (
    <ScreenContainer scroll={false}>
      <TopBar title="Payroll" showSidebarToggle />
      <View style={styles.container}>
        <View style={styles.actions}>
            <Button 
                title="Run Payroll" 
                onPress={() => navigation.navigate("PayrollRun")}
            />
        </View>

        {payslips.length === 0 ? (
           <EmptyState
             title="No payroll records"
             description="Run payroll to generate payslips for this month."
           />
        ) : (
            <FlatList
              data={payslips}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
            />
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  actions: {
    marginBottom: theme.spacing.md,
    alignItems: 'flex-end',
  },
  list: {
    paddingBottom: theme.spacing.xl,
  },
});

export default memo(AdminPayrollScreen);
