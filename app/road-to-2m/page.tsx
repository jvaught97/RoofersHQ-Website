"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import RadarMap from "@/components/RadarMap";
import { ArrowRight, TrendingUp, AlertTriangle, ShieldAlert, CheckCircle2, XCircle, Ban, Target } from "lucide-react";

export default function RoadTo2M() {
    return (
        <main className="bg-black min-h-screen text-white selection:bg-blue-500/30">
            <Navbar />

            {/* HERO SECTION: The Operational Chasm */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-bg.png')] opacity-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-8">
                            <ShieldAlert className="w-4 h-4" />
                            <span>WHY WE SAY "NO"</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                            The Road to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">$2M</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-12">
                            We don't reject you because you're small. <br className="hidden md:block" />
                            <span className="text-white">We reject you because our leads would bankrupt you.</span>
                        </p>
                    </motion.div>

                    {/* VISUAL: The Valley of Death Graph */}
                    <div className="relative max-w-4xl mx-auto h-[300px] md:h-[400px] bg-white/5 border border-white/10 rounded-2xl p-8 mt-12 overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />

                        {/* The Graph Line */}
                        <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#ef4444" />
                                    <stop offset="40%" stopColor="#ef4444" />
                                    <stop offset="50%" stopColor="#eab308" />
                                    <stop offset="100%" stopColor="#22c55e" />
                                </linearGradient>
                            </defs>
                            {/* Path: Flat start (chaos), Dip (Valley of Death), Exponential Growth */}
                            <motion.path
                                d="M0,350 C200,350 300,380 400,300 C500,200 600,150 1000,50"
                                fill="none"
                                stroke="url(#line-gradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                vectorEffect="non-scaling-stroke"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 2.5, ease: "easeInOut" }}
                            />

                            {/* Annotations - Sequenced */}
                            <motion.circle
                                cx="200" cy="350" r="6" fill="#ef4444"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, type: "spring" }}
                            />
                            <motion.circle
                                cx="400" cy="300" r="6" fill="#eab308"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.0, type: "spring" }}
                            />
                            <motion.circle
                                cx="850" cy="90" r="6" fill="#22c55e"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 2.2, type: "spring" }}
                            />
                        </svg>

                        {/* Labels - Sequenced */}
                        <motion.div
                            className="absolute left-[15%] bottom-[15%] text-left"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <p className="text-red-400 font-bold text-sm">The Chaos Zone</p>
                            <p className="text-white/40 text-xs text-nowrap">Owner is the only closer</p>
                        </motion.div>

                        <motion.div
                            className="absolute left-[38%] top-[55%] text-left"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.1 }}
                        >
                            <p className="text-yellow-400 font-bold text-sm">The Valley of Death</p>
                            <p className="text-white/40 text-xs">Hiring 1st Salesperson</p>
                        </motion.div>

                        <motion.div
                            className="absolute right-[10%] top-[15%] text-right"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 2.3 }}
                        >
                            <p className="text-green-500 font-bold text-sm">Scale Mode ($2M+)</p>
                            <p className="text-white/40 text-xs">Systematized Revenue</p>
                        </motion.div>
                    </div>
                    <p className="text-sm text-white/30 mt-4 font-mono">FIG 1.0: THE REVENUE BREAKPOINT</p>
                </div>
            </section>

            {/* SECTION 2: The Brutal Truth */}
            <section className="py-24 bg-[#050505] border-t border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Why High-Intent Leads <br />
                                <span className="text-red-500">Kill Low-Process Businesses</span>
                            </h2>
                            <div className="space-y-6 text-white/60 text-lg leading-relaxed">
                                <p>
                                    Everyone thinks they want "more leads." But when you pour high-octane fuel into a leaky engine, you don't go faster—you explode.
                                </p>
                                <p>
                                    Our leads are expensive because they are verified. If you lack the infrastructure to call them within 5 minutes, follow up 7 times, and present a professional managed bid, you will calculate your ROI as "negative."
                                </p>
                                <p>
                                    We protect our reputation by only partnering with teams who can actually close the opportunities we generate.
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-xl">
                                <h3 className="flex items-center gap-3 text-red-500 font-bold mb-2">
                                    <Ban className="w-5 h-5" />
                                    The Volume Trap
                                </h3>
                                <p className="text-white/50 text-sm">Most owners can handle 5 leads a month. We send 50. Without a team, you drown, burnout, and cancel.</p>
                            </div>
                            <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-xl">
                                <h3 className="flex items-center gap-3 text-red-500 font-bold mb-2">
                                    <Ban className="w-5 h-5" />
                                    The Speed Gap
                                </h3>
                                <p className="text-white/50 text-sm">Commercial leads degrade by 10x every hour they sit. If you're on a roof installing, you're losing money.</p>
                            </div>
                            <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-xl">
                                <h3 className="flex items-center gap-3 text-red-500 font-bold mb-2">
                                    <Ban className="w-5 h-5" />
                                    The Cashflow Crunch
                                </h3>
                                <p className="text-white/50 text-sm">Commercial sales cycles are 3-9 months. If you need leads to pay next week's bills, you aren't ready for this market.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: The 3 Traps */}
            <section className="py-24 bg-black relative">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">The 3 Growth Traps</h2>
                        <p className="text-white/50">Most roofers die on the hill of "I'll just do it myself."</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <TrapCard
                            number="01"
                            title="The Referral Plateau"
                            desc="Relying on word-of-mouth works until it doesn't. You can't scale 'hope'."
                        />
                        <TrapCard
                            number="02"
                            title="The Owner-Closer"
                            desc="If you are the best salesperson in your company, your company has no value. You are the bottleneck."
                        />
                        <TrapCard
                            number="03"
                            title="The 'Magic Lead'"
                            desc="Thinking a better lead source will fix a broken sales process. (It won't)."
                        />
                    </div>
                </div>
            </section>

            {/* SECTION 4: The Roadmap */}
            <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-blue-500/50 to-transparent dashed opacity-20" />

                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold mb-4 border border-green-500/20">THE FIX</div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Your Roadmap to $2M</h2>
                        <p className="text-white/50">Execute these 3 steps, and you'll be ready for us.</p>
                    </div>

                    <div className="space-y-12">
                        {/* Step 1 */}
                        <RoadmapStep
                            step="01"
                            title="Digitize Content & Ops"
                            desc="Stop using paper folders. Implement a CRM (JobNimbus/HubSpot). If it's not in the CRM, it didn't happen."
                            icon={<Target className="w-6 h-6 text-blue-400" />}
                        />
                        {/* Step 2 */}
                        <RoadmapStep
                            step="02"
                            title="Hire The First Seller"
                            desc="This is the hardest hire. Not an estimator—a hunter. Pay them a base + comms. Get off the roof."
                            icon={<TrendingUp className="w-6 h-6 text-indigo-400" />}
                        />
                        {/* Step 3 */}
                        <RoadmapStep
                            step="03"
                            title="Standardize The Bid"
                            desc="Your proposals should look identical regardless of who sends them. Speed wins."
                            icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                        />
                    </div>

                    <div className="mt-20 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl text-center">
                        <h3 className="text-2xl font-bold mb-4">Are you already here?</h3>
                        <p className="text-white/60 mb-8">If you have a CRM, a sales team, and &gt;$2M revenue, you are ready for fuel.</p>
                        <a href="/verify" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
                            Verify Your Territory <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>
            {/* SECTION 5: INTELLIGENCE RADAR */}
            <section className="py-24 bg-black border-t border-white/5 relative">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold mb-6 font-mono">
                            <Target className="w-4 h-4" />
                            <span>LIVE MARKET INTELLIGENCE</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">See What You're <span className="text-red-500 line-through decoration-red-500/50">Missing</span>.</h2>
                        <p className="text-white/50 max-w-2xl mx-auto text-lg">
                            We track 50-100 commercial repair & replacement signals in your territory every week. <br />
                            <span className="text-white">This is the volume you can't see.</span>
                        </p>
                    </div>

                    <RadarMap />

                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-white/20 font-mono max-w-3xl mx-auto">
                            *DISCLAIMER: The Market Radar utilizes a historical data-set and simulated intent-signals to demonstrate the volume of opportunity in your region. Actual live-lead availability is only confirmed during the Official Market Audit for firms exceeding the $2M revenue threshold.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

function TrapCard({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="p-8 bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors rounded-2xl group">
            <div className="text-4xl font-mono font-bold text-white/10 mb-6 group-hover:text-white/20 transition-colors">{number}</div>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="text-white/50 leading-relaxed">{desc}</p>
        </div>
    )
}

function RoadmapStep({ step, title, desc, icon }: { step: string, title: string, desc: string, icon: React.ReactNode }) {
    return (
        <div className="flex gap-6 md:gap-12 items-start group">
            <div className="hidden md:flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors relative z-10 bg-[#050505]">
                    {icon}
                </div>
            </div>
            <div className="flex-1 p-8 bg-[#0a0a0a] border border-white/5 rounded-2xl hover:border-blue-500/20 transition-all hover:-translate-y-1 duration-300">
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-blue-500 font-mono text-sm">{step}</span>
                    <h3 className="text-2xl font-bold">{title}</h3>
                </div>
                <p className="text-white/50 text-lg leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}
