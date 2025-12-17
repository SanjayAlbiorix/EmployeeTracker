import React, { memo } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import TopBar from "@/ui/layout/TopBar";
import Card from "@/ui/components/Card";
import Text from "@/ui/components/Text";
import EmptyState from "@/ui/components/EmptyState";
import { theme } from "@/ui/theme";
import { usePayrollStore } from "../store/payrollStore";
import PayslipRow from "../components/PayslipRow";
import PayrollStatusBadge from "../components/PayrollStatusBadge";

type Props = {};

const EmployeePayslipScreen: React.FC<Props> = () => {
  const payslips = usePayrollStore((s) => s.payslips);
  // Mock filter for current user
  const latestPayslip = payslips.find(p => p.userId === "current-user");

  return (
    <ScreenContainer>
      <TopBar title="My Payslip" showSidebarToggle />
      <ScrollView contentContainerStyle={styles.container}>
        {!latestPayslip ? (
           <EmptyState
             title="No payslip available"
             description="Your payslip for this month hasn't been generated yet."
           />
        ) : (
            <Card>
                <View style={styles.header}>
                    <Text variant="lg" weight="bold">{latestPayslip.month}</Text>
                    <PayrollStatusBadge status={latestPayslip.status} />
                </View>

                <View style={styles.section}>
                    <Text variant="md" weight="bold" style={styles.sectionTitle}>Earnings</Text>
                    <PayslipRow label="Basic Salary" value={latestPayslip.basicSalary} />
                    <PayslipRow label="Allowances" value={latestPayslip.allowances} />
                </View>

                <View style={styles.section}>
                    <Text variant="md" weight="bold" style={styles.sectionTitle}>Deductions</Text>
                    <PayslipRow label="Tax & Deductions" value={latestPayslip.deductions} />
                </View>

                <PayslipRow label="Net Pay" value={latestPayslip.netPay} isTotal />
            </Card>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    marginBottom: theme.spacing.sm,
    color: theme.colors.primary,
  }
});

export default memo(EmployeePayslipScreen);
