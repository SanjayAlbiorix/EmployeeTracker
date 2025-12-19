import React from "react";
import { memo } from "react";
import { View, StyleSheet } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Input from "@/ui/components/Input";
import Button from "@/ui/components/Button";
import Card from "@/ui/components/Card";

import { useOrgStore } from "@/store/orgStore";

import { OrgScreenProps } from "@/types/navigation";

type Props = OrgScreenProps<"CreateOrg">;

const CreateOrgScreen: React.FC<Props> = ({ navigation }) => {
  const createOrganization = useOrgStore((state) => state.createOrganization);
  const isLoading = useOrgStore((state) => state.isLoading);

  console.log('isLoading', isLoading)


  // Local state for name input
  const [orgName, setOrgName] = React.useState("");

  const handleCreateOrg = async () => {
    if (!orgName) return;
    await createOrganization(orgName);
    // Navigation is handled automatically by root navigator observing orgId change if successful
    // Or we might need to manually go back if the orgId wasn't set?
    // User Instructions: "After success: Do NOT navigate manually. Let root navigation react to updated orgId"
    // But createOrganization sets orgId. 
    // Wait, CreateOrgScreen is likely in OrgNavigator stack.
    // If orgId is set, Root Navigation switches to AppShell/Dashboard. 
    // So "Do NOT navigate manually" is correct.
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text variant="xl" weight="bold" style={styles.title}>
          New Organization
        </Text>
        <Text variant="md" color={theme.colors.textSecondary} style={styles.subtitle}>
          Set up your company profile
        </Text>

        <Input 
            label="Organization Name" 
            placeholder="e.g. Acme Corp" 
            value={orgName}
            onChangeText={setOrgName}
        />
        <Input label="Industry" placeholder="Select Industry" />

        <Button 
            title={isLoading ? "Creating..." : "Create & Continue"}
            onPress={handleCreateOrg} 
            loading={isLoading}
            style={styles.button} 
        />
        
        <Button 
            title="Cancel" 
            variant="outline" 
            onPress={() => navigation.goBack()} 
            style={styles.cancelButton} 
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
  button: {
    marginTop: theme.spacing.md,
  },
  cancelButton: {
    marginTop: theme.spacing.sm,
    borderWidth: 0,
  },
});

export default memo(CreateOrgScreen);
