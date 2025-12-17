import React from "react";
import { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Input from "@/ui/components/Input";
import Button from "@/ui/components/Button";
import Card from "@/ui/components/Card";

import { useAuthStore } from "@/store/authStore";

import { AuthScreenProps } from "@/types/navigation";

type Props = AuthScreenProps<"Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    login();
    // Navigation will be handled by the root navigator listening to state changes
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

        <Input label="Email" placeholder="Enter your email" />
        <Input label="Password" placeholder="Enter your password" secureTextEntry />

        <Button 
            title="Sign In" 
            onPress={handleLogin} 
            style={styles.button} 
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
