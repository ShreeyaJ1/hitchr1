import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  TextInput 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import GlassCard from '../components/GlassCard';
import { globalStyles, colors } from '../styles/globalStyles';

export default function RTOHuntScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [plates] = useState([
    { id: 1, code: 'KA-01', state: 'Karnataka', region: 'Bangalore', rarity: 'common', tokens: 10, collected: true },
    { id: 2, code: 'MH-12', state: 'Maharashtra', region: 'Mumbai', rarity: 'uncommon', tokens: 25, collected: false },
    { id: 3, code: 'DL-05', state: 'Delhi', region: 'Central Delhi', rarity: 'rare', tokens: 50, collected: false },
    { id: 4, code: 'TN-09', state: 'Tamil Nadu', region: 'Chennai', rarity: 'legendary', tokens: 100, collected: false },
    { id: 5, code: 'GJ-03', state: 'Gujarat', region: 'Ahmedabad', rarity: 'common', tokens: 10, collected: true },
  ]);

  const collectedCount = plates.filter(p => p.collected).length;
  const totalTokens = plates.reduce((sum, p) => sum + (p.collected ? p.tokens : 0), 0);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return colors.textMuted;
      case 'uncommon': return colors.green;
      case 'rare': return colors.blue;
      case 'legendary': return colors.purple;
      default: return colors.textMuted;
    }
  };

  const filteredPlates = plates.filter(plate =>
    plate.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plate.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plate.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              RTO Plate Hunt
            </Text>
            <Text style={[globalStyles.textSecondary, styles.subtitle]}>
              Collect license plates during your rides
            </Text>
          </View>

          {/* Stats Overview */}
          <View style={styles.statsRow}>
            <GlassCard style={styles.statCard}>
              <Text style={[globalStyles.heading2, { color: colors.yellow }]}>
                {collectedCount}
              </Text>
              <Text style={globalStyles.textMuted}>Collected</Text>
            </GlassCard>
            
            <GlassCard style={styles.statCard}>
              <Text style={[globalStyles.heading2, { color: colors.blue }]}>
                {plates.length}
              </Text>
              <Text style={globalStyles.textMuted}>Total Plates</Text>
            </GlassCard>
            
            <GlassCard style={styles.statCard}>
              <Text style={[globalStyles.heading2, { color: colors.green }]}>
                {Math.round((collectedCount / plates.length) * 100)}%
              </Text>
              <Text style={globalStyles.textMuted}>Completion</Text>
            </GlassCard>
          </View>

          {/* Hunt Instructions */}
          <GlassCard style={styles.instructionsCard}>
            <View style={styles.instructionsHeader}>
              <Ionicons name="camera" size={24} color={colors.blue} />
              <Text style={[globalStyles.heading3, styles.instructionsTitle]}>
                How to Hunt
              </Text>
            </View>
            <View style={styles.instructionsList}>
              <View style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepText}>1</Text>
                </View>
                <Text style={globalStyles.textSecondary}>
                  Spot license plates during your rides
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepText}>2</Text>
                </View>
                <Text style={globalStyles.textSecondary}>
                  Tap "Discover" when you see a new plate
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepText}>3</Text>
                </View>
                <Text style={globalStyles.textSecondary}>
                  Earn tokens and unlock rare plates
                </Text>
              </View>
            </View>
          </GlassCard>

          {/* Search */}
          <GlassCard style={styles.searchCard}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by code, state, or region..."
                placeholderTextColor={colors.textMuted}
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>
          </GlassCard>

          {/* Plates Grid */}
          <View style={styles.platesGrid}>
            {filteredPlates.map((plate) => {
              const rarityColor = getRarityColor(plate.rarity);
              
              return (
                <GlassCard key={plate.id} style={[
                  styles.plateCard,
                  plate.collected && styles.collectedPlateCard
                ]}>
                  <View style={styles.plateHeader}>
                    <Text style={[
                      globalStyles.heading3, 
                      styles.plateCode,
                      plate.collected && { color: colors.green }
                    ]}>
                      {plate.code}
                    </Text>
                    {plate.collected && (
                      <Ionicons name="checkmark-circle" size={20} color={colors.green} />
                    )}
                  </View>
                  
                  <Text style={[globalStyles.textSecondary, styles.plateState]}>
                    {plate.state}
                  </Text>
                  <Text style={[globalStyles.textMuted, styles.plateRegion]}>
                    {plate.region}
                  </Text>
                  
                  <View style={[styles.rarityBadge, { backgroundColor: rarityColor + '20' }]}>
                    <Text style={[styles.rarityText, { color: rarityColor }]}>
                      {plate.rarity}
                    </Text>
                  </View>
                  
                  <View style={styles.plateFooter}>
                    <View style={styles.tokenInfo}>
                      <Ionicons name="flash" size={16} color={colors.yellow} />
                      <Text style={[globalStyles.textPrimary, styles.tokenAmount]}>
                        {plate.tokens}
                      </Text>
                    </View>
                    
                    <TouchableOpacity 
                      style={[
                        globalStyles.button,
                        styles.discoverButton,
                        plate.collected && styles.collectedButton
                      ]}
                      disabled={plate.collected}
                    >
                      <Text style={[
                        globalStyles.buttonText,
                        styles.discoverButtonText,
                        plate.collected && styles.collectedButtonText
                      ]}>
                        {plate.collected ? 'Collected!' : 'Discover'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </GlassCard>
              );
            })}
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
  instructionsCard: {
    marginBottom: 24,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructionsTitle: {
    marginLeft: 12,
  },
  instructionsList: {
    gap: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.blue + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepText: {
    color: colors.blue,
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchCard: {
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: colors.textPrimary,
    fontSize: 16,
  },
  platesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 24,
  },
  plateCard: {
    width: '50%',
    padding: 8,
  },
  collectedPlateCard: {
    borderWidth: 1,
    borderColor: colors.green + '30',
  },
  plateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  plateCode: {
    fontSize: 18,
  },
  plateState: {
    marginBottom: 4,
  },
  plateRegion: {
    marginBottom: 12,
    fontSize: 12,
  },
  rarityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  rarityText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  plateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenAmount: {
    marginLeft: 4,
    fontWeight: '600',
  },
  discoverButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  discoverButtonText: {
    fontSize: 12,
  },
  collectedButton: {
    backgroundColor: colors.green + '20',
    borderColor: colors.green + '40',
  },
  collectedButtonText: {
    color: colors.green,
  },
});