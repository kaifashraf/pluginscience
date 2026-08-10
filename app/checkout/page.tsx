'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  User, MapPin, CreditCard, CheckCircle2, ArrowRight, ArrowLeft,
  ShoppingCart, Lock, Zap, Check,
} from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

type CheckoutStep = 'details' | 'payment' | 'confirmation';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<CheckoutStep>('details');
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState<FormData>({
    fullName: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const subtotal = getTotal();
  const hasWorkshop = items.some(i => i.product.is_workshop);
  const hasPhysical = items.some(i => !i.product.is_workshop);

  const steps: { id: CheckoutStep; label: string; icon: React.ElementType }[] = [
    { id: 'details', label: hasPhysical ? 'Shipping' : 'Details', icon: hasPhysical ? MapPin : User },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'confirmation', label: 'Done', icon: CheckCircle2 },
  ];

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Valid phone required';
    if (hasPhysical) {
      if (!formData.address.trim()) newErrors.address = 'Required';
      if (!formData.city.trim()) newErrors.city = 'Required';
      if (!formData.state.trim()) newErrors.state = 'Required';
      if (!formData.pincode.trim() || formData.pincode.length !== 6) newErrors.pincode = '6-digit pincode required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 'details') {
      if (validate()) setStep('payment');
    }
  };

  const simulatePayment = () => {
    setLoading(true);
    setTimeout(() => {
      const num = `PLGN-${10000 + Math.floor(Math.random() * 90000)}`;
      setOrderNumber(num);
      setStep('confirmation');
      clearCart();
      setLoading(false);
    }, 1500);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const inputClasses = (field: keyof FormData) =>
    `w-full bg-plugin-light border ${errors[field] ? 'border-plugin-danger' : 'border-plugin-border'} px-4 py-3 text-sm text-plugin-dark placeholder:text-plugin-text-muted focus:outline-none focus:border-plugin-dark transition-colors font-mono rounded-none`;

  return (
    <div className="min-h-screen bg-plugin-light pt-28 md:pt-40 pb-24">
      <div className="container-fluid max-w-6xl">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mb-12 pb-6 border-b border-plugin-border">
          <h1 className="text-4xl font-display font-medium text-plugin-dark">
            Checkout
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Form Area */}
          <div className="lg:col-span-7">
            
            {/* Step Indicator */}
            <div className="flex items-center gap-4 mb-12">
              {steps.map((s, i) => {
                const isActive = s.id === step;
                const isPast = steps.findIndex(x => x.id === step) > i;
                return (
                  <div key={s.id} className="flex items-center gap-4 flex-1">
                    <div className="flex flex-col gap-1">
                       <span className={`text-xs font-display ${
                          isActive ? 'text-plugin-dark' : isPast ? 'text-plugin-dark' : 'text-plugin-text-muted'
                        }`}>
                          Step 0{i + 1}
                       </span>
                       <span className={`text-lg font-display font-medium ${
                          isActive ? 'text-plugin-dark' : isPast ? 'text-plugin-dark' : 'text-plugin-text-muted'
                        }`}>
                          {s.label}
                       </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-px ${isPast ? 'bg-plugin-dark' : 'bg-plugin-border'}`} />
                    )}
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Details */}
              {step === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-mono font-bold text-plugin-dark uppercase tracking-widest block mb-2">Full Name</label>
                        <input type="text" value={formData.fullName} onChange={e => updateField('fullName', e.target.value)} placeholder="JOHN DOE" className={inputClasses('fullName')} />
                        {errors.fullName && <p className="text-[10px] text-plugin-danger font-mono mt-2 uppercase tracking-widest">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="text-[10px] font-mono font-bold text-plugin-dark uppercase tracking-widest block mb-2">Email Address</label>
                        <input type="email" value={formData.email} onChange={e => updateField('email', e.target.value)} placeholder="PILOT@EXAMPLE.COM" className={inputClasses('email')} />
                        {errors.email && <p className="text-[10px] text-plugin-danger font-mono mt-2 uppercase tracking-widest">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-bold text-plugin-dark uppercase tracking-widest block mb-2">Phone Number</label>
                      <input type="tel" value={formData.phone} onChange={e => updateField('phone', e.target.value)} placeholder="+91 9876543210" className={inputClasses('phone')} />
                      {errors.phone && <p className="text-[10px] text-plugin-danger font-mono mt-2 uppercase tracking-widest">{errors.phone}</p>}
                    </div>

                    {hasPhysical && (
                      <div className="pt-6 border-t border-plugin-border space-y-6">
                        <div>
                          <label className="text-[10px] font-mono font-bold text-plugin-dark uppercase tracking-widest block mb-2">Shipping Address</label>
                          <input type="text" value={formData.address} onChange={e => updateField('address', e.target.value)} placeholder="123 STREET NAME" className={inputClasses('address')} />
                          {errors.address && <p className="text-[10px] text-plugin-danger font-mono mt-2 uppercase tracking-widest">{errors.address}</p>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div>
                            <label className="text-[10px] font-mono font-bold text-plugin-dark uppercase tracking-widest block mb-2">City</label>
                            <input type="text" value={formData.city} onChange={e => updateField('city', e.target.value)} placeholder="BENGALURU" className={inputClasses('city')} />
                            {errors.city && <p className="text-[10px] text-plugin-danger font-mono mt-2 uppercase tracking-widest">{errors.city}</p>}
                          </div>
                          <div>
                            <label className="text-[10px] font-mono font-bold text-plugin-dark uppercase tracking-widest block mb-2">State</label>
                            <input type="text" value={formData.state} onChange={e => updateField('state', e.target.value)} placeholder="KARNATAKA" className={inputClasses('state')} />
                            {errors.state && <p className="text-[10px] text-plugin-danger font-mono mt-2 uppercase tracking-widest">{errors.state}</p>}
                          </div>
                          <div>
                            <label className="text-[10px] font-mono font-bold text-plugin-dark uppercase tracking-widest block mb-2">Pincode</label>
                            <input type="text" value={formData.pincode} onChange={e => updateField('pincode', e.target.value)} placeholder="560001" maxLength={6} className={inputClasses('pincode')} />
                            {errors.pincode && <p className="text-[10px] text-plugin-danger font-mono mt-2 uppercase tracking-widest">{errors.pincode}</p>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-8 border-t border-plugin-border">
                    <Link href="/cart" className="flex-1">
                      <button className="w-full py-4 border border-plugin-border text-[11px] font-mono font-bold uppercase tracking-widest text-plugin-dark hover:bg-plugin-surface transition-colors flex justify-center items-center gap-3">
                        <ArrowLeft className="w-4 h-4" /> Return to Cart
                      </button>
                    </Link>
                    <button 
                      className="flex-[2] py-4 bg-plugin-dark text-plugin-light text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-theme-drone transition-colors flex justify-center items-center gap-3"
                      onClick={handleNextStep}
                    >
                      Proceed to Payment <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="p-6 border border-plugin-dark bg-plugin-surface">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="w-5 h-5 text-plugin-dark" />
                      <span className="text-sm font-display font-bold text-plugin-dark uppercase tracking-widest">Secure Payment</span>
                    </div>
                    <p className="text-xs text-plugin-text-muted font-mono leading-relaxed">
                      All transactions are secured and encrypted. We support UPI, Credit/Debit Cards, NetBanking, and Wallets.
                    </p>
                  </div>

                  {/* Order Review List */}
                  <div className="border border-plugin-border">
                     <div className="p-4 border-b border-plugin-border bg-plugin-surface">
                        <span className="text-[10px] font-mono font-bold text-plugin-dark uppercase tracking-widest">Review Order</span>
                     </div>
                     <div className="p-6 space-y-4">
                      {items.map(item => (
                        <div key={`${item.product.id}-${item.batch?.id}`} className="flex justify-between items-center pb-4 border-b border-plugin-border last:border-0 last:pb-0">
                          <div>
                            <span className="text-sm font-display font-bold text-plugin-dark uppercase tracking-wider block">{item.product.title}</span>
                            <span className="text-[10px] text-plugin-text-muted font-mono uppercase tracking-widest">QTY: {item.quantity}</span>
                          </div>
                          <span className="text-sm font-mono font-bold text-plugin-dark">
                            {formatPrice((item.product.sale_price ?? item.product.price) * item.quantity)}
                          </span>
                        </div>
                      ))}
                     </div>
                  </div>

                  <div className="flex gap-4 pt-8">
                    <button 
                      className="flex-1 py-4 border border-plugin-border text-[11px] font-mono font-bold uppercase tracking-widest text-plugin-dark hover:bg-plugin-surface transition-colors flex justify-center items-center gap-3"
                      onClick={() => setStep('details')}
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Details
                    </button>
                    <button
                      className="flex-[2] py-4 bg-plugin-dark text-plugin-light text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-theme-drone transition-colors flex justify-center items-center gap-3"
                      onClick={simulatePayment}
                      disabled={loading}
                    >
                      {loading ? 'Processing...' : `Pay ${formatPrice(subtotal)}`}
                      {!loading && <CreditCard className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {step === 'confirmation' && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-plugin-dark rounded-full flex items-center justify-center mx-auto mb-8">
                     <Check className="w-12 h-12 text-plugin-light" />
                  </div>
                  <h2 className="text-4xl font-display font-medium text-plugin-dark mb-8">
                    Order Confirmed
                  </h2>

                  <div className="inline-block border border-plugin-border p-6 mb-12 bg-plugin-surface">
                    <span className="text-sm font-display text-plugin-text-muted block mb-2">
                      Order Number
                    </span>
                    <span className="text-2xl font-mono text-plugin-dark">
                      {orderNumber}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/dashboard">
                      <button className="px-8 py-4 bg-plugin-dark text-plugin-light text-sm font-display font-medium hover:bg-theme-drone transition-colors">
                        View Dashboard
                      </button>
                    </Link>
                    <Link href="/">
                      <button className="px-8 py-4 border border-plugin-border text-sm font-display font-medium text-plugin-dark hover:bg-plugin-surface transition-colors">
                        Return Home
                      </button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar: Order Summary */}
          {step !== 'confirmation' && (
            <div className="lg:col-span-5">
              <div className="sticky top-32 p-8 border border-plugin-border bg-plugin-surface">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-plugin-border">
                  <ShoppingCart className="w-5 h-5 text-plugin-dark" />
                  <h3 className="font-display text-lg font-bold uppercase tracking-widest text-plugin-dark">
                    Summary
                  </h3>
                </div>

                <div className="space-y-6 max-h-80 overflow-y-auto pr-2 mb-8 border-b border-plugin-border pb-8">
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.batch?.id}`} className="flex gap-4">
                      <div className="w-16 h-16 bg-plugin-light border border-plugin-border flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {item.product.images && item.product.images.length > 0 ? (
                           <img src={item.product.images[0].image_url} alt="" className="w-full h-full object-cover grayscale" />
                        ) : (
                           <Zap className="w-6 h-6 text-plugin-border" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-display font-bold text-plugin-dark uppercase tracking-widest truncate">{item.product.title}</p>
                        <p className="text-[10px] text-plugin-text-muted font-mono uppercase tracking-widest mt-1">QTY: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-plugin-dark flex-shrink-0">
                        {formatPrice((item.product.sale_price ?? item.product.price) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[10px] font-mono font-bold text-plugin-text-muted uppercase tracking-widest">Subtotal</span>
                    <span className="text-sm font-mono font-bold text-plugin-dark">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] font-mono font-bold text-plugin-text-muted uppercase tracking-widest">Shipping</span>
                    <span className="text-[10px] font-mono font-bold text-plugin-text-muted uppercase tracking-widest">
                      {subtotal >= 5000 ? 'FREE' : 'CALCULATED NEXT'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-6 border-t border-plugin-dark">
                    <span className="text-lg font-display font-bold text-plugin-dark uppercase tracking-widest">Total</span>
                    <span className="text-2xl font-mono font-bold text-plugin-dark">{formatPrice(subtotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
