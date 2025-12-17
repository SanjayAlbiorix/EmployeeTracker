import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Card from "@/ui/components/Card";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  name: string;
  role: string;
  department: string;
  onPress: () => void;
};

const EmployeeCard: React.FC<Props> = ({ name, role, department, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.avatar}>
           <Ionicons name="person" size={24} color={theme.colors.textSecondary} />
        </View>
        <View style={styles.info}>
          <Text variant="lg" weight="bold" color={theme.colors.textPrimary}>
            {name}
          </Text>
          <Text variant="sm" color={theme.colors.textSecondary}>
            {role}
          </Text>
           <View style={styles.departmentBadge}>
             <Text variant="xs" color={theme.colors.primary} weight="bold">
               {department.toUpperCase()}
             </Text>
           </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    gap: 4,
  },
  departmentBadge: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: 4,
  },
});

export default memo(EmployeeCard);
