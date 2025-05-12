import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, Calendar, ChevronRight, GitCompare as Compare } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { SessionCard } from '@/components/performance/SessionCard';
import { FilterMenu } from '@/components/performance/FilterMenu';
import { RadarChart } from '@/components/performance/RadarChart';
import { SprayChart } from '@/components/performance/SprayChart';
import { LaunchAngleChart } from '@/components/performance/LaunchAngleChart';
import { SessionComparisonModal } from '@/components/performance/SessionComparisonModal';
import { BenchmarkComparison } from '@/components/performance/BenchmarkComparison';
import { PerformanceMetrics } from '@/components/performance/PerformanceMetrics';
import { TrendChart } from '@/components/performance/TrendChart';
import { useColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';

type VisualizationTab = 'overview' | 'advanced' | 'benchmarks';
type TimeFilter = 'week' | 'month' | 'year' | 'all';
type MetricType = 'exitVelocity' | 'launchAngle' | 'barrelPercentage' | 'distance';

export default function PerformanceScreen() {
  const colors = useColors();
  const { isDark } = useTheme();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [comparisonVisible, setComparisonVisible] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<VisualizationTab>('overview');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('exitVelocity');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');

  // Mock data for trend chart
  const trendData = {
    exitVelocity: [82, 84, 83, 85, 87],
    launchAngle: [12, 13, 15, 14, 15],
    barrelPercentage: [25, 26, 28, 30, 32],
    distance: [320, 340, 335, 350, 360],
  };

  // Mock data for radar chart
  const skillProfile = [
    { label: 'Exit Velo', value: 85 },
    { label: 'Launch Angle', value: 75 },
    { label: 'Plate Coverage', value: 80 },
    { label: 'Contact Quality', value: 70 },
    { label: 'Opposite Field', value: 65 },
    { label: 'Consistency', value: 75 },
  ];

  // Mock data for spray chart
  const hits = [
    { x: 0.7, y: 0.4, exitVelocity: 95, type: 'line' },
    { x: 0.3, y: 0.5, exitVelocity: 85, type: 'ground' },
    { x: 0.5, y: 0.3, exitVelocity: 98, type: 'fly' },
  ];

  // Mock data for launch angle chart
  const launchData = [
    { exitVelocity: 95, launchAngle: 25 },
    { exitVelocity: 88, launchAngle: 15 },
    { exitVelocity: 92, launchAngle: 30 },
  ];

  // Mock performance metrics data
  const performanceMetrics = {
    exitVelocity: {
      current: 87,
      max: 95,
      average: 85,
      unit: 'mph'
    },
    launchAngle: {
      current: 15,
      max: 25,
      average: 18,
      unit: '°'
    },
    barrelPercentage: {
      current: 32,
      max: 45,
      average: 28,
      unit: '%'
    },
    distance: {
      current: 350,
      max: 420,
      average: 380,
      unit: 'ft'
    }
  };

  // Mock benchmark data
  const benchmarkData = {
    label: 'Exit Velocity',
    value: 87,
    unit: 'mph',
    nationalAvg: 83,
    ageGroupAvg: 80,
  };

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

  const filteredSessions = filterType === 'All' 
    ? sessions 
    : sessions.filter(session => session.type === filterType);

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <PerformanceMetrics
              exitVelocity={performanceMetrics.exitVelocity}
              launchAngle={performanceMetrics.launchAngle}
              barrelPercentage={performanceMetrics.barrelPercentage}
              distance={performanceMetrics.distance}
              timeFilter={timeFilter}
              selectedMetric={selectedMetric}
              onFilterChange={setTimeFilter}
              onMetricChange={setSelectedMetric}
            />
            <View style={[styles.chartContainer, { backgroundColor: colors.white }]}>
              <TrendChart data={trendData[selectedMetric]} metric={selectedMetric} />
            </View>
            <View style={[styles.chartContainer, { backgroundColor: colors.white }]}>
              <RadarChart data={skillProfile} />
            </View>
          </>
        );
      case 'advanced':
        return (
          <>
            <View style={[styles.chartContainer, { backgroundColor: colors.white }]}>
              <SprayChart hits={hits} />
            </View>
            <View style={[styles.chartContainer, { backgroundColor: colors.white }]}>
              <LaunchAngleChart hits={launchData} />
            </View>
          </>
        );
      case 'benchmarks':
        return (
          <View style={[styles.chartContainer, { backgroundColor: colors.white }]}>
            <BenchmarkComparison metric={benchmarkData} />
          </View>
        );
      default:
        return null;
    }
  };

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

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'overview' && styles.activeTab,
            { backgroundColor: activeTab === 'overview' ? colors.primary : colors.grey[100] }
          ]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'overview' ? colors.white : colors.grey[600] }
          ]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'advanced' && styles.activeTab,
            { backgroundColor: activeTab === 'advanced' ? colors.primary : colors.grey[100] }
          ]}
          onPress={() => setActiveTab('advanced')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'advanced' ? colors.white : colors.grey[600] }
          ]}>Advanced</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'benchmarks' && styles.activeTab,
            { backgroundColor: activeTab === 'benchmarks' ? colors.primary : colors.grey[100] }
          ]}
          onPress={() => setActiveTab('benchmarks')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'benchmarks' ? colors.white : colors.grey[600] }
          ]}>Benchmarks</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsHorizontalScrollIndicator={false}>
        {renderTabContent()}

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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'Barlow-Medium',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  chartContainer: {
    margin: 16,
    borderRadius: 12,
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