import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../ui/theme';
import Text from '../../../ui/components/Text';
import ScreenContainer from '../../../ui/layout/ScreenContainer';
import TopBar from '../../../ui/layout/TopBar';
import EmptyState from '../../../ui/components/EmptyState';

const PayrollListScreen = () => {
  return (
    <ScreenContainer>
      <TopBar title="Payroll History" showBack />
      <EmptyState 
        title="No payroll records found"
        description="Past payroll runs and history will appear here."
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  placeholderBox: {
      height: 300,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'dashed',
  }
});

export default memo(PayrollListScreen);
