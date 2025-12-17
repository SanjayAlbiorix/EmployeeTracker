import React from "react";
import { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../theme";
import Text from "../components/Text";

type Props = {
  activeRoute?: string;
};

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DashboardStackParamList } from "@/types/navigation";

const SidebarLayout: React.FC<Props> = ({ activeRoute }) => {
  const navigation = useNavigation<NativeStackNavigationProp<DashboardStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
         <Text variant="xl" weight="bold" color={theme.colors.surface}>
            HRMS
         </Text>
      </View>
      
      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("AdminDashboard")}>
           <Text color={theme.colors.surface}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Employees")}>
           <Text color={theme.colors.surface}>Employees</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
           <Text color={theme.colors.surface}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: theme.colors.textPrimary, // Dark sidebar
    height: "100%",
    padding: theme.spacing.md,
  },
  logoContainer: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.sm,
  },
  navContainer: {
    gap: theme.spacing.md,
  },
  navItem: {
    padding: theme.spacing.sm,
    borderRadius: theme.spacing.xs,
  },
});

export default memo(SidebarLayout);
