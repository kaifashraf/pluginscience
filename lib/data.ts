import { createClient } from '@/lib/supabase/client';
import type { Product, Category, WorkshopBatch, Coupon, Subscriber } from '@/lib/types';

const supabase = createClient();

// Check if Supabase is configured
const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== '' &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== ''
);

// ─── MOCK DATA (used when Supabase is not configured) ────────────────────────

const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Workshops & Bootcamps', slug: 'workshops', description: 'Hands-on drone engineering training programs.', image_url: null, parent_id: null, created_at: '' },
  { id: 'cat-2', name: 'Custom Drone Kits', slug: 'drone-kits', description: 'Carbon-fiber quadcopter DIY kits.', image_url: null, parent_id: null, created_at: '' },
  { id: 'cat-3', name: 'Hardware & Avionics', slug: 'hardware', description: 'Flight controllers, motors, sensors.', image_url: null, parent_id: null, created_at: '' },
  { id: 'cat-4', name: 'Software & Firmware Lab', slug: 'software', description: 'PID profiles, detection scripts, SDKs.', image_url: null, parent_id: null, created_at: '' },
];

const MOCK_BATCHES: Record<string, WorkshopBatch[]> = {
  'drone-assembly-bootcamp': [
    { id: 'b1', product_id: 'p1', batch_date: '2026-08-15T09:00:00+05:30', location: 'Plugin Lab — Bengaluru', total_seats: 30, booked_seats: 26 },
    { id: 'b2', product_id: 'p1', batch_date: '2026-09-05T09:00:00+05:30', location: 'Plugin Lab — Bengaluru', total_seats: 30, booked_seats: 12 },
  ],
  'yolov8-autonomous-drone': [
    { id: 'b3', product_id: 'p2', batch_date: '2026-08-22T09:00:00+05:30', location: 'Plugin Lab — Hyderabad', total_seats: 20, booked_seats: 18 },
  ],
  'fpv-flight-dynamics': [
    { id: 'b4', product_id: 'p3', batch_date: '2026-09-12T09:00:00+05:30', location: 'Plugin Lab — Delhi', total_seats: 25, booked_seats: 8 },
  ],
};

const MOCK_PRODUCTS: Product[] = [
  // Workshops
  {
    id: 'p1', title: '2-Day Drone Assembly Bootcamp', slug: 'drone-assembly-bootcamp',
    description: 'Build a carbon-fiber quadcopter from scratch. Learn soldering, ESC calibration, flight controller firmware flashing, and maiden flight procedures.',
    category_id: 'cat-1', price: 4999, sale_price: null, stock_quantity: 30, is_workshop: true,
    specs: { duration: '2 Days (16 hours)', skill_level: 'Beginner', tools_provided: true, outcomes: ['Complete drone assembly', 'Soldering & wiring', 'ESC calibration', 'First flight'], prerequisites: 'None' },
    status: 'active', created_at: '', updated_at: '',
    category: MOCK_CATEGORIES[0],
    batches: MOCK_BATCHES['drone-assembly-bootcamp'],
    images: [],
  },
  {
    id: 'p2', title: 'Autonomous YOLOv8 Drone Coding', slug: 'yolov8-autonomous-drone',
    description: 'Program a drone to detect and avoid obstacles autonomously using YOLOv8 computer vision. Covers Python scripting, model training, and real-time inference.',
    category_id: 'cat-1', price: 7999, sale_price: null, stock_quantity: 20, is_workshop: true,
    specs: { duration: '3 Days (24 hours)', skill_level: 'Advanced', tools_provided: true, outcomes: ['Deploy YOLOv8 model', 'Autonomous navigation', 'Edge computing', 'Custom object detection'], prerequisites: 'Basic Python knowledge' },
    status: 'active', created_at: '', updated_at: '',
    category: MOCK_CATEGORIES[0],
    batches: MOCK_BATCHES['yolov8-autonomous-drone'],
    images: [],
  },
  {
    id: 'p3', title: 'FPV Flight Dynamics Masterclass', slug: 'fpv-flight-dynamics',
    description: 'Master First Person View racing and freestyle flying. Covers FPV goggles setup, rate profiles, PID loop tuning, and acrobatic maneuvers.',
    category_id: 'cat-1', price: 5999, sale_price: null, stock_quantity: 25, is_workshop: true,
    specs: { duration: '2 Days (14 hours)', skill_level: 'Intermediate', tools_provided: true, outcomes: ['FPV setup mastery', 'PID loop tuning', 'Acrobatic flight', 'Race course navigation'], prerequisites: 'Basic drone flight experience' },
    status: 'active', created_at: '', updated_at: '',
    category: MOCK_CATEGORIES[0],
    batches: MOCK_BATCHES['fpv-flight-dynamics'],
    images: [],
  },
  // Drone Kits
  {
    id: 'p4', title: 'Carbon Phantom X4 Kit', slug: 'carbon-phantom-x4-kit',
    description: 'Complete 450mm carbon-fiber quadcopter kit with brushless motors, 30A ESCs, Pixhawk flight controller, GPS module, and all hardware.',
    category_id: 'cat-2', price: 12999, sale_price: 10999, stock_quantity: 50, is_workshop: false,
    specs: { frame_size: '450mm', material: '3K carbon fiber', motors: '2212 920KV brushless x4', esc: '30A BLHeli_S x4', flight_controller: 'Pixhawk 2.4.8', gps: 'M8N GPS + compass', weight: '1200g (without battery)', max_payload: '500g' },
    status: 'active', created_at: '', updated_at: '',
    category: MOCK_CATEGORIES[1],
    images: [],
  },
  {
    id: 'p5', title: 'Micro Racer FPV Kit', slug: 'micro-racer-fpv-kit',
    description: 'Ultra-light 250mm FPV racing drone kit with high-KV motors, camera, VTX, and lightweight carbon frame.',
    category_id: 'cat-2', price: 8499, sale_price: null, stock_quantity: 35, is_workshop: false,
    specs: { frame_size: '250mm', material: '3K carbon fiber', motors: '2306 2450KV brushless x4', esc: '35A 4-in-1 BLHeli_32', flight_controller: 'F7 with OSD', camera: 'Runcam Nano', vtx: '600mW 5.8GHz', weight: '380g (without battery)' },
    status: 'active', created_at: '', updated_at: '',
    category: MOCK_CATEGORIES[1],
    images: [],
  },
  // Hardware
  {
    id: 'p6', title: 'F7 Flight Controller V3', slug: 'f7-flight-controller-v3',
    description: 'High-performance F7 flight controller with integrated OSD, barometer, blackbox logging, and dual gyro.',
    category_id: 'cat-3', price: 3499, sale_price: null, stock_quantity: 120, is_workshop: false,
    specs: { processor: 'STM32F722', gyro: 'Dual MPU6000', osd: 'AT7456E integrated', uarts: 6, voltage_input: '3S-6S LiPo', dimensions: '36x36mm', weight: '8g', firmware: 'BetaFlight / INAV' },
    status: 'active', created_at: '', updated_at: '',
    category: MOCK_CATEGORIES[2],
    images: [],
  },
  {
    id: 'p7', title: 'Brushless Motor 2212 920KV', slug: 'brushless-motor-2212-920kv',
    description: 'Premium 2212 920KV brushless outrunner motor for 450mm-550mm multirotor platforms.',
    category_id: 'cat-3', price: 899, sale_price: null, stock_quantity: 200, is_workshop: false,
    specs: { kv_rating: '920KV', max_thrust: '850g', input_voltage: '2S-4S LiPo', shaft_diameter: '3.17mm', weight: '56g', material: 'CNC aluminum + N52 magnets' },
    status: 'active', created_at: '', updated_at: '',
    category: MOCK_CATEGORIES[2],
    images: [],
  },
  {
    id: 'p8', title: 'HC-SR04 Ultrasonic Distance Sensor', slug: 'ultrasonic-sensor-hcsr04',
    description: 'Precision ultrasonic distance sensor module for obstacle avoidance. Range: 2cm to 400cm.',
    category_id: 'cat-3', price: 149, sale_price: null, stock_quantity: 500, is_workshop: false,
    specs: { range: '2cm - 400cm', accuracy: '±3mm', operating_voltage: '5V DC', frequency: '40kHz', trigger_input: '10μs TTL pulse', dimensions: '45x20x15mm' },
    status: 'active', created_at: '', updated_at: '',
    category: MOCK_CATEGORIES[2],
    images: [],
  },
  // Software
  {
    id: 'p9', title: 'PID Auto-Tune Profile Pack', slug: 'pid-autotune-profiles',
    description: 'Pre-calibrated PID tuning profiles for popular frame sizes. Compatible with BetaFlight and INAV.',
    category_id: 'cat-4', price: 499, sale_price: null, stock_quantity: 9999, is_workshop: false,
    specs: { compatible_firmware: ['BetaFlight 4.4+', 'INAV 7.0+'], frame_sizes: ['250mm', '450mm', '550mm'], profiles_included: 12, format: '.txt CLI dump' },
    status: 'active', created_at: '', updated_at: '',
    category: MOCK_CATEGORIES[3],
    images: [],
  },
  {
    id: 'p10', title: 'YOLOv8 Obstacle Detection SDK', slug: 'yolov8-obstacle-sdk',
    description: 'Ready-to-deploy YOLOv8 nano model trained for aerial obstacle detection.',
    category_id: 'cat-4', price: 1999, sale_price: null, stock_quantity: 9999, is_workshop: false,
    specs: { model: 'YOLOv8n custom-trained', classes: ['person', 'vehicle', 'tree', 'building', 'power_line', 'bird'], inference_speed: '<15ms on Jetson Nano', platforms: ['Jetson Nano', 'Raspberry Pi 5', 'Desktop GPU'], language: 'Python 3.10+' },
    status: 'active', created_at: '', updated_at: '',
    category: MOCK_CATEGORIES[3],
    images: [],
  },
];

// ─── DATA ACCESS FUNCTIONS ───────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured) return MOCK_CATEGORIES;
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return MOCK_CATEGORIES;
  }
  return data || MOCK_CATEGORIES;
}

export async function getProducts(options?: {
  categorySlug?: string;
  isWorkshop?: boolean;
  search?: string;
  sort?: string;
  level?: string[];
}): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    let filtered = [...MOCK_PRODUCTS];
    
    if (options?.isWorkshop !== undefined) {
      filtered = filtered.filter(p => p.is_workshop === options.isWorkshop);
    }
    if (options?.categorySlug) {
      filtered = filtered.filter(p => p.category?.slug === options.categorySlug);
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }
    if (options?.level && options.level.length > 0) {
      filtered = filtered.filter(p => {
        const level = (p.specs as Record<string, unknown>)?.skill_level;
        return level && options.level!.includes(String(level).toLowerCase());
      });
    }
    if (options?.sort) {
      switch (options.sort) {
        case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
        case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
        case 'newest': filtered.sort((a, b) => b.created_at.localeCompare(a.created_at)); break;
      }
    }
    return filtered;
  }
  
  let query = supabase
    .from('products')
    .select('*, category:categories(*), images:product_images(*), batches:workshop_batches(*)')
    .eq('status', 'active');

  if (options?.isWorkshop !== undefined) {
    query = query.eq('is_workshop', options.isWorkshop);
  }
  if (options?.categorySlug) {
    query = query.eq('category.slug', options.categorySlug);
  }
  if (options?.search) {
    query = query.ilike('title', `%${options.search}%`);
  }
  if (options?.sort) {
    switch (options.sort) {
      case 'price-asc': query = query.order('price', { ascending: true }); break;
      case 'price-desc': query = query.order('price', { ascending: false }); break;
      case 'newest': query = query.order('created_at', { ascending: false }); break;
      default: query = query.order('created_at', { ascending: false }); break;
    }
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching products:', error);
    return MOCK_PRODUCTS;
  }
  return data || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*), images:product_images(*), batches:workshop_batches(*)')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
  }
  return data;
}

export async function getRelatedProducts(product: Product, limit: number = 4): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return MOCK_PRODUCTS
      .filter(p => p.id !== product.id && p.category_id === product.category_id)
      .slice(0, limit);
  }

  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*), images:product_images(*), batches:workshop_batches(*)')
    .eq('status', 'active')
    .eq('category_id', product.category_id)
    .neq('id', product.id)
    .limit(limit);

  if (error) {
    console.error('Error fetching related:', error);
    return [];
  }
  return data || [];
}

export async function getCrossCategoryProducts(product: Product, limit: number = 3): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    if (product.is_workshop) {
      return MOCK_PRODUCTS.filter(p => !p.is_workshop && p.category?.slug === 'drone-kits').slice(0, limit);
    }
    return MOCK_PRODUCTS.filter(p => p.is_workshop).slice(0, limit);
  }

  const isWorkshop = product.is_workshop;
  let query = supabase
    .from('products')
    .select('*, category:categories(*), images:product_images(*), batches:workshop_batches(*)')
    .eq('status', 'active')
    .neq('is_workshop', isWorkshop)
    .limit(limit);

  const { data, error } = await query;
  if (error) return [];
  return data || [];
}

export async function validateCoupon(code: string, orderTotal: number): Promise<{ valid: boolean; coupon?: Coupon; error?: string }> {
  if (!isSupabaseConfigured) {
    const mockCoupons: Coupon[] = [
      { id: 'c1', code: 'FIRSTFLIGHT', discount_type: 'percentage', discount_value: 15, min_order_value: 2000, max_uses: 100, used_count: 45, is_active: true, expires_at: '2026-12-31T23:59:59+05:30' },
      { id: 'c2', code: 'BUILDER2026', discount_type: 'fixed', discount_value: 1000, min_order_value: 5000, max_uses: 50, used_count: 20, is_active: true, expires_at: '2026-12-31T23:59:59+05:30' },
    ];
    const coupon = mockCoupons.find(c => c.code === code.toUpperCase());
    if (!coupon) return { valid: false, error: 'Invalid coupon code' };
    if (!coupon.is_active) return { valid: false, error: 'Coupon is no longer active' };
    if (orderTotal < coupon.min_order_value) return { valid: false, error: `Minimum order value: ₹${coupon.min_order_value}` };
    if (coupon.used_count >= coupon.max_uses) return { valid: false, error: 'Coupon usage limit reached' };
    return { valid: true, coupon };
  }

  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code.toUpperCase())
    .single();

  if (error || !data) return { valid: false, error: 'Invalid coupon code' };
  if (!data.is_active) return { valid: false, error: 'Coupon is no longer active' };
  if (data.expires_at && new Date(data.expires_at) < new Date()) return { valid: false, error: 'Coupon has expired' };
  if (orderTotal < data.min_order_value) return { valid: false, error: `Minimum order value: ₹${data.min_order_value}` };
  if (data.used_count >= data.max_uses) return { valid: false, error: 'Coupon usage limit reached' };
  return { valid: true, coupon: data };
}

export async function subscribeEmail(email: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured) {
    return { success: true };
  }

  const { error } = await supabase.from('subscribers').insert({ email });
  if (error) {
    if (error.code === '23505') return { success: false, error: 'Email already subscribed' };
    return { success: false, error: 'Failed to subscribe' };
  }
  return { success: true };
}
