'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  index?: number;
  showQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, showQuickView }: ProductCardProps) {
  const isWorkshop = product.is_workshop;
  const hasImage = product.images && product.images.length > 0;
  const categorySlug = product.category?.slug || 'hardware';
  const detailHref = `/products/${categorySlug}/${product.slug}`;

  const effectivePrice = product.sale_price ?? product.price;
  const hasDiscount = product.sale_price !== null && product.sale_price < product.price;

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    showQuickView?.(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={detailHref} className="block relative h-full flex flex-col">
        
        {/* Image Area */}
        <div className="relative aspect-[4/3] bg-plugin-surface mb-6 overflow-hidden border border-plugin-border group-hover:border-plugin-dark transition-colors duration-500">
          {hasImage ? (
            <img
              src={product.images![0].image_url}
              alt={product.title}
              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-plugin-light">
              <Zap className="w-8 h-8 text-plugin-border transition-colors duration-500" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {!isWorkshop && product.category && (
              <span className="px-2 py-1 bg-plugin-light/90 backdrop-blur-sm text-[10px] font-mono font-bold uppercase tracking-widest text-plugin-dark border border-plugin-border">
                {product.category.name}
              </span>
            )}
            {isWorkshop && Boolean(product.specs?.skill_level) && (
              <span className="px-2 py-1 bg-plugin-light/90 backdrop-blur-sm text-[10px] font-mono font-bold uppercase tracking-widest text-theme-robotics border border-plugin-border">
                {String(product.specs?.skill_level)}
              </span>
            )}
            {hasDiscount && !isWorkshop && (
              <span className="px-2 py-1 bg-plugin-dark text-[10px] font-mono font-bold uppercase tracking-widest text-plugin-light">
                SALE
              </span>
            )}
          </div>

          {/* Hover Overlay Buttons */}
          <div className="absolute inset-0 bg-plugin-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-4">
            {showQuickView && (
               <button 
                onClick={handleQuickView}
                className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 text-[10px] font-mono font-bold uppercase tracking-widest bg-plugin-light text-plugin-dark px-4 py-2 hover:bg-plugin-dark hover:text-plugin-light"
              >
                Quick View
              </button>
            )}
            <span
              className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 text-[10px] font-mono font-bold uppercase tracking-widest bg-plugin-dark text-plugin-light px-4 py-2"
            >
              {isWorkshop ? 'Learn More' : 'View Details'}
            </span>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start gap-4 mb-2">
            <h3 className="font-display font-bold text-plugin-dark text-lg leading-tight group-hover:text-theme-drone transition-colors">
              {product.title}
            </h3>
            <div className="text-right flex-shrink-0">
              <div className="font-mono text-plugin-dark font-medium">
                {formatPrice(effectivePrice)}
              </div>
              {hasDiscount && (
                <div className="text-xs text-plugin-text-muted line-through font-mono mt-0.5">
                  {formatPrice(product.price)}
                </div>
              )}
            </div>
          </div>

          {!isWorkshop && (
            <p className="text-sm text-plugin-text-muted leading-relaxed line-clamp-2 mt-2">
              {product.description}
            </p>
          )}

          {isWorkshop && !!product.specs?.duration && (
            <p className="text-xs font-mono text-plugin-text-muted mt-2">
              {String(product.specs.duration)}
            </p>
          )}

          {/* Bottom Accent */}
          <div className="mt-auto pt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-plugin-dark flex items-center gap-2">
                View Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
             </span>
             <div className="h-px bg-plugin-dark flex-1 ml-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
