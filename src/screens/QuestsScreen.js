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

export default function QuestsScreen() {
  const [quests] = useState([
    {
      id: 1,
      title: 'Weekend Warrior',
      description: 'Complete 5 rides this weekend',
      type: 'individual',
      progress: 60,
      reward: 200,
      participants: 45,
      timeLeft: '2 days'
    },
    {
      id: 2,
      title: 'Eco Champion',
      description: 'Share rides to save 50kg CO2',
      type: 'community',
      progress: 80,
      reward: 500,
      participants: 128,
      timeLeft: '5 days'
    },
    {
      id: 3,
      title: 'Social Butterfly',
      description: 'Connect with 10 new riders',
      type: 'individual',
      progress: 30,
      reward: 150,
      participants: 23,
      timeLeft: '1 week'
    }
  ]);

  const getQuestTypeColor = (type) => {
    switch (type) {
      case 'individual': return colors.blue;
      case 'community': return colors.purple;
      case 'event': return colors.orange;
      default: return colors.textMuted;
    }
  };

  const getQuestTypeIcon = (type) => {
    switch (type) {
      case 'individual': return 'person';
      case 'community': return 'people';
      case 'event': return 'calendar';
      default: return 'trophy';
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
              Quests & Challenges
            </Text>
            <Text style={[globalStyles.textSecondary, styles.subtitle]}>
              Join challenges to earn rewards
            </Text>
          </View>

          {/* Stats Overview */}
          <View style={styles.statsRow}>
            <GlassCard style={styles.statCard}>
              <Text style={[globalStyles.heading2, { color: colors.blue }]}>
                {quests.filter(q => q.type === 'individual').length}
              </Text>
              <Text style={globalStyles.textMuted}>Solo Quests</Text>
            </GlassCard>
            
            <GlassCard style={styles.statCard}>
              <Text style={[globalStyles.heading2, { color: colors.purple }]}>
                {quests.filter(q => q.type === 'community').length}
              </Text>
              <Text style={globalStyles.textMuted}>Community</Text>
            </GlassCard>
            
            <GlassCard style={styles.statCard}>
              <Text style={[globalStyles.heading2, { color: colors.yellow }]}>
                {quests.reduce((sum, q) => sum + q.reward, 0)}
              </Text>
              <Text style={globalStyles.textMuted}>Total Tokens</Text>
            </GlassCard>
          </View>

          {/* Quests List */}
          {quests.map((quest) => {
            const typeColor = getQuestTypeColor(quest.type);
            const typeIcon = getQuestTypeIcon(quest.type);
            
            return (
              <GlassCard key={quest.id} style={styles.questCard}>
                <View style={styles.questHeader}>
                  <View style={styles.questTitleRow}>
                    <Text style={[globalStyles.heading3, styles.questTitle]}>
                      {quest.title}
                    </Text>
                    <View style={[styles.typeBadge, { backgroundColor: typeColor + '20' }]}>
                      <Ionicons name={typeIcon} size={12} color={typeColor} />
                      <Text style={[styles.typeText, { color: typeColor }]}>
                        {quest.type}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={[globalStyles.textSecondary, styles.questDescription]}>
                    {quest.description}
                  </Text>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Text style={globalStyles.textMuted}>Progress</Text>
                    <Text style={globalStyles.textPrimary}>{quest.progress}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${quest.progress}%`, backgroundColor: typeColor }
                      ]} 
                    />
                  </View>
                </View>

                {/* Quest Stats */}
                <View style={styles.questStats}>
                  <View style={styles.statItem}>
                    <Ionicons name="flash" size={16} color={colors.yellow} />
                    <Text style={[globalStyles.textMuted, styles.statText]}>
                      {quest.reward} tokens
                    </Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Ionicons name="people" size={16} color={colors.textMuted} />
                    <Text style={[globalStyles.textMuted, styles.statText]}>
                      {quest.participants} joined
                    </Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Ionicons name="time" size={16} color={colors.textMuted} />
                    <Text style={[globalStyles.textMuted, styles.statText]}>
                      {quest.timeLeft} left
                    </Text>
                  </View>
                </View>

                {/* Action Button */}
                <TouchableOpacity style={[globalStyles.button, styles.questButton]}>
                  <Text style={globalStyles.buttonText}>
                    {quest.progress > 0 ? 'Continue Quest' : 'Join Quest'}
                  </Text>
                </TouchableOpacity>
              </GlassCard>
            );
          })}
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
  questCard: {
    marginBottom: 20,
  },
  questHeader: {
    marginBottom: 16,
  },
  questTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  questTitle: {
    flex: 1,
    marginRight: 12,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  questDescription: {
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  questStats: {
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
  questButton: {
    alignSelf: 'stretch',
  },
});