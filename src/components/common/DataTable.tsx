import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { AppText } from './AppText';
import { EmptyState } from './EmptyState';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
import { isWeb } from '../../utils/platform';

export interface Column<T> {
  key: string;
  label: string;
  width?: number | string;
  render?: (item: T, index: number) => ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T, index: number) => string;
  onRowPress?: (item: T, index: number) => void;
  emptyMessage?: string;
  loading?: boolean;
  selectable?: boolean;
  selectedIds?: string[];
  onSelect?: (id: string, selected: boolean) => void;
  selectAll?: boolean;
  onSelectAll?: (selected: boolean) => void;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowPress,
  emptyMessage = 'No data available',
  loading = false,
  selectable = false,
  selectedIds = [],
  onSelect,
  selectAll = false,
  onSelectAll,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.table}>
          <TableHeader columns={columns} selectable={selectable} selectAll={selectAll} onSelectAll={onSelectAll} />
        </View>
      </View>
    );
  }

  if (data.length === 0) {
    return <EmptyState title={emptyMessage} />;
  }

  if (!isWeb) {
    // Mobile fallback - render as cards
    return (
      <View style={styles.container}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={keyExtractor(item, index)}
            style={[styles.card, shadows.small]}
            onPress={() => onRowPress?.(item, index)}
            activeOpacity={0.7}
          >
            {columns.map((column) => (
              <View key={column.key} style={styles.cardRow}>
                <AppText variant="label" style={styles.cardLabel}>
                  {column.label}
                </AppText>
                <View style={styles.cardValue}>
                  {column.render ? (
                    column.render(item, index)
                  ) : (
                    <AppText variant="body">
                      {(item as any)[column.key]?.toString() || '-'}
                    </AppText>
                  )}
                </View>
              </View>
            ))}
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          <TableHeader columns={columns} selectable={selectable} selectAll={selectAll} onSelectAll={onSelectAll} />
          <View style={styles.tbody}>
            {data.map((item, index) => {
              const id = keyExtractor(item, index);
              const isSelected = selectedIds.includes(id);
              return (
                <TableRow
                  key={id}
                  item={item}
                  columns={columns}
                  index={index}
                  onPress={() => onRowPress?.(item, index)}
                  selectable={selectable}
                  selected={isSelected}
                  onSelect={(selected) => onSelect?.(id, selected)}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

interface TableHeaderProps<T> {
  columns: Column<T>[];
  selectable?: boolean;
  selectAll?: boolean;
  onSelectAll?: (selected: boolean) => void;
}

function TableHeader<T>({
  columns,
  selectable,
  selectAll,
  onSelectAll,
}: TableHeaderProps<T>) {
  return (
    <View style={styles.thead}>
      {selectable && (
        <View style={[styles.th, styles.checkboxColumn]}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => onSelectAll?.(!selectAll)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkboxInner, selectAll && styles.checkboxChecked]}>
              {selectAll && <View style={styles.checkmark} />}
            </View>
          </TouchableOpacity>
        </View>
      )}
      {columns.map((column) => (
        <View
          key={column.key}
          style={[styles.th, column.width ? { width: column.width as any } : undefined]}
        >
          <AppText variant="label" style={styles.thText}>
            {column.label}
          </AppText>
        </View>
      ))}
    </View>
  );
}

interface TableRowProps<T> {
  item: T;
  columns: Column<T>[];
  index: number;
  onPress?: () => void;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

function TableRow<T>({
  item,
  columns,
  index,
  onPress,
  selectable,
  selected,
  onSelect,
}: TableRowProps<T>) {
  return (
    <TouchableOpacity
      style={[styles.tr, index % 2 === 1 && styles.trEven]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {selectable && (
        <View style={[styles.td, styles.checkboxColumn]}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={(e) => {
              e.stopPropagation();
              onSelect?.(!selected);
            }}
            activeOpacity={0.7}
          >
            <View style={[styles.checkboxInner, selected && styles.checkboxChecked]}>
              {selected && <View style={styles.checkmark} />}
            </View>
          </TouchableOpacity>
        </View>
      )}
      {columns.map((column) => (
        <View
          key={column.key}
          style={[styles.td, column.width ? { width: column.width as any } : undefined]}
        >
          {column.render ? (
            column.render(item, index)
          ) : (
            <AppText variant="body">
              {(item as any)[column.key]?.toString() || '-'}
            </AppText>
          )}
        </View>
      ))}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    ...shadows.small,
  },
  table: {
    width: '100%',
    minWidth: isWeb ? 800 : '100%',
  },
  thead: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderBottomWidth: 2,
    borderBottomColor: colors.divider,
  },
  th: {
    padding: spacing.md,
    flex: 1,
    minWidth: 120,
  },
  thText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  tbody: {
    backgroundColor: colors.surface,
  },
  tr: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    ...(isWeb && {
      ':hover': {
        backgroundColor: colors.surfaceHover,
      } as any,
    }),
  },
  trEven: {
    backgroundColor: colors.background,
  },
  td: {
    padding: spacing.md,
    flex: 1,
    minWidth: 120,
    justifyContent: 'center',
  },
  checkboxColumn: {
    width: 50,
    minWidth: 50,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    width: 6,
    height: 10,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.white,
    transform: [{ rotate: '45deg' }],
    marginTop: -2,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  cardLabel: {
    flex: 1,
  },
  cardValue: {
    flex: 2,
    alignItems: 'flex-end',
  },
});

