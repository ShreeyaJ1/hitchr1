import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import GlassCard from '../components/GlassCard';
import { globalStyles, colors } from '../styles/globalStyles';

export default function TrailsScreen() {
  const [trails] = useState([
    {
      id: 1,
      name: 'Golden Triangle Route',
      description: 'Explore Delhi, Agra, and Jaipur in this classic Indian journey',
      distance: 720,
      duration: 8,
      difficulty: 'moderate',
      reward: 500,
      image: 'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=400',
      completed: false
    },
    {
      id: 2,
      name: 'Western Ghats Adventure',
      description: 'Scenic mountain roads through lush green landscapes',
      distance: 450,
      duration: 6,
      difficulty: 'challenging',
      reward: 750,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
      completed: true
    },
    {
      id: 3,
      name: 'Coastal Highway',
      description: 'Beautiful coastal drive along the Arabian Sea',
      distance: 320,
      duration: 4,
      difficulty: 'easy',
      reward: 300,
      image: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=400',
      completed: false
    }
  ]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return colors.green;
      case 'moderate': return colors.yellow;
      case 'challenging': return colors.orange;
      default: return colors.textMuted;
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
              HITCH Trails
            </Text>
            <Text style={[globalStyles.textSecondary, styles.subtitle]}>
              Discover scenic routes and cultural journeys
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <GlassCard style={styles.statCard}>
              <Text style={[globalStyles.heading2, { color: colors.blue }]}>
                {trails.length}
              </Text>
              <Text style={globalStyles.textMuted}>Total Trails</Text>
            </GlassCard>
            
            <GlassCard style={styles.statCard}>
              <Text style={[globalStyles.heading2, { color: colors.green }]}>
                {trails.filter(t => t.completed).length}
              </Text>
              <Text style={globalStyles.textMuted}>Completed</Text>
            </GlassCard>
            
            <GlassCard style={styles.statCard}>
              <Text style={[globalStyles.heading2, { color: colors.yellow }]}>
                {trails.reduce((sum, t) => sum + t.reward, 0)}
              </Text>
              <Text style={globalStyles.textMuted}>Total Tokens</Text>
            </GlassCard>
          </View>

          {/* Trails List */}
          {trails.map((trail) => (
            <GlassCard key={trail.id} style={styles.trailCard}>
              <Image source={{ uri: trail.image }} style={styles.trailImage} />
              
              {trail.completed && (
                <View style={styles.completedBadge}>
                  <Ionicons name="checkmark-circle" size={24} color={colors.green} />
                </View>
              )}
              
              <View style={styles.trailContent}>
                <View style={styles.trailHeader}>
                  <Text style={[globalStyles.heading3, styles.trailName]}>
                    {trail.name}
                  </Text>
                  <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(trail.difficulty) + '20' }]}>
                    <Text style={[styles.difficultyText, { color: getDifficultyColor(trail.difficulty) }]}>
                      {trail.difficulty}
                    </Text>
                  </View>
                </View>
                
                <Text style={[globalStyles.textSecondary, styles.trailDescription]}>
                  {trail.description}
                </Text>
                
                <View style={styles.trailStats}>
                  <View style={styles.statItem}>
                    <Ionicons name="location-outline" size={16} color={colors.textMuted} />
                    <Text style={[globalStyles.textMuted, styles.statText]}>
                      {trail.distance} km
                    </Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Ionicons name="time-outline" size={16} color={colors.textMuted} />
                    <Text style={[globalStyles.textMuted, styles.statText]}>
                      {trail.duration}h
                    </Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Ionicons name="flash" size={16} color={colors.yellow} />
                    <Text style={[globalStyles.textMuted, styles.statText]}>
                      {trail.reward} tokens
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={[
                    globalStyles.button,
                    styles.trailButton,
                    trail.completed && styles.completedButton
                  ]}
                  disabled={trail.completed}
                >
                  <Text style={[
                    globalStyles.buttonText,
                    trail.completed && styles.completedButtonText
                  ]}>
                    {trail.completed ? 'Completed ✓' : 'Start Trail'}
                  </Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          ))}
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
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -8,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    paddingVertical: 16,
  },
  trailCard: {
    marginBottom: 20,
    position: 'relative',
  },
  trailImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 16,
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.glass,
    borderRadius: 20,
    padding: 4,
  },
  trailContent: {
    flex: 1,
  },
  trailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  trailName: {
    flex: 1,
    marginRight: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  trailDescription: {
    lineHeight: 20,
    marginBottom: 16,
  },
  trailStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
  },
  trailButton: {
    alignSelf: 'stretch',
  },
  completedButton: {
    backgroundColor: colors.green + '20',
    borderColor: colors.green + '40',
  },
  completedButtonText: {
    color: colors.green,
  },
});