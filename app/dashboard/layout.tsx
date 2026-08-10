'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Package, Heart, User, LogOut, ArrowRight,
} from 'lucide-react';

const sidebarLinks = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Workshops', href: '/dashboard/workshops', icon: Calendar },
  { label: 'Order History', href: '/dashboard/orders', icon: Package },
  { label: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
  { label: 'Profile', href: '/dashboard/profile', icon: User },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-plugin-light pt-28 md:pt-40">
      <div className="container-fluid max-w-7xl">
        
        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-full border border-plugin-border bg-plugin-surface p-4 flex items-center justify-between mb-8"
        >
          <span className="text-[11px] font-mono font-bold text-plugin-dark uppercase tracking-widest">Dashboard Menu</span>
          <ArrowRight className={`w-4 h-4 text-plugin-dark transition-transform ${mobileMenuOpen ? 'rotate-90' : ''}`} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar */}
          <aside className={`lg:col-span-3 ${mobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="border border-plugin-border bg-plugin-surface p-6 sticky top-32">
              
              {/* User info */}
              <div className="border-b border-plugin-border pb-6 mb-6">
                <p className="text-2xl font-display font-medium text-plugin-dark">
                  Gulam Sarwar
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-theme-drone" />
                  <span className="text-xs font-display text-plugin-text-muted">Online</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 text-sm font-display font-medium transition-colors ${
                        isActive
                          ? 'bg-plugin-dark text-plugin-light'
                          : 'text-plugin-dark hover:bg-plugin-border/50'
                      }`}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-6 mt-6 border-t border-plugin-border">
                <button className="flex items-center gap-4 p-4 w-full text-sm font-display font-medium text-plugin-danger hover:bg-plugin-danger/5 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
