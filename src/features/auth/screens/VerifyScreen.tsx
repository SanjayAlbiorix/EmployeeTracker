import React from "react";
import { memo } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Input from "@/ui/components/Input";
import Button from "@/ui/components/Button";
import Card from "@/ui/components/Card";

import { useAuthStore } from "@/store/authStore";

import { AuthScreenProps } from "@/types/navigation";

type Props = AuthScreenProps<"Verify"> & {
  onVerifySuccess?: () => void;
};

const VerifyScreen: React.FC<Props> = ({ navigation, onVerifySuccess }) => {
  const login = useAuthStore((state) => state.login);
  const verify = useAuthStore((state) => state.verify);

  const handleVerify = () => {
      login();
      verify();
      // Root navigator will handle transition
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text variant="xl" weight="bold" style={styles.title}>
          Verify Email
        </Text>
        <Text variant="md" color={theme.colors.textSecondary} style={styles.subtitle}>
          Enter the code sent to your email
        </Text>

        <Input placeholder="000000" style={styles.otpInput} textAlign="center" keyboardType="number-pad" />

        <Button 
            title="Verify & Continue" 
            onPress={handleVerify} 
            style={styles.button} 
        />
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
  otpInput: {
    fontSize: 24,
    letterSpacing: 8,
  },
  button: {
    marginTop: theme.spacing.md,
  },
});

export default memo(VerifyScreen);
