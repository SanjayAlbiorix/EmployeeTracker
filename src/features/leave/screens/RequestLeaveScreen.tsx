import React, { memo, useState } from "react";
import { View, StyleSheet } from "react-native";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import TopBar from "@/ui/layout/TopBar";
import Input from "@/ui/components/Input";
import Button from "@/ui/components/Button";
import Text from "@/ui/components/Text";
import { theme } from "@/ui/theme";
import { useLeaveStore } from "../store/leaveStore";
import { useNavigation } from "@react-navigation/native";
import { LeaveType } from "../types";

type Props = {};

const RequestLeaveScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const requestLeave = useLeaveStore((s) => s.requestLeave);

  const [type, setType] = useState<LeaveType>("casual");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!fromDate || !toDate || !reason) return;

    requestLeave({
        type,
        fromDate,
        toDate,
        reason
    });

    navigation.goBack();
  };

  return (
    <ScreenContainer scroll>
      <TopBar title="Request Leave" showBack />
      <View style={styles.container}>
        
        <View style={styles.formGroup}>
            <Text weight="bold" style={styles.label}>Leave Type</Text>
            {/* Simple buttons for selection for now */}
            <View style={styles.typeRow}>
                {(['casual', 'sick', 'paid'] as LeaveType[]).map(t => (
                    <Button 
                        key={t}
                        title={t.toUpperCase()} 
                        variant={type === t ? 'primary' : 'outline'}
                        onPress={() => setType(t)}
                        style={styles.typeBtn}
                    />
                ))}
            </View>
        </View>

        <Input 
            label="From Date (YYYY-MM-DD)"
            value={fromDate}
            onChangeText={setFromDate}
            placeholder="2024-01-01"
        />

        <Input 
            label="To Date (YYYY-MM-DD)"
            value={toDate}
            onChangeText={setToDate}
            placeholder="2024-01-05"
        />

        <Input 
            label="Reason"
            value={reason}
            onChangeText={setReason}
            placeholder="Reason for leave..."
            multiline
            style={styles.textArea}
        />

        <Button 
            title="Submit Request"
            onPress={handleSubmit}
            style={styles.submitBtn}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  formGroup: {
    gap: theme.spacing.xs,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  typeRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  typeBtn: {
    flex: 1,
  },
  submitBtn: {
    marginTop: theme.spacing.md,
  },
  textArea: {
    height: 100,
  }
});

export default memo(RequestLeaveScreen);
