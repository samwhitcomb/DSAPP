import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, Check } from 'lucide-react-native';
import { colors, typography } from '@/constants/theme';

interface SettingsMenuItemProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showChevron?: boolean;
  destructive?: boolean;
  isHeader?: boolean;
  selected?: boolean;
}

export function SettingsMenuItem({ 
  icon, 
  title, 
  subtitle,
  onPress, 
  showChevron = true,
  destructive = false,
  isHeader = false,
  selected = false,
}: SettingsMenuItemProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isHeader && styles.headerContainer,
        destructive && styles.destructiveContainer
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        {icon && (
          <View style={[
            styles.iconContainer,
            destructive && styles.destructiveIcon
          ]}>
            {icon}
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={[
            styles.title,
            destructive && styles.destructiveText
          ]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {selected ? (
        <Check size={20} color={colors.primary} />
      ) : showChevron && !destructive ? (
        <ChevronRight size={20} color={colors.grey[400]} />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey[100],
  },
  headerContainer: {
    backgroundColor: colors.grey[50],
    borderBottomWidth: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.grey[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  destructiveIcon: {
    backgroundColor: colors.status.error + '10',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.body1,
    color: colors.grey[600],
  },
  subtitle: {
    ...typography.caption,
    color: colors.grey[400],
    marginTop: 2,
  },
  destructiveText: {
    color: colors.status.error,
  },
  destructiveContainer: {
    backgroundColor: colors.white,
  },
});