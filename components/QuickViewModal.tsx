'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  if (!product) return null;

  const isWorkshop = product.is_workshop;
  const specs = product.specs as Record<string, unknown>;
  const effectivePrice = product.sale_price ?? product.price;
  const hasDiscount = product.sale_price !== null && product.sale_price < product.price;
  const categorySlug = product.category?.slug || 'hardware';
  const detailHref = `/products/${categorySlug}/${product.slug}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-plugin-light border border-plugin-border rounded-lg shadow-2xl z-[81] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-plugin-border">
              <span className="text-[10px] font-mono font-bold text-plugin-text-muted uppercase tracking-widest">
                QUICK VIEW // {isWorkshop ? 'WORKSHOP' : product.category?.name?.toUpperCase() || 'PRODUCT'}
              </span>
              <button
                onClick={onClose}
                className="p-1 text-plugin-text-muted hover:text-plugin-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="w-full md:w-1/2 aspect-square bg-plugin-surface rounded-lg flex items-center justify-center overflow-hidden relative border border-plugin-border">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].image_url}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Zap className="w-16 h-16 text-plugin-border" />
                  )}

                  {hasDiscount && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-plugin-dark text-[10px] font-mono font-bold uppercase tracking-wider text-plugin-light">
                      {Math.round(((product.price - effectivePrice) / product.price) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 space-y-4">
                  <div>
                    <h2 className="font-display text-xl font-bold text-plugin-dark tracking-wider">
                      {product.title}
                    </h2>
                    <p className="text-sm text-plugin-text-muted leading-relaxed mt-2 line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-display font-bold text-plugin-dark">
                      {formatPrice(effectivePrice)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-plugin-text-muted line-through font-mono">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  {/* Key Specs */}
                  {specs && Object.keys(specs).length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-plugin-text-muted font-mono font-bold">
                        Specifications
                      </span>
                      <div className="space-y-1">
                        {Object.entries(specs).slice(0, 4).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-1.5 border-b border-plugin-border/50">
                            <span className="text-xs text-plugin-text-muted font-mono uppercase tracking-wider">
                              {key.replace(/_/g, ' ')}
                            </span>
                            <span className="text-xs text-plugin-dark font-mono">
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-plugin-border px-6 py-4 flex items-center gap-3">
              <Link
                href={detailHref}
                onClick={onClose}
                className="flex-1 py-3 bg-plugin-dark text-plugin-light text-sm font-mono font-bold uppercase tracking-widest hover:bg-theme-drone transition-colors flex items-center justify-center gap-2"
              >
                View Full Details
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="py-3 px-6 border border-plugin-border text-sm font-mono font-bold uppercase tracking-widest text-plugin-dark hover:bg-plugin-surface transition-colors"
              >
                Enquire
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
