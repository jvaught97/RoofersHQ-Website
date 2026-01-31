'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNetworkQuality, type NetworkQuality, type NetworkInfo } from '@/hooks/useNetworkQuality';

interface NetworkContextValue extends NetworkInfo {
  isSlowConnection: boolean;
  forceQuality: (quality: NetworkQuality | null) => void;
}

const NetworkContext = createContext<NetworkContextValue | undefined>(undefined);

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const detectedNetwork = useNetworkQuality();
  const [forcedQuality, setForcedQuality] = useState<NetworkQuality | null>(null);

  // Load forced quality from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('forced-network-quality');
    if (stored && (stored === 'fast' || stored === 'medium' || stored === 'slow')) {
      setForcedQuality(stored);
    }
  }, []);

  // Use forced quality if set, otherwise use detected
  const networkQuality = forcedQuality || detectedNetwork.quality;

  const forceQuality = (quality: NetworkQuality | null) => {
    setForcedQuality(quality);
    if (quality) {
      localStorage.setItem('forced-network-quality', quality);
    } else {
      localStorage.removeItem('forced-network-quality');
    }
  };

  const value: NetworkContextValue = {
    quality: networkQuality,
    saveData: detectedNetwork.saveData,
    effectiveType: detectedNetwork.effectiveType,
    downlink: detectedNetwork.downlink,
    isSlowConnection: networkQuality === 'slow',
    forceQuality,
  };

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
}

export function useNetwork(): NetworkContextValue {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    // Return safe defaults instead of throwing during SSR or initialization
    return {
      quality: 'medium',
      saveData: false,
      effectiveType: 'unknown',
      isSlowConnection: false,
      forceQuality: () => {},
    };
  }
  return context;
}
