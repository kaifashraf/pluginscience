'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal, clearCart } =
    useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-plugin-dark/60 backdrop-blur-sm z-[70]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-plugin-light border-l border-plugin-border shadow-2xl z-[71] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-plugin-border bg-plugin-light">
              <div className="flex items-center gap-4">
                <h2 className="font-display text-2xl font-light text-plugin-dark">
                  Your Cart
                </h2>
                <span className="text-sm font-display font-medium text-plugin-text-muted bg-plugin-surface border border-plugin-border px-3 py-1 rounded-full">
                  {items.length}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-plugin-text-muted hover:text-plugin-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-8">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="text-plugin-border text-5xl font-light mb-4">Your cart is empty.</div>
                  <div>
                    <p className="text-sm text-plugin-text-muted max-w-xs">
                      Discover our exclusive workshops and premium hardware components to begin your journey.
                    </p>
                  </div>
                  <button 
                    className="mt-6 border-b border-plugin-dark pb-1 text-sm font-display font-medium text-plugin-dark hover:text-theme-drone transition-colors"
                    onClick={closeCart}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.batch?.id || 'no-batch'}`}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="border-b border-plugin-border pb-8 last:border-0"
                    >
                      <div className="flex gap-6">
                        {/* Image */}
                        <div className="w-24 h-24 bg-plugin-surface border border-plugin-border flex-shrink-0 flex items-center justify-center overflow-hidden">
                           {item.product.images && item.product.images.length > 0 ? (
                             <img src={item.product.images[0].image_url} alt="" className="w-full h-full object-cover grayscale" />
                           ) : (
                             <span className="font-mono text-plugin-border text-xs">NO IMG</span>
                           )}
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-display font-medium text-plugin-dark truncate">
                              {item.product.title}
                            </h3>
                            {item.batch && (
                              <p className="text-xs text-plugin-text-muted mt-1">
                                {new Date(item.batch.batch_date).toLocaleDateString()}
                              </p>
                            )}
                            <p className="text-sm text-plugin-dark font-medium mt-2">
                              {formatPrice(item.product.sale_price ?? item.product.price)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity controls */}
                            <div className="flex items-center border border-plugin-border">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                    item.batch?.id
                                  )
                                }
                                className="p-2 text-plugin-text-muted hover:text-plugin-dark hover:bg-plugin-surface transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-[11px] font-mono font-bold text-plugin-dark w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                    item.batch?.id
                                  )
                                }
                                className="p-2 text-plugin-text-muted hover:text-plugin-dark hover:bg-plugin-surface transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Remove */}
                            <button
                              onClick={() => removeItem(item.product.id, item.batch?.id)}
                              className="text-xs text-plugin-text-muted hover:text-plugin-dark transition-colors border-b border-transparent hover:border-plugin-dark"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-plugin-border p-8 bg-plugin-light">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-plugin-text-muted font-display font-medium">
                    Subtotal
                  </span>
                  <span className="text-2xl font-display font-medium text-plugin-dark">
                    {formatPrice(getTotal())}
                  </span>
                </div>
                <p className="text-xs text-plugin-text-muted mb-8">
                  Taxes and shipping calculated at checkout.
                </p>
                <div className="space-y-4">
                  <Link href="/checkout" onClick={closeCart} className="block w-full">
                    <button className="w-full py-4 bg-plugin-dark text-plugin-light text-sm font-display font-medium hover:bg-theme-drone transition-colors flex items-center justify-center gap-3">
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full py-4 border border-plugin-border text-sm font-display font-medium text-plugin-dark hover:bg-plugin-surface transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
