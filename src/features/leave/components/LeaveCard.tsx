import React from "react";
import { memo } from "react";
import { StyleSheet, View } from "react-native";

import Card from "@/ui/components/Card";
import Text from "@/ui/components/Text";
import Button from "@/ui/components/Button";
import { theme } from "@/ui/theme";
import LeaveStatusBadge from "./LeaveStatusBadge";
import { LeaveRecord } from "../types";
import { useRoleStore } from "@/store/roleStore";

type Props = {
  record: LeaveRecord;
  onApprove?: () => void;
  onReject?: () => void;
};

const LeaveCard: React.FC<Props> = ({ record, onApprove, onReject }) => {
  const role = useRoleStore((s) => s.role);
  const isAdmin = role === "admin";

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text variant="lg" weight="bold" style={styles.type}>
            {record.type.toUpperCase()}
          </Text>
          <Text variant="sm" color={theme.colors.textSecondary}>
            {record.fromDate} - {record.toDate}
          </Text>
        </View>
        <LeaveStatusBadge status={record.status} />
      </View>

      <Text variant="md" style={styles.reason}>
        {record.reason}
      </Text>

      {isAdmin && record.status === "pending" && (
        <View style={styles.actions}>
          <Button
            title="Approve"
            onPress={() => onApprove?.()}
            style={styles.approveAction}
          />
          <Button
            title="Reject"
            onPress={() => onReject?.()}
            style={styles.rejectAction}
            variant="outline"
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
    marginBottom: theme.spacing.sm,
  },
  type: {
    marginBottom: 4,
  },
  reason: {
    marginBottom: theme.spacing.md,
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  approveAction: {
    flex: 1,
    backgroundColor: theme.colors.success,
  },
  rejectAction: {
    flex: 1,
    borderColor: theme.colors.error,
  },
});

export default memo(LeaveCard);
