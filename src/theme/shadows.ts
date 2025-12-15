import { Platform } from 'react-native';

export const shadows = {
  none: Platform.select({
    ios: {},
    android: { elevation: 0 },
    web: { boxShadow: 'none' },
    default: {},
  }),
  small: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    default: {},
  }),
  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
    web: {
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.08)',
    },
    default: {},
  }),
  large: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
    web: {
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
    },
    default: {},
  }),
  xlarge: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
    },
    android: {
      elevation: 12,
    },
    web: {
      boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.12)',
    },
    default: {},
  }),
  // Card specific
  card: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
    },
    android: {
      elevation: 3,
    },
    web: {
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.06)',
      transition: 'box-shadow 0.2s ease',
    },
    default: {},
  }),
  cardHover: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    android: {
      elevation: 6,
    },
    web: {
      boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.1)',
    },
    default: {},
  }),
  // Floating action button
  fab: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
    web: {
      boxShadow: '0 4px 12px 0 rgba(79, 70, 229, 0.3)',
    },
    default: {},
  }),
  // Header
  header: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
    default: {},
  }),
};

