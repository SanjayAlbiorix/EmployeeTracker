import React from "react";
import { memo } from "react";
import { StyleSheet } from "react-native";

import ScreenContainer from "@/ui/layout/ScreenContainer";
import Card from "@/ui/components/Card";
import Text from "@/ui/components/Text";
import { theme } from "@/ui/theme";
import TopBar from "@/ui/layout/TopBar";

type Props = {};

const AdminAttendanceScreen: React.FC<Props> = () => {
  return (
    <ScreenContainer>
      <TopBar title="Attendance Overview" showSidebarToggle />
      <Card style={styles.card}>
        <Text variant="lg" weight="bold">
          Attendance Overview
        </Text>

        <Text variant="sm" color={theme.colors.textSecondary}>
          Attendance data will appear here.
        </Text>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.lg,
  },
});

export default memo(AdminAttendanceScreen);
