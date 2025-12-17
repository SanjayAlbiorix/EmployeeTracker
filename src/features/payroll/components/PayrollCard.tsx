import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import Card from "@/ui/components/Card";
import Text from "@/ui/components/Text";
import Button from "@/ui/components/Button";
import { theme } from "@/ui/theme";
import PayrollStatusBadge from "./PayrollStatusBadge";
import PayslipRow from "./PayslipRow";
import { Payslip } from "../types";
import { useRoleStore } from "@/store/roleStore";

type Props = {
  payslip: Payslip;
  onMarkPaid?: () => void;
};

const PayrollCard: React.FC<Props> = ({ payslip, onMarkPaid }) => {
  const role = useRoleStore((s) => s.role);
  const isAdmin = role === "admin";

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text variant="lg" weight="bold">
            {payslip.month}
          </Text>
          <Text variant="sm" color={theme.colors.textSecondary}>
            {payslip.employeeName}
          </Text>
        </View>
        <PayrollStatusBadge status={payslip.status} />
      </View>

      <View style={styles.content}>
        <PayslipRow label="Net Pay" value={payslip.netPay} isTotal />
      </View>

      {isAdmin && payslip.status !== "paid" && (
        <View style={styles.actions}>
          <Button
            title="Mark as Paid"
            onPress={() => onMarkPaid?.()}
            style={styles.payButton}
          />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.md,
  },
  content: {
    marginBottom: theme.spacing.md,
  },
  actions: {
    marginTop: theme.spacing.sm,
  },
  payButton: {
    backgroundColor: theme.colors.success,
  }
});

export default memo(PayrollCard);
