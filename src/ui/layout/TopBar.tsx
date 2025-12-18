import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";
import Text from "../components/Text";
// import Avatar from "../components/Avatar"; // Placeholder for now

import { useLayout } from "./AppLayout";

type Props = {
  showBack?: boolean;
  showSidebarToggle?: boolean;
  title?: string;
  subtitle?: string;
};

const TopBar: React.FC<Props> = ({ showBack = false, showSidebarToggle = false, title = "HRMS App", subtitle }) => {
  const navigation = useNavigation();
  const { isMobile, toggleSidebar } = useLayout();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        ) : showSidebarToggle && isMobile ? (
          <TouchableOpacity onPress={toggleSidebar} style={styles.backButton}>
             <Ionicons name="menu" size={28} color={theme.colors.textPrimary} />
          </TouchableOpacity>
        ) : null}
        
        <View>
          <Text variant="lg" weight="bold" color={theme.colors.primary}>
            {title}
          </Text>
          {subtitle && (
            <Text variant="sm" color={theme.colors.textSecondary}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.avatarPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: theme.spacing.md,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.secondary,
  },
});

export default memo(TopBar);
