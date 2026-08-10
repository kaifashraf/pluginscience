'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ShoppingCart, Minus, Plus, Trash2, ArrowRight, ArrowLeft, Tag, X, Zap,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { validateCoupon } from '@/lib/data';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = getTotal();
  const discount = appliedCoupon?.discount || 0;
  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError('');

    const result = await validateCoupon(couponCode.trim(), subtotal);
    if (result.valid && result.coupon) {
      const discountAmount = result.coupon.discount_type === 'percentage'
        ? Math.round(subtotal * (result.coupon.discount_value / 100))
        : result.coupon.discount_value;
      setAppliedCoupon({ code: result.coupon.code, discount: discountAmount });
    } else {
      setCouponError(result.error || 'Invalid coupon');
    }
    setCouponLoading(false);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  return (
    <div className="min-h-screen bg-plugin-bg pt-28 md:pt-32 pb-24">
      <div className="container-plugin">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="hud-label text-sm mb-4 block">SYSTEMS // CART</span>
          <h1 className="font-display text-hero font-black text-plugin-text tracking-wider mb-8">
            YOUR CART
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ShoppingCart className="w-16 h-16 text-plugin-text-secondary/20 mx-auto mb-4" />
            <p className="text-xl text-plugin-text-secondary font-medium">Your cart is empty</p>
            <p className="text-sm text-plugin-text-secondary/50 mt-2 mb-6">
              Add workshops or hardware to get started
            </p>
            <Link href="/workshops">
              <Button variant="ghost" className="font-display tracking-wider">
                <ArrowLeft className="w-4 h-4 mr-2" /> Browse Workshops
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-plugin-text-secondary uppercase tracking-wider">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in cart
                </span>
                <button
                  onClick={clearCart}
                  className="text-xs font-mono text-plugin-text-secondary hover:text-plugin-danger uppercase tracking-wider transition-colors"
                >
                  Clear All
                </button>
              </div>

              {items.map((item, i) => (
                <motion.div
                  key={`${item.product.id}-${item.batch?.id || 'nb'}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="plugin-card p-5"
                >
                  <div className="flex gap-5">
                    {/* Image */}
                    <div className="w-20 h-20 bg-gradient-to-br from-plugin-surface to-plugin-bg rounded-plugin flex-shrink-0 flex items-center justify-center border border-plugin-cyan/[0.08]">
                      {item.product.images && item.product.images.length > 0 ? (
                        <img
                          src={item.product.images[0].image_url}
                          alt={item.product.title}
                          className="w-full h-full object-cover rounded-plugin"
                        />
                      ) : (
                        <Zap className="w-6 h-6 text-plugin-cyan/20" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-base font-semibold text-plugin-text tracking-wide">
                            {item.product.title}
                          </h3>
                          {item.batch && (
                            <p className="text-xs text-plugin-text-secondary font-mono mt-1">
                              📅 {new Date(item.batch.batch_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              {' • '} 📍 {item.batch.location}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.batch?.id)}
                          className="p-1.5 text-plugin-text-secondary hover:text-plugin-danger transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 border border-plugin-cyan/[0.12] rounded-plugin">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.batch?.id)}
                            className="p-2 text-plugin-text-secondary hover:text-plugin-cyan transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-mono text-sm text-plugin-text">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.batch?.id)}
                            className="p-2 text-plugin-text-secondary hover:text-plugin-cyan transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-lg font-display font-bold text-plugin-cyan">
                          {formatPrice((item.product.sale_price ?? item.product.price) * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <Link href="/workshops" className="inline-flex items-center gap-2 text-sm text-plugin-text-secondary hover:text-plugin-cyan transition-colors font-mono mt-4">
                <ArrowLeft className="w-4 h-4" /> Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="plugin-card p-6 space-y-5 sticky top-24">
                <h2 className="font-display text-lg font-semibold tracking-wider uppercase text-plugin-text">
                  Order Summary
                </h2>

                {/* Coupon */}
                <div className="space-y-2">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-plugin-success/10 border border-plugin-success/20 rounded-plugin">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-plugin-success" />
                        <span className="text-sm font-mono text-plugin-success font-medium">
                          {appliedCoupon.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-plugin-success">
                          −{formatPrice(appliedCoupon.discount)}
                        </span>
                        <button onClick={removeCoupon} className="text-plugin-text-secondary hover:text-plugin-danger">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                        placeholder="Coupon code"
                        className="flex-1 bg-plugin-bg border border-plugin-cyan/[0.12] rounded-plugin px-3 py-2.5 text-sm text-plugin-text font-mono uppercase placeholder:text-plugin-text-secondary/40 focus:outline-none focus:border-plugin-cyan/40 transition-colors"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleApplyCoupon}
                        isLoading={couponLoading}
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                  {couponError && (
                    <p className="text-xs text-plugin-danger font-mono">{couponError}</p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-plugin-text-secondary font-mono">Subtotal</span>
                    <span className="text-sm text-plugin-text font-mono">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-plugin-success font-mono">Discount</span>
                      <span className="text-sm text-plugin-success font-mono">−{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-plugin-text-secondary font-mono">Shipping</span>
                    <span className="text-sm text-plugin-text-secondary font-mono">
                      {subtotal >= 5000 ? 'FREE' : 'Calculated at checkout'}
                    </span>
                  </div>
                  <div className="border-t border-plugin-cyan/[0.08] pt-3">
                    <div className="flex justify-between">
                      <span className="text-base font-display font-semibold text-plugin-text tracking-wider uppercase">
                        Total
                      </span>
                      <span className="text-xl font-display font-bold text-plugin-cyan">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full font-display tracking-wider" size="lg">
                    Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <p className="text-[10px] text-plugin-text-secondary/40 font-mono text-center">
                  SECURE PAYMENT · RAZORPAY ENCRYPTED
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
