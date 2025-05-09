import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, Calendar, ChevronRight, ChartBar as BarChart3, GitCompare as Compare } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { SessionCard } from '@/components/performance/SessionCard';
import { FilterMenu } from '@/components/performance/FilterMenu';
import { PerformanceMetricSelector } from '@/components/performance/PerformanceMetricSelector';
import { TrendChart } from '@/components/performance/TrendChart';
import { SessionComparisonModal } from '@/components/performance/SessionComparisonModal';
import { BenchmarkComparison } from '@/components/performance/BenchmarkComparison';
import { useColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

type MetricType = 'exitVelocity' | 'launchAngle' | 'barrelPercentage';

export default function PerformanceScreen() {
  const colors = useColors();
  const { isDark } = useTheme();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('exitVelocity');
  const [comparisonVisible, setComparisonVisible] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  
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
  ];

  // Mock benchmark data
  const benchmarkData = {
    exitVelocity: {
      label: 'Exit Velocity',
      value: 87,
      unit: 'mph',
      nationalAvg: 83,
      ageGroupAvg: 85,
    },
    launchAngle: {
      label: 'Launch Angle',
      value: 15,
      unit: '°',
      nationalAvg: 12,
      ageGroupAvg: 14,
    },
    barrelPercentage: {
      label: 'Barrel %',
      value: 32,
      unit: '%',
      nationalAvg: 28,
      ageGroupAvg: 30,
    },
  };
  
  const filteredSessions = filterType === 'All' 
    ? sessions 
    : sessions.filter(session => session.type === filterType);
    
  const trendData = {
    exitVelocity: [82, 84, 83, 85, 87],
    launchAngle: [12, 13, 15, 14, 15],
    barrelPercentage: [25, 26, 28, 30, 32],
  };

  const handleSessionSelect = (sessionId: string) => {
    if (selectedSessions.includes(sessionId)) {
      setSelectedSessions(selectedSessions.filter(id => id !== sessionId));
    } else if (selectedSessions.length < 2) {
      setSelectedSessions([...selectedSessions, sessionId]);
    }

    if (selectedSessions.length === 1) {
      setComparisonVisible(true);
    }
  };

  const selectedSessionsData = sessions.filter(session => 
    selectedSessions.includes(session.id)
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.grey[50] }]} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.grey[600] }]}>Performance</Text>
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
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.trendContainer, { backgroundColor: colors.white }]}>
          <PerformanceMetricSelector 
            selectedMetric={selectedMetric}
            onSelectMetric={setSelectedMetric}
          />
          <TrendChart data={trendData[selectedMetric]} metric={selectedMetric} />
        </View>

        <View style={styles.benchmarkSection}>
          <Text style={[styles.sectionTitle, { color: colors.grey[600] }]}>Performance Benchmarks</Text>
          <BenchmarkComparison metric={benchmarkData[selectedMetric]} />
        </View>
        
        <View style={styles.sessionsHeader}>
          <Text style={[styles.sessionsTitle, { color: colors.grey[600] }]}>Session History</Text>
          <TouchableOpacity 
            style={styles.compareButton}
            onPress={() => setSelectedSessions([])}
          >
            <Compare size={16} color={colors.primary} />
            <Text style={[styles.compareText, { color: colors.primary }]}>
              {selectedSessions.length === 0 ? 'Compare Sessions' : `Selected: ${selectedSessions.length}/2`}
            </Text>
          </TouchableOpacity>
        </View>
        
        {filteredSessions.map((session) => (
          <SessionCard 
            key={session.id}
            session={session}
            selected={selectedSessions.includes(session.id)}
            onSelect={handleSessionSelect}
            selectionMode={selectedSessions.length > 0}
          />
        ))}
      </ScrollView>
      
      <FilterMenu 
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        currentFilter={filterType}
        onSelectFilter={setFilterType}
      />

      <SessionComparisonModal
        visible={comparisonVisible}
        onClose={() => {
          setComparisonVisible(false);
          setSelectedSessions([]);
        }}
        sessions={selectedSessionsData}
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
  title: {
    fontFamily: 'Barlow-Bold',
    fontSize: 32,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  content: {
    flex: 1,
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
  benchmarkSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  sessionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sessionsTitle: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 18,
  },
  compareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compareText: {
    fontFamily: 'Barlow-Medium',
    fontSize: 14,
  },
});