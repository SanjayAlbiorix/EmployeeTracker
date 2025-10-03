import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to the Login!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
