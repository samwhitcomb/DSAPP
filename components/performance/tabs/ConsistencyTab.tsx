import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColors } from '@/constants/theme';
import { TrendChart } from '@/components/performance/TrendChart';
import { MetricCard } from '@/components/performance/MetricCard';
import { FilterMenu } from '@/components/performance/FilterMenu';

export function ConsistencyTab() {
  const colors = useColors();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.grey[900] }]}>
          Consistency Analysis
        </Text>
        <FilterMenu />
      </View>

      <View style={styles.metricsContainer}>
        <MetricCard
          title="Shot Consistency"
          value="87%"
          change={+5}
          period="Last 30 days"
        />
        <MetricCard
          title="Swing Speed Variance"
          value="±2.3 mph"
          change={-0.8}
          period="Last 30 days"
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={[styles.chartTitle, { color: colors.grey[900] }]}>
          Consistency Trend
        </Text>
        <TrendChart />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Barlow-Bold',
  },
  metricsContainer: {
    padding: 16,
    gap: 16,
  },
  chartContainer: {
    padding: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Barlow-SemiBold',
    marginBottom: 16,
  },
});