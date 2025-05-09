import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { DrillCategory } from '@/types/drills';

interface DrillCategoryCardProps {
  category: DrillCategory;
  onPress: () => void;
}

export function DrillCategoryCard({ category, onPress }: DrillCategoryCardProps) {
  const colors = useColors();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: colors.grey[600],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.secondary.lightGreen,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    content: {
      flex: 1,
    },
    title: {
      fontFamily: 'Barlow-SemiBold',
      fontSize: 16,
      color: colors.grey[600],
      marginBottom: 4,
    },
    drillCount: {
      fontFamily: 'Barlow-Regular',
      fontSize: 14,
      color: colors.grey[400],
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={category.icon} size={24} color={colors.grey[600]} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{category.title}</Text>
        <Text style={styles.drillCount}>
          {category.drills.length} {category.drills.length === 1 ? 'Drill' : 'Drills'}
        </Text>
      </View>
      <ChevronRight size={20} color={colors.grey[400]} />
    </TouchableOpacity>
  );
}