import type { Product } from '@/lib/types';
import { CATEGORIES } from './categories';

/**
 * Static product data for the PluginScience catalogue.
 *
 * These are placeholder products. Replace with your actual product catalogue
 * when ready. Images should be placed in /public/products/ and referenced
 * as '/products/your-image.webp'.
 */
export const PRODUCTS: Product[] = [
  // ── Drone Kits ──────────────────────────────────────────────────────────
  {
    id: 'p4',
    title: 'Carbon Phantom X4 Kit',
    slug: 'carbon-phantom-x4-kit',
    description:
      'Complete 450mm carbon-fiber quadcopter kit with brushless motors, 30A ESCs, Pixhawk flight controller, GPS module, and all hardware.',
    category_id: 'cat-2',
    price: 12999,
    sale_price: 10999,
    is_workshop: false,
    specs: {
      frame_size: '450mm',
      material: '3K carbon fiber',
      motors: '2212 920KV brushless x4',
      esc: '30A BLHeli_S x4',
      flight_controller: 'Pixhawk 2.4.8',
      gps: 'M8N GPS + compass',
      weight: '1200g (without battery)',
      max_payload: '500g',
    },
    category: CATEGORIES.find((c) => c.id === 'cat-2'),
    images: [],
  },
  {
    id: 'p5',
    title: 'Micro Racer FPV Kit',
    slug: 'micro-racer-fpv-kit',
    description:
      'Ultra-light 250mm FPV racing drone kit with high-KV motors, camera, VTX, and lightweight carbon frame.',
    category_id: 'cat-2',
    price: 8499,
    sale_price: null,
    is_workshop: false,
    specs: {
      frame_size: '250mm',
      material: '3K carbon fiber',
      motors: '2306 2450KV brushless x4',
      esc: '35A 4-in-1 BLHeli_32',
      flight_controller: 'F7 with OSD',
      camera: 'Runcam Nano',
      vtx: '600mW 5.8GHz',
      weight: '380g (without battery)',
    },
    category: CATEGORIES.find((c) => c.id === 'cat-2'),
    images: [],
  },

  // ── Hardware & Avionics ─────────────────────────────────────────────────
  {
    id: 'p6',
    title: 'F7 Flight Controller V3',
    slug: 'f7-flight-controller-v3',
    description:
      'High-performance F7 flight controller with integrated OSD, barometer, blackbox logging, and dual gyro.',
    category_id: 'cat-3',
    price: 3499,
    sale_price: null,
    is_workshop: false,
    specs: {
      processor: 'STM32F722',
      gyro: 'Dual MPU6000',
      osd: 'AT7456E integrated',
      uarts: 6,
      voltage_input: '3S-6S LiPo',
      dimensions: '36x36mm',
      weight: '8g',
      firmware: 'BetaFlight / INAV',
    },
    category: CATEGORIES.find((c) => c.id === 'cat-3'),
    images: [],
  },
  {
    id: 'p7',
    title: 'Brushless Motor 2212 920KV',
    slug: 'brushless-motor-2212-920kv',
    description:
      'Premium 2212 920KV brushless outrunner motor for 450mm-550mm multirotor platforms.',
    category_id: 'cat-3',
    price: 899,
    sale_price: null,
    is_workshop: false,
    specs: {
      kv_rating: '920KV',
      max_thrust: '850g',
      input_voltage: '2S-4S LiPo',
      shaft_diameter: '3.17mm',
      weight: '56g',
      material: 'CNC aluminum + N52 magnets',
    },
    category: CATEGORIES.find((c) => c.id === 'cat-3'),
    images: [],
  },
  {
    id: 'p8',
    title: 'HC-SR04 Ultrasonic Distance Sensor',
    slug: 'ultrasonic-sensor-hcsr04',
    description:
      'Precision ultrasonic distance sensor module for obstacle avoidance. Range: 2cm to 400cm.',
    category_id: 'cat-3',
    price: 149,
    sale_price: null,
    is_workshop: false,
    specs: {
      range: '2cm - 400cm',
      accuracy: '±3mm',
      operating_voltage: '5V DC',
      frequency: '40kHz',
      trigger_input: '10μs TTL pulse',
      dimensions: '45x20x15mm',
    },
    category: CATEGORIES.find((c) => c.id === 'cat-3'),
    images: [],
  },

  // ── Software & Firmware ─────────────────────────────────────────────────
  {
    id: 'p9',
    title: 'PID Auto-Tune Profile Pack',
    slug: 'pid-autotune-profiles',
    description:
      'Pre-calibrated PID tuning profiles for popular frame sizes. Compatible with BetaFlight and INAV.',
    category_id: 'cat-4',
    price: 499,
    sale_price: null,
    is_workshop: false,
    specs: {
      compatible_firmware: ['BetaFlight 4.4+', 'INAV 7.0+'],
      frame_sizes: ['250mm', '450mm', '550mm'],
      profiles_included: 12,
      format: '.txt CLI dump',
    },
    category: CATEGORIES.find((c) => c.id === 'cat-4'),
    images: [],
  },
  {
    id: 'p10',
    title: 'YOLOv8 Obstacle Detection SDK',
    slug: 'yolov8-obstacle-sdk',
    description:
      'Ready-to-deploy YOLOv8 nano model trained for aerial obstacle detection.',
    category_id: 'cat-4',
    price: 1999,
    sale_price: null,
    is_workshop: false,
    specs: {
      model: 'YOLOv8n custom-trained',
      classes: ['person', 'vehicle', 'tree', 'building', 'power_line', 'bird'],
      inference_speed: '<15ms on Jetson Nano',
      platforms: ['Jetson Nano', 'Raspberry Pi 5', 'Desktop GPU'],
      language: 'Python 3.10+',
    },
    category: CATEGORIES.find((c) => c.id === 'cat-4'),
    images: [],
  },
];
