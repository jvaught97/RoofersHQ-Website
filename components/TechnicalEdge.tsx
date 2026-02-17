"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TechnicalEdge() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center text-white overflow-hidden py-24">
            {/* Realistic Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/tech-edge-real.png"
                    alt="Data Center Technical Edge"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-80" />
            </div>

            <div className="container mx-auto px-4 relative z-10 mt-12">

                {/* Header Section */}
                <div className="mb-20 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-white/50" />
                        <span className="uppercase tracking-[0.2em] text-sm text-white/70 font-medium">Statistics</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold leading-tight uppercase"
                    >
                        RooferHQ By The <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Numbers</span>
                    </motion.h2>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20 border-t border-white/10 pt-16">
                    <StatItem
                        value={200}
                        suffix="+"
                        label="Data Sources Monitored"
                        delay={0.4}
                        description="Real-time monitoring of permit filings, tax records, and material purchase orders."
                    />
                    <StatItem
                        value={15}
                        suffix="M+"
                        label="Properties Tracked"
                        delay={0.6}
                        description="Comprehensive coverage of commercial industrial, retail, and multi-family assets."
                    />
                    <StatItem
                        value={98}
                        suffix="%"
                        label="Verification Rate"
                        delay={0.8}
                        description="Proprietary AI filters ensure you only speak to verified decision makers."
                    />
                </div>

                {/* Footer/CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
                >
                    <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
                        We don't guess. We track digital footprints using sophisticated signals intelligence to deliver exclusive appointments directly to your CRM.
                    </p>

                    <Link href="/solution" className="group flex items-center gap-3 text-white font-semibold tracking-wider hover:text-blue-400 transition-colors">
                        EXPLORE TECHNOLOGY <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

            </div>

            {/* Decorative Bottom Wave/Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#02040a] to-transparent pointer-events-none" />
        </section>
    );
}

function StatItem({ value, suffix, label, description, delay }: { value: number, suffix: string, label: string, description: string, delay: number }) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    React.useEffect(() => {
        if (isInView) {
            animate(count, value, { duration: 2, ease: "easeOut" });
        }
    }, [isInView, value, count]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay }}
            className="group relative"
        >
            <div className="flex items-baseline mb-4">
                <motion.h3 className="text-6xl md:text-7xl font-bold tracking-tight">
                    {rounded}
                </motion.h3>
                <span className="text-6xl md:text-7xl font-bold tracking-tight text-blue-400">{suffix}</span>
            </div>
            <div className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                {label}
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs group-hover:text-white/70 transition-colors">
                {description}
            </p>
        </motion.div>
    );
}
