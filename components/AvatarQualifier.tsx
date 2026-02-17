"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AvatarQualifier() {
    const { shouldReduceMotion } = useReducedMotion();

    return (
        <section className="relative bg-[#050505] py-16 md:py-32 overflow-hidden border-t border-white/5">
            {/* Background Image - Strategic Industrial Blueprint */}
            <div className="absolute inset-0 bg-[url('/blueprint-bg.png')] bg-cover bg-center opacity-60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />

            {/* Dual Aurora Background - "The Filter" */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-green-500/10 to-transparent pointer-events-none mix-blend-overlay" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500/10 to-transparent pointer-events-none mix-blend-overlay" />

            {/* Animated Orbs */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-block px-6 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md mb-6">
                        <span className="text-white/60 text-sm font-bold tracking-[0.2em] uppercase">The Selection Process</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                        Built for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Top 1%</span>.
                    </h2>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                        We are not a lead vendor. We are a growth partner. Our infrastructure is designed for scale, not experimentation.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto items-center">
                    {/* VISUAL: The Qualified "Black Card" */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        {/* Golden/Green Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition-all duration-500" />

                        <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 h-full overflow-hidden">
                            {/* Card Texture */}
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-[100px]" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-10">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-900/50">
                                        <div className="text-white font-bold text-xl">✓</div>
                                    </div>
                                    <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold tracking-wider">
                                        ACCESS GRANTED
                                    </div>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-2">Ideal Partner</h3>
                                <p className="text-emerald-500/80 font-mono text-sm mb-8">VERIFIED • SCALABLE • FUNDED</p>

                                <ul className="space-y-6">
                                    <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 box-content border-4 border-emerald-500/20" />
                                        <div>
                                            <span className="block text-white font-bold text-lg">$2M - $50M+ Revenue</span>
                                            <span className="text-white/40 text-sm">Proven market fit & closing ability</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 box-content border-4 border-emerald-500/20" />
                                        <div>
                                            <span className="block text-white font-bold text-lg">Sales Infrastructure</span>
                                            <span className="text-white/40 text-sm">Dedicated SDRs/Closer teams ready</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 box-content border-4 border-emerald-500/20" />
                                        <div>
                                            <span className="block text-white font-bold text-lg">Growth Mindset</span>
                                            <span className="text-white/40 text-sm">Aggressive expansion goals</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* VISUAL: The Disqualified "Redacted" Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Stronger Red Glow - Matched to Green Card Intensity */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-red-500 via-red-600 to-orange-600 rounded-3xl blur-md opacity-40 group-hover:opacity-60 transition-all duration-500" />

                        <div className="relative bg-[#0a0a0a] border border-white/5 rounded-3xl p-10 h-full overflow-hidden">
                            {/* Card Texture */}
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />

                            <div className="flex justify-between items-start mb-10 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                                    <div className="font-light text-xl">✕</div>
                                </div>
                                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-medium tracking-wider uppercase">
                                    Not a Fit
                                </div>
                            </div>

                            <h3 className="relative z-10 text-3xl font-bold text-white mb-2">Strategic Misalignment</h3>
                            <p className="relative z-10 text-white/40 font-mono text-sm mb-8">BELOW THRESHOLD • OPERATIONAL GAPS</p>

                            <ul className="space-y-6 relative z-10">
                                <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 box-content border-4 border-red-500/20" />
                                    <div>
                                        <span className="block text-white/90 font-medium text-lg">Under $2M Revenue</span>
                                        <span className="text-white/50 text-sm">Requires operational scale for volume</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 box-content border-4 border-red-500/20" />
                                    <div>
                                        <span className="block text-white/90 font-medium text-lg">No Sales Infrastructure</span>
                                        <span className="text-white/50 text-sm">Undefined intake & closing process</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 box-content border-4 border-red-500/20" />
                                    <div>
                                        <span className="block text-white/90 font-medium text-lg">Reactive Growth</span>
                                        <span className="text-white/50 text-sm">Lacking data attribution/ROI tracking</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                .animate-pulse-slow {
                    animation: pulse 8s infinite ease-in-out;
                }
            `}</style>
        </section>
    );
}
