import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";

type Props = {
  label: string;
  value: string;
};

const EmployeeInfoRow: React.FC<Props> = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text variant="sm" color={theme.colors.textSecondary} weight="medium" style={styles.label}>
        {label}
      </Text>
      <Text variant="md" color={theme.colors.textPrimary} weight="medium">
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  label: {
    flex: 1,
  },
});

export default memo(EmployeeInfoRow);
