import React, { memo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import TopBar from "@/ui/layout/TopBar";
import EmptyState from "@/ui/components/EmptyState";
import { theme } from "@/ui/theme";
import { useLeaveStore } from "../store/leaveStore";
import LeaveCard from "../components/LeaveCard";

type Props = {};

const AdminLeaveScreen: React.FC<Props> = () => {
  const { leaves, approveLeave, rejectLeave } = useLeaveStore();

  const renderItem = ({ item }: { item: typeof leaves[0] }) => (
    <LeaveCard 
        record={item} 
        onApprove={() => approveLeave(item.id)}
        onReject={() => rejectLeave(item.id)}
    />
  );

  return (
    <ScreenContainer scroll={false}>
      <TopBar title="Leave Requests" showSidebarToggle />
      <View style={styles.container}>
        {leaves.length === 0 ? (
           <EmptyState
             title="No requests"
             description="There are no leave requests to review."
           />
        ) : (
            <FlatList
              data={leaves}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
            />
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  list: {
    paddingBottom: theme.spacing.xl,
  },
});

export default memo(AdminLeaveScreen);
