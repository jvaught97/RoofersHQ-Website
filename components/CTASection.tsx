"use client";

import React, { useState } from 'react';
import { ArrowRight } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { motion } from "framer-motion";

export default function CTASection() {
    const { trackEvent } = useAnalytics();
    const [isHovered, setIsHovered] = useState(false);

    const handleCTA = () => {
        trackEvent('cta_click', {
            cta_name: 'hero_market_audit',
            cta_location: 'cta_section',
            cta_text: 'Run Market Audit'
        });
    }

    return (
        <section className="relative w-full bg-[#050505] py-32 px-4 flex justify-center items-center overflow-hidden">

            {/* Spotlight / Ambient Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(202,138,4,0.15)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative max-w-5xl w-full text-center z-10"
            >
                <div className="inline-block mb-6">
                    <span className="py-2 px-4 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(202,138,4,0.3)]">
                        Exclusive Territories Available
                    </span>
                </div>

                <h2 className="text-6xl md:text-9xl font-bold text-white mb-8 tracking-tighter uppercase leading-[0.85]">
                    The <motion.span
                        animate={{ backgroundPosition: ["0% center", "200% center"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#CA8A04] via-yellow-200 to-[#CA8A04] bg-[size:200%_auto]"
                    >Anti-Agency</motion.span><br />
                    Model
                </h2>

                <p className="text-xl md:text-3xl text-white/60 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
                    We don't share leads. We don't sell lists. We inject verified commercial appointments directly into your calendar.
                </p>

                <div className="flex justify-center">
                    <motion.a
                        href="/verify?source=hero_audit"
                        onClick={handleCTA}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group inline-flex items-center gap-4 px-12 py-6 bg-[#CA8A04] text-white text-xl font-bold uppercase tracking-widest overflow-hidden hover:bg-[#b07803] transition-all shadow-[0_0_30px_rgba(202,138,4,0.3)] hover:shadow-[0_0_50px_rgba(202,138,4,0.5)]"
                    >
                        <span className="relative z-10">Start Your Audit</span>
                        <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />

                        {/* Button Sweep Effect */}
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                    </motion.a>
                </div>

                <p className="mt-8 text-white/30 text-xs font-mono tracking-widest uppercase">
                    • 100% Exclusive • Ops-Ready • Deal-Driven
                </p>
            </motion.div>
        </section>
    );
}
