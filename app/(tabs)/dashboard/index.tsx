import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, ChevronRight, ArrowUpRight, Settings, Smartphone } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { ProfileHeader } from '@/components/dashboard/ProfileHeader';
import { QuickStatsCard } from '@/components/dashboard/QuickStatsCard';
import { PracticeRecommendation } from '@/components/dashboard/PracticeRecommendation';
import { HotZoneMap } from '@/components/shared/HotZoneMap';
import { DeviceManagementModal } from '@/components/device/DeviceManagementModal';
import { colors } from '@/constants/theme';

export default function DashboardScreen() {
  const router = useRouter();
  const [deviceModalVisible, setDeviceModalVisible] = useState(false);
  
  // Mock user data
  const user = {
    name: 'Alex Rodriguez',
    level: 'Advanced',
    goal: 'Increase EV by 5 mph',
    progress: 75,
    image: 'https://images.pexels.com/photos/1103833/pexels-photo-1103833.jpeg?auto=compress&cs=tinysrgb&w=300'
  };
  
  // Mock stats data
  const quickStats = [
    { label: 'Avg Exit Velo', value: '87', unit: 'mph' },
    { label: 'Avg Launch Angle', value: '15', unit: '°' },
    { label: 'Consistency', value: '84', unit: '%' },
  ];
  
  const recentAchievement = 'Hit 70% in ideal launch window this week!';
  
  // Recommended practice plans
  const recommendedPlans = [
    {
      title: '20 min Power Builder',
      description: 'Focus on maximizing exit velocity with consistent launch angles',
      intensity: 'High',
      timeEstimate: '20 min',
    },
    {
      title: 'Zone Mastery Drill',
      description: 'Improve contact in your cold zones with precision training',
      intensity: 'Medium',
      timeEstimate: '15 min',
    }
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => setDeviceModalVisible(true)}
          >
            <Smartphone size={24} color={colors.grey[600]} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/settings')}
          >
            <Settings size={24} color={colors.grey[600]} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader user={user} achievement={recentAchievement} />
        
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <QuickStatsCard stats={quickStats} />
        </View>
        
        <View style={styles.recommendedContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended Practice</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.recommendationsWrapper}>
            {recommendedPlans.map((plan, index) => (
              <PracticeRecommendation key={index} plan={plan} />
            ))}
          </View>
        </View>
        
        <View style={styles.zoneContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hot/Cold Zones</Text>
            <TouchableOpacity onPress={() => router.push('/performance')}>
              <Text style={styles.viewAllText}>Full Analysis <ArrowUpRight size={14} color="#0F52BA" /></Text>
            </TouchableOpacity>
          </View>
          
          <HotZoneMap />
        </View>
        
        <View style={styles.startSessionContainer}>
          <TouchableOpacity 
            style={styles.startSessionButton}
            onPress={() => router.push('/practice')}
          >
            <Play size={24} color="#FFFFFF" />
            <Text style={styles.startSessionText}>Start Session</Text>
          </TouchableOpacity>
          <Text style={styles.startSessionSubtext}>Tee or Soft Toss</Text>
        </View>
      </ScrollView>

      <DeviceManagementModal 
        visible={deviceModalVisible}
        onClose={() => setDeviceModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontFamily: 'Barlow-Bold',
    fontSize: 28,
    color: colors.grey[600],
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.grey[100],
  },
  statsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  recommendedContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 18,
    color: colors.grey[600],
  },
  viewAllText: {
    fontFamily: 'Barlow-Medium',
    fontSize: 14,
    color: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendationsWrapper: {
    gap: 16,
  },
  zoneContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  startSessionContainer: {
    marginTop: 32,
    marginBottom: 24,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  startSessionButton: {
    flexDirection: 'row',
    backgroundColor: colors.status.error,
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 280,
    shadowColor: colors.status.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startSessionText: {
    fontFamily: 'Barlow-Bold',
    fontSize: 18,
    color: colors.white,
    marginLeft: 12,
  },
  startSessionSubtext: {
    fontFamily: 'Barlow-Regular',
    fontSize: 14,
    color: colors.grey[400],
    marginTop: 8,
  },
});