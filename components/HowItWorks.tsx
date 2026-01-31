"use client";

import { motion } from "framer-motion";
import { Radar, UserCheck, Filter, Zap } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function HowItWorks() {
    const { shouldReduceMotion } = useReducedMotion();

    const steps = [
        {
            number: "01",
            icon: Radar,
            title: "Detect Intent Signals",
            description: "We monitor 200+ commercial property data sources in real-time. When a facility manager searches for roof specs or visits a competitor's site, we capture that signal.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            number: "02",
            icon: UserCheck,
            title: "Verify Decision-Maker",
            description: "Anonymous traffic becomes a real person. We resolve IP addresses to Facility Managers, CFOs, and Property Owners with verified contact information.",
            color: "from-purple-500 to-pink-500"
        },
        {
            number: "03",
            icon: Filter,
            title: "Filter by Territory & Building Class",
            description: "Only properties in your exclusive zone that match your building type (Industrial, Multi-Family, or Retail) make it through. No wasted calls.",
            color: "from-[#CA8A04] to-orange-500"
        },
        {
            number: "04",
            icon: Zap,
            title: "Instant Delivery to Your CRM",
            description: "Qualified leads hit your JobNimbus, AccuLynx, or HubSpot within minutes. Your sales team strikes while the need is fresh.",
            color: "from-green-500 to-emerald-500"
        }
    ];

    return (
        <section className="relative bg-[#0f0f0f] text-white py-32 overflow-hidden border-t border-white/5">
            {/* Background Image - Digital Data Stream */}
            <div className="absolute inset-0 bg-[url('/process-bg.png')] bg-cover bg-center opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-transparent to-[#0f0f0f] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                    whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-block bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-6">
                        <span className="text-white/80 text-sm font-bold tracking-widest uppercase">The Process</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                        How It Works
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto">
                        From anonymous traffic to verified commercial lead in under 5 minutes.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <StepCard
                                key={index}
                                step={step}
                                index={index}
                                isLast={index === steps.length - 1}
                                shouldReduceMotion={shouldReduceMotion}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom CTA hint */}
                <motion.div
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-white/40 text-sm">
                        No spreadsheets. No manual lookups. No guessing.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

function StepCard({ step, index, isLast, shouldReduceMotion }: { step: any, index: number, isLast: boolean, shouldReduceMotion: boolean }) {
    const Icon = step.icon;

    return (
        <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
        >
            {/* Connecting Line (hidden on mobile, visible on lg+) */}
            {!isLast && (
                <div className="hidden lg:block absolute top-20 left-full w-8 h-[2px] bg-gradient-to-r from-white/20 to-transparent z-0" />
            )}

            {/* Card */}
            <div className="relative h-full">
                {/* Gradient Glow on Hover */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${step.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500`} />

                {/* Main Card Content */}
                <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 h-full flex flex-col group-hover:border-white/20 transition-all duration-300">
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
                        <span className="text-white/50 text-sm font-bold">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div className={`mb-6 inline-flex w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} p-0.5`}>
                        <div className="w-full h-full bg-[#0a0a0a] rounded-xl flex items-center justify-center">
                            <Icon className="w-7 h-7 text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                        {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 leading-relaxed text-sm flex-grow">
                        {step.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
