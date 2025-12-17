import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Card from "@/ui/components/Card";

type Props = {
  title: string;
  value: string | number;
  subtext?: string;
};

const StatCard: React.FC<Props> = ({ title, value, subtext }) => {
  return (
    <Card style={styles.card}>
      <Text variant="sm" color={theme.colors.textSecondary} weight="medium" style={styles.title}>
        {title.toUpperCase()}
      </Text>
      <Text 
        variant="xl" 
        weight="bold" 
        color={theme.colors.primary} 
        style={[styles.value, { marginBottom: subtext ? theme.spacing.xs : 0 }]}
      >
        {value}
      </Text>
      {subtext && (
        <Text variant="xs" color={theme.colors.textSecondary}>
          {subtext}
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.lg,
    alignItems: "flex-start",
    minWidth: 150,
    flex: 1,
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
  value: {
    // Dynamic margin handled in component
  },
});

export default memo(StatCard);
