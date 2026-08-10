'use client';

import { motion } from 'framer-motion';
import { Calendar, Package, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Registered Workshops', value: '02', icon: Calendar, href: '/dashboard/workshops', hoverClass: 'hover:bg-theme-community hover:text-white', textColor: 'text-theme-community' },
  { label: 'Total Orders', value: '05', icon: Package, href: '/dashboard/orders', hoverClass: 'hover:bg-theme-hardware hover:text-white', textColor: 'text-theme-hardware' },
  { label: 'Wishlist Items', value: '03', icon: Heart, href: '/dashboard/wishlist', hoverClass: 'hover:bg-theme-drone hover:text-white', textColor: 'text-theme-drone' },
];

const recentOrders = [
  { id: 'PLGN-10423', date: 'Jul 15, 2026', total: 12999, status: 'DELIVERED', items: 'Carbon Phantom X4 Kit' },
  { id: 'PLGN-10389', date: 'Jul 8, 2026', total: 4999, status: 'PROCESSING', items: '2-Day Drone Assembly Bootcamp' },
  { id: 'PLGN-10201', date: 'Jun 22, 2026', total: 3499, status: 'DELIVERED', items: 'F7 Flight Controller V3' },
];

const upcomingWorkshops = [
  { title: 'Drone Assembly Bootcamp', date: 'Aug 15, 2026', location: 'Plug-in Lab — Bengaluru', status: 'CONFIRMED' },
  { title: 'FPV Flight Dynamics', date: 'Sep 12, 2026', location: 'Plug-in Lab — Delhi', status: 'CONFIRMED' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="border-b border-plugin-border pb-6">
        <h1 className="text-4xl font-display font-medium text-plugin-dark">
          Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Link href={stat.href}>
              <div className={`border border-plugin-border p-8 group transition-all duration-300 bg-plugin-surface ${stat.hoverClass}`}>
                <div className="flex items-center justify-between mb-8">
                  <stat.icon className={`w-5 h-5 ${stat.textColor} group-hover:text-current transition-colors`} />
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <div className="font-display text-5xl font-bold mb-2">{stat.value}</div>
                <p className="text-[10px] font-mono uppercase tracking-widest font-bold group-hover:text-current/80 transition-colors">{stat.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Workshops */}
        <div className="border border-plugin-border bg-plugin-surface">
          <div className="flex items-center justify-between p-6 border-b border-plugin-border">
            <h2 className="font-display text-lg font-medium text-plugin-dark">
              Upcoming Workshops
            </h2>
            <Link href="/dashboard/workshops" className="text-sm text-plugin-dark hover:text-theme-community transition-colors">
              View All
            </Link>
          </div>

          {upcomingWorkshops.length === 0 ? (
            <div className="p-8 text-center">
              <span className="text-plugin-border text-4xl font-mono block mb-4">∅</span>
              <p className="text-[11px] font-mono font-bold text-plugin-text-muted uppercase tracking-widest mb-4">No upcoming workshops</p>
              <Link href="/workshops">
                <button className="text-[10px] font-mono font-bold uppercase tracking-widest text-plugin-dark border-b border-plugin-dark pb-1">Browse Catalog</button>
              </Link>
            </div>
          ) : (
            <div>
              {upcomingWorkshops.map((ws, i) => (
                <div key={i} className="p-6 border-b border-plugin-border last:border-0 hover:bg-plugin-light transition-colors group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                    <h3 className="text-sm font-display font-bold text-plugin-dark uppercase tracking-wide group-hover:text-theme-community transition-colors">{ws.title}</h3>
                    <span className="text-[10px] font-mono font-bold text-theme-community uppercase tracking-widest border border-theme-community px-2 py-1 self-start sm:self-auto">
                      {ws.status}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4 text-[10px] text-plugin-text-muted font-mono font-bold uppercase tracking-widest">
                    <span>DATE: {ws.date}</span>
                    <span className="hidden sm:inline">|</span>
                    <span>LOC: {ws.location}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="border border-plugin-border bg-plugin-surface">
          <div className="flex items-center justify-between p-6 border-b border-plugin-border">
            <h2 className="font-display text-lg font-medium text-plugin-dark">
              Recent Orders
            </h2>
            <Link href="/dashboard/orders" className="text-sm text-plugin-dark hover:text-theme-hardware transition-colors">
              View All
            </Link>
          </div>

          <div>
            {recentOrders.map((order) => (
              <div key={order.id} className="p-6 border-b border-plugin-border last:border-0 hover:bg-plugin-light transition-colors group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <span className="text-sm font-mono font-bold text-plugin-dark tracking-widest">{order.id}</span>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest border px-2 py-1 self-start sm:self-auto ${
                    order.status === 'DELIVERED'
                      ? 'text-theme-hardware border-theme-hardware'
                      : 'text-plugin-dark border-plugin-dark'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-plugin-text-muted uppercase tracking-widest mb-4 group-hover:text-plugin-dark transition-colors">{order.items}</p>
                <div className="flex items-center justify-between pt-4 border-t border-plugin-border/50">
                  <span className="text-[10px] text-plugin-text-muted font-mono font-bold tracking-widest uppercase">DATE: {order.date}</span>
                  <span className="text-sm font-mono font-bold text-plugin-dark tracking-widest">₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
