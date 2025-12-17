import React from "react";
import { memo } from "react";
import { View, StyleSheet, useWindowDimensions, Platform } from "react-native";
import { theme } from "../theme";
import SidebarLayout from "./SidebarLayout";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
};

const ResponsiveLayout: React.FC<Props> = ({ children }) => {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isLargeScreen = width >= 768; // Tablet/Desktop

  const showSidebar = isWeb || isLargeScreen;

  return (
    <View style={styles.container}>
      {showSidebar && <SidebarLayout />}
      
      <View style={styles.mainContent}>

        <View style={styles.content}>
           {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: theme.colors.background,
  },
  mainContent: {
    flex: 1,
    height: "100%",
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
});

export default memo(ResponsiveLayout);
