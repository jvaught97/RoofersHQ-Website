'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { QualityTier } from '@/lib/imageQualityManager';

interface SequenceProgressProps {
  loadProgress: number;
  upgradeProgress: number | null;
  currentQuality: QualityTier;
  isUpgrading: boolean;
}

export function SequenceProgress({
  loadProgress,
  upgradeProgress,
  currentQuality,
  isUpgrading,
}: SequenceProgressProps) {
  const progress = isUpgrading && upgradeProgress !== null ? upgradeProgress : loadProgress;
  const isVisible = progress < 100;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 h-0.5"
        >
          <div className="relative w-full h-full bg-white/10">
            <motion.div
              className={`absolute left-0 top-0 h-full ${
                isUpgrading ? 'bg-[#CA8A04]/70' : 'bg-[#CA8A04]'
              }`}
              style={{
                width: `${progress}%`,
                transition: 'width 0.3s ease-out',
              }}
              animate={
                isUpgrading
                  ? {
                      opacity: [0.7, 1, 0.7],
                    }
                  : {}
              }
              transition={
                isUpgrading
                  ? {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
                  : {}
              }
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
