import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LayoutDashboard, Target, Trophy, ChartBar as BarChart3 } from 'lucide-react-native';
import { useColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const { isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: colors.white,
          borderTopColor: colors.grey[100],
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey[400],
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="dashboard/index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <LayoutDashboard size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="practice/index"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Target size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="games/index"
        options={{
          title: 'Games',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Trophy size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="performance/index"
        options={{
          title: 'Performance',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <BarChart3 size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    borderTopWidth: 1,
  },
  tabBarLabel: {
    fontFamily: 'Barlow-Medium',
    fontSize: 12,
    paddingBottom: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
});