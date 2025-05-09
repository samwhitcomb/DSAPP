import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColors, typography } from '@/constants/theme';
import { drillCategories } from '@/constants/drills';
import { PracticeCard } from '@/components/practice/PracticeCard';
import { DrillGuideModal } from '@/components/practice/DrillGuideModal';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function DrillCategoryScreen() {
  const { category: categoryId } = useLocalSearchParams();
  const router = useRouter();
  const colors = useColors();
  const { isDark } = useTheme();
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [guideModalVisible, setGuideModalVisible] = useState(false);

  const category = drillCategories.find(c => c.id === categoryId);

  if (!category) {
    router.back();
    return null;
  }

  const handleDrillPress = (drill) => {
    setSelectedDrill(drill);
    setGuideModalVisible(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.grey[50],
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    title: {
      ...typography.h1,
      color: colors.grey[600],
    },
    description: {
      ...typography.body2,
      color: colors.grey[400],
      marginTop: 4,
    },
    content: {
      padding: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={styles.header}>
        <Text style={styles.title}>{category.title}</Text>
        <Text style={styles.description}>
          {category.drills.length} {category.drills.length === 1 ? 'drill' : 'drills'} available
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {category.drills.map((drill) => (
          <PracticeCard
            key={drill.id}
            drill={drill}
            onPress={() => handleDrillPress(drill)}
          />
        ))}
      </ScrollView>

      <DrillGuideModal
        visible={guideModalVisible}
        onClose={() => {
          setGuideModalVisible(false);
          setSelectedDrill(null);
        }}
        drill={selectedDrill}
      />
    </SafeAreaView>
  );
}