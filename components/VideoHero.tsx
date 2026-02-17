"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function VideoHero() {
    const { scrollY } = useScroll();

    // Parallax effects
    // y moves slower than scroll to create depth (lag effect)
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
            >
                <source src="/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505]" />

            {/* Brand content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 text-center px-4"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase drop-shadow-2xl mb-4"
                >
                    ROOFERS HQ
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="text-white/80 text-lg md:text-2xl font-light tracking-widest uppercase"
                >
                    Lead-First. Ops-Ready. Deal-Driven.
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/50"
            >
                <span className="text-xs uppercase tracking-[0.2em] animate-pulse">Scroll to Explore</span>
                <div className="h-12 w-[1px] bg-gradient-to-b from-white/50 to-transparent" />
            </motion.div>
        </div>
    );
}
