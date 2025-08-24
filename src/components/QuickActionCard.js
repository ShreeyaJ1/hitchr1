import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from './GlassCard';
import { globalStyles, colors } from '../styles/globalStyles';

export default function QuickActionCard({ title, description, icon, onPress, gradient = [colors.primary, colors.secondary] }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <GlassCard style={styles.card}>
        <LinearGradient
          colors={gradient}
          style={styles.iconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name={icon} size={24} color="white" />
        </LinearGradient>
        <Text style={[globalStyles.textPrimary, styles.title]}>{title}</Text>
        <Text style={[globalStyles.textMuted, styles.description]}>{description}</Text>
      </GlassCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  card: {
    alignItems: 'center',
    minHeight: 140,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 12,
  },
});