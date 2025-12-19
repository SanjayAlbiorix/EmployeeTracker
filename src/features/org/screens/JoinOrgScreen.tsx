import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../../../ui/theme';
import Text from '../../../ui/components/Text';
import Button from '../../../ui/components/Button';
import Card from '../../../ui/components/Card';
import { useOrgStore } from '../../../store/orgStore';
import { useAuthStore } from '../../../store/authStore';

const JoinOrgScreen = () => {
    const [orgCode, setOrgCode] = useState('');
    // We use store's loading state, but we also have local loading?
    // Store handles loading for join action. Use store's isLoading if we can expose it.
    // User instruction: "Replace mock logic... On submit: await joinOrganization(code)"
    const joinOrganization = useOrgStore(state => state.joinOrganization);
    const isLoading = useOrgStore(state => state.isLoading);
    const logout = useAuthStore(state => state.logout);

    const handleJoin = async () => {
        if (!orgCode.trim()) {
            Alert.alert('Error', 'Please enter an organization code');
            return;
        }

        await joinOrganization(orgCode);
        // On success: Let root navigation proceed automatically (orgId set)
        // On error: console.error only (handled in store)
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.content}>
                <Card style={styles.card}>
                    <Text variant="xl" weight="bold" style={styles.title}>Join Organization</Text>
                    <Text variant="md" color={theme.colors.textSecondary} style={styles.subtitle}>
                        Enter the 6-digit code provided by your administrator.
                    </Text>

                    <View style={styles.inputContainer}>
                        <Text variant="sm" weight="medium" style={styles.label}>Organization Code</Text>
                        <TextInput
                            style={styles.input}
                            value={orgCode}
                            onChangeText={setOrgCode}
                            placeholder="Enter code (e.g. 123456)"
                            placeholderTextColor={theme.colors.textSecondary}
                            autoCapitalize="characters"
                        />
                    </View>

                    <Button 
                        title="Join Organization" 
                        onPress={handleJoin} 
                        loading={isLoading}
                        variant="primary"
                        style={styles.button}
                    />
                    
                    <Button 
                        title="Log Out" 
                        onPress={logout} 
                        variant="outline"
                        style={[styles.button, { marginTop: theme.spacing.md, borderColor: 'transparent' }]}
                    />
                </Card>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        padding: theme.spacing.md,
    },
    content: {
        alignItems: 'center',
    },
    card: {
        width: '100%',
        maxWidth: 400,
        padding: theme.spacing.xl,
    },
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
    },
    inputContainer: {
        marginBottom: theme.spacing.xl,
        gap: theme.spacing.xs,
    },
    label: {
        color: theme.colors.textPrimary,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.spacing.md,
        padding: theme.spacing.md,
        fontSize: 16,
        color: theme.colors.textPrimary,
        backgroundColor: theme.colors.surface,
    },
    button: {
        marginTop: theme.spacing.xs,
    },
});

export default JoinOrgScreen;
