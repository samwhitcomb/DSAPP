export interface DrillMetrics {
  launchAngle: boolean;
  exitVelocity: boolean;
  sweetSpot: boolean;
  sprayAngle: boolean;
}

export interface Drill {
  id: string;
  title: string;
  description: string;
  focus: string;
  time: string;
  type: 'tee' | 'soft-toss';
  image: string;
  setup: string[];
  targets: string[];
  metrics: DrillMetrics;
}

export interface DrillCategory {
  id: string;
  title: string;
  icon: string;
  drills: Drill[];
}