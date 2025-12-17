import React from "react";
import { memo } from "react";
import { Text as RNText, StyleSheet, TextProps } from "react-native";
import { theme } from "../theme";

type Props = TextProps & {
  variant?: keyof typeof theme.typography.fontSize;
  weight?: keyof typeof theme.typography.fontWeight;
  color?: string;
  children: React.ReactNode;
};

const Text: React.FC<Props> = ({
  variant = "md",
  weight = "regular",
  color = theme.colors.textPrimary,
  style,
  children,
  ...props
}) => {
  return (
    <RNText
      style={[
        styles.base,
        {
          fontSize: theme.typography.fontSize[variant],
          fontWeight: theme.typography.fontWeight[weight],
          lineHeight: theme.typography.lineHeight[variant],
          color,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: "System", // Or custom font if added later
  },
});

export default memo(Text);
