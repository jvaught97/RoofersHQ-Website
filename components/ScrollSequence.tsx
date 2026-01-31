"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, MotionValue, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useNetwork } from "@/contexts/NetworkContext";
import {
    getQualityForNetwork,
    getImageUrl,
    getOptimalQuality,
    estimateDataSize,
    type QualityTier,
} from "@/lib/imageQualityManager";
import { SequenceProgress } from "./SequenceProgress";
import { Toast } from "./Toast";
import { QualityBadge } from "./QualityBadge";

const FRAME_COUNT = 192;
// Keyframes: evenly distributed across the sequence (every 12th frame for smoother first scroll)
const KEYFRAMES = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180, 191];

export default function ScrollSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // Changed to string keys for multi-quality caching: "frameIndex-quality"
    const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const lastRenderedFrame = useRef<{ index: number; img: HTMLImageElement } | null>(null);

    // Network and quality state
    const { quality: networkQuality, saveData } = useNetwork();
    const [currentQuality, setCurrentQuality] = useState<QualityTier>(() =>
        getQualityForNetwork(networkQuality)
    );
    const [isUpgrading, setIsUpgrading] = useState(false);
    const [upgradeProgress, setUpgradeProgress] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);
    const upgradeAbortController = useRef<AbortController | null>(null);

    // State for scroll optimizations
    const [hasCompletedFirstScroll, setHasCompletedFirstScroll] = useState(false);
    const firstScrollThreshold = useRef(false);
    const lastScrollDirection = useRef<'forward' | 'backward' | null>(null);
    const lastFrameIndex = useRef<number>(0);
    const throttledLoadFrames = useRef<NodeJS.Timeout | null>(null);

    const { trackEvent } = useAnalytics();

    // Scroll progress for the entire 400vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Load window size - how many frames to keep loaded around current position
    const LOAD_WINDOW = 15; // Reduced from 30 to prevent network congestion
    const PROGRESSIVE_LOAD_THROTTLE = 150; // ms between load triggers
    const PREDICTIVE_BIAS = 0.7; // 70% forward, 30% backward
    const BATCH_SIZE = 5; // Load frames in batches to prevent connection pool exhaustion

    // Function to load a single image with quality tier support
    const loadImage = async (index: number, quality: QualityTier): Promise<HTMLImageElement> => {
        // Validate frame index
        if (index < 0 || index >= FRAME_COUNT) {
            console.error(`Invalid frame index: ${index} (must be 0-${FRAME_COUNT - 1})`);
            trackEvent('sequence_load_error', { frameIndex: index, quality, reason: 'invalid_index' });
            throw new Error(`Invalid frame index: ${index}`);
        }

        const cacheKey = `${index}-${quality}`;

        // Check if already cached
        if (imageCache.current.has(cacheKey)) {
            return imageCache.current.get(cacheKey)!;
        }

        const img = new Image();

        // Try WebP first, fallback to JPEG
        const tryLoad = (url: string): Promise<void> => {
            return new Promise((resolve, reject) => {
                img.onload = () => resolve();
                img.onerror = () => reject();
                img.src = url;
            });
        };

        try {
            // Try WebP
            await tryLoad(getImageUrl(index, quality, true));
        } catch {
            try {
                // Fallback to JPEG
                await tryLoad(getImageUrl(index, quality, false));
            } catch {
                // If both fail, try lower quality tier
                if (quality === 'full') {
                    console.warn(`Failed to load frame ${index} at full quality, trying medium`);
                    return loadImage(index, 'medium');
                } else if (quality === 'medium') {
                    console.warn(`Failed to load frame ${index} at medium quality, trying thumb`);
                    return loadImage(index, 'thumb');
                } else {
                    console.error(`Failed to load frame ${index} at all quality levels`);
                    trackEvent('sequence_load_error', { frameIndex: index, quality });
                }
            }
        }

        imageCache.current.set(cacheKey, img);
        return img;
    };

    // Get best available frame from cache (prefer highest quality)
    const getFrameImage = (index: number): HTMLImageElement | null => {
        return (
            imageCache.current.get(`${index}-full`) ||
            imageCache.current.get(`${index}-medium`) ||
            imageCache.current.get(`${index}-thumb`) ||
            null
        );
    };

    // Load keyframes initially
    useEffect(() => {
        const initialLoad = async () => {
            const startTime = performance.now();
            const initialQuality = getQualityForNetwork(networkQuality);
            setCurrentQuality(initialQuality);

            // Track network detection
            trackEvent('network_quality_detected', {
                quality: networkQuality,
                saveData,
                initialQualityTier: initialQuality,
            });

            // Show toast for slow connections
            // Show toast for slow connections only
            if (networkQuality === 'slow') {
                setShowToast(true);
            }

            try {
                // Load all keyframes
                const promises = KEYFRAMES.map((frameIndex, idx) =>
                    loadImage(frameIndex, initialQuality).then(() => {
                        setLoadProgress(((idx + 1) / KEYFRAMES.length) * 100);
                    })
                );

                await Promise.all(promises);

                const loadTime = performance.now() - startTime;

                // Track successful load
                trackEvent('sequence_quality_loaded', {
                    quality: initialQuality,
                    frameCount: KEYFRAMES.length,
                    estimatedSize: estimateDataSize(initialQuality, KEYFRAMES.length),
                    loadTime: Math.round(loadTime),
                });

                setIsLoading(false);
            } catch (error) {
                console.error('Error loading keyframes:', error);
                setIsLoading(false);
            }
        };

        initialLoad();
    }, []); // Only run once on mount

    // Aggressive Background Loader: Loads ALL frames, prioritizing those near cursor
    useEffect(() => {
        // Wait for keyframes to finish first
        if (isLoading) return;

        let isMounted = true;

        const loadNextBatch = async () => {
            // Find all unloaded frames
            const missing: number[] = [];
            for (let i = 0; i < FRAME_COUNT; i++) {
                // Check if ANY quality is loaded for this frame
                const hasImage =
                    imageCache.current.has(`${i}-full`) ||
                    imageCache.current.has(`${i}-medium`) ||
                    imageCache.current.has(`${i}-thumb`);

                if (!hasImage) {
                    missing.push(i);
                }
            }

            if (missing.length === 0) return; // All loaded!

            // Sort by distance to current frame (load visible stuff first)
            missing.sort((a, b) => Math.abs(a - currentFrame) - Math.abs(b - currentFrame));

            // Load a batch (increase size for faster fill)
            const BATCH_SIZE = 10;
            const batch = missing.slice(0, BATCH_SIZE);

            await Promise.all(
                batch.map(index => loadImage(index, currentQuality).catch(e => console.warn(`Failed frame ${index}`, e)))
            );

            // Continue if mounted and still have missing frames
            if (isMounted) {
                // Small delay to let UI breathe, then recurse
                setTimeout(loadNextBatch, 50);
            }
        };

        // Start the loop
        const timeoutId = setTimeout(loadNextBatch, 100);

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [isLoading, currentFrame, currentQuality]); // Re-evaluates priority when user scrolls

    // Background upgrade system - delayed to prevent bandwidth competition during first scroll
    useEffect(() => {
        if (isLoading || isUpgrading) return;

        const optimalQuality = getOptimalQuality(networkQuality, currentQuality);
        if (!optimalQuality) return;

        // Wait for EITHER:
        // 1. User scrolled through once (90%+) + 5s delay, OR
        // 2. 30s elapsed (max delay)
        // This prevents bandwidth competition during critical first scroll
        const minDelay = 5000;
        const maxDelay = 30000;
        const delayTime = hasCompletedFirstScroll ? minDelay : maxDelay;

        const timeoutId = setTimeout(() => {
            startBackgroundUpgrade(optimalQuality);
        }, delayTime);

        return () => clearTimeout(timeoutId);
    }, [isLoading, networkQuality, currentQuality, isUpgrading, hasCompletedFirstScroll]);

    // Handle network quality changes
    useEffect(() => {
        if (isLoading) return;

        const optimalQuality = getOptimalQuality(networkQuality, currentQuality);
        if (optimalQuality && !isUpgrading) {
            // Network improved, start upgrade
            startBackgroundUpgrade(optimalQuality);
        }
    }, [networkQuality]);

    const startBackgroundUpgrade = async (targetQuality: QualityTier) => {
        // Abort any existing upgrade
        if (upgradeAbortController.current) {
            upgradeAbortController.current.abort();
        }

        upgradeAbortController.current = new AbortController();
        const signal = upgradeAbortController.current.signal;

        setIsUpgrading(true);
        setUpgradeProgress(0);

        trackEvent('sequence_upgrade_started', {
            fromQuality: currentQuality,
            toQuality: targetQuality,
            frameCount: FRAME_COUNT,
        });

        const startTime = performance.now();

        try {
            // Upgrade all frames
            for (let i = 0; i < FRAME_COUNT; i++) {
                if (signal.aborted) {
                    console.log('Upgrade cancelled');
                    return;
                }

                await loadImage(i, targetQuality);
                setUpgradeProgress((i / FRAME_COUNT) * 100);

                // Use requestIdleCallback for non-blocking if available
                if ('requestIdleCallback' in window) {
                    await new Promise(resolve => requestIdleCallback(() => resolve(undefined)));
                } else {
                    await new Promise(resolve => setTimeout(resolve, 0));
                }
            }

            const duration = performance.now() - startTime;

            trackEvent('sequence_upgrade_completed', {
                quality: targetQuality,
                totalFrames: FRAME_COUNT,
                duration: Math.round(duration),
            });

            setCurrentQuality(targetQuality);
            setIsUpgrading(false);
            setUpgradeProgress(null);
        } catch (error) {
            console.error('Upgrade error:', error);
            setIsUpgrading(false);
            setUpgradeProgress(null);
        }
    };

    const handleManualUpgrade = () => {
        trackEvent('manual_hd_upgrade_clicked', {
            currentQuality,
            networkQuality,
        });
        startBackgroundUpgrade('full');
    };

    // Helper function to draw a frame to canvas
    const drawFrame = (
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement,
        img: HTMLImageElement
    ) => {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio) * 1.15;

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(
            img,
            0, 0, img.width, img.height,
            centerShift_x, centerShift_y,
            img.width * ratio, img.height * ratio
        );
    };

    // Find the best frame(s) to render - logic only, no drawing
    const findFrameToRender = (frameIndex: number): {
        type: 'single' | 'blend';
        img1: HTMLImageElement;
        img2?: HTMLImageElement;
        ratio?: number;
    } | null => {
        const img = getFrameImage(frameIndex);

        // 1. Exact match
        if (img && img.complete && img.naturalWidth > 0) {
            return { type: 'single', img1: img };
        }

        // 2. Interpolation (Local Search)
        let prevFrame: HTMLImageElement | null = null;
        let nextFrame: HTMLImageElement | null = null;
        let prevIdx = frameIndex - 1;
        let nextIdx = frameIndex + 1;
        let pIdx = -1;
        let nIdx = -1;

        // Search up to 12 frames away
        for (let distance = 1; distance <= 12; distance++) {
            if (!prevFrame && prevIdx >= 0) {
                const img = getFrameImage(prevIdx);
                if (img && img.complete && img.naturalWidth > 0) { prevFrame = img; pIdx = prevIdx; }
                else prevIdx--;
            }

            if (!nextFrame && nextIdx < FRAME_COUNT) {
                const img = getFrameImage(nextIdx);
                if (img && img.complete && img.naturalWidth > 0) { nextFrame = img; nIdx = nextIdx; }
                else nextIdx++;
            }

            if (prevFrame && nextFrame) break;
        }

        // Blend found frames
        if (prevFrame && nextFrame) {
            const ratio = (frameIndex - pIdx) / (nIdx - pIdx);
            return { type: 'blend', img1: prevFrame, img2: nextFrame, ratio };
        }

        // Use single nearest frame if only one found locally
        if (prevFrame) return { type: 'single', img1: prevFrame };
        if (nextFrame) return { type: 'single', img1: nextFrame };

        // 3. Last Rendered Fallback (Fastest)
        if (lastRenderedFrame.current) {
            return { type: 'single', img1: lastRenderedFrame.current.img };
        }

        // 4. Global Panic Search (Find ANY loaded frame)
        // This prevents black flash if user scrolls furiously into unloaded territory
        let closestDist = Infinity;
        let closestImg: HTMLImageElement | null = null;

        imageCache.current.forEach((cachedImg, key) => {
            if (!cachedImg.complete || cachedImg.naturalWidth === 0) return;

            const [idxStr] = key.split('-');
            const idx = parseInt(idxStr);
            if (isNaN(idx)) return;

            const dist = Math.abs(idx - frameIndex);
            if (dist < closestDist) {
                closestDist = dist;
                closestImg = cachedImg;
            }
        });

        if (closestImg) {
            return { type: 'single', img1: closestImg };
        }

        return null;
    };

    // Render loop
    useEffect(() => {
        let requestId: number;

        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const progress = smoothProgress.get();
            const frameIndex = Math.max(
                0,
                Math.min(
                    FRAME_COUNT - 1,
                    Math.floor(progress * FRAME_COUNT)
                )
            );

            // Determine what to draw BEFORE clearing canvas
            const drawCommand = findFrameToRender(frameIndex);

            if (drawCommand) {
                // Only clear if we have something new to draw
                // This prevents "flashing black" when waiting for frames
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (drawCommand.type === 'single') {
                    drawFrame(ctx, canvas, drawCommand.img1);
                    lastRenderedFrame.current = { index: frameIndex, img: drawCommand.img1 };
                } else if (drawCommand.type === 'blend' && drawCommand.img2 && drawCommand.ratio !== undefined) {
                    ctx.globalAlpha = 1 - drawCommand.ratio;
                    drawFrame(ctx, canvas, drawCommand.img1);
                    ctx.globalAlpha = drawCommand.ratio;
                    drawFrame(ctx, canvas, drawCommand.img2);
                    ctx.globalAlpha = 1;
                    // For blended frames, we don't strictly update lastRenderedFrame to a single image
                    // or we could pick the dominant one. Leaving it as-is is safer.
                }
            }
            // If drawCommand is null, we do NOTHING. 
            // The previous frame remains on the canvas. No black flash.

            requestId = requestAnimationFrame(render);
        };

        requestId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(requestId);
    }, [smoothProgress]); // Removed currentFrame dependency

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[650vh] bg-[#050505]">
            <canvas
                ref={canvasRef}
                className="sticky top-0 left-0 w-full h-screen object-contain"
            />

            {/* Progress Indicator */}
            <SequenceProgress
                loadProgress={loadProgress}
                upgradeProgress={upgradeProgress}
                currentQuality={currentQuality}
                isUpgrading={isUpgrading}
            />

            {/* Quality Badge */}
            <QualityBadge
                quality={currentQuality}
                isUpgrading={isUpgrading}
                onLoadHD={currentQuality !== 'full' && networkQuality !== 'slow' ? handleManualUpgrade : undefined}
                scrollProgress={smoothProgress.get()}
            />

            {/* Toast Notification */}
            {showToast && (
                <Toast
                    message="Optimized for your connection — HD upgrade in progress"
                    type="info"
                    onDismiss={() => setShowToast(false)}
                    duration={5000}
                />
            )}

            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-white">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <p className="text-sm tracking-widest uppercase opacity-60">
                            Loading Experience {loadProgress > 0 && `(${Math.round(loadProgress)}%)`}
                        </p>
                        <p className="text-xs text-white/40">
                            {estimateDataSize(currentQuality, KEYFRAMES.length)}
                        </p>
                    </div>
                </div>
            )}

            {/* Scrollytelling Overlay Wrapper */}
            <div className="sticky top-0 h-screen w-full pointer-events-none z-[60]">
                {/* Branding Header & Sticky CTA */}
                {/* Branding Header Removed - Moved to Navbar */}
                <ScrollyTellingBeats progress={smoothProgress} rawProgress={scrollYProgress} />
            </div>
        </div>
    );
}

function ScrollyTellingBeats({ progress, rawProgress }: { progress: MotionValue<number>; rawProgress: MotionValue<number> }) {
    return (
        <div className="md:container mx-auto px-4 h-full relative font-sans text-white/90">
            {/* Initial Hero Overlay (Visible at Start) - Uses RAW progress for instant load */}
            <HeroOverlay progress={rawProgress} />

            {/* New Beat - Filling the gap */}
            <Beat
                progress={progress}
                range={[0.18, 0.35]}
                title="THE REALITY"
                subtitle="Shared leads are a race to the bottom."
                position="center"
            />

            <Beat
                progress={progress}
                range={[0.38, 0.58]}
                title="VERIFIED INTENT"
                subtitle="We don't sell leads. We sell signals."
                position="left"
            />
            <Beat
                progress={progress}
                range={[0.62, 0.82]}
                title="COMMERCIAL ONLY"
                subtitle="No residential. No tire-kickers."
                position="right"
            />
            <Beat
                progress={progress}
                range={[0.85, 1.0]}
                title="DOMINATE YOUR TERRITORY"
                subtitle="100% Exclusivity. One Slot Per Market."
                position="center"
                isCTA
            />
        </div>
    );
}

function HeroOverlay({ progress }: { progress: MotionValue<number> }) {
    const { trackEvent } = useAnalytics();

    const handleHeroCTAClick = () => {
        trackEvent('cta_click', {
            cta_name: 'hero_market_audit',
            cta_location: 'hero_overlay',
            cta_text: 'Run Market Audit'
        });
    };

    // Simple, robust fade out. Started at 0, gone by 20%.
    const opacity = useTransform(progress, [0, 0.2], [1, 0]);
    // Removing Y movement to prevent "flying away" effect
    const y = useTransform(progress, [0, 0.2], [0, 0]);
    const pointerEvents = useTransform(progress, (v) => v > 0.2 ? "none" : "auto");
    const display = useTransform(progress, (v) => v >= 0.2 ? "none" : "flex");

    return (
        <motion.div
            initial={{ opacity: 1 }}
            style={{ opacity, y, pointerEvents, display }}
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center pt-20 md:pt-48 text-center z-[61] pointer-events-none px-4"
        >
            <div className="pointer-events-auto bg-black/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl max-w-4xl w-full">
                <h2 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight uppercase leading-none drop-shadow-xl">
                    The <span className="text-[#CA8A04]">Anti-Agency</span> <br />
                    For Commercial Roofers
                </h2>
                <p className="text-lg md:text-3xl text-white/80 font-light mb-6 md:mb-8 max-w-2xl mx-auto drop-shadow-md">
                    Stop paying for shared leads. Get exclusive, verified commercial appointments injected into your CRM.
                </p>
                <a href="/verify?source=hero_audit" onClick={handleHeroCTAClick} className="pointer-events-auto px-8 py-4 md:px-10 md:py-5 bg-white text-black text-base md:text-lg font-bold uppercase tracking-widest hover:bg-[#CA8A04] hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 mx-auto group mb-4 inline-flex w-full md:w-auto">
                    Run Market Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-white/40 text-xs md:text-sm font-medium tracking-wide">
                    Free 50-mile radius scan. No credit card required.
                </p>
                <div className="mt-6 text-sm text-white/40 uppercase tracking-widest animate-pulse hidden md:block">
                    Scroll to Explore
                </div>
            </div>
        </motion.div>
    )
}

function Beat({
    progress,
    range,
    title,
    subtitle,
    position,
    isCTA = false
}: {
    progress: MotionValue<number>;
    range: [number, number];
    title: string;
    subtitle: string;
    position: "left" | "right" | "center";
    isCTA?: boolean;
}) {
    const { trackEvent } = useAnalytics();
    const [start, end] = range;

    const handleClaimTerritoryCTA = () => {
        trackEvent('cta_click', {
            cta_name: 'claim_territory',
            cta_location: 'scroll_sequence_end',
            cta_text: 'CLAIM MY EXCLUSIVE TERRITORY'
        });
    };

    const opacity = useTransform(
        progress,
        [start, start + 0.05, end - 0.05, end],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        progress,
        [start, start + 0.05, end - 0.05, end],
        [20, 0, 0, -20]
    );

    const alignClass = {
        left: "items-start text-left lg:pl-20",
        right: "items-end text-right lg:pr-20",
        center: "items-center text-center",
    }[position];

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute inset-0 flex flex-col justify-center ${alignClass} pointer-events-none`}
        >
            <div className="max-w-4xl w-full">
                <h2 className={`font-bold tracking-tight mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] ${isCTA ? "text-6xl md:text-9xl" : "text-5xl md:text-8xl"}`}>
                    {title}
                </h2>
                <div className="inline-block relative">
                    {/* Optional dark backdrop for subtitle legibility */}
                    <div className="absolute -inset-4 bg-black/40 blur-xl rounded-full z-[-1]" />
                    <p className="text-xl md:text-3xl text-white font-light tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        {subtitle}
                    </p>
                </div>

                {isCTA && (
                    <div className="mt-12 pointer-events-auto">
                        <a href="/verify?source=animation_claim" onClick={handleClaimTerritoryCTA} className="px-8 py-4 bg-[#CA8A04] text-black font-bold tracking-widest hover:bg-[#EAB308] transition-all uppercase text-sm shadow-[0_0_30px_rgba(202,138,4,0.3)] hover:shadow-[0_0_50px_rgba(202,138,4,0.6)] flex items-center gap-2 mx-auto md:mx-0 group inline-flex">
                            CLAIM MY EXCLUSIVE TERRITORY <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
