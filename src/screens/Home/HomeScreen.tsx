import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuthStore } from "../../store/authStore";
import { removeToken } from "../../utils/storage";

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const handleLogout = async () => {
    await removeToken();
    logout();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user?.email || "User"}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 20, marginBottom: 16 },
  button: { backgroundColor: "#ff3b30", padding: 12, borderRadius: 6 },
  buttonText: { color: "#fff" },
});
