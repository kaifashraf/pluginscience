'use client';

import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle2, Clock, XCircle } from 'lucide-react';

const orders = [
  { id: 'PLUGIN-10423', date: 'Jul 15, 2026', total: 12999, payment: 'paid', fulfillment: 'delivered', items: [{ name: 'Carbon Phantom X4 Kit', qty: 1, price: 10999 }, { name: 'PID Auto-Tune Profile Pack', qty: 1, price: 499 }], tracking: 'DTDC-1234567' },
  { id: 'PLUGIN-10389', date: 'Jul 8, 2026', total: 4999, payment: 'paid', fulfillment: 'processing', items: [{ name: '2-Day Drone Assembly Bootcamp', qty: 1, price: 4999 }], tracking: null },
  { id: 'PLUGIN-10201', date: 'Jun 22, 2026', total: 3499, payment: 'paid', fulfillment: 'delivered', items: [{ name: 'F7 Flight Controller V3', qty: 1, price: 3499 }], tracking: 'BLUEDART-9876543' },
  { id: 'PLUGIN-10098', date: 'Jun 10, 2026', total: 899, payment: 'paid', fulfillment: 'shipped', items: [{ name: 'Brushless Motor 2212 920KV', qty: 1, price: 899 }], tracking: 'DELHIVERY-5544332' },
  { id: 'PLUGIN-10055', date: 'May 28, 2026', total: 7999, payment: 'paid', fulfillment: 'delivered', items: [{ name: 'Autonomous YOLOv8 Drone Coding', qty: 1, price: 7999 }], tracking: null },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  delivered: { icon: CheckCircle2, color: 'text-plugin-success bg-plugin-success/10', label: 'Delivered' },
  shipped: { icon: Truck, color: 'text-plugin-cyan bg-plugin-cyan/10', label: 'Shipped' },
  processing: { icon: Clock, color: 'text-plugin-amber bg-plugin-amber/10', label: 'Processing' },
  unfulfilled: { icon: Package, color: 'text-plugin-text-secondary bg-plugin-surface', label: 'Unfulfilled' },
  failed: { icon: XCircle, color: 'text-plugin-danger bg-plugin-danger/10', label: 'Failed' },
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <span className="hud-label text-[10px] mb-2 block">SYSTEMS // ORDERS</span>
        <h1 className="font-display text-section font-bold text-plugin-text tracking-wider">
          ORDER HISTORY
        </h1>
        <p className="text-plugin-text-secondary mt-2 text-sm">Track all your purchases and workshop registrations.</p>
      </div>

      <div className="space-y-4">
        {orders.map((order, i) => {
          const status = statusConfig[order.fulfillment] || statusConfig.unfulfilled;
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="plugin-card p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-plugin-cyan font-medium">{order.id}</span>
                  <span className="text-xs font-mono text-plugin-text-secondary">{order.date}</span>
                </div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-plugin text-[10px] font-mono font-bold uppercase tracking-wider ${status.color}`}>
                  <status.icon className="w-3.5 h-3.5" />
                  {status.label}
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between py-1.5 border-b border-plugin-cyan/[0.04] last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-plugin-text">{item.name}</span>
                      <span className="text-[10px] font-mono text-plugin-text-secondary">×{item.qty}</span>
                    </div>
                    <span className="text-sm font-mono text-plugin-text">₹{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-plugin-cyan/[0.06]">
                <div>
                  {order.tracking && (
                    <span className="text-[10px] font-mono text-plugin-text-secondary">
                      TRACKING: {order.tracking}
                    </span>
                  )}
                </div>
                <span className="font-display text-lg font-bold text-plugin-cyan">
                  ₹{order.total.toLocaleString()}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
