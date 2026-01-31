'use client';

import { useState, useEffect, useRef } from 'react';

export type NetworkQuality = 'fast' | 'medium' | 'slow';

export interface NetworkInfo {
  quality: NetworkQuality;
  saveData: boolean;
  effectiveType: string;
  downlink?: number;
}

// Extend Navigator interface for TypeScript
interface NavigatorConnection extends Navigator {
  connection?: {
    effectiveType?: '4g' | '3g' | '2g' | 'slow-2g';
    saveData?: boolean;
    downlink?: number;
    addEventListener?: (type: string, listener: () => void) => void;
    removeEventListener?: (type: string, listener: () => void) => void;
  };
}

/**
 * Hook to detect network quality
 * Uses Network Information API with fallback to timing-based detection
 */
export function useNetworkQuality(): NetworkInfo {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    quality: 'medium', // Default to medium until detected
    saveData: false,
    effectiveType: 'unknown',
  });

  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const nav = navigator as NavigatorConnection;
    const connection = nav.connection;

    const classifyConnection = (): NetworkInfo => {
      // Try Network Information API first
      if (connection) {
        const effectiveType = connection.effectiveType || 'unknown';
        const saveData = connection.saveData || false;
        const downlink = connection.downlink;

        let quality: NetworkQuality;

        // Classify based on effective type
        switch (effectiveType) {
          case '4g':
            quality = 'fast';
            break;
          case '3g':
            quality = 'medium';
            break;
          case '2g':
          case 'slow-2g':
            quality = 'slow';
            break;
          default:
            // Unknown - use downlink if available
            if (downlink !== undefined) {
              if (downlink > 5) quality = 'fast';
              else if (downlink > 1.5) quality = 'medium';
              else quality = 'slow';
            } else {
              quality = 'medium'; // Default
            }
        }

        // If Save Data mode is enabled, always use slow
        if (saveData) {
          quality = 'slow';
        }

        return {
          quality,
          saveData,
          effectiveType,
          downlink,
        };
      }

      // Fallback: timing-based detection
      return fallbackDetection();
    };

    const fallbackDetection = (): NetworkInfo => {
      // Use a simple heuristic based on performance.timing
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;

      let quality: NetworkQuality;
      if (loadTime < 1000) {
        quality = 'fast';
      } else if (loadTime < 3000) {
        quality = 'medium';
      } else {
        quality = 'slow';
      }

      return {
        quality,
        saveData: false,
        effectiveType: 'fallback',
      };
    };

    const handleConnectionChange = () => {
      // Debounce rapid changes (500ms)
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const newInfo = classifyConnection();

        // Only upgrade quality, never downgrade
        // This preserves already-loaded high-quality frames
        setNetworkInfo((prev) => {
          const qualities: NetworkQuality[] = ['slow', 'medium', 'fast'];
          const prevIndex = qualities.indexOf(prev.quality);
          const newIndex = qualities.indexOf(newInfo.quality);

          if (newIndex > prevIndex) {
            // Upgrade detected
            return newInfo;
          }

          // Keep previous quality but update other fields
          return {
            ...newInfo,
            quality: prev.quality,
          };
        });
      }, 500);
    };

    // Initial detection
    const initialInfo = classifyConnection();
    setNetworkInfo(initialInfo);

    // Listen for connection changes
    if (connection && connection.addEventListener) {
      connection.addEventListener('change', handleConnectionChange);
    }

    // Cleanup
    return () => {
      clearTimeout(debounceRef.current);
      if (connection && connection.removeEventListener) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return networkInfo;
}
