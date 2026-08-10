'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import Input from '@/components/ui/Input';

// Seed data for demo search
const DEMO_PRODUCTS = [
  { title: '2-Day Drone Assembly Bootcamp', slug: 'drone-assembly-bootcamp', category: 'Workshops' },
  { title: 'Autonomous YOLOv8 Drone Coding', slug: 'yolov8-autonomous-drone', category: 'Workshops' },
  { title: 'FPV Flight Dynamics Masterclass', slug: 'fpv-flight-dynamics', category: 'Workshops' },
  { title: 'Carbon Phantom X4 Kit', slug: 'carbon-phantom-x4-kit', category: 'Drone Kits' },
  { title: 'Micro Racer FPV Kit', slug: 'micro-racer-fpv-kit', category: 'Drone Kits' },
  { title: 'F7 Flight Controller V3', slug: 'f7-flight-controller-v3', category: 'Hardware' },
  { title: 'Brushless Motor 2212 920KV', slug: 'brushless-motor-2212-920kv', category: 'Hardware' },
  { title: 'YOLOv8 Obstacle Detection SDK', slug: 'yolov8-obstacle-sdk', category: 'Software' },
  { title: 'PID Auto-Tune Profile Pack', slug: 'pid-autotune-profiles', category: 'Software' },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  const results = query.length > 1
    ? DEMO_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-2xl mx-auto mt-24 px-4"
          >
            <div className="bg-plugin-bg-secondary border border-plugin-cyan/[0.12] rounded-plugin shadow-plugin-glow overflow-hidden">
              {/* Search Input */}
              <div className="p-4 border-b border-plugin-cyan/[0.08]">
                <Input
                  placeholder="Search workshops, kits, components..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  icon={<Search className="w-5 h-5" />}
                  autoFocus
                  className="text-base"
                />
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="max-h-80 overflow-y-auto p-2">
                  {results.map((result) => (
                    <a
                      key={result.slug}
                      href={`/products/${result.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between px-4 py-3 rounded-plugin hover:bg-plugin-surface transition-colors group"
                    >
                      <div>
                        <div className="text-sm text-plugin-text group-hover:text-plugin-cyan transition-colors">
                          {result.title}
                        </div>
                        <div className="text-xs text-plugin-text-secondary font-mono uppercase tracking-wider mt-0.5">
                          {result.category}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-plugin-text-secondary group-hover:text-plugin-cyan transition-colors opacity-0 group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              )}

              {/* No results */}
              {query.length > 1 && results.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-plugin-text-secondary font-mono text-sm">
                    No results found for &quot;{query}&quot;
                  </p>
                </div>
              )}

              {/* Hint */}
              {query.length <= 1 && (
                <div className="p-6 text-center">
                  <p className="text-plugin-text-secondary/50 font-mono text-sm">
                    Type at least 2 characters to search
                  </p>
                </div>
              )}
            </div>

            {/* Keyboard hint */}
            <div className="flex justify-center mt-3">
              <span className="text-xs text-plugin-text-secondary/40 font-mono">
                Press ESC to close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
