import React, { memo, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";
import Text from "../components/Text";
import ConfirmModal from "../components/ConfirmModal";
// import Avatar from "../components/Avatar"; // Placeholder for now

import { useLayout } from "./AppLayout";

import { useAuthStore } from "../../store/authStore";
import { useOrgStore } from "../../store/orgStore";
import { useRoleStore } from "../../store/roleStore";

type Props = {
  showBack?: boolean;
  showSidebarToggle?: boolean;
  title?: string;
  subtitle?: string;
};

const TopBar: React.FC<Props> = ({ showBack = false, showSidebarToggle = false, title = "HRMS App", subtitle }) => {
  const navigation = useNavigation();
  const { isMobile, toggleSidebar } = useLayout();
  const [menuVisible, setMenuVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const performLogout = async () => {
    setLogoutModalVisible(false);
    // 1. Clear domain stores first
    useOrgStore.getState().clearOrg();
    useRoleStore.getState().clearRole();
    // 2. Clear auth last to trigger navigation change
    await useAuthStore.getState().logout();
  };

  const confirmLogout = () => {
    setMenuVisible(false);
    setLogoutModalVisible(true);
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };


  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

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
      
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={toggleMenu} style={styles.avatarButton}>
             <View style={styles.avatarPlaceholder} />
             <Ionicons name="chevron-down" size={16} color={theme.colors.textSecondary} style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        <Modal
          visible={menuVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeMenu}
        >
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.modalOverlay}>
              <View style={styles.menuContainer}>
                {/* Profile Option */}
                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <Ionicons name="person-outline" size={20} color={theme.colors.textPrimary} style={styles.menuIcon} />
                  <Text>Profile</Text>
                </TouchableOpacity>

                {/* Org Settings Option */}
                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                   <Ionicons name="settings-outline" size={20} color={theme.colors.textPrimary} style={styles.menuIcon} />
                  <Text>Organization Settings</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                {/* Logout Option */}
                <TouchableOpacity style={styles.menuItem} onPress={confirmLogout}>
                   <Ionicons name="log-out-outline" size={20} color={theme.colors.error} style={styles.menuIcon} />
                  <Text color={theme.colors.error}>Log out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <ConfirmModal
          visible={logoutModalVisible}
          title="Log out"
          message="Are you sure you want to log out?"
          confirmText="Log out"
          cancelText="Cancel"
          onConfirm={performLogout}
          onCancel={cancelLogout}
        />
      </View>
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
    zIndex: 10,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: theme.spacing.md,
  },
  avatarButton: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.secondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    marginTop: Platform.OS === 'web' ? 64 : 100, // Adjust based on status bar/nav bar
    marginRight: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    paddingVertical: theme.spacing.xs,
    width: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  menuIcon: {
      marginRight: theme.spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xs,
  },
});

export default memo(TopBar);
