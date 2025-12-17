import React, { createContext, useContext, useState, useEffect } from "react";
import { View, StyleSheet, useWindowDimensions, Platform, TouchableOpacity, Modal } from "react-native";
import { theme } from "../theme";
import SidebarLayout from "./SidebarLayout";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type LayoutContextType = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

const LayoutContext = createContext<LayoutContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isSidebarOpen: false,
  toggleSidebar: () => {},
  closeSidebar: () => {},
});

export const useLayout = () => useContext(LayoutContext);

type Props = {
  children: React.ReactNode;
};

export const AppLayout: React.FC<Props> = ({ children }) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  
  // Breakpoints
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when switching to desktop
  useEffect(() => {
    if (isDesktop) {
      setIsSidebarOpen(false);
    }
  }, [isDesktop]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <LayoutContext.Provider
      value={{
        isMobile,
        isTablet,
        isDesktop,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
      }}
    >
      <View style={styles.container}>
        {/* Desktop Sidebar (Permanent) */}
        {!isMobile && (
          <View style={styles.desktopSidebar}>
             <SidebarLayout />
          </View>
        )}

        {/* Mobile/Tablet Drawer (Overlay) */}
        {isMobile && isSidebarOpen && (
           <View style={[styles.overlay, { zIndex: 9999 }]}>
              {/* Backdrop */}
              <TouchableOpacity activeOpacity={1} style={styles.backdrop} onPress={closeSidebar} />
              
              {/* Sidebar Content */}
              <View style={[styles.drawer, { paddingTop: insets.top }]}>
                  <SidebarLayout onClose={closeSidebar} />
              </View>
           </View>
        )}

        {/* Main Content */}
        <View style={styles.mainContent}>
          <View style={styles.contentWrapper}>
             {children}
          </View>
        </View>
      </View>
    </LayoutContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    minHeight: 0, // Critical for scroll fix
  },
  desktopSidebar: {
    height: "100%",
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
  },
  mainContent: {
    flex: 1,
    minHeight: 0, // Critical for scroll fix
  },
  contentWrapper: {
    flex: 1,
    minHeight: 0, // Critical for scroll fix
    width: "100%",
    maxWidth: 1200, // Kept for design, but ensure it doesn't block scroll
    alignSelf: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: theme.colors.surface,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mobileHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  hamburger: {
    padding: theme.spacing.xs,
  },
});
