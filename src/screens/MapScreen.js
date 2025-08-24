import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import GlassCard from '../components/GlassCard';
import { globalStyles, colors } from '../styles/globalStyles';

export default function MapScreen() {
  const [nearbyUsers] = useState([
    { id: 1, name: 'John Doe', rating: 4.8, distance: '0.5 km', role: 'pilot' },
    { id: 2, name: 'Jane Smith', rating: 4.9, distance: '1.2 km', role: 'rider' },
    { id: 3, name: 'Mike Johnson', rating: 4.7, distance: '2.1 km', role: 'pilot' },
  ]);

  return (
    <LinearGradient
      colors={['#0d1222', '#1f1d3e', '#3d1b3d', '#1a1f3a']}
      style={globalStyles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          {/* Mock Map */}
          <GlassCard style={styles.mapContainer}>
            <View style={styles.mockMap}>
              <View style={styles.centerMarker}>
                <Ionicons name="location" size={24} color={colors.primary} />
              </View>
              
              {/* Mock user markers */}
              <View style={[styles.userMarker, { top: '25%', left: '35%' }]}>
                <Ionicons name="car" size={16} color="white" />
              </View>
              <View style={[styles.userMarker, { top: '65%', right: '30%' }]}>
                <Ionicons name="person" size={16} color="white" />
              </View>
              <View style={[styles.userMarker, { top: '40%', left: '20%' }]}>
                <Ionicons name="car" size={16} color="white" />
              </View>
            </View>
            
            {/* Map controls */}
            <View style={styles.mapControls}>
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="add" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="navigate" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </GlassCard>

          {/* Nearby Users */}
          <GlassCard style={styles.nearbyContainer}>
            <Text style={[globalStyles.heading2, styles.sectionTitle]}>
              Nearby Users
            </Text>
            
            {nearbyUsers.map((user) => (
              <View key={user.id} style={styles.userCard}>
                <View style={styles.userInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user.name[0]}</Text>
                  </View>
                  <View style={styles.userDetails}>
                    <Text style={globalStyles.textPrimary}>{user.name}</Text>
                    <Text style={globalStyles.textMuted}>
                      ⭐ {user.rating} • {user.distance} away
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity style={globalStyles.button}>
                  <Text style={globalStyles.buttonText}>Connect</Text>
                </TouchableOpacity>
              </View>
            ))}
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mapContainer: {
    height: 300,
    marginTop: 16,
    marginBottom: 24,
    position: 'relative',
  },
  mockMap: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  centerMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMarker: {
    position: 'absolute',
    width: 32,
    height: 32,
    backgroundColor: colors.green + '80',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.green,
  },
  mapControls: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  controlButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.glass,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  nearbyContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary + '80',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
});