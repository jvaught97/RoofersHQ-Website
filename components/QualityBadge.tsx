'use client';

import { motion } from 'framer-motion';
import { Loader2, Zap } from 'lucide-react';
import type { QualityTier } from '@/lib/imageQualityManager';
import { getQualityLabel } from '@/lib/imageQualityManager';

interface QualityBadgeProps {
  quality: QualityTier;
  isUpgrading: boolean;
  onLoadHD?: () => void;
  scrollProgress: number; // 0-1
}

export function QualityBadge({
  quality,
  isUpgrading,
  onLoadHD,
  scrollProgress,
}: QualityBadgeProps) {
  // Only show badge in first 20% of scroll
  const isVisible = scrollProgress < 0.2;

  if (!isVisible) {
    return null;
  }

  const label = getQualityLabel(quality);
  const showLoadButton = quality !== 'full' && onLoadHD && !isUpgrading;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed top-4 right-4 z-40 flex items-center gap-2"
    >
      {/* Quality Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
        {isUpgrading ? (
          <Loader2 size={14} className="text-[#CA8A04] animate-spin" />
        ) : (
          <Zap size={14} className="text-[#CA8A04]" />
        )}
        <span className="text-xs text-white/80 font-medium tracking-wide">
          {isUpgrading ? 'Upgrading...' : label}
        </span>
      </div>

      {/* Load HD Button */}
      {showLoadButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onLoadHD}
          className="px-3 py-1.5 rounded-full bg-[#CA8A04]/90 hover:bg-[#CA8A04] backdrop-blur-sm text-xs text-white font-medium tracking-wide transition-colors"
        >
          Load HD
        </motion.button>
      )}
    </motion.div>
  );
}
