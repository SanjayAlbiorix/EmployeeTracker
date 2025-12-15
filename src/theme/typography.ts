import { Platform, TextStyle } from 'react-native';

export const typography = {
  // Page titles
  pageTitle: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  // Section headers
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: '600' as const,
    lineHeight: 40,
    color: '#111827',
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
    color: '#111827',
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    color: '#111827',
  },
  // Body text
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    color: '#111827',
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    color: '#111827',
  },
  // Subtitles
  subtitle: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  subtitleSmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  // Labels
  label: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    color: '#6B7280',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  // Overline
  overline: {
    fontSize: 10,
    fontWeight: '600' as const,
    lineHeight: 16,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
  // Caption
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  // Helper text
  helper: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  // Error text
  error: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  // Button
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
};

export type TypographyVariant = keyof typeof typography;

