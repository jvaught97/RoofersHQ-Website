"use client";

import Navbar from "@/components/Navbar";
import GrievanceWall from "@/components/GrievanceWall";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, DollarSign, TrendingDown, Target, Building2, Skull, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function ProblemPage() {
    return (
        <main className="bg-[#050505] min-h-screen text-white selection:bg-red-500/30">
            <Navbar />

            {/* SECTION 1: THE MANIFESTO HOOK */}
            {/* SECTION 1: THE MANIFESTO HOOK */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
                {/* Background Image - Parallax */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="/commercial_problem_bg_v3.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-40 mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                    <div className="absolute inset-0 bg-black/50" />
                </motion.div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none z-10 animate-pulse" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block py-1 px-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold tracking-widest uppercase mb-8"
                        >
                            The Problem
                        </motion.span>

                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 font-display leading-[0.9]">
                            You Built a <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                                Commercial Business.
                            </span>
                        </h1>

                        <h2 className="text-2xl md:text-4xl font-light text-red-500 mb-12 tracking-wide">
                            Why Are You Buying Residential Leads?
                        </h2>

                        <div className="max-w-3xl mx-auto space-y-8 text-xl text-white/70 leading-relaxed font-light">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                You don’t do shingle repairs on backyard sheds. You do <span className="text-white font-medium border-b border-red-500/30">50,000 sq. ft. TPO replacements</span> on warehouses.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                Yet, traditional lead agencies treat them the same. They sell you "commercial leads" that are actually residential homeowners or recycled lists.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-2xl font-medium text-white pt-4 border-l-4 border-red-500 pl-6"
                            >
                                The commercial lead generation model isn't just inefficient. <span className="text-red-500">It’s broken.</span>
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: THE PAIN POINT ANIMATION MODULE */}
            <GrievanceWall />

            {/* SECTION 3: THE INVISIBLE DRAIN (HOLE REVEAL) */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="py-32 bg-[#0A0A0A] relative"
            >
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-4xl md:text-5xl font-bold mb-6 font-display"
                        >
                            It’s a <span className="text-red-500">Hole</span> in Your P&L.
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-xl text-white/60"
                        >
                            And it’s getting bigger every single day you ignore it.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {[
                            { icon: AlertCircle, title: "Wasted Ad Spend", desc: "Paying for clicks from homeowners, tire-kickers, and competitors." },
                            { icon: TrendingDown, title: "Low Conversion", desc: "Sales teams burnt out calling leads that were never qualified to begin with." },
                            { icon: DollarSign, title: "Race to the Bottom", desc: "Competing on price because you look exactly like every other roofer." }
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (idx * 0.2), duration: 0.8, type: "spring" }}
                                className="p-10 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-red-500/30 transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <card.icon className="w-12 h-12 text-red-500 mb-6 group-hover:scale-110 transition-transform duration-300" />
                                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                                <p className="text-white/60 leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* SECTION 4: DEFINING THE ENEMY (3D PERSPECTIVE) */}
            <section className="py-32 relative overflow-hidden perspective-1000">
                <div className="absolute inset-0 bg-red-900/5 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <SpotlightCard className="max-w-4xl mx-auto bg-[#0F0F0F] border border-white/10 rounded-[2rem] p-10 md:p-16 text-center shadow-[0_0_100px_rgba(220,38,38,0.2)] relative overflow-hidden group">
                        <motion.div
                            initial={{ opacity: 0, rotateX: -45, scale: 0.7, y: 100 }}
                            whileInView={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-mono mb-8 relative z-20">
                                <Target className="w-4 h-4 text-red-500" />
                                <span>THE VILLAIN</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold mb-8 font-display relative z-20">
                                The "Agency" Model Was Built for <br />
                                <span className="text-white italic relative inline-block">
                                    <span className="absolute inset-0 animate-pulse text-red-500 opacity-50 blur-[1px]">Volume</span>
                                    <span>Volume</span>
                                </span>, Not <span className="text-red-500 italic">Value</span>.
                            </h2>

                            <div className="space-y-6 text-lg text-white/60 leading-relaxed max-w-2xl mx-auto relative z-20">
                                <motion.p
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                >
                                    Traditional lead generation agencies are simply data resellers. Their business model depends on churn. They buy a list, spray it out to as many contractors as possible, and move on.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                >
                                    They don't know the difference between a 2,000 sq ft strip mall and a 200,000 sq ft industrial complex, and frankly, they don't care. They get paid on the lead, not the close.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                    className="font-bold text-white text-xl"
                                >
                                    You are funding their incompetence.
                                </motion.p>
                            </div>
                        </motion.div>
                    </SpotlightCard>
                </div>
            </section>

            {/* SECTION 5: TRANSITION & CTA */}
            <section className="py-40 relative px-6 text-center overflow-hidden">
                {/* Realistic Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/cta-real-bg.png"
                        alt="Commercial Roofing Aerial"
                        fill
                        className="object-cover opacity-80"
                    />
                    {/* Lighter overlay to ensure text readability while keeping image bright */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none z-10" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-8 font-display tracking-tight drop-shadow-2xl">
                            You Don’t Need More "Leads". <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                                You Need Better Intelligence.
                            </span>
                        </h2>

                        <p className="text-xl md:text-2xl text-white/80 mb-12 font-light max-w-2xl mx-auto drop-shadow-md">
                            Stop buying contact info. Start buying access to exclusive, verified commercial projects that actually exist. Welcome to the Anti-Agency.
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a href="/verify?source=problem_page" className="group relative overflow-hidden bg-[#CA8A04] hover:bg-[#EAB308] text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-lg transition-all duration-300 shadow-[0_0_40px_rgba(202,138,4,0.2)] hover:shadow-[0_0_60px_rgba(202,138,4,0.4)] inline-flex ring-4 ring-orange-500/20">
                                <span className="relative z-10 flex items-center gap-3">
                                    Claim My Exclusive Territory
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const divRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = React.useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`${className} overflow-hidden relative`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(220, 38, 38, 0.15), transparent 40%)`,
                }}
            />
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(220, 38, 38, 0.1), transparent 40%)`,
                }}
            />
            {children}
        </div>
    );
}

import React from "react";
