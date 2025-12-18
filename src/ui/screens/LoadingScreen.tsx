import React, { memo } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../theme';
import Text from '../components/Text';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text variant="lg" weight="medium" style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
  },
});

export default memo(LoadingScreen);
