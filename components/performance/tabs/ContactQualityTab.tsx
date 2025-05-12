import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useColors } from '@/constants/theme';
import { EVLaunchAngleChart } from '@/components/performance/charts/EVLaunchAngleChart';
import { SprayChart } from '@/components/performance/charts/SprayChart';
import { SweetSpotTrendChart } from '@/components/performance/charts/SweetSpotTrendChart';
import { MetricCard } from '@/components/performance/MetricCard';
import { ChartCarousel } from '@/components/performance/ChartCarousel';

export function ContactQualityTab() {
  const colors = useColors();
  const windowWidth = Dimensions.get('window').width;

  const metrics = [
    {
      label: 'Avg Exit Velo',
      value: '92.4',
      unit: 'mph',
      status: 'success',
    },
    {
      label: 'Hard-Hit %',
      value: '38',
      unit: '%',
      status: 'warning',
    },
    {
      label: 'Weak Contact %',
      value: '12',
      unit: '%',
      status: 'error',
    },
  ];

  const charts = [
    {
      component: EVLaunchAngleChart,
      title: 'Exit Velocity vs Launch Angle',
    },
    {
      component: SprayChart,
      title: 'Spray Chart',
    },
    {
      component: SweetSpotTrendChart,
      title: 'Sweet Spot Trend',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.chartContainer}>
        <ChartCarousel charts={charts} />
      </View>

      <View style={styles.metricsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.grey[600] }]}>
          Key Metrics
        </Text>
        <View style={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </View>
      </View>

      <View style={[styles.achievementCard, { backgroundColor: colors.white }]}>
        <Text style={[styles.achievementTitle, { color: colors.grey[600] }]}>
          Recent Achievement
        </Text>
        <Text style={[styles.achievementText, { color: colors.primary }]}>
          🔥 4 consecutive 95+ mph hits!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    height: Dimensions.get('window').height * 0.6,
  },
  metricsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Barlow-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementTitle: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
  achievementText: {
    fontFamily: 'Barlow-Medium',
    fontSize: 14,
  },
});