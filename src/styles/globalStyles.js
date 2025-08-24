import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#00aaff',
  secondary: '#8b5cf6',
  background: '#0d1222',
  backgroundSecondary: '#1f1d3e',
  glass: 'rgba(22, 28, 45, 0.5)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  textPrimary: '#ffffff',
  textSecondary: '#e2e8f0',
  textMuted: '#94a3b8',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  yellow: '#fbbf24',
  purple: '#8b5cf6',
  blue: '#3b82f6',
  green: '#10b981',
  orange: '#f97316',
  cyan: '#06b6d4',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  glass: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 24,
  },
  glassSmall: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 16,
  },
  textPrimary: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  textSecondary: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  textMuted: {
    color: colors.textMuted,
    fontSize: 12,
  },
  heading1: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: 'bold',
  },
  heading2: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  heading3: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    backgroundColor: 'rgba(0, 170, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(0, 170, 255, 0.4)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
});