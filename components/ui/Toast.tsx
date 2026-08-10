'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

// Simple global toast state
let listeners: Array<(toasts: Toast[]) => void> = [];
let toasts: Toast[] = [];
let toastId = 0;

function emitChange() {
  listeners.forEach((listener) => listener([...toasts]));
}

export const toast = {
  success: (message: string, duration = 4000) => addToast('success', message, duration),
  error: (message: string, duration = 5000) => addToast('error', message, duration),
  warning: (message: string, duration = 4000) => addToast('warning', message, duration),
  info: (message: string, duration = 4000) => addToast('info', message, duration),
};

function addToast(type: ToastType, message: string, duration: number) {
  const id = `toast-${++toastId}`;
  toasts = [...toasts, { id, type, message, duration }];
  emitChange();

  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }
}

function removeToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  emitChange();
}

const icons = {
  success: <CheckCircle2 className="w-5 h-5 text-plugin-success" />,
  error: <XCircle className="w-5 h-5 text-plugin-danger" />,
  warning: <AlertTriangle className="w-5 h-5 text-plugin-warning" />,
  info: <Info className="w-5 h-5 text-plugin-cyan" />,
};

const borderColors = {
  success: 'border-l-plugin-success',
  error: 'border-l-plugin-danger',
  warning: 'border-l-plugin-warning',
  info: 'border-l-plugin-cyan',
};

export function ToastContainer() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([]);

  useEffect(() => {
    listeners.push(setCurrentToasts);
    return () => {
      listeners = listeners.filter((l) => l !== setCurrentToasts);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {currentToasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'pointer-events-auto bg-plugin-bg-secondary border border-plugin-cyan/[0.12] border-l-[3px] rounded-plugin shadow-plugin-glow-sm',
              'flex items-start gap-3 px-4 py-3',
              borderColors[t.type]
            )}
          >
            <div className="mt-0.5 flex-shrink-0">{icons[t.type]}</div>
            <p className="flex-1 text-sm text-plugin-text font-mono">{t.message}</p>
            <button
              onClick={() => removeToast(t.id)}
              className="flex-shrink-0 text-plugin-text-secondary hover:text-plugin-text transition-colors mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
