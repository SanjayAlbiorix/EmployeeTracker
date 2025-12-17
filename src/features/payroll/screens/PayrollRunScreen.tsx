import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import TopBar from "@/ui/layout/TopBar";
import Text from "@/ui/components/Text";
import Button from "@/ui/components/Button";
import { theme } from "@/ui/theme";
import { usePayrollStore } from "../store/payrollStore";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const PayrollRunScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const runPayroll = usePayrollStore((s) => s.runPayroll);

  const handleRun = () => {
    runPayroll();
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <TopBar title="Run Payroll" showBack />
      <View style={styles.container}>
        <Text variant="lg" weight="bold" style={styles.title}>
            Confirm Payroll Run
        </Text>
        
        <Text variant="md" color={theme.colors.textSecondary} style={styles.description}>
            This will generate payslips for all eligible employees for the current month.
        </Text>

        <Button 
            title="Run Payroll"
            onPress={handleRun}
            style={styles.button}
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
  title: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  description: {
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  button: {
    marginTop: theme.spacing.md,
  }
});

export default memo(PayrollRunScreen);
