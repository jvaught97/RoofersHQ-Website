"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-4 bg-black/80 backdrop-blur-xl border-b border-white/5 transition-all duration-500"
        >
            <div className="max-w-[1920px] mx-auto flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2">
                    <span className="text-white font-display font-bold text-2xl md:text-3xl tracking-tighter uppercase drop-shadow-[0_2px_10px_rgba(202,138,4,0.3)]">
                        RoofersHQ
                    </span>
                    <div className="hidden md:block w-px h-6 bg-white/20 mx-4" />
                    <span className="hidden md:block text-xs font-mono text-white/40 tracking-widest uppercase">
                        Commercial Only
                    </span>
                </a>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <a href="/problem" className="hidden md:block text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest font-medium">
                        The Problem
                    </a>
                    <a href="/solution" className="hidden md:block text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest font-medium">
                        The Solution
                    </a>

                    <a href="/verify?source=nav_check" className="group relative overflow-hidden bg-[#CA8A04] hover:bg-[#EAB308] text-black px-5 py-2.5 md:px-7 md:py-3 font-bold uppercase tracking-wider text-xs md:text-sm transition-all duration-300 shadow-[0_0_20px_rgba(202,138,4,0.3)] hover:shadow-[0_0_30px_rgba(202,138,4,0.5)]">
                        <span className="relative z-10 flex items-center gap-2">
                            Check Availability
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
