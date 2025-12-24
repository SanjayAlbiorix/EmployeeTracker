
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ScreenContainer from '@/ui/layout/ScreenContainer';
import TopBar from '@/ui/layout/TopBar';
import Text from '@/ui/components/Text';
import Button from '@/ui/components/Button';
import { theme } from '@/ui/theme';

// Placeholder type
interface JoinRequest {
    id: string;
    email: string;
    orgName: string;
}

const MOCK_REQUESTS: JoinRequest[] = [
    { id: '1', email: 'user1@example.com', orgName: 'Acme Corp' },
    { id: '2', email: 'user2@example.com', orgName: 'Acme Corp' },
    { id: '3', email: 'john.doe@gmail.com', orgName: 'Acme Corp' },
];

export const AdminJoinRequestsScreen = () => {
    const handleApprove = (id: string) => {
        console.log('Approve clicked for', id);
    };

    const handleReject = (id: string) => {
        console.log('Reject clicked for', id);
    };

    const renderItem = ({ item }: { item: JoinRequest }) => (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text variant="md" style={styles.email}>{item.email}</Text>
                <Text variant="sm" color={theme.colors.textSecondary}>Requesting to join {item.orgName}</Text>
            </View>
            <View style={styles.actions}>
                <Button 
                    title="Reject" 
                    variant="outline" 
                    onPress={() => handleReject(item.id)}
                    style={styles.actionButton}
                />
                <Button 
                    title="Approve" 
                    onPress={() => handleApprove(item.id)} 
                    style={styles.actionButton}
                />
            </View>
        </View>
    );

    return (
        <ScreenContainer>
            <TopBar title="Join Requests" showBack />
            <FlatList
                data={MOCK_REQUESTS}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text variant="md" color={theme.colors.textSecondary}>No pending requests.</Text>
                    </View>
                }
            />
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    list: {
        padding: theme.spacing.md,
        gap: theme.spacing.md,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        gap: theme.spacing.md,
    },
    info: {
        gap: 4,
    },
    email: {
        fontWeight: '600',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: theme.spacing.sm,
    },
    actionButton: {
        minWidth: 80,
    },
    emptyContainer: {
        padding: theme.spacing.xl,
        alignItems: 'center',
    }
});
