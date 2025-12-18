import React, { useMemo } from 'react';
import { View, StyleSheet, useWindowDimensions, ViewStyle } from 'react-native';
import { theme } from '../theme';

type ResponsiveGridProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  itemContainerStyle?: ViewStyle;
};

/**
 * A responsive grid component that adjusts columns based on screen width.
 * Mobile (<768px): 1 column
 * Tablet (768px - 1024px): 2 columns
 * Desktop (>=1024px): 4 columns
 */
export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ children, style, itemContainerStyle }) => {
  const { width } = useWindowDimensions();

  const numColumns = useMemo(() => {
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 4;
  }, [width]);

  const childrenArray = React.Children.toArray(children);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        {childrenArray.map((child, index) => (
          <View 
            key={index} 
            style={[
              styles.itemContainer, 
              { width: `${100 / numColumns}%` },
              itemContainerStyle
            ]}
          >
            <View style={{ flex: 1, padding: theme.spacing.sm }}>
               {child}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -theme.spacing.sm, // Negative margin to offset padding
  },
  itemContainer: {
    // Width is set dynamically
  },
});
