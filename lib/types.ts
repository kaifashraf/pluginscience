export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: 'customer' | 'admin';
  created_at: string;
}

export interface SiteSettings {
  id: number;
  site_name: string;
  tagline: string;
  logo_url: string | null;
  currency_code: string;
  hero_headline: string;
  hero_subheading: string;
  hero_cta_text: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category_id: string;
  price: number;
  sale_price: number | null;
  stock_quantity: number;
  is_workshop: boolean;
  specs: Record<string, unknown>;
  status: 'draft' | 'active';
  created_at: string;
  updated_at: string;
  // Joined
  category?: Category;
  images?: ProductImage[];
  batches?: WorkshopBatch[];
}

export interface WorkshopBatch {
  id: string;
  product_id: string;
  batch_date: string;
  location: string;
  total_seats: number;
  booked_seats: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  sort_order: number;
}

export interface Bundle {
  id: string;
  name: string;
  description: string | null;
  discount_value: number;
  image_url: string | null;
  is_active: boolean;
  products?: Product[];
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  email: string;
  full_name: string;
  phone: string;
  shipping_address: Record<string, unknown> | null;
  subtotal: number;
  discount: number;
  total: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  fulfillment_status: 'unfulfilled' | 'processing' | 'shipped' | 'delivered';
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  tracking_number: string | null;
  coupon_code: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  batch_id: string | null;
  quantity: number;
  unit_price: number;
  product?: Product;
  batch?: WorkshopBatch;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profile?: Profile;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_value: number;
  max_uses: number;
  used_count: number;
  is_active: boolean;
  expires_at: string | null;
}

export interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product?: Product;
}

export interface CartItem {
  product: Product;
  quantity: number;
  batch?: WorkshopBatch;
}
