import React from "react";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import Text from "@/ui/components/Text";
import { theme } from "@/ui/theme";
import { AttendanceStatus } from "../types";

type Props = {
  status: AttendanceStatus;
};

const AttendanceStatusBadge: React.FC<Props> = ({ status }) => {
  return (
    <View style={[styles.badge, status === "checked_in" ? styles.in : styles.out]}>
      <Text variant="sm" color={theme.colors.surface}>
        {status === "checked_in" ? "Checked In" : "Checked Out"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 4,
  },
  in: {
    backgroundColor: theme.colors.success,
  },
  out: {
    backgroundColor: theme.colors.textSecondary,
  },
});

export default memo(AttendanceStatusBadge);
