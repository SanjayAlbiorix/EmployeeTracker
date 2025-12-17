import React from "react";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import Text from "@/ui/components/Text";
import { theme } from "@/ui/theme";
import { LeaveStatus } from "../types";

type Props = {
  status: LeaveStatus;
};

const LeaveStatusBadge: React.FC<Props> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "approved":
        return theme.colors.success;
      case "rejected":
        return theme.colors.error;
      case "pending":
      default:
        return theme.colors.warning;
    }
  };

  const getStatusLabel = () => {
     return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor() }]}>
      <Text variant="sm" color={theme.colors.surface} weight="bold">
        {getStatusLabel()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 4, // Matches theme.radius.sm concept
    alignSelf: 'flex-start',
  },
});

export default memo(LeaveStatusBadge);
