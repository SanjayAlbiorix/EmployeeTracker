import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

import ScreenContainer from "@/ui/layout/ScreenContainer";
import Card from "@/ui/components/Card";
import Text from "@/ui/components/Text";
import Button from "@/ui/components/Button";
import { theme } from "@/ui/theme";

type Props = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

const EmptyState: React.FC<Props> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <ScreenContainer scroll={false}>
      <View style={styles.wrapper}>
        <Card style={styles.card}>
          <Text variant="lg" weight="bold" style={{ textAlign: "center" }}>
            {title}
          </Text>

          {description && (
            <Text
              variant="sm"
              color={theme.colors.textSecondary}
              style={[styles.description, { textAlign: "center" }]}
            >
              {description}
            </Text>
          )}

          {actionLabel && onAction && (
            <Button
              title={actionLabel}
              onPress={onAction}
              style={styles.action}
            />
          )}
        </Card>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 420,
    padding: theme.spacing.lg,
  },
  description: {
    marginTop: theme.spacing.sm,
  },
  action: {
    marginTop: theme.spacing.md,
  },
});

export default memo(EmptyState);
