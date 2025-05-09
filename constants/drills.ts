import { DrillCategory } from '@/types/drills';

export const drillCategories: DrillCategory[] = [
  {
    id: 'launch-angle',
    title: 'Launch Angle / Swing Plane',
    icon: 'trending-up',
    drills: [
      {
        id: 'launch-angle-ladder',
        title: 'Launch Angle Ladder',
        description: 'Build consistent launch angles within ideal hitting range',
        focus: 'Launch Control',
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
        ],
        metrics: {
          launchAngle: true,
          exitVelocity: true,
          sweetSpot: false,
          sprayAngle: true
        }
      },
      {
        id: 'line-drive-builder',
        title: 'Line Drive Builder',
        description: 'Groove swings for optimal line drive launch angles (10°–20°)',
        focus: 'Line Drives',
        time: '20 min',
        type: 'tee',
        image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=300',
        setup: [
          'Set tee at belt height',
          'Place target net at optimal line drive height',
          'Set up launch angle feedback system'
        ],
        targets: [
          'Maintain launch angle between 10-20°',
          'Exit velocity > 85 mph',
          '80% sweet spot contact rate'
        ],
        metrics: {
          launchAngle: true,
          exitVelocity: true,
          sweetSpot: true,
          sprayAngle: false
        }
      }
    ]
  },
  {
    id: 'exit-velocity',
    title: 'Exit Velocity / Power Training',
    icon: 'zap',
    drills: [
      {
        id: 'exit-velocity-builder',
        title: 'Exit Velocity Builder',
        description: 'Increase average and max exit velo through focused reps',
        focus: 'Power',
        time: '20 min',
        type: 'soft-toss',
        image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=300',
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
        ],
        metrics: {
          launchAngle: true,
          exitVelocity: true,
          sweetSpot: true,
          sprayAngle: true
        }
      }
    ]
  },
  {
    id: 'strike-zone',
    title: 'Strike Zone Mastery',
    icon: 'target',
    drills: [
      {
        id: 'zone-coverage',
        title: 'Strike Zone Coverage',
        description: 'Improve hitting in all 9 zones of the strike zone',
        focus: 'Zone Control',
        time: '25 min',
        type: 'soft-toss',
        image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=300',
        setup: [
          'Set up 3x3 zone grid',
          'Partner tosses to specific zones',
          'Track contact quality by zone'
        ],
        targets: [
          'Hit each zone with >80% success rate',
          'Maintain consistent exit velocity across zones',
          'Achieve proper launch angle for each zone'
        ],
        metrics: {
          launchAngle: true,
          exitVelocity: true,
          sweetSpot: true,
          sprayAngle: false
        }
      }
    ]
  }
];