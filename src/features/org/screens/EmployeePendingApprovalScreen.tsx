
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@/ui/components/Text';
import ScreenContainer from '@/ui/layout/ScreenContainer';
import Button from '@/ui/components/Button';
import { theme } from '@/ui/theme';

export const EmployeePendingApprovalScreen = () => {
    return (
        <ScreenContainer>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text variant="xl" style={styles.title}>Waiting for Approval</Text>
                    <Text variant="md" style={styles.description}>
                        Your request to join the organization has been sent.
                        You’ll get access once an admin approves it.
                    </Text>
                </View>

                <Button
                    title="Logout"
                    variant="outline"
                    onPress={() => console.log('Logout pressed')}
                    style={styles.button}
                />
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: theme.spacing.lg,
    },
    content: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    title: {
        marginBottom: theme.spacing.md,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        color: theme.colors.textSecondary,
        lineHeight: 24,
    },
    button: {
        marginTop: theme.spacing.xl,
    }
});
