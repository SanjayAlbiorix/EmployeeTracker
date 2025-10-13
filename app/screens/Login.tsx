import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { memo, useEffect } from "react";
import { Routes, ScreenProps } from "../root/index.types";

const Login: React.FC<ScreenProps<Routes.Login>> = () => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to the Login!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default memo(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
