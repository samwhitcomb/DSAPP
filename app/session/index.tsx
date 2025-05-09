import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CameraView, Camera, CameraType, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { X, Pause, Play } from 'lucide-react-native';
import { colors, typography } from '@/constants/theme';
import { SessionMetrics } from '@/components/session/SessionMetrics';
import { EndSessionModal } from '@/components/session/EndSessionModal';
import { OrientationPrompt } from '@/components/session/OrientationPrompt';

export default function SessionScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isLandscape, setIsLandscape] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const camera = useRef<Camera>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const handleEndSession = (shouldEnd: boolean) => {
    setShowEndModal(false);
    if (shouldEnd) {
      router.back();
    }
  };

  // For web preview, we'll show a placeholder instead of camera
  const isWeb = Platform.OS === 'web';

  if (!permission?.granted && !isWeb) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>We need camera access to track your swings</Text>
          <TouchableOpacity 
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Access</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!isLandscape && !isWeb) {
    return <OrientationPrompt onRotate={() => setIsLandscape(true)} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {isWeb ? (
        // Web placeholder
        <View style={styles.webPlaceholder}>
          <Text style={styles.webPlaceholderText}>
            Camera preview is not available in web browser.
            Please use the mobile app for full functionality.
          </Text>
        </View>
      ) : (
        // Native camera view
        <CameraView
          ref={camera}
          style={styles.camera}
          type={CameraType.back}
          onError={(error) => setError(error.message)}
        >
          <View style={styles.overlay}>
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => setShowEndModal(true)}
              >
                <X size={24} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => setIsPaused(!isPaused)}
              >
                {isPaused ? (
                  <Play size={24} color={colors.white} />
                ) : (
                  <Pause size={24} color={colors.white} />
                )}
              </TouchableOpacity>
            </View>
            
            <SessionMetrics />
          </View>
        </CameraView>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <EndSessionModal 
        visible={showEndModal}
        onClose={() => setShowEndModal(false)}
        onEnd={handleEndSession}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    ...typography.body1,
    color: colors.grey[600],
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    ...typography.button,
    color: colors.white,
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.grey[900],
  },
  webPlaceholderText: {
    ...typography.body1,
    color: colors.white,
    textAlign: 'center',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.status.error,
    padding: 16,
    borderRadius: 8,
  },
  errorText: {
    ...typography.body1,
    color: colors.white,
    textAlign: 'center',
  },
});