import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Clock } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { PracticeCard } from '@/components/practice/PracticeCard';
import { SessionSetupModal } from '@/components/practice/SessionSetupModal';
import { DrillTypeSelector } from '@/components/practice/DrillTypeSelector';
import { DrillGuideModal } from '@/components/practice/DrillGuideModal';
import { colors, typography } from '@/constants/theme';

export default function PracticeScreen() {
  const [setupModalVisible, setSetupModalVisible] = useState(false);
  const [guideModalVisible, setGuideModalVisible] = useState(false);
  const [selectedDrillType, setSelectedDrillType] = useState('skill');
  const [selectedDrill, setSelectedDrill] = useState(null);
  const router = useRouter();
  
  // Mock drill data
  const skillDrills = [
    {
      id: '1',
      title: 'Launch Angle Ladder',
      description: 'Hit balls at progressively higher angles: 10°, 15°, 20°',
      focus: 'Trajectory Control',
      time: '15 min',
      type: 'tee',
      image: 'https://images.pexels.com/photos/5769387/pexels-photo-5769387.jpeg?auto=compress&cs=tinysrgb&w=300',
      setup: [
        'Position tee at belt height',
        'Place alignment rod parallel to target line',
        'Set up launch angle feedback system',
        'Mark three distances: 10ft, 20ft, 30ft'
      ],
      targets: [
        'Achieve 3 consecutive hits at each angle',
        'Maintain exit velocity above 85 mph',
        'Keep spray angle within ±10 degrees',
        'Progress only after mastering current angle'
      ]
    },
    {
      id: '2',
      title: 'Exit Velocity Builder',
      description: 'Maximize peak exit velocity within a set',
      focus: 'Power',
      time: '20 min',
      type: 'soft-toss',
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=300',
      setup: [
        'Partner positioned 45° angle, 3-4 feet away',
        'Use weighted balls for warm-up sets',
        'Set up velocity measurement device',
        'Mark target field direction'
      ],
      targets: [
        'Achieve 90+ mph exit velocity on 5 swings',
        'Maintain launch angle between 15-25°',
        'Keep at least 80% of hits on target line',
        'Progressive increase in average exit velocity'
      ]
    },
  ];
  
  const adaptiveDrills = [
    {
      id: '5',
      title: 'Inside Pitch Focus',
      description: 'AI recommended: Work on inside pitches with low launch angle',
      focus: 'Weakness',
      time: '20 min',
      type: 'soft-toss',
      image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=300',
      setup: [
        'Partner positioned at 45° angle inside',
        'Set up inside pitch marker',
        'Position contact point indicator',
        'Mark pull-side target area'
      ],
      targets: [
        'Keep hands inside the ball on all swings',
        'Achieve launch angle under 15°',
        'Maintain exit velocity above 85 mph',
        'Hit 70% of balls to pull side'
      ]
    },
  ];
  
  const drills = selectedDrillType === 'skill' ? skillDrills : adaptiveDrills;

  const handleDrillPress = (drill) => {
    setSelectedDrill(drill);
    setGuideModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={typography.h1}>Practice</Text>
        <TouchableOpacity 
          style={styles.historyButton}
          onPress={() => router.push('/session-history/practice')}
        >
          <Clock size={20} color={colors.grey[600]} />
          <Text style={styles.historyText}>History</Text>
        </TouchableOpacity>
      </View>
      
      <DrillTypeSelector 
        selectedType={selectedDrillType}
        onSelectType={setSelectedDrillType}
      />

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.drillsContainer}>
          {drills.map((drill) => (
            <PracticeCard 
              key={drill.id} 
              drill={drill} 
              onPress={() => handleDrillPress(drill)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setSetupModalVisible(true)}
      >
        <Play size={24} color={colors.white} />
        <Text style={styles.fabText}>Free Practice</Text>
      </TouchableOpacity>
      
      <SessionSetupModal 
        visible={setupModalVisible} 
        onClose={() => setSetupModalVisible(false)}
      />

      <DrillGuideModal
        visible={guideModalVisible}
        onClose={() => {
          setGuideModalVisible(false);
          setSetupModalVisible(true);
        }}
        drill={selectedDrill}
      />
    </SafeAreaView>
  );
}

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
    paddingTop: 8,
    paddingBottom: 16,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.grey[100],
  },
  historyText: {
    fontFamily: 'Barlow-Medium',
    fontSize: 14,
    color: colors.grey[600],
  },
  scrollContainer: {
    flex: 1,
  },
  drillsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
    paddingBottom: 100, // Add padding to account for FAB
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: colors.status.error,
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.status.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fabText: {
    fontFamily: 'Barlow-Bold',
    fontSize: 16,
    color: colors.white,
    marginLeft: 12,
  },
});