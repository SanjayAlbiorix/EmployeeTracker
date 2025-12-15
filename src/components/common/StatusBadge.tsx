import React from "react";
import { View, StyleSheet } from "react-native";
import { AppText } from "./AppText";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

type StatusType =
  | "active"
  | "inactive"
  | "present"
  | "absent"
  | "late"
  | "approved"
  | "pending"
  | "rejected"
  | "on_leave";

interface StatusBadgeProps {
  status: StatusType;
  size?: "small" | "medium";
}

const getStatusConfig = (status: StatusType) => {
  switch (status) {
    case "active":
    case "present":
    case "approved":
      return {
        label: status.charAt(0).toUpperCase() + status.slice(1),
        backgroundColor: colors.successSoft,
        textColor: colors.success,
      };
    case "inactive":
    case "absent":
    case "rejected":
      return {
        label: status.charAt(0).toUpperCase() + status.slice(1),
        backgroundColor: colors.errorSoft,
        textColor: colors.error,
      };
    case "late":
    case "pending":
    case "on_leave":
      return {
        label:
          status === "on_leave"
            ? "On Leave"
            : status.charAt(0).toUpperCase() + status.slice(1),
        backgroundColor: colors.warningSoft,
        textColor: colors.warning,
      };
    default:
      return {
        label: status,
        backgroundColor: colors.primarySoft,
        textColor: colors.primary,
      };
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "medium",
}) => {
  const config = getStatusConfig(status);

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: config.backgroundColor },
        size === "small" && styles.small,
      ]}
    >
      <AppText
        variant={size === "small" ? "caption" : "label"}
        style={[styles.text, { color: config.textColor }]}
      >
        {config.label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  small: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  text: {
    fontWeight: "600",
  },
});
