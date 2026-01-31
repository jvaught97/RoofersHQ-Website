"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Handshake, Rocket } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SolutionGrid() {
    const { shouldReduceMotion } = useReducedMotion();
    return (
        <section className="relative bg-[#050505] text-white py-32 border-t border-white/5 overflow-hidden">
            {/* Background Gradient & Image */}
            <div className="absolute inset-0 bg-[url('/solution-bg.png')] bg-cover bg-center opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#CA8A04]/10 via-[#050505] to-[#050505] pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10">
                <div className="mb-24 text-center">
                    <motion.h2
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        transition={shouldReduceMotion ? { duration: 0 } : {}}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-display"
                    >
                        The RoofersHQ <span className="text-[#CA8A04]">Solution</span>
                    </motion.h2>
                    <p className="text-xl md:text-2xl text-white/60 font-light">
                        We re-engineered the entire acquisition process for the top 1%.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <SolutionItem
                        title="100% Territory Exclusivity"
                        description="We operate on a Slot System. Once you secure a market, we will NOT sell a lead to another roofer within a 50-mile radius. You own the turf."
                        icon={<ShieldCheck className="w-8 h-8" />}
                        delay={0.1}
                        shouldReduceMotion={shouldReduceMotion}
                    />
                    <SolutionItem
                        title="Pre-Identified Power"
                        description="We bypass gatekeepers. You get direct-dial mobile numbers for Facility Managers, CFOs, and HOA Presidents who own the budget."
                        icon={<Zap className="w-8 h-8" />}
                        delay={0.2}
                        shouldReduceMotion={shouldReduceMotion}
                    />
                    <SolutionItem
                        title="The 2-for-1 Integrity Guarantee"
                        description="If you get a bad lead (wrong number, non-decision maker), we don't just refund you—we replace it with TWO fresh leads."
                        icon={<Handshake className="w-8 h-8" />}
                        delay={0.3}
                        shouldReduceMotion={shouldReduceMotion}
                    />
                    <SolutionItem
                        title="Automated CRM Injection"
                        description="No more spreadsheets. Leads are pushed instantly into JobNimbus, AccuLynx, or HubSpot so your sales team can strike immediately."
                        icon={<Rocket className="w-8 h-8" />}
                        delay={0.4}
                        shouldReduceMotion={shouldReduceMotion}
                    />
                </div>
            </div>
        </section>
    );
}

function SolutionItem({ title, description, icon, delay, shouldReduceMotion }: { title: string, description: string, icon: React.ReactNode, delay: number, shouldReduceMotion: boolean }) {
    return (
        <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            whileInView={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay }}
            viewport={{ once: true }}
            className="flex gap-6 group cursor-default select-none"
        >
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#CA8A04]/10 flex items-center justify-center text-[#CA8A04]/60 border border-[#CA8A04]/20 group-hover:border-[#CA8A04] group-hover:text-[#CA8A04] transition-all duration-300">
                {icon}
            </div>
            <div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#CA8A04] transition-colors">{title}</h3>
                <p className="text-white/60 leading-relaxed text-lg">{description}</p>
            </div>
        </motion.div>
    )
}
