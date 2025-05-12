import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { ContactQualityTab } from '@/components/performance/tabs/ContactQualityTab';
import { ConsistencyTab } from '@/components/performance/tabs/ConsistencyTab';
import { ImpactTab } from '@/components/performance/tabs/ImpactTab';
import { ProgressTab } from '@/components/performance/tabs/ProgressTab';
import { Target, Crosshair, Zap, TrendingUp } from 'lucide-react-native';

type TabType = 'contact' | 'consistency' | 'impact' | 'progress';

export default function PerformanceScreen() {
  const colors = useColors();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('contact');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'contact':
        return <ContactQualityTab />;
      case 'consistency':
        return <ConsistencyTab />;
      case 'impact':
        return <ImpactTab />;
      case 'progress':
        return <ProgressTab />;
    }
  };

  const TabButton = ({ tab, icon, label }: { tab: TabType; icon: React.ReactNode; label: string }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tab && styles.activeTabButton,
      ]}
      onPress={() => setActiveTab(tab)}
    >
      {React.cloneElement(icon as React.ReactElement, {
        size: 24,
        color: activeTab === tab ? colors.primary : colors.grey[400],
      })}
      <Text
        style={[
          styles.tabLabel,
          activeTab === tab && styles.activeTabLabel,
          { color: activeTab === tab ? colors.primary : colors.grey[400] }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.grey[50] }]} edges={['top']}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <View style={styles.content}>
        {renderTabContent()}
      </View>

      <View style={[styles.tabBar, { backgroundColor: colors.white }]}>
        <TabButton
          tab="contact"
          icon={<Target />}
          label="Contact"
        />
        <TabButton
          tab="consistency"
          icon={<Crosshair />}
          label="Consistency"
        />
        <TabButton
          tab="impact"
          icon={<Zap />}
          label="Impact"
        />
        <TabButton
          tab="progress"
          icon={<TrendingUp />}
          label="Progress"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    flex: 1,
  },
  activeTabButton: {
    borderRadius: 8,
  },
  tabLabel: {
    fontFamily: 'Barlow-Medium',
    fontSize: 12,
    marginTop: 4,
  },
  activeTabLabel: {
    fontFamily: 'Barlow-Bold',
  },
});