import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import Card from "@/ui/components/Card";
import { theme } from "@/ui/theme";

type Props = {};

const SkeletonCard: React.FC<Props> = () => {
  return (
    <Card>
      <View style={styles.title} />
      <View style={styles.subtitle} />
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    height: 16,
    borderRadius: 4,
    backgroundColor: theme.colors.border,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    height: 12,
    width: "60%",
    borderRadius: 4,
    backgroundColor: theme.colors.border,
  },
});

export default memo(SkeletonCard);
