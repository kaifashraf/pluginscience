import type { Product } from '@/lib/types';
import { CATEGORIES } from './categories';

/**
 * Static workshop data for the PluginScience catalogue.
 *
 * These are placeholder workshops. Replace with your actual workshop offerings
 * when ready. Images should be placed in /public/products/ and referenced
 * as '/products/your-image.webp'.
 */
export const WORKSHOPS: Product[] = [
  {
    id: 'p1',
    title: '2-Day Drone Assembly Bootcamp',
    slug: 'drone-assembly-bootcamp',
    description:
      'Build a carbon-fiber quadcopter from scratch. Learn soldering, ESC calibration, flight controller firmware flashing, and maiden flight procedures.',
    category_id: 'cat-1',
    price: 4999,
    sale_price: null,
    is_workshop: true,
    specs: {
      duration: '2 Days (16 hours)',
      skill_level: 'Beginner',
      tools_provided: true,
      outcomes: [
        'Complete drone assembly',
        'Soldering & wiring',
        'ESC calibration',
        'First flight',
      ],
      prerequisites: 'None',
    },
    category: CATEGORIES.find((c) => c.id === 'cat-1'),
    images: [],
  },
  {
    id: 'p2',
    title: 'Autonomous YOLOv8 Drone Coding',
    slug: 'yolov8-autonomous-drone',
    description:
      'Program a drone to detect and avoid obstacles autonomously using YOLOv8 computer vision. Covers Python scripting, model training, and real-time inference.',
    category_id: 'cat-1',
    price: 7999,
    sale_price: null,
    is_workshop: true,
    specs: {
      duration: '3 Days (24 hours)',
      skill_level: 'Advanced',
      tools_provided: true,
      outcomes: [
        'Deploy YOLOv8 model',
        'Autonomous navigation',
        'Edge computing',
        'Custom object detection',
      ],
      prerequisites: 'Basic Python knowledge',
    },
    category: CATEGORIES.find((c) => c.id === 'cat-1'),
    images: [],
  },
  {
    id: 'p3',
    title: 'FPV Flight Dynamics Masterclass',
    slug: 'fpv-flight-dynamics',
    description:
      'Master First Person View racing and freestyle flying. Covers FPV goggles setup, rate profiles, PID loop tuning, and acrobatic maneuvers.',
    category_id: 'cat-1',
    price: 5999,
    sale_price: null,
    is_workshop: true,
    specs: {
      duration: '2 Days (14 hours)',
      skill_level: 'Intermediate',
      tools_provided: true,
      outcomes: [
        'FPV setup mastery',
        'PID loop tuning',
        'Acrobatic flight',
        'Race course navigation',
      ],
      prerequisites: 'Basic drone flight experience',
    },
    category: CATEGORIES.find((c) => c.id === 'cat-1'),
    images: [],
  },
];
