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
  const setOrg = useOrgStore((s) => s.setOrg);

  const handleCreateOrg = () => {
    const newOrgId = `org-${Date.now()}`; // mock id
    setOrg(newOrgId);
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

        <Input label="Organization Name" placeholder="e.g. Acme Corp" />
        <Input label="Industry" placeholder="Select Industry" />

        <Button 
            title="Create & Continue" 
            onPress={handleCreateOrg} 
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
