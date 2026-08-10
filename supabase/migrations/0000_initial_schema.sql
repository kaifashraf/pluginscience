-- ============================================================
-- PLUGIN DRONE PLATFORM — INITIAL SCHEMA MIGRATION
-- Run this in the Supabase SQL Editor to initialize the database
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 2. SITE SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  site_name TEXT NOT NULL DEFAULT 'Plugin',
  tagline TEXT NOT NULL DEFAULT 'Engineer. Code. Fly.',
  logo_url TEXT,
  currency_code TEXT NOT NULL DEFAULT 'INR',
  hero_headline TEXT NOT NULL DEFAULT 'PLUGIN',
  hero_subheading TEXT NOT NULL DEFAULT 'Engineer. Code. Fly.',
  hero_cta_text TEXT NOT NULL DEFAULT 'Reserve Workshop Seat',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO site_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- ============================================================
-- 3. CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Seed default categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Workshops & Bootcamps', 'workshops', 'Hands-on drone engineering training programs with expert instructors.', 1),
  ('Custom Drone Kits', 'drone-kits', 'Carbon-fiber quadcopter DIY kits with motors, flight controllers, and ESCs.', 2),
  ('Hardware & Avionics', 'hardware', 'Individual components — flight controllers, brushless motors, sensors, cameras, and batteries.', 3),
  ('Software & Firmware Lab', 'software', 'Digital downloads, custom PID tuning profiles, object detection scripts, and SDK tools.', 4)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- 4. PRODUCTS
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  sale_price NUMERIC(10,2),
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_workshop BOOLEAN NOT NULL DEFAULT false,
  specs JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

-- ============================================================
-- 5. WORKSHOP BATCHES
-- ============================================================
CREATE TABLE IF NOT EXISTS workshop_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  batch_date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL DEFAULT 'Online',
  total_seats INTEGER NOT NULL DEFAULT 30,
  booked_seats INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_batches_product ON workshop_batches(product_id);

-- ============================================================
-- 6. PRODUCT IMAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_images_product ON product_images(product_id);

-- ============================================================
-- 7. BUNDLES
-- ============================================================
CREATE TABLE IF NOT EXISTS bundles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  discount_value NUMERIC(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bundle_products (
  bundle_id UUID NOT NULL REFERENCES bundles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  PRIMARY KEY (bundle_id, product_id)
);

-- ============================================================
-- 8. ORDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  shipping_address JSONB,
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  discount NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  fulfillment_status TEXT NOT NULL DEFAULT 'unfulfilled' CHECK (fulfillment_status IN ('unfulfilled', 'processing', 'shipped', 'delivered')),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  tracking_number TEXT,
  coupon_code TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(payment_status);

-- Auto-increment order number
CREATE SEQUENCE IF NOT EXISTS order_number_seq START WITH 10001;

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'PLUGIN-' || nextval('order_number_seq');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_order_number ON orders;
CREATE TRIGGER set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL OR NEW.order_number = '')
  EXECUTE FUNCTION generate_order_number();

-- ============================================================
-- 9. ORDER ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  batch_id UUID REFERENCES workshop_batches(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- ============================================================
-- 10. REVIEWS
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);

-- ============================================================
-- 11. COUPONS
-- ============================================================
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC(10,2) NOT NULL DEFAULT 0,
  min_order_value NUMERIC(10,2) NOT NULL DEFAULT 0,
  max_uses INTEGER NOT NULL DEFAULT 100,
  used_count INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 12. SUBSCRIBERS
-- ============================================================
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 13. WISHLIST
-- ============================================================
CREATE TABLE IF NOT EXISTS wishlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- ============================================================
-- 14. MEDIA (general purpose)
-- ============================================================
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  alt_text TEXT,
  mime_type TEXT,
  size_bytes INTEGER,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Site Settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings viewable by everyone"
  ON site_settings FOR SELECT USING (true);

CREATE POLICY "Only admins can update site settings"
  ON site_settings FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories viewable by everyone"
  ON categories FOR SELECT USING (true);

CREATE POLICY "Only admins can manage categories"
  ON categories FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active products viewable by everyone"
  ON products FOR SELECT USING (status = 'active' OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Only admins can manage products"
  ON products FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Workshop Batches
ALTER TABLE workshop_batches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Batches viewable by everyone"
  ON workshop_batches FOR SELECT USING (true);

CREATE POLICY "Only admins can manage batches"
  ON workshop_batches FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Product Images
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Product images viewable by everyone"
  ON product_images FOR SELECT USING (true);

CREATE POLICY "Only admins can manage product images"
  ON product_images FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Bundles
ALTER TABLE bundles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active bundles viewable by everyone"
  ON bundles FOR SELECT USING (is_active = true OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Authenticated users can create orders"
  ON orders FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Only admins can update orders"
  ON orders FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Order Items
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND (
      orders.user_id = auth.uid() OR
      EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    ))
  );

CREATE POLICY "Authenticated users can create order items"
  ON order_items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews viewable by everyone"
  ON reviews FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Coupons
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active coupons viewable by everyone"
  ON coupons FOR SELECT USING (true);

CREATE POLICY "Only admins can manage coupons"
  ON coupons FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Subscribers
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view subscribers"
  ON subscribers FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Wishlist
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own wishlist"
  ON wishlist FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own wishlist"
  ON wishlist FOR ALL USING (auth.uid() = user_id);

-- Media
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media viewable by everyone"
  ON media FOR SELECT USING (true);

CREATE POLICY "Only admins can manage media"
  ON media FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- SEED DATA — Sample products
-- ============================================================

-- Get category IDs for seeding
DO $$
DECLARE
  workshops_id UUID;
  kits_id UUID;
  hardware_id UUID;
  software_id UUID;
BEGIN
  SELECT id INTO workshops_id FROM categories WHERE slug = 'workshops';
  SELECT id INTO kits_id FROM categories WHERE slug = 'drone-kits';
  SELECT id INTO hardware_id FROM categories WHERE slug = 'hardware';
  SELECT id INTO software_id FROM categories WHERE slug = 'software';

  -- Workshops
  INSERT INTO products (title, slug, description, category_id, price, stock_quantity, is_workshop, specs, status) VALUES
  (
    '2-Day Drone Assembly Bootcamp',
    'drone-assembly-bootcamp',
    'Build a carbon-fiber quadcopter from scratch. Learn soldering, ESC calibration, flight controller firmware flashing, and maiden flight procedures in a guided hands-on environment.',
    workshops_id, 4999, 30, true,
    '{"duration": "2 Days (16 hours)", "skill_level": "Beginner", "tools_provided": true, "outcomes": ["Complete drone assembly", "Soldering & wiring", "ESC calibration", "First flight"], "prerequisites": "None"}',
    'active'
  ),
  (
    'Autonomous YOLOv8 Drone Coding',
    'yolov8-autonomous-drone',
    'Program a drone to detect and avoid obstacles autonomously using YOLOv8 computer vision. Covers Python scripting, model training, real-time inference on edge hardware, and autonomous waypoint navigation.',
    workshops_id, 7999, 20, true,
    '{"duration": "3 Days (24 hours)", "skill_level": "Advanced", "tools_provided": true, "outcomes": ["Deploy YOLOv8 model", "Autonomous navigation", "Edge computing", "Custom object detection"], "prerequisites": "Basic Python knowledge"}',
    'active'
  ),
  (
    'FPV Flight Dynamics Masterclass',
    'fpv-flight-dynamics',
    'Master First Person View racing and freestyle flying. Covers FPV goggles setup, radio transmitter binding, rate profiles, PID loop tuning, and acrobatic maneuvers.',
    workshops_id, 5999, 25, true,
    '{"duration": "2 Days (14 hours)", "skill_level": "Intermediate", "tools_provided": true, "outcomes": ["FPV setup mastery", "PID loop tuning", "Acrobatic flight", "Race course navigation"], "prerequisites": "Basic drone flight experience"}',
    'active'
  )
  ON CONFLICT (slug) DO NOTHING;

  -- DIY Kits
  INSERT INTO products (title, slug, description, category_id, price, sale_price, stock_quantity, is_workshop, specs, status) VALUES
  (
    'Carbon Phantom X4 Kit',
    'carbon-phantom-x4-kit',
    'Complete 450mm carbon-fiber quadcopter kit with brushless motors, 30A ESCs, Pixhawk flight controller, GPS module, and all necessary hardware for a high-performance aerial platform.',
    kits_id, 12999, 10999, 50, false,
    '{"frame_size": "450mm", "material": "3K carbon fiber", "motors": "2212 920KV brushless x4", "esc": "30A BLHeli_S x4", "flight_controller": "Pixhawk 2.4.8", "gps": "M8N GPS + compass", "weight": "1200g (without battery)", "max_payload": "500g"}',
    'active'
  ),
  (
    'Micro Racer FPV Kit',
    'micro-racer-fpv-kit',
    'Ultra-light 250mm FPV racing drone kit with high-KV motors, camera, VTX, and lightweight carbon frame designed for speed and agility in competitive racing.',
    kits_id, 8499, NULL, 35, false,
    '{"frame_size": "250mm", "material": "3K carbon fiber", "motors": "2306 2450KV brushless x4", "esc": "35A 4-in-1 BLHeli_32", "flight_controller": "F7 with OSD", "camera": "Runcam Nano", "vtx": "600mW 5.8GHz", "weight": "380g (without battery)"}',
    'active'
  )
  ON CONFLICT (slug) DO NOTHING;

  -- Hardware & Avionics
  INSERT INTO products (title, slug, description, category_id, price, stock_quantity, is_workshop, specs, status) VALUES
  (
    'F7 Flight Controller V3',
    'f7-flight-controller-v3',
    'High-performance F7 flight controller with integrated OSD, barometer, blackbox logging, and dual gyro for precision stabilization. Compatible with BetaFlight and INAV firmware.',
    hardware_id, 3499, 120, false,
    '{"processor": "STM32F722", "gyro": "Dual MPU6000", "osd": "AT7456E integrated", "uarts": 6, "voltage_input": "3S-6S LiPo", "dimensions": "36x36mm", "weight": "8g", "firmware": "BetaFlight / INAV"}',
    'active'
  ),
  (
    'Brushless Motor 2212 920KV',
    'brushless-motor-2212-920kv',
    'Premium 2212 920KV brushless outrunner motor engineered for 450mm-550mm multirotor platforms. CNC-machined aluminum housing with N52 arc magnets for maximum efficiency.',
    hardware_id, 899, 200, false,
    '{"kv_rating": "920KV", "max_thrust": "850g", "input_voltage": "2S-4S LiPo", "shaft_diameter": "3.17mm", "weight": "56g", "material": "CNC aluminum + N52 magnets"}',
    'active'
  ),
  (
    'HC-SR04 Ultrasonic Distance Sensor',
    'ultrasonic-sensor-hcsr04',
    'Precision ultrasonic distance sensor module for obstacle avoidance and altitude hold. Range: 2cm to 400cm with ±3mm accuracy at optimal conditions.',
    hardware_id, 149, 500, false,
    '{"range": "2cm - 400cm", "accuracy": "±3mm", "operating_voltage": "5V DC", "frequency": "40kHz", "trigger_input": "10μs TTL pulse", "dimensions": "45x20x15mm"}',
    'active'
  )
  ON CONFLICT (slug) DO NOTHING;

  -- Software
  INSERT INTO products (title, slug, description, category_id, price, stock_quantity, is_workshop, specs, status) VALUES
  (
    'PID Auto-Tune Profile Pack',
    'pid-autotune-profiles',
    'Pre-calibrated PID tuning profiles for popular frame sizes (250mm, 450mm, 550mm). Optimized for smooth cinematic footage and aggressive acro flying. Compatible with BetaFlight and INAV.',
    software_id, 499, 9999, false,
    '{"compatible_firmware": ["BetaFlight 4.4+", "INAV 7.0+"], "frame_sizes": ["250mm", "450mm", "550mm"], "profiles_included": 12, "format": ".txt CLI dump"}',
    'active'
  ),
  (
    'YOLOv8 Obstacle Detection SDK',
    'yolov8-obstacle-sdk',
    'Ready-to-deploy YOLOv8 nano model trained for aerial obstacle detection. Includes Python inference scripts, ROS2 integration nodes, and edge deployment guides for Jetson Nano / Raspberry Pi 5.',
    software_id, 1999, 9999, false,
    '{"model": "YOLOv8n custom-trained", "classes": ["person", "vehicle", "tree", "building", "power_line", "bird"], "inference_speed": "<15ms on Jetson Nano", "platforms": ["Jetson Nano", "Raspberry Pi 5", "Desktop GPU"], "language": "Python 3.10+"}',
    'active'
  )
  ON CONFLICT (slug) DO NOTHING;

  -- Workshop Batches
  INSERT INTO workshop_batches (product_id, batch_date, location, total_seats, booked_seats)
  SELECT p.id, '2026-08-15 09:00:00+05:30', 'Plugin Lab — Bengaluru', 30, 26
  FROM products p WHERE p.slug = 'drone-assembly-bootcamp'
  ON CONFLICT DO NOTHING;

  INSERT INTO workshop_batches (product_id, batch_date, location, total_seats, booked_seats)
  SELECT p.id, '2026-09-05 09:00:00+05:30', 'Plugin Lab — Bengaluru', 30, 12
  FROM products p WHERE p.slug = 'drone-assembly-bootcamp'
  ON CONFLICT DO NOTHING;

  INSERT INTO workshop_batches (product_id, batch_date, location, total_seats, booked_seats)
  SELECT p.id, '2026-08-22 09:00:00+05:30', 'Plugin Lab — Hyderabad', 20, 18
  FROM products p WHERE p.slug = 'yolov8-autonomous-drone'
  ON CONFLICT DO NOTHING;

  INSERT INTO workshop_batches (product_id, batch_date, location, total_seats, booked_seats)
  SELECT p.id, '2026-09-12 09:00:00+05:30', 'Plugin Lab — Delhi', 25, 8
  FROM products p WHERE p.slug = 'fpv-flight-dynamics'
  ON CONFLICT DO NOTHING;

  -- Sample coupon
  INSERT INTO coupons (code, discount_type, discount_value, min_order_value, max_uses, is_active, expires_at) VALUES
  ('FIRSTFLIGHT', 'percentage', 15, 2000, 100, true, '2026-12-31 23:59:59+05:30'),
  ('BUILDER2026', 'fixed', 1000, 5000, 50, true, '2026-12-31 23:59:59+05:30')
  ON CONFLICT (code) DO NOTHING;

END $$;

-- ============================================================
-- 15. VOLUNTEERS
-- ============================================================
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  college TEXT NOT NULL,
  year_of_study TEXT NOT NULL,
  preferred_role TEXT NOT NULL,
  reason TEXT NOT NULL,
  resume_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 16. MENTOR APPLICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS mentor_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  city TEXT,
  current_company TEXT,
  current_position TEXT,
  expertise TEXT,
  years_experience TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  mentoring_categories TEXT[],
  availability TEXT,
  languages TEXT,
  short_bio TEXT,
  motivation TEXT,
  cv_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE mentor_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit mentor application"
  ON mentor_applications FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view mentor applications"
  ON mentor_applications FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

