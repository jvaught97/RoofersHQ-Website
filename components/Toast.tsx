'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'warning';
  onDismiss: () => void;
  duration?: number;
}

export function Toast({ message, type = 'info', onDismiss, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  const bgColor = {
    info: 'bg-black/90 border-white/20',
    success: 'bg-green-900/90 border-green-500/30',
    warning: 'bg-yellow-900/90 border-yellow-500/30',
  }[type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border ${bgColor} backdrop-blur-sm shadow-2xl max-w-md`}
      >
        <p className="text-sm text-white/90 flex-1">{message}</p>
        <button
          onClick={onDismiss}
          className="text-white/60 hover:text-white/90 transition-colors"
          aria-label="Dismiss notification"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
