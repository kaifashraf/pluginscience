// ─── Static Data Types ───────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  sort_order: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category_id: string;
  price: number;
  sale_price: number | null;
  is_workshop: boolean;
  specs: Record<string, unknown>;
  // Joined / resolved references
  category?: Category;
  images?: ProductImage[];
}

// ─── Application Types (Supabase) ────────────────────────────────────────────

export interface VolunteerApplication {
  full_name: string;
  email: string;
  phone: string;
  college: string;
  year_of_study: string;
  preferred_role: string;
  reason: string;
  resume_url: string | null;
}

export interface MentorApplication {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country?: string;
  city?: string;
  current_company?: string;
  current_position: string;
  expertise: string;
  years_experience: string;
  linkedin_url?: string;
  portfolio_url?: string;
  mentoring_categories: string[];
  availability: string;
  languages?: string;
  short_bio?: string;
  motivation: string;
  cv_url: string | null;
}
