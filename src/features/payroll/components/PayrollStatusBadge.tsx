import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import Text from "@/ui/components/Text";
import { theme } from "@/ui/theme";
import { PayrollStatus } from "../types";

type Props = {
  status: PayrollStatus;
};

const PayrollStatusBadge: React.FC<Props> = ({ status }) => {
  const getBackgroundColor = () => {
    switch (status) {
      case "paid":
        return theme.colors.success;
      case "processed":
        return theme.colors.warning;
      case "draft":
      default:
        return theme.colors.secondary;
    }
  };

  const getLabel = () => {
      return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <View style={[styles.badge, { backgroundColor: getBackgroundColor() }]}>
      <Text variant="sm" color={theme.colors.surface} weight="bold">
        {getLabel()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
});

export default memo(PayrollStatusBadge);
