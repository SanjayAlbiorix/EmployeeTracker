import React from "react";
import { memo } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Card from "@/ui/components/Card";
import Button from "@/ui/components/Button";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import EmptyState from "@/ui/components/EmptyState";

import { useOrgStore } from "@/store/orgStore";

import { OrgScreenProps } from "@/types/navigation";

type Props = OrgScreenProps<"OrgSelect">;

const OrgSelectScreen: React.FC<Props> = ({ navigation }) => {
  const setOrg = useOrgStore((state) => state.setOrgId);
  const fetchOrganizations = useOrgStore((state) => state.fetchOrganizations);
  const organizations = useOrgStore((state) => state.organizations);
  const orgId = useOrgStore(state => state.orgId);
  const isLoading = useOrgStore((state) => state.isLoading);

  React.useEffect(() => {
        fetchOrganizations();
  }, []);

  const handleSelect = (item: typeof organizations[0]) => {
      setOrg(item?.id);
      // Root navigator will transition to Dashboard (via Role check? No, orgId check in Navigation.tsx)
  };

  const renderItem = ({ item }: { item: typeof organizations[0] }) => (
    <TouchableOpacity onPress={() => handleSelect(item)}>
      <Card style={styles.orgCard}>
        <Text variant="lg" weight="bold">{item.name}</Text>
        <Text variant="sm" color={theme.colors.textSecondary}>{item.role}</Text>
      </Card>
    </TouchableOpacity>
  ); 

  if (!organizations?.length) {
    return (
      <EmptyState
        title={ isLoading ? 'Loading...' : "No organizations found"}
        description="Create an organization to continue."
        actionLabel="Create Organization"
        onAction={() => navigation.navigate("CreateOrg")}
      />
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text variant="xl" weight="bold" style={styles.title}>
          Select Organization
        </Text>
        <Text variant="md" color={theme.colors.textSecondary} style={styles.subtitle}>
          Choose an organization to continue
        </Text>

        <FlatList
          data={organizations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />

        <Button 
            title="Create New Organization" 
            variant="outline" 
            onPress={() => navigation.navigate("CreateOrg")} 
            style={styles.createButton}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    maxWidth: 500,
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },
  list: {
    gap: theme.spacing.md,
  },
  orgCard: {
    marginBottom: theme.spacing.md,
  },
  createButton: {
    marginTop: theme.spacing.lg,
  },
});

export default memo(OrgSelectScreen);
