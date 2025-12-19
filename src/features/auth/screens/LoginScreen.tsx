import React from "react";
import { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Input from "@/ui/components/Input";
import Button from "@/ui/components/Button";
import Card from "@/ui/components/Card";


import { supabase } from "@/lib/supabaseClient";

import { AuthScreenProps } from "@/types/navigation";

type Props = AuthScreenProps<"Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // Local state for form inputs
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

 const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  setLoading(true);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setLoading(false);

  if (error) {
    // 🔴 IMPORTANT: Handle unverified users
    if (error.message.toLowerCase().includes("email not confirmed")) {
      navigation.navigate("Verify", { email });
      return;
    }

    alert(error.message);
    return;
  }

  // ✅ Verified users proceed via authStore listener
};


  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text variant="xl" weight="bold" style={styles.title}>
          Welcome Back
        </Text>
        <Text variant="md" color={theme.colors.textSecondary} style={styles.subtitle}>
          Sign in to your account
        </Text>

        <Input 
            label="Email" 
            placeholder="Enter your email" 
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
        />
        <Input 
            label="Password" 
            placeholder="Enter your password" 
            secureTextEntry 
            value={password}
            onChangeText={setPassword}
        />

        <Button 
            title={loading ? "Signing in..." : "Sign In"}
            onPress={handleLogin} 
            style={styles.button}
            disabled={loading}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text variant="sm" color={theme.colors.primary} style={styles.link}>
            Don't have an account? Create one
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: theme.spacing.xl,
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },
  button: {
    marginTop: theme.spacing.md,
  },
  link: {
    textAlign: "center",
    marginTop: theme.spacing.lg,
  },
});

export default memo(LoginScreen);
