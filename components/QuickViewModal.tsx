'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ShoppingCart, Calendar, MapPin, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import { formatPrice, getSeatsRemaining } from '@/lib/utils';
import type { Product, WorkshopBatch } from '@/lib/types';
import { useCartStore } from '@/lib/store';
import { useState } from 'react';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem } = useCartStore();
  const [selectedBatch, setSelectedBatch] = useState<WorkshopBatch | null>(null);
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);

  if (!product) return null;

  const isWorkshop = product.is_workshop;
  const batches = product.batches || [];
  const specs = product.specs as Record<string, unknown>;
  const effectivePrice = product.sale_price ?? product.price;
  const hasDiscount = product.sale_price !== null && product.sale_price < product.price;
  const activeBatch = selectedBatch || batches[0] || null;
  const seatsLeft = activeBatch
    ? getSeatsRemaining(activeBatch.total_seats, activeBatch.booked_seats)
    : null;

  const handleAddToCart = () => {
    addItem(product, 1, activeBatch || undefined);
    onClose();
  };

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
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-plugin-bg-secondary border border-plugin-cyan/[0.12] rounded-plugin shadow-2xl z-[81] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-plugin-cyan/[0.08]">
              <span className="hud-label text-[10px]">
                QUICK VIEW // {isWorkshop ? 'WORKSHOP' : 'HARDWARE'}
              </span>
              <button
                onClick={onClose}
                className="p-1 text-plugin-text-secondary hover:text-plugin-cyan transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="w-full md:w-1/2 aspect-square bg-gradient-to-br from-plugin-surface to-plugin-bg rounded-plugin flex items-center justify-center overflow-hidden relative">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].image_url}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Zap className="w-16 h-16 text-plugin-cyan/20" />
                  )}

                  {hasDiscount && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-plugin-danger/20 text-plugin-danger text-[10px] font-mono font-bold uppercase tracking-wider rounded-plugin border border-plugin-danger/30">
                      {Math.round(((product.price - effectivePrice) / product.price) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="w-full md:w-1/2 space-y-4">
                  <div>
                    <h2 className="font-display text-xl font-bold text-plugin-text tracking-wider">
                      {product.title}
                    </h2>
                    <p className="text-sm text-plugin-text-secondary leading-relaxed mt-2 line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-display font-bold text-plugin-cyan">
                      {formatPrice(effectivePrice)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-plugin-text-secondary/50 line-through font-mono">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  {/* Workshop batch selector */}
                  {isWorkshop && batches.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-label uppercase tracking-[0.15em] text-plugin-text-secondary font-mono text-xs">
                        Select Batch
                      </span>
                      <div className="space-y-2">
                        {batches.map((batch) => {
                          const batchSeats = getSeatsRemaining(batch.total_seats, batch.booked_seats);
                          const isSelected = activeBatch?.id === batch.id;
                          return (
                            <button
                              key={batch.id}
                              onClick={() => setSelectedBatch(batch)}
                              className={`w-full p-3 rounded-plugin border text-left transition-all duration-200 ${
                                isSelected
                                  ? 'border-plugin-cyan/40 bg-plugin-cyan/5'
                                  : 'border-plugin-cyan/[0.12] hover:border-plugin-cyan/20'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-3.5 h-3.5 text-plugin-cyan" />
                                  <span className="text-sm text-plugin-text font-mono">
                                    {new Date(batch.batch_date).toLocaleDateString('en-IN', {
                                      day: 'numeric', month: 'short', year: 'numeric',
                                    })}
                                  </span>
                                </div>
                                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                                  batchSeats <= 5 ? 'text-plugin-danger' : 'text-plugin-success'
                                }`}>
                                  {batchSeats <= 0 ? 'FULL' : `${batchSeats} SEATS`}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <MapPin className="w-3 h-3 text-plugin-text-secondary" />
                                <span className="text-xs text-plugin-text-secondary">{batch.location}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Key Specs */}
                  {specs && Object.keys(specs).length > 0 && (
                    <div className="space-y-1">
                      <span className="text-label uppercase tracking-[0.15em] text-plugin-text-secondary font-mono text-xs">
                        Specifications
                      </span>
                      <div className="space-y-1">
                        {Object.entries(specs).slice(0, 4).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-1.5 border-b border-plugin-cyan/[0.04]">
                            <span className="text-xs text-plugin-text-secondary font-mono uppercase tracking-wider">
                              {key.replace(/_/g, ' ')}
                            </span>
                            <span className="text-xs text-plugin-text font-mono">
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
            <div className="border-t border-plugin-cyan/[0.08] px-6 py-4 flex items-center gap-3">
              <Button
                className="flex-1 font-display tracking-wider"
                size="lg"
                onClick={handleAddToCart}
                disabled={isWorkshop && seatsLeft !== null && seatsLeft <= 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isWorkshop ? 'Reserve Seat' : 'Add to Cart'}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
