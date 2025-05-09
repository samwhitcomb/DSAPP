import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, Calendar, ChevronRight, ChartBar as BarChart3 } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { SessionCard } from '@/components/performance/SessionCard';
import { FilterMenu } from '@/components/performance/FilterMenu';
import { PerformanceMetricSelector } from '@/components/performance/PerformanceMetricSelector';
import { TrendChart } from '@/components/performance/TrendChart';
import { useColors, typography } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

type MetricType = 'exitVelocity' | 'launchAngle' | 'barrelPercentage';

export default function PerformanceScreen() {
  const colors = useColors();
  const { isDark } = useTheme();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('exitVelocity');
  
  // Mock session data
  const sessions = [
    {
      id: '1',
      date: 'Today',
      time: '2:30 PM',
      type: 'Practice',
      title: 'Launch Angle Ladder',
      metrics: {
        swings: 48,
        avgExitVelo: 87,
        avgLaunchAngle: 15,
        barrelPercentage: 32,
      },
    },
    {
      id: '2',
      date: 'Yesterday',
      time: '5:15 PM',
      type: 'Game',
      title: 'Spray Chart Challenge',
      metrics: {
        swings: 25,
        avgExitVelo: 89,
        avgLaunchAngle: 17,
        barrelPercentage: 36,
      },
    },
    {
      id: '3',
      date: 'May 15',
      time: '3:45 PM',
      type: 'Practice',
      title: 'Exit Velocity Builder',
      metrics: {
        swings: 55,
        avgExitVelo: 85,
        avgLaunchAngle: 14,
        barrelPercentage: 29,
      },
    },
    {
      id: '4',
      date: 'May 12',
      time: '4:30 PM',
      type: 'Game',
      title: 'Consistency Gauntlet',
      metrics: {
        swings: 30,
        avgExitVelo: 86,
        avgLaunchAngle: 16,
        barrelPercentage: 30,
      },
    },
    {
      id: '5',
      date: 'May 10',
      time: '1:15 PM',
      type: 'Practice',
      title: 'Zone Mastery',
      metrics: {
        swings: 50,
        avgExitVelo: 84,
        avgLaunchAngle: 13,
        barrelPercentage: 28,
      },
    },
  ];
  
  const filteredSessions = filterType === 'All' 
    ? sessions 
    : sessions.filter(session => session.type === filterType);
    
  const trendData = {
    exitVelocity: [82, 84, 83, 85, 87],
    launchAngle: [12, 13, 15, 14, 15],
    barrelPercentage: [25, 26, 28, 30, 32],
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.grey[50] }]} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={styles.header}>
        <Text style={[typography.h1, { color: colors.grey[600] }]}>Performance</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: colors.grey[100] }]}
            onPress={() => setFilterVisible(true)}
          >
            <Filter size={20} color={colors.grey[600]} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.grey[100] }]}>
            <Calendar size={20} color={colors.grey[600]} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={[styles.trendContainer, { backgroundColor: colors.white }]}>
        <PerformanceMetricSelector 
          selectedMetric={selectedMetric}
          onSelectMetric={setSelectedMetric}
        />
        <TrendChart data={trendData[selectedMetric]} metric={selectedMetric} />
      </View>
      
      <View style={styles.sessionsHeader}>
        <Text style={[styles.sessionsTitle, { color: colors.grey[600] }]}>Session History</Text>
        <TouchableOpacity style={styles.analysisButton}>
          <Text style={[styles.analysisText, { color: colors.primary }]}>Analysis Tools</Text>
          <ChevronRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredSessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SessionCard session={item} />}
        contentContainerStyle={styles.sessionsList}
        showsVerticalScrollIndicator={false}
      />
      
      <FilterMenu 
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        currentFilter={filterType}
        onSelectFilter={setFilterType}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  trendContainer: {
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sessionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sessionsTitle: {
    ...typography.h3,
  },
  analysisButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  analysisText: {
    fontFamily: 'Barlow-Medium',
    fontSize: 14,
  },
  sessionsList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});