import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
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

  if (!permission?.granted) {
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

  if (!isLandscape) {
    return <OrientationPrompt onRotate={() => setIsLandscape(true)} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <CameraView
        ref={camera}
        style={styles.camera}
        type={CameraType.back}
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
});