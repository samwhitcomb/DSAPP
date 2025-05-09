import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, typography } from '@/constants/theme';
import { RotateCcw } from 'lucide-react-native';

interface OrientationPromptProps {
  onRotate: () => void;
}

export function OrientationPrompt({ onRotate }: OrientationPromptProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <RotateCcw size={48} color={colors.primary} />
        <Text style={styles.title}>Rotate Your Device</Text>
        <Text style={styles.message}>
          Please rotate your device to landscape mode to start the session
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    color: colors.grey[600],
    marginTop: 24,
    marginBottom: 8,
  },
  message: {
    ...typography.body1,
    color: colors.grey[400],
    textAlign: 'center',
  },
});