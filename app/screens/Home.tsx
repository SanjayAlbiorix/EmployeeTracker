import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  useEffect(() => {}, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Pressable onPress={() => navigation.navigate(Routes.Login)}>
        <Text>Go to Login</Text>
      </Pressable> */}
      <Text>Welcome to the app!</Text>
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
