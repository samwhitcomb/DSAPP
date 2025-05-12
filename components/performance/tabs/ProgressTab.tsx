import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useColors } from '@/constants/theme';
import { TrendChart } from '@/components/performance/TrendChart';
import { MetricCard } from '@/components/performance/MetricCard';
import { FilterMenu } from '@/components/performance/FilterMenu';

export function ProgressTab() {
  const colors = useColors();

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.grey[900] }]}>
          Progress Overview
        </Text>
        <FilterMenu />
      </View>

      <View style={styles.metricsContainer}>
        <MetricCard
          title="Average Exit Velocity"
          value="75"
          unit="mph"
          change={5}
          timeframe="Last 30 days"
        />
        <MetricCard
          title="Launch Angle"
          value="15"
          unit="degrees"
          change={-2}
          timeframe="Last 30 days"
        />
        <MetricCard
          title="Contact Quality"
          value="82"
          unit="%"
          change={8}
          timeframe="Last 30 days"
        />
      </View>

      <View style={[styles.chartContainer, { backgroundColor: colors.white }]}>
        <Text style={[styles.chartTitle, { color: colors.grey[900] }]}>
          Performance Trends
        </Text>
        <TrendChart />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Barlow-Bold',
  },
  metricsContainer: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24,
  },
  chartContainer: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Barlow-SemiBold',
    marginBottom: 16,
  },
});