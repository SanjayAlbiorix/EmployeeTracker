import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../../ui/theme';
import Text from '../../../ui/components/Text';
import ScreenContainer from '../../../ui/layout/ScreenContainer';
import TopBar from '../../../ui/layout/TopBar';

const ProfileSettingsScreen = () => {
  return (
    <ScreenContainer scroll>
        <TopBar title="My Profile" showBack />
        <View style={styles.content}>
            <Text variant="lg" weight="bold">Account Settings</Text>
            <Text variant="md" color={theme.colors.textSecondary}>Update your personal information and password.</Text>
            
             <View style={styles.placeholderBox}>
                <Text variant="md" color={theme.colors.textSecondary}>[Profile Settings Form Placeholder]</Text>
            </View>
        </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  placeholderBox: {
      height: 200,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'dashed',
  }
});

export default memo(ProfileSettingsScreen);
