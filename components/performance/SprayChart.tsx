import { View, Text, StyleSheet } from 'react-native';
import { Svg, Path, Circle, G } from 'react-native-svg';
import { useColors } from '@/constants/theme';

interface HitData {
  x: number;
  y: number;
  exitVelocity: number;
  type: 'ground' | 'line' | 'fly';
}

interface SprayChartProps {
  hits: HitData[];
  size?: number;
}

export function SprayChart({ hits, size = 300 }: SprayChartProps) {
  const colors = useColors();

  // Baseball field dimensions (normalized to fit in SVG)
  const fieldPath = `M ${size/2} ${size*0.9} L ${size*0.1} ${size*0.3} L ${size/2} ${size*0.1} L ${size*0.9} ${size*0.3} Z`;

  const getHitColor = (exitVelocity: number) => {
    if (exitVelocity >= 95) return colors.status.error;
    if (exitVelocity >= 85) return colors.status.warning;
    return colors.secondary.green;
  };

  const getHitShape = (type: string) => {
    switch (type) {
      case 'ground':
        return 'circle';
      case 'line':
        return 'square';
      case 'fly':
        return 'triangle';
      default:
        return 'circle';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.grey[600] }]}>Spray Chart</Text>
      <Svg width={size} height={size}>
        {/* Baseball field outline */}
        <Path
          d={fieldPath}
          fill={colors.grey[100]}
          stroke={colors.grey[300]}
          strokeWidth="2"
        />
        
        {/* Base paths */}
        <Path
          d={`M ${size/2} ${size*0.9} L ${size/2} ${size*0.6}`}
          stroke={colors.grey[300]}
          strokeWidth="2"
        />
        
        {/* Hit markers */}
        {hits.map((hit, index) => (
          <G key={index}>
            <Circle
              cx={hit.x * size}
              cy={hit.y * size}
              r="6"
              fill={getHitColor(hit.exitVelocity)}
            />
          </G>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontFamily: 'Barlow-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
});