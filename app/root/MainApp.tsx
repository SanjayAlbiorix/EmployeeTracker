import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import NavigationStack from "./NavigationStack";

export default function MainApp() {
  useEffect(() => {}, []);

  return <NavigationStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
