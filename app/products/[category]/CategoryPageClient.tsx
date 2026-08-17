'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import QuickViewModal from '@/components/QuickViewModal';
import type { Product } from '@/lib/types';

const CATEGORY_META: Record<string, { title: string; subtitle: string; tag: string }> = {
  workshops: {
    title: 'WORKSHOPS & BOOTCAMPS',
    subtitle: 'Hands-on drone engineering training programs. Build, code, and fly precision aerial vehicles.',
    tag: 'Education',
  },
  'drone-kits': {
    title: 'CUSTOM DRONE KITS',
    subtitle: 'Carbon-fiber quadcopter DIY kits engineered for precision flight and custom builds.',
    tag: 'Hardware',
  },
  hardware: {
    title: 'HARDWARE & AVIONICS',
    subtitle: 'Flight controllers, brushless motors, sensors, cameras, and avionics components.',
    tag: 'Hardware',
  },
  software: {
    title: 'SOFTWARE & FIRMWARE',
    subtitle: 'PID tuning profiles, object detection scripts, SDK tools, and firmware packages.',
    tag: 'Software',
  },
};

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
];

interface CategoryPageClientProps {
  categorySlug: string;
  initialProducts: Product[];
}

export default function CategoryPageClient({ categorySlug, initialProducts }: CategoryPageClientProps) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const meta = CATEGORY_META[categorySlug] || {
    title: categorySlug.toUpperCase().replace(/-/g, ' '),
    subtitle: '',
    tag: 'Products',
  };

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    result = result.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [initialProducts, search, priceRange, sort]);

  const handleFilterChange = (filterId: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[filterId] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [filterId]: next };
    });
  };

  const filters = categorySlug === 'hardware'
    ? [
        {
          id: 'component_type',
          label: 'Component Type',
          options: [
            { label: 'Flight Controllers', value: 'flight-controller' },
            { label: 'Motors', value: 'motors' },
            { label: 'Sensors', value: 'sensors' },
            { label: 'Cameras', value: 'cameras' },
            { label: 'Batteries', value: 'batteries' },
            { label: 'Propellers', value: 'propellers' },
          ],
          type: 'checkbox' as const,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-plugin-light">
      
      {/* Hero Header */}
      <section className="relative pt-40 pb-20 border-b border-plugin-border">
        <div className="container-fluid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <span className="tech-label text-theme-drone mb-6 block">{meta.tag}</span>
            <h1 className="text-display-lg font-display font-bold text-plugin-dark leading-none tracking-tight mb-8">
              {meta.title}
            </h1>
            <p className="text-body-lg text-plugin-text-muted max-w-2xl leading-relaxed">
              {meta.subtitle}
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-tech-grid opacity-30 pointer-events-none" />
      </section>

      {/* Main Content */}
      <section className="container-fluid py-20">
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 pb-6 border-b border-plugin-border">
          
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-plugin-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${meta.title.toLowerCase()}...`}
              className="w-full bg-transparent border-none pl-10 pr-4 py-3 text-sm text-plugin-dark placeholder:text-plugin-text-muted focus:outline-none focus:ring-0 font-mono"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono font-bold text-plugin-text-muted uppercase tracking-widest hidden md:inline">
              Sort by
            </span>
            <div className="relative group">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-plugin-surface border border-plugin-border px-4 py-3 pr-10 text-[11px] font-bold text-plugin-dark font-mono uppercase tracking-widest focus:outline-none focus:border-plugin-dark transition-colors cursor-pointer rounded-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-plugin-dark pointer-events-none group-hover:text-theme-drone transition-colors" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={() => setActiveFilters({})}
            priceRange={priceRange}
            onPriceChange={(min, max) => setPriceRange({ min, max })}
          />

          {/* Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 border border-plugin-border">
                <div className="text-plugin-text-muted text-4xl mb-4 font-mono font-light">∅</div>
                <p className="text-plugin-dark font-display font-bold text-xl mb-2">No products found</p>
                <p className="text-sm text-plugin-text-muted font-mono">
                  Try adjusting your filters or search query
                </p>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <span className="text-[10px] font-mono font-bold text-plugin-text-muted uppercase tracking-widest">
                    Showing {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-12">
                  {filteredProducts.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={i}
                      showQuickView={setQuickViewProduct}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
