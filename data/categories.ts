import type { Category } from '@/lib/types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Workshops & Bootcamps',
    slug: 'workshops',
    description: 'Hands-on drone engineering training programs.',
    image_url: null,
    parent_id: null,
  },
  {
    id: 'cat-2',
    name: 'Custom Drone Kits',
    slug: 'drone-kits',
    description: 'Carbon-fiber quadcopter DIY kits.',
    image_url: null,
    parent_id: null,
  },
  {
    id: 'cat-3',
    name: 'Hardware & Avionics',
    slug: 'hardware',
    description: 'Flight controllers, motors, sensors.',
    image_url: null,
    parent_id: null,
  },
  {
    id: 'cat-4',
    name: 'Software & Firmware Lab',
    slug: 'software',
    description: 'PID profiles, detection scripts, SDKs.',
    image_url: null,
    parent_id: null,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
