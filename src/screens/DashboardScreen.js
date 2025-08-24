import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  RefreshControl 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import GlassCard from '../components/GlassCard';
import StatsCard from '../components/StatsCard';
import QuickActionCard from '../components/QuickActionCard';
import { globalStyles, colors } from '../styles/globalStyles';

export default function DashboardScreen({ navigation }) {
  const [currentUser, setCurrentUser] = useState({
    display_name: 'Hitcher',
    tokens: 0,
    total_rides: 0,
    current_streak: 0,
    trust_score: 5.0,
    current_role: 'rider'
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const toggleRole = () => {
    setCurrentUser(prev => ({
      ...prev,
      current_role: prev.current_role === 'rider' ? 'pilot' : 'rider'
    }));
  };

  const quickActions = [
    {
      title: currentUser.current_role === 'pilot' ? 'Offer Ride' : 'Find Ride',
      description: currentUser.current_role === 'pilot' ? 'Share journey' : 'Get a lift',
      icon: 'car-outline',
      onPress: () => navigation.navigate('Map'),
      gradient: [colors.blue, colors.cyan]
    },
    {
      title: 'Stories',
      description: 'Share adventure',
      icon: 'book-outline',
      onPress: () => navigation.navigate('Stories'),
      gradient: [colors.purple, colors.blue]
    },
    {
      title: 'Trails',
      description: 'Scenic routes',
      icon: 'compass-outline',
      onPress: () => navigation.navigate('Trails'),
      gradient: [colors.green, colors.cyan]
    },
    {
      title: 'Quests',
      description: 'Challenges',
      icon: 'trophy-outline',
      onPress: () => navigation.navigate('Quests'),
      gradient: [colors.orange, colors.yellow]
    }
  ];

  return (
    <LinearGradient
      colors={['#0d1222', '#1f1d3e', '#3d1b3d', '#1a1f3a']}
      style={globalStyles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={[globalStyles.heading1, styles.welcomeText]}>
                Welcome back, {currentUser.display_name}!
              </Text>
              <Text style={[globalStyles.textSecondary, styles.subtitle]}>
                Ready for your next adventure?
              </Text>
            </View>
            
            {/* Role Toggle */}
            <TouchableOpacity onPress={toggleRole} style={styles.roleToggle}>
              <GlassCard style={styles.roleCard}>
                <View style={styles.roleContent}>
                  <Ionicons 
                    name={currentUser.current_role === 'pilot' ? 'car' : 'person'} 
                    size={20} 
                    color={colors.primary} 
                  />
                  <Text style={[globalStyles.textPrimary, styles.roleText]}>
                    {currentUser.current_role === 'pilot' ? 'Pilot' : 'Rider'}
                  </Text>
                </View>
              </GlassCard>
            </TouchableOpacity>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <StatsCard
              title="Tokens"
              value={currentUser.tokens.toLocaleString()}
              icon="flash"
              color={colors.yellow}
            />
            <StatsCard
              title="Rides"
              value={currentUser.total_rides.toString()}
              icon="car"
              color={colors.blue}
            />
            <StatsCard
              title="Streak"
              value={`${currentUser.current_streak} days`}
              icon="trending-up"
              color={colors.green}
            />
            <StatsCard
              title="Rating"
              value={currentUser.trust_score.toFixed(1)}
              icon="star"
              color={colors.purple}
            />
          </View>

          {/* Quick Actions */}
          <GlassCard style={styles.quickActionsContainer}>
            <Text style={[globalStyles.heading2, styles.sectionTitle]}>
              Quick Actions
            </Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <QuickActionCard
                  key={index}
                  title={action.title}
                  description={action.description}
                  icon={action.icon}
                  onPress={action.onPress}
                  gradient={action.gradient}
                />
              ))}
            </View>
          </GlassCard>

          {/* Additional Actions */}
          <View style={styles.additionalActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Leaderboard')}
            >
              <GlassCard style={styles.actionCard}>
                <Ionicons name="trophy" size={24} color={colors.yellow} />
                <Text style={[globalStyles.textPrimary, styles.actionText]}>
                  Leaderboard
                </Text>
              </GlassCard>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('RTOHunt')}
            >
              <GlassCard style={styles.actionCard}>
                <Ionicons name="search" size={24} color={colors.cyan} />
                <Text style={[globalStyles.textPrimary, styles.actionText]}>
                  RTO Hunt
                </Text>
              </GlassCard>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 24,
  },
  headerContent: {
    flex: 1,
  },
  welcomeText: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  roleToggle: {
    marginLeft: 16,
  },
  roleCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  roleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleText: {
    marginLeft: 8,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 24,
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  additionalActions: {
    flexDirection: 'row',
    marginHorizontal: -8,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    margin: 8,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  actionText: {
    marginLeft: 12,
    fontWeight: '600',
  },
});