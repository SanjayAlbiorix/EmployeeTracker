import React, { memo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import TopBar from "@/ui/layout/TopBar";
import EmptyState from "@/ui/components/EmptyState";
import Button from "@/ui/components/Button";
import { theme } from "@/ui/theme";
import { useLeaveStore } from "../store/leaveStore";
import LeaveCard from "../components/LeaveCard";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const EmployeeLeaveScreen: React.FC<Props> = () => {
  const leaves = useLeaveStore((s) => s.leaves);
  const navigation = useNavigation<any>();

  // Filter for current user (mocked as 'current-user' in store)
  const myLeaves = leaves.filter(l => l.userId === "current-user");

  const renderItem = ({ item }: { item: typeof myLeaves[0] }) => (
    <LeaveCard record={item} />
  );

  return (
    <ScreenContainer scroll={false}>
      <TopBar title="My Leaves" showSidebarToggle />
      <View style={styles.container}>
        <View style={styles.actions}>
            <Button 
                title="Request Leave" 
                onPress={() => navigation.navigate("RequestLeave")}
            />
        </View>

        {myLeaves.length === 0 ? (
           <EmptyState
             title="No leave requests"
             description="You haven't requested any leave yet."
           />
        ) : (
            <FlatList
              data={myLeaves}
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
  actions: {
    marginBottom: theme.spacing.md,
    alignItems: 'flex-end',
  },
  list: {
    paddingBottom: theme.spacing.xl,
  },
});

export default memo(EmployeeLeaveScreen);
