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

export default function RewardsScreen() {
  const [userTokens] = useState(1250);
  const [rewards] = useState([
    {
      id: 1,
      name: 'Coffee Voucher',
      description: 'Free coffee at partner cafes',
      cost: 100,
      category: 'food',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Fuel Discount',
      description: '10% off at partner fuel stations',
      cost: 500,
      category: 'travel',
      image: 'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'T-Shirt',
      description: 'HITCH branded merchandise',
      cost: 800,
      category: 'clothing',
      image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
  ]);

  const canAfford = (cost) => userTokens >= cost;

  return (
    <LinearGradient
      colors={['#0d1222', '#1f1d3e', '#3d1b3d', '#1a1f3a']}
      style={globalStyles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          {/* Token Balance */}
          <GlassCard style={styles.balanceCard}>
            <View style={styles.balanceContent}>
              <View style={styles.tokenIcon}>
                <Ionicons name="flash" size={32} color={colors.yellow} />
              </View>
              <View style={styles.balanceInfo}>
                <Text style={[globalStyles.heading1, styles.tokenAmount]}>
                  {userTokens.toLocaleString()}
                </Text>
                <Text style={globalStyles.textSecondary}>Available Tokens</Text>
              </View>
            </View>
          </GlassCard>

          {/* Rewards Grid */}
          <View style={styles.rewardsGrid}>
            {rewards.map((reward) => (
              <GlassCard key={reward.id} style={styles.rewardCard}>
                <Image source={{ uri: reward.image }} style={styles.rewardImage} />
                
                <View style={styles.rewardContent}>
                  <Text style={[globalStyles.textPrimary, styles.rewardName]}>
                    {reward.name}
                  </Text>
                  <Text style={[globalStyles.textMuted, styles.rewardDescription]}>
                    {reward.description}
                  </Text>
                  
                  <View style={styles.rewardFooter}>
                    <View style={styles.costContainer}>
                      <Ionicons name="flash" size={16} color={colors.yellow} />
                      <Text style={[globalStyles.textPrimary, styles.cost]}>
                        {reward.cost}
                      </Text>
                    </View>
                    
                    <TouchableOpacity 
                      style={[
                        globalStyles.button,
                        styles.redeemButton,
                        !canAfford(reward.cost) && styles.disabledButton
                      ]}
                      disabled={!canAfford(reward.cost)}
                    >
                      <Text style={[
                        globalStyles.buttonText,
                        styles.redeemButtonText,
                        !canAfford(reward.cost) && styles.disabledButtonText
                      ]}>
                        {canAfford(reward.cost) ? 'Redeem' : 'Need More'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </GlassCard>
            ))}
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
  balanceCard: {
    marginTop: 16,
    marginBottom: 24,
  },
  balanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.yellow + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  balanceInfo: {
    flex: 1,
  },
  tokenAmount: {
    marginBottom: 4,
  },
  rewardsGrid: {
    marginBottom: 24,
  },
  rewardCard: {
    marginBottom: 16,
  },
  rewardImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  rewardContent: {
    flex: 1,
  },
  rewardName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  rewardDescription: {
    marginBottom: 16,
    lineHeight: 20,
  },
  rewardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cost: {
    marginLeft: 4,
    fontWeight: '600',
  },
  redeemButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  redeemButtonText: {
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: 'rgba(100, 100, 100, 0.2)',
    borderColor: 'rgba(100, 100, 100, 0.3)',
  },
  disabledButtonText: {
    color: colors.textMuted,
  },
});