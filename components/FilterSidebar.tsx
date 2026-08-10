'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import Button from '@/components/ui/Button';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  type: 'checkbox' | 'range';
}

interface FilterSidebarProps {
  filters: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, value: string) => void;
  onClearAll: () => void;
  priceRange?: { min: number; max: number };
  onPriceChange?: (min: number, max: number) => void;
}

export default function FilterSidebar({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  priceRange,
  onPriceChange,
}: FilterSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(filters.map((f) => f.id))
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalActiveFilters = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const filterContent = (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-plugin-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-plugin-dark" />
          <h3 className="font-display font-bold tracking-widest uppercase text-plugin-dark text-sm">
            Filters
          </h3>
          {totalActiveFilters > 0 && (
            <span className="px-2 py-0.5 bg-plugin-dark text-plugin-light text-[10px] font-mono font-bold">
              {totalActiveFilters}
            </span>
          )}
        </div>
        {totalActiveFilters > 0 && (
          <button
            onClick={onClearAll}
            className="text-[10px] text-plugin-text-muted hover:text-plugin-dark font-mono uppercase tracking-widest transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter Groups */}
      {filters.map((group) => (
        <div key={group.id} className="border-b border-plugin-border py-6">
          <button
            onClick={() => toggleGroup(group.id)}
            className="flex items-center justify-between w-full text-left group"
          >
            <span className="text-[11px] uppercase tracking-widest text-plugin-dark font-mono font-bold">
              {group.label}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-plugin-text-muted transition-transform duration-200 ${
                expandedGroups.has(group.id) ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {expandedGroups.has(group.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-6 space-y-4">
                  {group.type === 'checkbox' &&
                    group.options.map((option) => {
                      const isActive = activeFilters[group.id]?.includes(option.value);
                      return (
                        <label
                          key={option.value}
                          className="flex items-center gap-4 cursor-pointer group/item"
                        >
                          <div
                            className={`w-4 h-4 border transition-all duration-200 flex items-center justify-center ${
                              isActive
                                ? 'bg-plugin-dark border-plugin-dark'
                                : 'border-plugin-border group-hover/item:border-plugin-dark bg-plugin-surface'
                            }`}
                            onClick={() => onFilterChange(group.id, option.value)}
                          >
                            {isActive && (
                              <svg className="w-3 h-3 text-plugin-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span
                            className={`text-sm transition-colors ${
                              isActive ? 'text-plugin-dark font-medium' : 'text-plugin-text-muted'
                            }`}
                            onClick={() => onFilterChange(group.id, option.value)}
                          >
                            {option.label}
                          </span>
                          {option.count !== undefined && (
                            <span className="ml-auto text-[10px] font-mono text-plugin-text-muted">
                              {option.count}
                            </span>
                          )}
                        </label>
                      );
                    })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Price Range */}
      {priceRange && onPriceChange && (
        <div className="py-6">
          <span className="text-[11px] uppercase tracking-widest text-plugin-dark font-mono font-bold block mb-6">
            Price Range
          </span>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => onPriceChange(Number(e.target.value), priceRange.max)}
              className="w-full bg-plugin-surface border border-plugin-border px-3 py-2 text-sm text-plugin-dark font-mono focus:outline-none focus:border-plugin-dark transition-colors rounded-none"
              placeholder="Min"
            />
            <span className="text-plugin-text-muted text-xs">—</span>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => onPriceChange(priceRange.min, Number(e.target.value))}
              className="w-full bg-plugin-surface border border-plugin-border px-3 py-2 text-sm text-plugin-dark font-mono focus:outline-none focus:border-plugin-dark transition-colors rounded-none"
              placeholder="Max"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-full flex items-center justify-center p-4 border border-plugin-border text-[11px] font-mono font-bold uppercase tracking-widest text-plugin-dark hover:bg-plugin-dark hover:text-plugin-light transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 mr-3" />
          Filters
          {totalActiveFilters > 0 && (
            <span className="ml-3 px-2 py-0.5 bg-plugin-light text-plugin-dark border border-plugin-dark text-[10px] font-mono">
              {totalActiveFilters}
            </span>
          )}
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-32">{filterContent}</div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-plugin-dark/60 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-plugin-light border-r border-plugin-border z-[61] p-6 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-plugin-border">
                <span className="font-display font-bold tracking-widest uppercase text-plugin-dark text-sm">
                  Filters
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-plugin-text-muted hover:text-plugin-dark transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {filterContent}
              <div className="mt-8 pt-8 border-t border-plugin-border">
                <button
                  className="w-full p-4 bg-plugin-dark text-plugin-light text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-theme-drone transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
