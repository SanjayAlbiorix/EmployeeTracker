import React from "react";
import { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Input from "@/ui/components/Input";
import Button from "@/ui/components/Button";
import Card from "@/ui/components/Card";
import { AuthScreenProps } from "@/types/navigation";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AuthStackParamList } from "@/types/navigation";

// External dependencies
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/authStore";

// Type definition for route params
type VerifyScreenRouteProp = RouteProp<AuthStackParamList, "Verify">;

type Props = AuthScreenProps<"Verify"> & {
  onVerifySuccess?: () => void;
};

const VerifyScreen: React.FC<Props> = ({ navigation }) => {
  const route = useRoute<VerifyScreenRouteProp>();
  const [cooldown, setCooldown] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  
  // Requirement: "Accept email via route params" -> route.params?.email
  // Requirement: "Navigation must depend ONLY on session" -> but VerifyScreen logic for resend needs email.
  // We use params email first (from Signup), then session email (from Login global guard or just reload).
  const sessionEmail = useAuthStore(state => state.user?.email);
  const targetEmail = route.params?.email || sessionEmail;

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0) return;
    
    // Requirement: "MUST NOT rely on current session" -> implies we use the email string explicitly
    if (!targetEmail) {
        alert("No email found. Please login again.");
        return;
    }

    setLoading(true);
    // Requirement: "MUST use type: 'signup'"
    // Requirement: "Resend like this: await supabase.auth.resend({ type: 'signup', email })"
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: targetEmail,
    });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Verification email sent!");
      setCooldown(60);
    }
  };

  const handleLogout = async () => {
  await supabase.auth.signOut();
  navigation.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
};

if (!targetEmail) {
  return (
    <View style={styles.container}>
      <Text>Email not found. Please login again.</Text>
    </View>
  );
}

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text variant="xl" weight="bold" style={styles.title}>
          Check your email
        </Text>
        <Text variant="md" color={theme.colors.textSecondary} style={styles.subtitle}>
          We've sent a verification link to {targetEmail}. Please click the link to verify your account.
        </Text>

        <Text variant="sm" style={styles.infoText}>
            Once verified, this page will update automatically.
        </Text>
        
        <Button 
            title={cooldown > 0 ? `Resend Email (${cooldown}s)` : "Resend Email"}
            onPress={handleResend}
            disabled={cooldown > 0 || loading}
            loading={loading}
            style={styles.button}
            variant="outline"
        />

       <TouchableOpacity onPress={handleLogout} style={styles.logoutLink}>
  <Text variant="sm" color={theme.colors.primary}>
    Sign Out
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
    marginTop: theme.spacing.xl,
  },
  infoText: {
    textAlign: "center",
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
  },
  logoutLink: {
      marginTop: theme.spacing.lg,
      alignItems: 'center',
  }
});

export default memo(VerifyScreen);
