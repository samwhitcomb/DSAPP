import { View, Text, StyleSheet } from 'react-native';
import { useColors } from '@/constants/theme';

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  status: 'success' | 'warning' | 'error';
}

export function MetricCard({ label, value, unit, status }: MetricCardProps) {
  const colors = useColors();

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return colors.status.success;
      case 'warning':
        return colors.status.warning;
      case 'error':
        return colors.status.error;
      default:
        return colors.grey[400];
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      <Text style={[styles.label, { color: colors.grey[400] }]}>{label}</Text>
      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: getStatusColor() }]}>{value}</Text>
        <Text style={[styles.unit, { color: colors.grey[400] }]}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '30%',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontFamily: 'Barlow-Medium',
    fontSize: 12,
    marginBottom: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
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