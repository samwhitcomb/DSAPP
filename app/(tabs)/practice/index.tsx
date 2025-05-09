import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Settings } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SessionSetupModal } from '@/components/practice/SessionSetupModal';
import { DrillTypeSelector } from '@/components/practice/DrillTypeSelector';
import { DrillCategoryCard } from '@/components/practice/DrillCategoryCard';
import { useColors, typography } from '@/constants/theme';
import { drillCategories } from '@/constants/drills';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

export default function PracticeScreen() {
  const router = useRouter();
  const colors = useColors();
  const { isDark } = useTheme();
  const [setupModalVisible, setSetupModalVisible] = useState(false);
  const [selectedDrillType, setSelectedDrillType] = useState('skill');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.grey[50],
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    settingsButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: colors.grey[100],
    },
    quickStartContainer: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.grey[100],
    },
    quickStartButton: {
      flexDirection: 'row',
      backgroundColor: colors.status.error,
      borderRadius: 30,
      paddingVertical: 16,
      paddingHorizontal: 32,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.status.error,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    quickStartText: {
      ...typography.button,
      color: colors.white,
      marginLeft: 12,
    },
    quickStartSubtext: {
      ...typography.body2,
      color: colors.grey[400],
      textAlign: 'center',
      marginTop: 8,
    },
    content: {
      padding: 16,
    },
    sectionTitle: {
      ...typography.h3,
      color: colors.grey[600],
      marginBottom: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <View style={styles.header}>
        <Text style={[typography.h1, { color: colors.grey[600] }]}>Practice</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={22} color={colors.grey[600]} />
        </TouchableOpacity>
      </View>
      
      <DrillTypeSelector 
        selectedType={selectedDrillType}
        onSelectType={setSelectedDrillType}
      />

      <View style={styles.quickStartContainer}>
        <TouchableOpacity 
          style={styles.quickStartButton}
          onPress={() => setSetupModalVisible(true)}
        >
          <Play size={20} color={colors.white} />
          <Text style={styles.quickStartText}>Free Practice</Text>
        </TouchableOpacity>
        <Text style={styles.quickStartSubtext}>
          Start a custom session with tee or soft toss
        </Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Training Categories</Text>
        {drillCategories.map((category) => (
          <DrillCategoryCard
            key={category.id}
            category={category}
            onPress={() => router.push(`/practice/${category.id}`)}
          />
        ))}
      </ScrollView>
      
      <SessionSetupModal 
        visible={setupModalVisible} 
        onClose={() => setSetupModalVisible(false)}
      />
    </SafeAreaView>
  );
}