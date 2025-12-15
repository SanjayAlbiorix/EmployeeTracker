import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Section } from '../../components/layout/Section';
import { AppHeader } from '../../components/common/AppHeader';
import { AppButton } from '../../components/common/AppButton';
import { useAuthStore } from '../../store/useAuthStore';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { shadows } from '../../theme/shadows';

export const ProfileScreen: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ScreenContainer scrollable={false}>
      <AppHeader title="Profile" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Section>
          <View style={[styles.profileCard, shadows.medium]}>
            <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
              <Text style={styles.avatarText}>{user ? getInitials(user.name) : 'A'}</Text>
            </View>
            <Text style={styles.name}>{user?.name || 'Admin User'}</Text>
            <Text style={styles.email}>{user?.email || 'admin@company.com'}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{user?.role?.toUpperCase() || 'ADMIN'}</Text>
            </View>
          </View>
        </Section>

        <Section>
          <View style={[styles.settingsCard, shadows.small]}>
            <Text style={styles.sectionTitle}>Settings</Text>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingValue}>Enabled</Text>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Language</Text>
              <Text style={styles.settingValue}>English</Text>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Theme</Text>
              <Text style={styles.settingValue}>Light</Text>
            </View>
          </View>
        </Section>

        <Section>
          <View style={[styles.infoCard, shadows.small]}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.infoText}>Employee Tracker App v1.0.0</Text>
            <Text style={styles.infoTextSmall}>
              Manage your team's attendance, leave, and employee information all in one place.
            </Text>
          </View>
        </Section>

        <Section marginBottom="xl">
          <AppButton
            title="Logout"
            onPress={handleLogout}
            variant="danger"
            style={styles.logoutButton}
          />
        </Section>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    ...typography.h1,
    color: colors.primary,
    fontWeight: '700',
  },
  name: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  email: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  roleBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  roleText: {
    ...typography.label,
    color: colors.primary,
    fontWeight: '700',
  },
  settingsCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  settingValue: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  infoCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: spacing.md,
  },
  infoText: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  infoTextSmall: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  logoutButton: {
    marginTop: spacing.md,
  },
});

