import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';
import MapScreen from './src/screens/MapScreen';
import RewardsScreen from './src/screens/RewardsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import StoriesScreen from './src/screens/StoriesScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import TrailsScreen from './src/screens/TrailsScreen';
import QuestsScreen from './src/screens/QuestsScreen';
import RTOHuntScreen from './src/screens/RTOHuntScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main tab navigator with simplified navigation
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Rewards') {
            iconName = focused ? 'gift' : 'gift-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00aaff',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: 'rgba(22, 28, 45, 0.95)',
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        headerStyle: {
          backgroundColor: 'rgba(22, 28, 45, 0.95)',
          borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={DashboardScreen} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{ title: 'Find Rides' }}
      />
      <Tab.Screen 
        name="Rewards" 
        component={RewardsScreen}
        options={{ title: 'Rewards Store' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

// Stack navigator for additional screens
function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgba(22, 28, 45, 0.95)',
          borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Stories" 
        component={StoriesScreen}
        options={{ title: 'Ride Stories' }}
      />
      <Stack.Screen 
        name="Leaderboard" 
        component={LeaderboardScreen}
        options={{ title: 'Leaderboard' }}
      />
      <Stack.Screen 
        name="Trails" 
        component={TrailsScreen}
        options={{ title: 'HITCH Trails' }}
      />
      <Stack.Screen 
        name="Quests" 
        component={QuestsScreen}
        options={{ title: 'Quests & Challenges' }}
      />
      <Stack.Screen 
        name="RTOHunt" 
        component={RTOHuntScreen}
        options={{ title: 'RTO Plate Hunt' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="light" backgroundColor="#0d1222" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}