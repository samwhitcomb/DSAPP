import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

interface QuickStatsCardProps {
  stats: {
    totalSwings: number;
    avgExitVelo: number;
    avgLaunchAngle: number;
  };
}

export function QuickStatsCard({ stats }: QuickStatsCardProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.statItem, styles.statItemBorder]}>
        <Text style={styles.statValue}>{stats.totalSwings}</Text>
        <Text style={styles.statLabel}>Total Swings</Text>
      </View>
      
      <View style={[styles.statItem, styles.statItemBorder]}>
        <Text style={styles.statValue}>{stats.avgExitVelo}</Text>
        <Text style={styles.statUnit}>mph</Text>
        <Text style={styles.statLabel}>Avg Exit Velo</Text>
      </View>
      
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{stats.avgLaunchAngle}°</Text>
        <Text style={styles.statLabel}>Avg Launch Angle</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.grey[600],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  statItemBorder: {
    borderRightWidth: 1,
    borderRightColor: colors.grey[100],
  },
  statValue: {
    fontFamily: 'Barlow-Bold',
    fontSize: 24,
    color: colors.grey[600],
    marginBottom: 4,
  },
  statUnit: {
    fontFamily: 'Barlow-Regular',
    fontSize: 14,
    color: colors.grey[400],
  },
  statLabel: {
    fontFamily: 'Barlow-Regular',
    fontSize: 12,
    color: colors.grey[400],
    textAlign: 'center',
  },
});