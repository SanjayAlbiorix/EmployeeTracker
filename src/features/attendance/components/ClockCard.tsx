import React from "react";
import { memo } from "react";
import { StyleSheet, View } from "react-native";

import Card from "@/ui/components/Card";
import Text from "@/ui/components/Text";
import Button from "@/ui/components/Button";
import { theme } from "@/ui/theme";
import AttendanceStatusBadge from "./AttendanceStatusBadge";
import { AttendanceRecord } from "../types";

type Props = {
  record: AttendanceRecord | null;
  onClockIn: () => void;
  onClockOut: () => void;
};

const ClockCard: React.FC<Props> = ({ record, onClockIn, onClockOut }) => {
  return (
    <Card>
      <View style={styles.header}>
        <Text variant="lg" weight="bold">
          Today
        </Text>

        {record && <AttendanceStatusBadge status={record.status} />}
      </View>

      {record?.checkInTime && (
        <Text variant="sm">Check In: {record.checkInTime}</Text>
      )}

      {record?.checkOutTime && (
        <Text variant="sm">Check Out: {record.checkOutTime}</Text>
      )}

      <View style={styles.actions}>
        {!record && (
          <Button title="Clock In" onPress={onClockIn} />
        )}

        {record?.status === "checked_in" && (
          <Button title="Clock Out" onPress={onClockOut} />
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
  },
  actions: {
    marginTop: theme.spacing.md,
  },
});

export default memo(ClockCard);
