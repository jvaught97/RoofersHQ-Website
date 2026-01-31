import { NetworkQuality } from '@/hooks/useNetworkQuality';

export type QualityTier = 'thumb' | 'medium' | 'full';

// Cache WebP support detection result
let webpSupported: boolean | null = null;

/**
 * Detect if browser supports WebP format
 */
export function isWebPSupported(): boolean {
  if (webpSupported !== null) {
    return webpSupported;
  }

  // Check if we're in browser environment
  if (typeof document === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const dataURL = canvas.toDataURL('image/webp');
    webpSupported = dataURL.startsWith('data:image/webp');
    return webpSupported;
  } catch {
    webpSupported = false;
    return false;
  }
}

/**
 * Map network quality to appropriate image quality tier
 */
export function getQualityForNetwork(networkQuality: NetworkQuality): QualityTier {
  switch (networkQuality) {
    case 'fast':
      return 'full';
    case 'medium':
      return 'full'; // Upgraded to HD for medium connections to ensure premium feel
    case 'slow':
      return 'thumb';
    default:
      return 'full'; // Default to HD
  }
}

/**
 * Generate image URL for a specific frame, quality tier, and format
 */
export function getImageUrl(
  frameIndex: number,
  quality: QualityTier,
  preferWebP: boolean = true
): string {
  const format = preferWebP && isWebPSupported() ? 'webp' : 'jpg';
  return `/sequence/${quality}/frame_${frameIndex}.${format}`;
}

/**
 * Check if upgrading from one quality to another is beneficial
 */
export function isUpgrade(currentQuality: QualityTier, targetQuality: QualityTier): boolean {
  const qualityOrder: QualityTier[] = ['thumb', 'medium', 'full'];
  const currentIndex = qualityOrder.indexOf(currentQuality);
  const targetIndex = qualityOrder.indexOf(targetQuality);
  return targetIndex > currentIndex;
}

/**
 * Get the optimal quality tier based on current network conditions
 * Returns null if already at optimal quality
 */
export function getOptimalQuality(
  networkQuality: NetworkQuality,
  currentQuality: QualityTier
): QualityTier | null {
  const optimal = getQualityForNetwork(networkQuality);
  return isUpgrade(currentQuality, optimal) ? optimal : null;
}

/**
 * Get human-readable label for quality tier
 */
export function getQualityLabel(quality: QualityTier): string {
  switch (quality) {
    case 'full':
      return 'HD';
    case 'medium':
      return 'Standard';
    case 'thumb':
      return 'Lite';
    default:
      return 'Unknown';
  }
}

/**
 * Estimate total size for loading all frames at a given quality
 */
export function estimateDataSize(quality: QualityTier, frameCount: number = 192): string {
  const bytesPerFrame = {
    thumb: 10 * 1024, // 10 KB
    medium: 40 * 1024, // 40 KB
    full: 120 * 1024, // 120 KB
  };

  const totalBytes = bytesPerFrame[quality] * frameCount;
  const totalMB = totalBytes / (1024 * 1024);

  return totalMB >= 1 ? `${totalMB.toFixed(1)} MB` : `${(totalBytes / 1024).toFixed(0)} KB`;
}

/**
 * Estimate remaining data to download for upgrade
 */
export function estimateUpgradeSize(
  fromQuality: QualityTier,
  toQuality: QualityTier,
  frameCount: number = 192
): string {
  const bytesPerFrame = {
    thumb: 10 * 1024,
    medium: 40 * 1024,
    full: 120 * 1024,
  };

  const additionalBytes = (bytesPerFrame[toQuality] - bytesPerFrame[fromQuality]) * frameCount;
  const additionalMB = additionalBytes / (1024 * 1024);

  return additionalMB >= 1
    ? `${additionalMB.toFixed(1)} MB`
    : `${(additionalBytes / 1024).toFixed(0)} KB`;
}
