import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/theme';

interface SessionCardProps {
  session: {
    id: string;
    date: string;
    time: string;
    type: string;
    title: string;
    metrics: {
      swings: number;
      avgExitVelo: number;
      avgLaunchAngle: number;
      barrelPercentage: number;
    };
  };
}

export function SessionCard({ session }: SessionCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Calendar size={16} color={colors.grey[400]} />
          <Text style={styles.dateText}>{session.date} • {session.time}</Text>
        </View>
        
        <View style={[
          styles.typeTag,
          session.type === 'Practice' ? styles.practiceTag : styles.gameTag
        ]}>
          <Text style={styles.typeText}>{session.type}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{session.title}</Text>
      
      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{session.metrics.swings}</Text>
          <Text style={styles.metricLabel}>Swings</Text>
        </View>
        
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{session.metrics.avgExitVelo}</Text>
          <Text style={styles.metricLabel}>Avg EV (mph)</Text>
        </View>
        
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{session.metrics.avgLaunchAngle}°</Text>
          <Text style={styles.metricLabel}>Avg LA</Text>
        </View>
        
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{session.metrics.barrelPercentage}%</Text>
          <Text style={styles.metricLabel}>Barrel %</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.viewDetailsText}>View Details</Text>
        <ChevronRight size={16} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.grey[600],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Barlow-Regular',
    fontSize: 14,
    color: colors.grey[400],
    marginLeft: 6,
  },
  typeTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  practiceTag: {
    backgroundColor: 'rgba(43, 115, 223, 0.1)',
  },
  gameTag: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
  },
  typeText: {
    fontFamily: 'Barlow-Medium',
    fontSize: 12,
    color: colors.grey[600],
  },
  title: {
    fontFamily: 'Barlow-Bold',
    fontSize: 16,
    color: colors.grey[600],
    marginBottom: 12,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colors.grey[600],
  },
  metricLabel: {
    fontFamily: 'Barlow-Regular',
    fontSize: 12,
    color: colors.grey[400],
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.grey[100],
    paddingTop: 12,
  },
  viewDetailsText: {
    fontFamily: 'Barlow-Medium',
    fontSize: 14,
    color: colors.primary,
    marginRight: 4,
  },
});