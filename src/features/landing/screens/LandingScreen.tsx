import React from 'react';
import { View, StyleSheet, ScrollView, Platform, useWindowDimensions, ImageBackground } from 'react-native';
import { theme } from '../../../ui/theme';
import Text from '../../../ui/components/Text';
import Button from '../../../ui/components/Button';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const LandingScreen = () => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={[styles.heroSection, isDesktop && styles.heroSectionDesktop]}>
          <View style={[styles.heroContent, isDesktop && styles.heroContentDesktop]}>
            <View style={styles.badge}>
              <Text variant="xs" style={styles.badgeText}>New Feature: AI-Powered Analytics</Text>
            </View>
            <Text variant="xl" weight="bold" style={styles.title}>
              Streamline Your <Text variant="xl" weight="bold" style={{ color: theme.colors.primary }}>Workforce</Text>
            </Text>
            <Text variant="md" style={styles.subtitle}>
              The all-in-one HRMS platform designed for modern teams. Manage attendance, leaves, payroll, and more with ease.
            </Text>
            <View style={styles.heroButtons}>
              <Button 
                title="Get Started" 
                onPress={() => navigation.navigate('Signup')} 
                variant="primary" 
                style={styles.ctaButton}
              />
              <Button 
                title="Sign In" 
                onPress={() => navigation.navigate('Login')} 
                variant="outline" 
                style={styles.secondaryButton}
              />
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text variant="lg" weight="bold" style={styles.sectionTitle}>Everything you need</Text>
          <Text variant="md" style={styles.sectionSubtitle}>
             Powerful tools to help you manage your organization efficiently.
          </Text>
          
          <View style={[styles.grid, isDesktop && styles.gridDesktop]}>
            <FeatureCard 
              icon="people-outline" 
              title="Employee Management" 
              description="Keep track of your team's profiles, roles, and documents in one secure place."
            />
            <FeatureCard 
              icon="time-outline" 
              title="Smart Attendance" 
              description="Geofencing, selfie verification, and real-time tracking for accurate attendance."
            />
            <FeatureCard 
              icon="calendar-outline" 
              title="Leave Management" 
              description="Streamlined leave requests and approvals with automated balance tracking."
            />
             <FeatureCard 
              icon="cash-outline" 
              title="Instant Payroll" 
              description="Automated payroll processing with tax calculations and payslip generation."
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text variant="xs" style={styles.footerText}>© 2024 Albiorix Technology. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => {
    const { width } = useWindowDimensions();
    const isDesktop = width > 768;
    return (
        <View style={[styles.card, isDesktop && styles.cardDesktop]}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={24} color={theme.colors.primary} />
            </View>
            <Text variant="lg" weight="bold" style={styles.cardTitle}>{title}</Text>
            <Text variant="sm" style={styles.cardDescription}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    padding: theme.spacing.xl,
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSectionDesktop: {
    paddingTop: 120,
    paddingBottom: 80,
  },
  heroContent: {
    maxWidth: '100%',
    alignItems: 'center',
  },
  heroContentDesktop: {
    maxWidth: 800,
  },
  badge: {
    backgroundColor: theme.colors.primary + '15', // 15% opacity hex
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: 100,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
  },
  badgeText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    fontSize: 36,
    lineHeight: 44,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    color: theme.colors.textSecondary,
    fontSize: 18,
    maxWidth: 600,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  ctaButton: {
    minWidth: 140,
  },
  secondaryButton: {
    minWidth: 140,
  },
  featuresSection: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  sectionSubtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    color: theme.colors.textSecondary,
    maxWidth: 600,
  },
  grid: {
    gap: theme.spacing.lg,
    width: '100%',
  },
  gridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    borderRadius: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.sm,
  },
  cardDesktop: {
    width: '45%',
    maxWidth: 400,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  },
  cardTitle: {
    fontSize: 18,
  },
  cardDescription: {
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  footerText: {
    color: theme.colors.textSecondary,
  },
});

export default LandingScreen;
