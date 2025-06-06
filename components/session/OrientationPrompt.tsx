import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RotateCcw } from 'lucide-react-native';
import { colors, typography } from '@/constants/theme';

interface OrientationPromptProps {
  onContinue: () => void;
}

export function OrientationPrompt({ onContinue }: OrientationPromptProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <RotateCcw size={48} color={colors.primary} />
        <Text style={styles.title}>Rotate Your Device</Text>
        <Text style={styles.message}>
          Please rotate your device to landscape mode to start the session
        </Text>
        <TouchableOpacity style={styles.button} onPress={onContinue}>
          <Text style={styles.buttonText}>Continue to Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    color: colors.white,
    marginTop: 24,
    marginBottom: 8,
  },
  message: {
    ...typography.body1,
    color: colors.grey[400],
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  buttonText: {
    ...typography.button,
    color: colors.white,
  },
});