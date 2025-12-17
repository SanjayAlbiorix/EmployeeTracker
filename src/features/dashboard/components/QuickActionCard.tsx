import React, { memo } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Card from "@/ui/components/Card";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

const QuickActionCard: React.FC<Props> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Card style={styles.card}>
        <Ionicons name={icon} size={24} color={theme.colors.primary} style={styles.icon} />
        <Text variant="sm" weight="medium" style={styles.title}>
          {title}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: 100, // Ensure it doesn't get too squashed
  },
  card: {
    padding: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  icon: {
    marginBottom: theme.spacing.sm,
  },
  title: {
    textAlign: "center",
  },
});

export default memo(QuickActionCard);
