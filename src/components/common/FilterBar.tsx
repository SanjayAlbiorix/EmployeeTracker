import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppInput } from './AppInput';
import { AppText } from './AppText';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';

interface FilterChip {
  label: string;
  value: string;
  active?: boolean;
  onPress: () => void;
}

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: FilterChip[];
  rightActions?: ReactNode;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  rightActions,
}) => {
  return (
    <View style={[styles.container, shadows.small]}>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <AppInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onChangeText={onSearchChange}
            style={styles.searchInput}
          />
        </View>

        {filters.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
            contentContainerStyle={styles.filtersContent}
          >
            {filters.map((filter) => (
              <FilterChip
                key={filter.value}
                label={filter.label}
                active={filter.active}
                onPress={filter.onPress}
              />
            ))}
          </ScrollView>
        )}

        {rightActions && <View style={styles.rightActions}>{rightActions}</View>}
      </View>
    </View>
  );
};

interface FilterChipProps {
  label: string;
  active?: boolean;
  onPress: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        active && styles.chipActive,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <AppText
        variant="label"
        style={[
          styles.chipText,
          active && styles.chipTextActive,
        ]}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  searchContainer: {
    flex: 1,
    minWidth: 200,
  },
  searchInput: {
    marginBottom: 0,
  },
  filtersContainer: {
    flex: 1,
  },
  filtersContent: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 44,
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.primary,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});

