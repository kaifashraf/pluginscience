'use client';

import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingCart, Zap } from 'lucide-react';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

const wishlistItems = [
  { id: 'p4', title: 'Carbon Phantom X4 Kit', slug: 'carbon-phantom-x4-kit', price: 12999, salePrice: 10999, category: 'drone-kits', description: 'Complete 450mm carbon-fiber quadcopter kit.' },
  { id: 'p7', title: 'Brushless Motor 2212 920KV', slug: 'brushless-motor-2212-920kv', price: 899, salePrice: null, category: 'hardware', description: 'Premium brushless outrunner motor.' },
  { id: 'p10', title: 'YOLOv8 Obstacle Detection SDK', slug: 'yolov8-obstacle-sdk', price: 1999, salePrice: null, category: 'software', description: 'Ready-to-deploy obstacle detection model.' },
];

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="hud-label text-[10px] mb-2 block">SYSTEMS // WISHLIST</span>
        <h1 className="font-display text-section font-bold text-plugin-text tracking-wider">
          SAVED ITEMS
        </h1>
        <p className="text-plugin-text-secondary mt-2 text-sm">{wishlistItems.length} items in your wishlist.</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="plugin-card p-12 text-center">
          <Heart className="w-12 h-12 text-plugin-text-secondary/20 mx-auto mb-3" />
          <p className="text-plugin-text-secondary font-medium">Your wishlist is empty</p>
          <p className="text-sm text-plugin-text-secondary/50 mt-1 mb-4">Save items you love for later</p>
          <Link href="/products/hardware">
            <Button variant="ghost" className="font-display tracking-wider">Browse Hardware</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlistItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="plugin-card p-5 group"
            >
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-plugin-surface to-plugin-bg rounded-plugin flex-shrink-0 flex items-center justify-center border border-plugin-cyan/[0.08]">
                  <Zap className="w-6 h-6 text-plugin-cyan/20" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.category}/${item.slug}`}>
                    <h3 className="text-sm font-medium text-plugin-text hover:text-plugin-cyan transition-colors truncate">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-plugin-text-secondary mt-0.5 truncate">{item.description}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-base font-display font-bold text-plugin-cyan">
                      {formatPrice(item.salePrice ?? item.price)}
                    </span>
                    {item.salePrice && (
                      <span className="text-xs text-plugin-text-secondary/50 line-through font-mono">{formatPrice(item.price)}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1 text-xs">
                  <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Add to Cart
                </Button>
                <button className="p-2 text-plugin-text-secondary hover:text-plugin-danger transition-colors border border-plugin-cyan/[0.12] rounded-plugin hover:border-plugin-danger/30">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
