import React from "react";
import { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Input from "@/ui/components/Input";
import Button from "@/ui/components/Button";
import Card from "@/ui/components/Card";

import { AuthScreenProps } from "@/types/navigation";

type Props = AuthScreenProps<"Signup">;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text variant="xl" weight="bold" style={styles.title}>
          Create Account
        </Text>
        <Text variant="md" color={theme.colors.textSecondary} style={styles.subtitle}>
          Join your workspace
        </Text>

        <Input label="Full Name" placeholder="Jane Doe" />
        <Input label="Email" placeholder="jane@example.com" />
        <Input label="Password" placeholder="Create a password" secureTextEntry />

        <Button 
            title="Create Account" 
            onPress={() => navigation.navigate("Verify")} 
            style={styles.button} 
        />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text variant="sm" color={theme.colors.primary} style={styles.link}>
            Already have an account? Sign in
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

export default memo(SignupScreen);
