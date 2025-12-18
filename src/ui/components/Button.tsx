import React from "react";
import { memo } from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle, StyleProp } from "react-native";
import { theme } from "../theme";
import Text from "./Text";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const Button: React.FC<Props> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.secondary;
    switch (variant) {
      case "primary": return theme.colors.primary;
      case "secondary": return theme.colors.secondary;
      case "outline": return "transparent";
      default: return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (variant === "outline") return theme.colors.primary;
    return theme.colors.surface;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        variant === "outline" && styles.outline,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text variant="md" weight="medium" color={getTextColor()}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  outline: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
});

export default memo(Button);
