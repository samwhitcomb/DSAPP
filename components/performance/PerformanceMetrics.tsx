import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColors } from '@/constants/theme';
import { TrendingUp, Target, Crosshair, Ruler } from 'lucide-react-native';

type TimeFilter = 'week' | 'month' | 'year' | 'all';

interface MetricData {
  current: number;
  max: number;
  average: number;
  unit: string;
}

interface PerformanceMetricsProps {
  exitVelocity: MetricData;
  launchAngle: MetricData;
  barrelPercentage: MetricData;
  distance: MetricData;
  timeFilter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
}

export function PerformanceMetrics({
  exitVelocity,
  launchAngle,
  barrelPercentage,
  distance,
  timeFilter,
  onFilterChange,
}: PerformanceMetricsProps) {
  const colors = useColors();

  const MetricCard = ({ title, data, icon }: { title: string; data: MetricData; icon: React.ReactNode }) => (
    <View style={[styles.metricCard, { backgroundColor: colors.white }]}>
      <View style={styles.metricHeader}>
        {icon}
        <Text style={[styles.metricTitle, { color: colors.grey[600] }]}>{title}</Text>
      </View>
      
      <View style={styles.metricValues}>
        <View style={styles.metricValue}>
          <Text style={[styles.valueLabel, { color: colors.grey[400] }]}>Current</Text>
          <Text style={[styles.value, { color: colors.primary }]}>
            {data.current}
            <Text style={[styles.unit, { color: colors.grey[400] }]}>{data.unit}</Text>
          </Text>
        </View>

        <View style={styles.metricValue}>
          <Text style={[styles.valueLabel, { color: colors.grey[400] }]}>Max</Text>
          <Text style={[styles.value, { color: colors.status.success }]}>
            {data.max}
            <Text style={[styles.unit, { color: colors.grey[400] }]}>{data.unit}</Text>
          </Text>
        </View>

        <View style={styles.metricValue}>
          <Text style={[styles.valueLabel, { color: colors.grey[400] }]}>Average</Text>
          <Text style={[styles.value, { color: colors.secondary.indigo }]}>
            {data.average}
            <Text style={[styles.unit, { color: colors.grey[400] }]}>{data.unit}</Text>
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.grey[600] }]}>Performance Metrics</Text>
        <View style={styles.filters}>
          {(['week', 'month', 'year', 'all'] as TimeFilter[]).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                timeFilter === filter && { backgroundColor: colors.primary }
              ]}
              onPress={() => onFilterChange(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  timeFilter === filter ? { color: colors.white } : { color: colors.grey[500] }
                ]}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <MetricCard
          title="Exit Velocity"
          data={exitVelocity}
          icon={<TrendingUp size={20} color={colors.primary} />}
        />
        <MetricCard
          title="Launch Angle"
          data={launchAngle}
          icon={<Target size={20} color={colors.primary} />}
        />
        <MetricCard
          title="Barrel %"
          data={barrelPercentage}
          icon={<Crosshair size={20} color={colors.primary} />}
        />
        <MetricCard
          title="Distance"
          data={distance}
          icon={<Ruler size={20} color={colors.primary} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Barlow-Bold',
    fontSize: 18,
    marginBottom: 12,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  filterText: {
    fontFamily: 'Barlow-Medium',
    fontSize: 14,
  },
  metricsGrid: {
    gap: 16,
  },
  metricCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  metricTitle: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 16,
  },
  metricValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricValue: {
    alignItems: 'center',
  },
  valueLabel: {
    fontFamily: 'Barlow-Medium',
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontFamily: 'Barlow-Bold',
    fontSize: 24,
  },
  unit: {
    fontFamily: 'Barlow-Regular',
    fontSize: 14,
    marginLeft: 2,
  },
});