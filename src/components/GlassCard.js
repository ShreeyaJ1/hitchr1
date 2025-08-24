import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { globalStyles } from '../styles/globalStyles';

export default function GlassCard({ children, style, intensity = 20 }) {
  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={intensity} style={styles.blur}>
        <LinearGradient
          colors={['rgba(22, 28, 45, 0.6)', 'rgba(22, 28, 45, 0.4)']}
          style={[globalStyles.glass, styles.gradient]}
        >
          {children}
        </LinearGradient>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  blur: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
});