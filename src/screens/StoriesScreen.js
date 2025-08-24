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

export default function StoriesScreen({ navigation }) {
  const [stories] = useState([
    {
      id: 1,
      title: 'Amazing Highway Adventure',
      content: 'Had the most incredible ride through the mountains today. The scenery was breathtaking and met some wonderful fellow travelers!',
      author: 'Sarah Johnson',
      likes: 24,
      image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['adventure', 'mountains', 'scenic']
    },
    {
      id: 2,
      title: 'City to Coast Journey',
      content: 'Shared a ride from the city to the coast. Great conversation and saved money on fuel. This is what community is all about!',
      author: 'Mike Chen',
      likes: 18,
      image: 'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['coast', 'community', 'savings']
    }
  ]);

  return (
    <LinearGradient
      colors={['#0d1222', '#1f1d3e', '#3d1b3d', '#1a1f3a']}
      style={globalStyles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          {/* Header with Add Button */}
          <View style={styles.header}>
            <Text style={[globalStyles.heading1, styles.title]}>
              Ride Stories
            </Text>
            <TouchableOpacity style={globalStyles.button}>
              <Ionicons name="add" size={20} color="white" />
              <Text style={[globalStyles.buttonText, styles.addButtonText]}>
                Share
              </Text>
            </TouchableOpacity>
          </View>

          {/* Stories Feed */}
          {stories.map((story) => (
            <GlassCard key={story.id} style={styles.storyCard}>
              {/* Story Header */}
              <View style={styles.storyHeader}>
                <View style={styles.authorAvatar}>
                  <Text style={styles.authorAvatarText}>
                    {story.author[0]}
                  </Text>
                </View>
                <View style={styles.authorInfo}>
                  <Text style={globalStyles.textPrimary}>
                    {story.author}
                  </Text>
                  <Text style={globalStyles.textMuted}>
                    2 hours ago
                  </Text>
                </View>
              </View>

              {/* Story Content */}
              <Text style={[globalStyles.heading3, styles.storyTitle]}>
                {story.title}
              </Text>
              <Text style={[globalStyles.textSecondary, styles.storyContent]}>
                {story.content}
              </Text>

              {/* Story Image */}
              {story.image && (
                <Image source={{ uri: story.image }} style={styles.storyImage} />
              )}

              {/* Tags */}
              <View style={styles.tagsContainer}>
                {story.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Actions */}
              <View style={styles.storyActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="heart-outline" size={20} color={colors.textMuted} />
                  <Text style={[globalStyles.textMuted, styles.actionText]}>
                    {story.likes}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chatbubble-outline" size={20} color={colors.textMuted} />
                  <Text style={[globalStyles.textMuted, styles.actionText]}>
                    Comment
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  title: {
    flex: 1,
  },
  addButtonText: {
    marginLeft: 8,
  },
  storyCard: {
    marginBottom: 20,
  },
  storyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary + '80',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  authorAvatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  authorInfo: {
    flex: 1,
  },
  storyTitle: {
    marginBottom: 8,
  },
  storyContent: {
    lineHeight: 22,
    marginBottom: 12,
  },
  storyImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  storyActions: {
    flexDirection: 'row',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 6,
    fontWeight: '600',
  },
});