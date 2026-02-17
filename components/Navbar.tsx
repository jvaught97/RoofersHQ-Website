"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();
    const isLandingPage = pathname === "/";

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    // Handle scroll visibility
    useEffect(() => {
        const handleScroll = () => {
            // Show navbar when scrolled down (>10px) on landing page
            // OR if mobile menu is open
            // OR if NOT on landing page (always visible)
            if (!isLandingPage) {
                setIsVisible(true);
            } else {
                setIsVisible(window.scrollY > 10);
            }
        };

        // Check on mount
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLandingPage]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: isVisible || isMobileMenuOpen ? 0 : -100 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-4 bg-black/80 backdrop-blur-xl border-b border-white/5 transition-all duration-500"
            >
                <div className="max-w-[1920px] mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2 relative z-[101]">
                        <span className="text-white font-display font-bold text-2xl md:text-3xl tracking-tighter uppercase drop-shadow-[0_2px_10px_rgba(202,138,4,0.3)]">
                            RoofersHQ
                        </span>
                        <div className="hidden md:block w-px h-6 bg-white/20 mx-4" />
                        <span className="hidden md:block text-xs font-mono text-white/40 tracking-widest uppercase">
                            Commercial Only
                        </span>
                    </a>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <a href="/problem" className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest font-medium">
                            The Problem
                        </a>
                        <a href="/solution" className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest font-medium">
                            The Solution
                        </a>
                        <a href="/road-to-2m" className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest font-medium">
                            Roadmap
                        </a>

                        <a href="/verify?source=nav_check" className="group relative overflow-hidden bg-[#CA8A04] hover:bg-[#EAB308] text-black px-7 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_0_20px_rgba(202,138,4,0.3)] hover:shadow-[0_0_30px_rgba(202,138,4,0.5)]">
                            <span className="relative z-10 flex items-center gap-2">
                                Check Availability
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden relative z-[101] p-2 text-white/80 hover:text-white transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-3xl pt-24 px-6 flex flex-col md:hidden"
                    >
                        <div className="flex flex-col gap-8 mt-12">
                            <a
                                href="/problem"
                                className="text-3xl font-display font-bold text-white tracking-tight"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                The Problem
                            </a>
                            <a
                                href="/solution"
                                className="text-3xl font-display font-bold text-white tracking-tight"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                The Solution
                            </a>
                            <a
                                href="/road-to-2m"
                                className="text-3xl font-display font-bold text-white tracking-tight"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Roadmap
                            </a>
                            <div className="h-px w-full bg-white/10 my-2" />
                            <a
                                href="/verify?source=nav_mobile"
                                className="flex items-center justify-between text-2xl font-bold text-[#CA8A04] tracking-wide"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Check Availability
                                <ArrowRight className="w-6 h-6" />
                            </a>
                        </div>

                        <div className="mt-auto mb-12">
                            <p className="text-white/40 text-sm font-mono uppercase tracking-widest text-center">
                                Commercial Roofing Lead Systems
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
