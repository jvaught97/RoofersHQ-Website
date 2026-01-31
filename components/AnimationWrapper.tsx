'use client';

import React from 'react';

interface AnimationWrapperProps {
  children: React.ReactNode;
  type: 'critical' | 'decorative';
  fallback?: React.ReactNode;
}

/**
 * Wrapper component for conditional animations
 * Critical animations always render
 * Decorative animations can be skipped based on user preference or network
 */
export function AnimationWrapper({ children, type, fallback }: AnimationWrapperProps) {
  // Critical animations always render
  if (type === 'critical') {
    return <>{children}</>;
  }

  // For decorative animations, if fallback is provided, we'll handle it in the parent component
  // This component is mainly for organizational purposes and future enhancement
  return <>{children}</>;
}
