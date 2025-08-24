import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassCard from './GlassCard';
import { globalStyles, colors } from '../styles/globalStyles';

export default function StatsCard({ title, value, icon, color = colors.primary }) {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text style={[globalStyles.heading2, styles.value]}>{value}</Text>
        <Text style={[globalStyles.textMuted, styles.title]}>{title}</Text>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  value: {
    marginBottom: 4,
  },
  title: {
    textAlign: 'center',
  },
});