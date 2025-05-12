import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColors } from '@/constants/theme';
import { TrendChart } from '@/components/performance/TrendChart';
import { RadarChart } from '@/components/performance/RadarChart';

export function ImpactTab() {
  const colors = useColors();

  // Mock data for simulated outcomes
  const outcomes = {
    singles: 35,
    doubles: 15,
    triples: 5,
    homeRuns: 10,
    flyOuts: 20,
    groundOuts: 15,
  };

  // Mock data for oppo trend
  const oppoTrendData = [32, 35, 38, 34, 36];

  // Mock data for skill radar
  const skillData = [
    { label: 'Power', value: 85 },
    { label: 'Control', value: 75 },
    { label: 'Spray', value: 80 },
    { label: 'Contact', value: 85 },
    { label: 'Discipline', value: 70 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <Text style={[styles.sectionTitle, { color: colors.grey[600] }]}>
          Simulated Outcomes
        </Text>
        <View style={styles.outcomesContainer}>
          {Object.entries(outcomes).map(([key, value]) => (
            <View key={key} style={styles.outcomeItem}>
              <Text style={[styles.outcomeValue, { color: colors.primary }]}>
                {value}%
              </Text>
              <Text style={[styles.outcomeLabel, { color: colors.grey[400] }]}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <Text style={[styles.sectionTitle, { color: colors.grey[600] }]}>
          Opposite Field Trend
        </Text>
        <TrendChart data={oppoTrendData} metric="exitVelocity" />
      </View>

      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <Text style={[styles.sectionTitle, { color: colors.grey[600] }]}>
          Skill Breakdown
        </Text>
        <RadarChart data={skillData} />
      </View>

      <View style={[styles.section, { backgroundColor: colors.white }]}>
        <Text style={[styles.sectionTitle, { color: colors.grey[600] }]}>
          Key Insights
        </Text>
        <View style={styles.insightsContainer}>
          <View style={styles.insightItem}>
            <Text style={[styles.insightLabel, { color: colors.grey[400] }]}>
              Pull %
            </Text>
            <Text style={[styles.insightValue, { color: colors.grey[600] }]}>
              52%
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Text style={[styles.insightLabel, { color: colors.grey[400] }]}>
              Oppo Power
            </Text>
            <Text style={[styles.insightValue, { color: colors.grey[600] }]}>
              84 mph EV
            </Text>
          </View>
          <Text style={[styles.insightTip, { color: colors.primary }]}>
            "You beat shifts when going oppo!"
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Barlow-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
  outcomesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  outcomeItem: {
    width: '33%',
    alignItems: 'center',
    marginBottom: 16,
  },
  outcomeValue: {
    fontFamily: 'Barlow-Bold',
    fontSize: 24,
  },
  outcomeLabel: {
    fontFamily: 'Barlow-Medium',
    fontSize: 12,
    marginTop: 4,
  },
  insightsContainer: {
    gap: 16,
  },
  insightItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightLabel: {
    fontFamily: 'Barlow-Medium',
    fontSize: 14,
  },
  insightValue: {
    fontFamily: 'Barlow-Bold',
    fontSize: 16,
  },
  insightTip: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});