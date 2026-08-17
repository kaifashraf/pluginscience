import type { Product, Category } from '@/lib/types';
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { WORKSHOPS } from '@/data/workshops';

// ─── Combined dataset ────────────────────────────────────────────────────────

const ALL_ITEMS: Product[] = [...WORKSHOPS, ...PRODUCTS];

// ─── DATA ACCESS FUNCTIONS (pure static — no Supabase) ───────────────────────

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getProducts(options?: {
  categorySlug?: string;
  isWorkshop?: boolean;
  search?: string;
  sort?: string;
  level?: string[];
}): Product[] {
  let filtered = [...ALL_ITEMS];

  if (options?.isWorkshop !== undefined) {
    filtered = filtered.filter((p) => p.is_workshop === options.isWorkshop);
  }
  if (options?.categorySlug) {
    filtered = filtered.filter((p) => p.category?.slug === options.categorySlug);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }
  if (options?.level && options.level.length > 0) {
    filtered = filtered.filter((p) => {
      const level = (p.specs as Record<string, unknown>)?.skill_level;
      return level && options.level!.includes(String(level).toLowerCase());
    });
  }
  if (options?.sort) {
    switch (options.sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Static data has no created_at — preserve original order
        break;
    }
  }

  return filtered;
}

export function getProductBySlug(slug: string): Product | null {
  return ALL_ITEMS.find((p) => p.slug === slug) || null;
}

export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  return ALL_ITEMS
    .filter((p) => p.id !== product.id && p.category_id === product.category_id)
    .slice(0, limit);
}

export function getCrossCategoryProducts(product: Product, limit: number = 3): Product[] {
  if (product.is_workshop) {
    return ALL_ITEMS
      .filter((p) => !p.is_workshop && p.category?.slug === 'drone-kits')
      .slice(0, limit);
  }
  return ALL_ITEMS.filter((p) => p.is_workshop).slice(0, limit);
}
