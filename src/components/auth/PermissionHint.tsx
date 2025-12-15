import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../common/AppText';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface PermissionHintProps {
  text?: string;
}

export const PermissionHint: React.FC<PermissionHintProps> = ({
  text = 'You do not have permission to perform this action',
}) => {
  return (
    <View style={styles.container}>
      <AppText variant="caption" style={styles.text}>
        🔒 {text}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
    alignSelf: 'flex-start',
    borderRadius: 4,
    marginTop: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
