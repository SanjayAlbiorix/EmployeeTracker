import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Text from "@/ui/components/Text";
import { theme } from "@/ui/theme";

type Props = {
  label: string;
  value: string | number;
  isTotal?: boolean;
};

const PayslipRow: React.FC<Props> = ({ label, value, isTotal = false }) => {
  return (
    <View style={[styles.row, isTotal && styles.totalRow]}>
      <Text variant={isTotal ? "md" : "sm"} weight={isTotal ? "bold" : "regular"} color={isTotal ? theme.colors.textPrimary : theme.colors.textSecondary}>
        {label}
      </Text>
      <Text variant={isTotal ? "md" : "sm"} weight={isTotal ? "bold" : "medium"}>
        {typeof value === 'number' ? `$${value.toLocaleString()}` : value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xs,
  },
  totalRow: {
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});

export default memo(PayslipRow);
