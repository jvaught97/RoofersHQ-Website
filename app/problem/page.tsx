"use client";

import Navbar from "@/components/Navbar";
import GrievanceWall from "@/components/GrievanceWall";
import { motion } from "framer-motion";
import { ArrowRight, DollarSign, TrendingDown, Target, Building2, Skull } from "lucide-react";

export default function ProblemPage() {
    return (
        <main className="bg-[#050505] min-h-screen text-white selection:bg-red-500/30">
            <Navbar />

            {/* SECTION 1: THE MANIFESTO HOOK */}
            <section className="relative pt-48 pb-24 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold tracking-widest uppercase mb-8">
                            The Problem
                        </span>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-display leading-[1.1]">
                            You Built a Commercial Business. <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                                Why Are You Buying Residential Leads?
                            </span>
                        </h1>

                        <div className="max-w-3xl mx-auto space-y-6 text-xl text-white/70 leading-relaxed font-light">
                            <p>
                                You don’t do shingle repairs on backyard sheds. You do <span className="text-white font-medium">50,000 sq. ft. TPO replacements</span> on warehouses. Yet, traditional lead agencies treat them the same.
                            </p>
                            <p>
                                They sell you "commercial leads" that are actually residential homeowners, tire-kickers with no budget, or worse—the same lead they just sold to five of your competitors five minutes ago.
                            </p>
                            <p>
                                Your sales team isn't losing because they can't sell. They're losing because they're fighting over scraps in a flooded market.
                            </p>
                            <p className="text-2xl font-medium text-red-500 pt-4">
                                The commercial lead generation model isn't just inefficient. It’s broken.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: THE PAIN POINT ANIMATION MODULE */}
            <GrievanceWall />

            {/* SECTION 3: THE INVISIBLE DRAIN */}
            <section className="py-32 relative border-t border-white/5 bg-[#0A0A0A]">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
                            It’s Not Just a Bad Lead. <br />
                            <span className="text-red-500">It’s a Hole in Your P&L.</span>
                        </h2>
                        <p className="text-xl text-white/60">
                            The real cost isn't the $200 you paid for the lead. It's the thousands you burned chasing it.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Card 1 */}
                        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 transition-colors group">
                            <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                                <DollarSign className="w-7 h-7 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">The Payroll Torch</h3>
                            <p className="text-white/60 leading-relaxed">
                                You pay your top sales reps six figures to close deals, not to dial disconnection notices. Every hour they spend filtering junk is an hour they aren't closing a 500-square TPO job.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 transition-colors group">
                            <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                                <TrendingDown className="w-7 h-7 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Brand Erosion</h3>
                            <p className="text-white/60 leading-relaxed">
                                Nothing smells like "desperation" more than calling a facility manager who has already been hammered by 10 other roofers. You look like a spammer, not a partner.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 transition-colors group">
                            <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                                <Skull className="w-7 h-7 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">The Whale That Got Away</h3>
                            <p className="text-white/60 leading-relaxed">
                                While your team was busy fighting for a $5,000 residential repair that got mislabeled as commercial, your competitor was closing the $2M logistics center distribution roof. Distraction is expensive.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: DEFINING THE ENEMY */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-900/5" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto bg-[#0F0F0F] border border-white/10 rounded-[2rem] p-10 md:p-16 text-center shadow-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-mono mb-8">
                            <Target className="w-4 h-4 text-red-500" />
                            <span>THE VILLAIN</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-8 font-display">
                            The "Agency" Model Was Built for <br />
                            <span className="text-white italic">Volume</span>, Not <span className="text-red-500 italic">Value</span>.
                        </h2>

                        <div className="space-y-6 text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
                            <p>
                                Traditional lead generation agencies are simply data resellers. Their business model depends on churn. They buy a list, spray it out to as many contractors as possible, and move on.
                            </p>
                            <p>
                                They don't know the difference between a 2,000 sq ft strip mall and a 200,000 sq ft industrial complex, and frankly, they don't care. They get paid on the lead, not the close.
                            </p>
                            <p className="font-bold text-white text-xl">
                                You are funding their incompetence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: TRANSITION & CTA */}
            <section className="py-40 relative px-6 text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0A0A0A] to-[#050505] pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 font-display tracking-tight">
                        You Don’t Need More "Leads". <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                            You Need Better Intelligence.
                        </span>
                    </h2>

                    <p className="text-xl md:text-2xl text-white/60 mb-12 font-light max-w-2xl mx-auto">
                        Stop buying contact info. Start buying access to exclusive, verified commercial projects that actually exist. Welcome to the Anti-Agency.
                    </p>

                    <a href="/verify?source=problem_page" className="group relative overflow-hidden bg-[#CA8A04] hover:bg-[#EAB308] text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-lg transition-all duration-300 shadow-[0_0_40px_rgba(202,138,4,0.2)] hover:shadow-[0_0_60px_rgba(202,138,4,0.4)] hover:-translate-y-1 inline-flex">
                        <span className="relative z-10 flex items-center gap-3">
                            Claim My Exclusive Territory
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                    </a>
                </div>
            </section>
        </main>
    );
}
