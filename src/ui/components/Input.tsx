import React from "react";
import { memo } from "react";
import { TextInput, View, StyleSheet, TextInputProps } from "react-native";
import { theme } from "../theme";
import Text from "./Text";

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

const Input: React.FC<Props> = ({ label, error, style, ...props }) => {
  return (
    <View style={styles.wrapper}>
      {label && (
        <Text variant="sm" weight="medium" style={styles.label}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          style,
        ]}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
      />
      {error && (
        <Text variant="xs" color={theme.colors.error} style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.spacing.sm,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.surface,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  error: {
    marginTop: theme.spacing.xs,
  },
});

export default memo(Input);
