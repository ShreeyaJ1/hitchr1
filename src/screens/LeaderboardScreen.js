import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import GlassCard from '../components/GlassCard';
import { globalStyles, colors } from '../styles/globalStyles';

export default function LeaderboardScreen() {
  const [users] = useState([
    { id: 1, name: 'Alice Johnson', tokens: 2450, rides: 89, rating: 4.9, rank: 1 },
    { id: 2, name: 'Bob Smith', tokens: 2100, rides: 76, rating: 4.8, rank: 2 },
    { id: 3, name: 'Carol Davis', tokens: 1890, rides: 65, rating: 4.7, rank: 3 },
    { id: 4, name: 'David Wilson', tokens: 1650, rides: 58, rating: 4.6, rank: 4 },
    { id: 5, name: 'Eva Brown', tokens: 1420, rides: 52, rating: 4.5, rank: 5 },
  ]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return { name: 'trophy', color: colors.yellow };
      case 2: return { name: 'medal', color: '#C0C0C0' };
      case 3: return { name: 'medal', color: '#CD7F32' };
      default: return { name: 'person', color: colors.textMuted };
    }
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1: return { borderColor: colors.yellow + '50', backgroundColor: colors.yellow + '10' };
      case 2: return { borderColor: '#C0C0C050', backgroundColor: '#C0C0C010' };
      case 3: return { borderColor: '#CD7F3250', backgroundColor: '#CD7F3210' };
      default: return {};
    }
  };

  return (
    <LinearGradient
      colors={['#0d1222', '#1f1d3e', '#3d1b3d', '#1a1f3a']}
      style={globalStyles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[globalStyles.heading1, styles.title]}>
              Leaderboard
            </Text>
            <Text style={[globalStyles.textSecondary, styles.subtitle]}>
              Top performers this month
            </Text>
          </View>

          {/* Top 3 Podium */}
          <GlassCard style={styles.podiumCard}>
            <View style={styles.podium}>
              {users.slice(0, 3).map((user, index) => {
                const rankIcon = getRankIcon(user.rank);
                return (
                  <View key={user.id} style={[styles.podiumItem, index === 0 && styles.winner]}>
                    <View style={[styles.podiumAvatar, getRankStyle(user.rank)]}>
                      <Text style={styles.podiumAvatarText}>{user.name[0]}</Text>
                    </View>
                    <Ionicons 
                      name={rankIcon.name} 
                      size={24} 
                      color={rankIcon.color} 
                      style={styles.rankIcon}
                    />
                    <Text style={[globalStyles.textPrimary, styles.podiumName]}>
                      {user.name.split(' ')[0]}
                    </Text>
                    <Text style={[globalStyles.textMuted, styles.podiumTokens]}>
                      {user.tokens} tokens
                    </Text>
                  </View>
                );
              })}
            </View>
          </GlassCard>

          {/* Full Rankings */}
          <GlassCard style={styles.rankingsCard}>
            <Text style={[globalStyles.heading2, styles.sectionTitle]}>
              Full Rankings
            </Text>
            
            {users.map((user) => {
              const rankIcon = getRankIcon(user.rank);
              return (
                <View key={user.id} style={[styles.userRow, getRankStyle(user.rank)]}>
                  <View style={styles.userRank}>
                    <Text style={[globalStyles.textPrimary, styles.rankNumber]}>
                      {user.rank}
                    </Text>
                  </View>
                  
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>{user.name[0]}</Text>
                  </View>
                  
                  <View style={styles.userInfo}>
                    <Text style={[globalStyles.textPrimary, styles.userName]}>
                      {user.name}
                    </Text>
                    <Text style={[globalStyles.textMuted, styles.userStats]}>
                      ⭐ {user.rating} • {user.rides} rides
                    </Text>
                  </View>
                  
                  <View style={styles.userTokens}>
                    <Text style={[globalStyles.textPrimary, styles.tokenAmount]}>
                      {user.tokens.toLocaleString()}
                    </Text>
                    <Text style={[globalStyles.textMuted, styles.tokenLabel]}>
                      tokens
                    </Text>
                  </View>
                </View>
              );
            })}
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
  header: {
    marginTop: 16,
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  podiumCard: {
    marginBottom: 24,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingVertical: 20,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  winner: {
    transform: [{ scale: 1.1 }],
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: colors.primary + '80',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 2,
  },
  podiumAvatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  rankIcon: {
    marginBottom: 4,
  },
  podiumName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  podiumTokens: {
    fontSize: 12,
  },
  rankingsCard: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  userRank: {
    width: 30,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary + '80',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  userAvatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  userStats: {
    fontSize: 12,
  },
  userTokens: {
    alignItems: 'flex-end',
  },
  tokenAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tokenLabel: {
    fontSize: 12,
  },
});