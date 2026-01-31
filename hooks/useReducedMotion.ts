'use client';

import { useState, useEffect } from 'react';
import { useNetwork } from '@/contexts/NetworkContext';

export interface ReducedMotionInfo {
  shouldReduceMotion: boolean;
  reason: 'preference' | 'network' | null;
}

/**
 * Hook to determine if animations should be reduced
 * Combines system preference and network quality
 */
export function useReducedMotion(): ReducedMotionInfo {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const { quality: networkQuality } = useNetwork();

  useEffect(() => {
    // Check prefers-reduced-motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = () => {
      setPrefersReduced(mediaQuery.matches);
    };

    // Set initial value
    handleChange();

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Determine if motion should be reduced
  const shouldReduceMotion = prefersReduced || networkQuality === 'slow';

  return {
    shouldReduceMotion,
    reason: prefersReduced ? 'preference' : networkQuality === 'slow' ? 'network' : null,
  };
}
