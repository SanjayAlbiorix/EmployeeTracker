import React from "react";
import { memo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { theme } from "../theme";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const Card: React.FC<Props> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Elevation for Android
    elevation: 2,
  },
});

export default memo(Card);
