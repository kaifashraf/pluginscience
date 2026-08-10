'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronRight, ChevronDown, ShoppingCart, Zap,
  Minus, Plus, Package, Truck, Shield, Check,
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProductBySlug, getRelatedProducts, getCrossCategoryProducts } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import type { Product } from '@/lib/types';

export default function ProductDetailPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [crossProducts, setCrossProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [expandedSpec, setExpandedSpec] = useState<string | null>('specs');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getProductBySlug(slug);
      setProduct(data);
      if (data) {
        const [related, cross] = await Promise.all([
          getRelatedProducts(data),
          getCrossCategoryProducts(data),
        ]);
        setRelatedProducts(related);
        setCrossProducts(cross);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-plugin-light pt-40">
        <div className="container-fluid">
          <div className="animate-pulse space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="aspect-square bg-plugin-border/30" />
              <div className="space-y-8">
                <div className="h-16 w-3/4 bg-plugin-border/30" />
                <div className="h-6 w-1/2 bg-plugin-border/30" />
                <div className="h-32 bg-plugin-border/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-plugin-light flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6 font-mono font-light text-plugin-border">404</div>
          <p className="text-plugin-dark font-display font-bold text-2xl mb-8">Product not found</p>
          <Link href={`/products/${categorySlug}`} className="btn-outline-premium">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const specs = product.specs as Record<string, unknown>;
  const effectivePrice = product.sale_price ?? product.price;
  const hasDiscount = product.sale_price !== null && product.sale_price < product.price;
  const images = product.images || [];
  const inStock = product.stock_quantity > 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="min-h-screen bg-plugin-light">
      
      {/* Breadcrumb */}
      <div className="pt-32 pb-8 border-b border-plugin-border">
        <div className="container-fluid">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-plugin-text-muted"
          >
            <Link href="/" className="hover:text-plugin-dark transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/products/${categorySlug}`} className="hover:text-plugin-dark transition-colors capitalize">
              {categorySlug.replace(/-/g, ' ')}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-plugin-dark">{product.title}</span>
          </motion.nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="border-b border-plugin-border bg-plugin-surface">
        <div className="container-fluid py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Main Image */}
              <div className="relative aspect-square bg-plugin-light border border-plugin-border overflow-hidden mb-4">
                {images.length > 0 ? (
                  <img
                    src={images[selectedImageIndex]?.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-mono text-plugin-border text-2xl">NO IMAGE</span>
                  </div>
                )}

                {hasDiscount && (
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 bg-plugin-dark text-[10px] font-mono font-bold text-plugin-light tracking-widest uppercase">
                      {Math.round(((product.price - effectivePrice) / product.price) * 100)}% OFF
                    </span>
                  </div>
                )}
                
                {/* HUD labels */}
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-plugin-light text-[10px] font-mono font-bold text-plugin-dark tracking-widest uppercase border border-plugin-dark">
                    PRODUCT SPEC VIEW
                  </span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <span className="px-3 py-1 bg-plugin-light/90 text-[10px] font-mono font-bold text-plugin-text-muted tracking-widest uppercase border border-plugin-border">
                    SKU: {product.slug.toUpperCase().slice(0, 12)}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`w-20 h-20 flex-shrink-0 border transition-all duration-300 ${
                        i === selectedImageIndex
                          ? 'border-plugin-dark grayscale-0'
                          : 'border-plugin-border grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:border-plugin-dark'
                      }`}
                    >
                      <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right: Details */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <span className="text-[10px] font-mono font-bold text-theme-hardware tracking-widest uppercase mb-6 block">
                {categorySlug === 'drone-kits' ? 'Drone Kit' : categorySlug === 'software' ? 'Software / Digital' : 'Hardware Component'}
              </span>
              <h1 className="text-display font-display font-bold text-plugin-dark leading-[1.1] mb-8">
                {product.title}
              </h1>
              
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-display font-bold text-plugin-dark">
                  {formatPrice(effectivePrice)}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-plugin-text-muted line-through font-mono">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              
              <p className="text-body text-plugin-text-muted leading-relaxed mb-12 max-w-xl">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-3 mb-12">
                <span className={`w-3 h-3 ${inStock ? 'bg-plugin-dark animate-pulse' : 'bg-plugin-border'}`} />
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${inStock ? 'text-plugin-dark' : 'text-plugin-text-muted'}`}>
                  {inStock ? `IN STOCK — ${product.stock_quantity} UNITS` : 'OUT OF STOCK'}
                </span>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-plugin-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-4 text-plugin-text-muted hover:bg-plugin-light hover:text-plugin-dark transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center font-mono font-bold text-plugin-dark">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                      className="p-4 text-plugin-text-muted hover:bg-plugin-light hover:text-plugin-dark transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to cart */}
                  <button
                    className={`flex-1 py-4 text-sm font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-4 transition-colors duration-300 ${
                      !inStock 
                      ? 'bg-plugin-border text-plugin-text-muted cursor-not-allowed'
                      : 'bg-plugin-dark text-plugin-light hover:bg-theme-hardware'
                    }`}
                    onClick={handleAddToCart}
                    disabled={!inStock}
                  >
                    {!inStock ? 'OUT OF STOCK' : 'ADD TO CART'}
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-px bg-plugin-border mt-12">
                <div className="bg-plugin-surface p-6 flex flex-col items-center justify-center text-center">
                  <Package className="w-5 h-5 text-plugin-dark mb-3" />
                  <span className="text-[10px] font-mono font-bold text-plugin-text-muted uppercase tracking-widest block">Secure Packaging</span>
                </div>
                <div className="bg-plugin-surface p-6 flex flex-col items-center justify-center text-center">
                  <Truck className="w-5 h-5 text-plugin-dark mb-3" />
                  <span className="text-[10px] font-mono font-bold text-plugin-text-muted uppercase tracking-widest block">Fast Shipping</span>
                </div>
                <div className="bg-plugin-surface p-6 flex flex-col items-center justify-center text-center">
                  <Shield className="w-5 h-5 text-plugin-dark mb-3" />
                  <span className="text-[10px] font-mono font-bold text-plugin-text-muted uppercase tracking-widest block">Quality Assured</span>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Accordion Specs Section */}
      <section className="bg-plugin-light py-16 lg:py-24 border-b border-plugin-border">
        <div className="container-fluid max-w-4xl">
          <div className="border-t border-plugin-border">
            
            {/* Specs */}
            {specs && Object.keys(specs).length > 0 && (
              <div className="border-b border-plugin-border">
                <button
                  onClick={() => setExpandedSpec(expandedSpec === 'specs' ? null : 'specs')}
                  className="w-full flex items-center justify-between py-8 text-left group"
                >
                  <span className="text-xl font-display font-bold text-plugin-dark uppercase tracking-widest group-hover:text-theme-hardware transition-colors">
                    Technical Specifications
                  </span>
                  {expandedSpec === 'specs' ? (
                    <Minus className="w-6 h-6 text-plugin-dark" />
                  ) : (
                    <Plus className="w-6 h-6 text-plugin-text-muted group-hover:text-plugin-dark transition-colors" />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: expandedSpec === 'specs' ? 'auto' : 0, opacity: expandedSpec === 'specs' ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="pb-8">
                    <div className="space-y-0 border-t border-plugin-border">
                      {Object.entries(specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-4 border-b border-plugin-border last:border-0">
                          <span className="text-xs font-mono font-bold text-plugin-text-muted uppercase tracking-widest">
                            {key.replace(/_/g, ' ')}
                          </span>
                          <span className="text-sm font-mono text-plugin-dark text-right max-w-[60%]">
                            {Array.isArray(value) ? (value as string[]).join(', ') : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Shipping */}
            <div className="border-b border-plugin-border">
              <button
                onClick={() => setExpandedSpec(expandedSpec === 'shipping' ? null : 'shipping')}
                className="w-full flex items-center justify-between py-8 text-left group"
              >
                <span className="text-xl font-display font-bold text-plugin-dark uppercase tracking-widest group-hover:text-theme-drone transition-colors">
                  Shipping & Returns
                </span>
                {expandedSpec === 'shipping' ? (
                  <Minus className="w-6 h-6 text-plugin-dark" />
                ) : (
                  <Plus className="w-6 h-6 text-plugin-text-muted group-hover:text-plugin-dark transition-colors" />
                )}
              </button>
              <motion.div
                initial={false}
                animate={{ height: expandedSpec === 'shipping' ? 'auto' : 0, opacity: expandedSpec === 'shipping' ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="pb-8 pl-8">
                  <ul className="space-y-4 text-body text-plugin-text-muted">
                    <li className="flex items-center gap-4"><Check className="w-5 h-5 text-plugin-dark" /> Standard shipping: 5-7 business days</li>
                    <li className="flex items-center gap-4"><Check className="w-5 h-5 text-plugin-dark" /> Express shipping: 2-3 business days</li>
                    <li className="flex items-center gap-4"><Check className="w-5 h-5 text-plugin-dark" /> Free shipping on orders above ₹5,000</li>
                    <li className="flex items-center gap-4"><Check className="w-5 h-5 text-plugin-dark" /> 7-day return policy for unused items</li>
                  </ul>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Products */}
      {(crossProducts.length > 0 || relatedProducts.length > 0) && (
        <section className="bg-plugin-surface py-24">
          <div className="container-fluid">
            
            {relatedProducts.length > 0 && (
              <div className="mb-24">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-theme-hardware uppercase tracking-widest block mb-4">You May Also Need</span>
                    <h2 className="text-heading font-display font-bold text-plugin-dark">Similar Products</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {relatedProducts.slice(0, 4).map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              </div>
            )}

            {crossProducts.length > 0 && (
              <div>
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-theme-drone uppercase tracking-widest block mb-4">Learn To Build</span>
                    <h2 className="text-heading font-display font-bold text-plugin-dark">Related Workshops</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {crossProducts.slice(0, 4).map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </section>
      )}
      
    </div>
  );
}
