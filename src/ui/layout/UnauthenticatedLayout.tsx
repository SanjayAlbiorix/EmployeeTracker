import React from "react";
import { memo } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { StatusBar } from "expo-status-bar";

type Props = {
  children: React.ReactNode;
};

const UnauthenticatedLayout: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        {children}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    width: "100%",
  },
});

export default memo(UnauthenticatedLayout);
