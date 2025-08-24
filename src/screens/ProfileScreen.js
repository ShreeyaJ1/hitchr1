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
import StatsCard from '../components/StatsCard';
import { globalStyles, colors } from '../styles/globalStyles';

export default function ProfileScreen() {
  const [currentUser] = useState({
    display_name: 'John Doe',
    email: 'john.doe@example.com',
    tokens: 1250,
    total_rides: 42,
    current_streak: 7,
    trust_score: 4.8,
    current_role: 'rider',
    bio: 'Love exploring new places and meeting fellow travelers!'
  });

  const achievements = [
    { name: 'First Ride', icon: 'car', color: colors.blue },
    { name: 'Social Butterfly', icon: 'people', color: colors.purple },
    { name: 'Eco Warrior', icon: 'leaf', color: colors.green },
    { name: 'Streak Master', icon: 'flame', color: colors.orange },
  ];

  return (
    <LinearGradient
      colors={['#0d1222', '#1f1d3e', '#3d1b3d', '#1a1f3a']}
      style={globalStyles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          {/* Profile Header */}
          <GlassCard style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {currentUser.display_name[0]}
                </Text>
              </View>
              
              <View style={styles.profileInfo}>
                <Text style={[globalStyles.heading2, styles.name]}>
                  {currentUser.display_name}
                </Text>
                <Text style={[globalStyles.textMuted, styles.email]}>
                  {currentUser.email}
                </Text>
                <View style={styles.roleTag}>
                  <Ionicons 
                    name={currentUser.current_role === 'pilot' ? 'car' : 'person'} 
                    size={16} 
                    color={colors.primary} 
                  />
                  <Text style={[globalStyles.textPrimary, styles.roleText]}>
                    {currentUser.current_role === 'pilot' ? 'Pilot' : 'Rider'}
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.editButton}>
                <Ionicons name="create-outline" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            
            {currentUser.bio && (
              <Text style={[globalStyles.textSecondary, styles.bio]}>
                {currentUser.bio}
              </Text>
            )}
          </GlassCard>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatsCard
              title="Tokens Earned"
              value={currentUser.tokens.toLocaleString()}
              icon="flash"
              color={colors.yellow}
            />
            <StatsCard
              title="Total Rides"
              value={currentUser.total_rides.toString()}
              icon="car"
              color={colors.blue}
            />
            <StatsCard
              title="Current Streak"
              value={`${currentUser.current_streak} days`}
              icon="trending-up"
              color={colors.green}
            />
            <StatsCard
              title="Trust Score"
              value={currentUser.trust_score.toFixed(1)}
              icon="star"
              color={colors.purple}
            />
          </View>

          {/* Achievements */}
          <GlassCard style={styles.achievementsCard}>
            <Text style={[globalStyles.heading2, styles.sectionTitle]}>
              Recent Achievements
            </Text>
            
            <View style={styles.achievementsGrid}>
              {achievements.map((achievement, index) => (
                <View key={index} style={styles.achievementItem}>
                  <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '20' }]}>
                    <Ionicons name={achievement.icon} size={24} color={achievement.color} />
                  </View>
                  <Text style={[globalStyles.textPrimary, styles.achievementName]}>
                    {achievement.name}
                  </Text>
                </View>
              ))}
            </View>
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
  profileCard: {
    marginTop: 16,
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: colors.primary + '80',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    marginBottom: 4,
  },
  email: {
    marginBottom: 8,
  },
  roleTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.primary + '40',
  },
  roleText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
  editButton: {
    padding: 8,
  },
  bio: {
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 24,
  },
  achievementsCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  achievementItem: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  achievementName: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
});