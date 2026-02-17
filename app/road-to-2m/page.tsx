"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import RadarMap from "@/components/RadarMap";
import { ArrowRight, TrendingUp, AlertTriangle, ShieldAlert, CheckCircle2, XCircle, Ban, Target, ChevronRight, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import RoadmapInteractive from "@/components/RoadmapInteractive";

export default function RoadTo2M() {
    const [activePoint, setActivePoint] = useState<string | null>(null);

    const GRAPH_POINTS = [
        {
            id: 'chaos',
            label: 'The Chaos Zone',
            subLabel: 'Owner is the only closer',
            cx: 200, cy: 350,
            color: '#ef4444', // red-500
            delay: 0.2,
            labelPos: { left: '15%', bottom: '5%', textAlign: 'left' as const }, // Moved lower
            tooltip: {
                title: 'The Trap of "Hustle"',
                body: 'You are capping your revenue at your own personal bandwidth. 100% of sales depend on you answering the phone.'
            }
        },
        {
            id: 'valley',
            label: 'The Valley of Death',
            subLabel: 'Hiring 1st Salesperson',
            cx: 400, cy: 300,
            color: '#eab308', // yellow-400
            delay: 1.0,
            labelPos: { left: '38%', top: '80%', textAlign: 'left' as const }, // Moved below the line
            tooltip: {
                title: 'The Profit Dip',
                body: 'You hire staff, costs go up, but efficiency goes down initially. Most turn back here.'
            }
        },
        {
            id: 'scale',
            label: 'Scale Mode ($2M+)',
            subLabel: 'Systematized Revenue',
            cx: 850, cy: 90,
            color: '#22c55e', // green-500
            delay: 2.2,
            labelPos: { right: '5%', top: '5%', textAlign: 'right' as const }, // Moved higher and right
            tooltip: {
                title: 'The Exit Velocity',
                body: 'Sales are a process, not a person. Revenue is predictable. You are ready for high-volume leads.'
            }
        }
    ];

    return (
        <main className="bg-black min-h-screen text-white selection:bg-blue-500/30">
            <Navbar />

            {/* HERO SECTION: The Operational Chasm */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/road-to-2m-bg-real.png')] bg-cover bg-center opacity-40 pointer-events-none" />
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
                    <div className="relative max-w-4xl mx-auto h-[300px] md:h-[400px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mt-12 overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />

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

                            {/* Path */}
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

                            {/* Mapped Points */}
                            {GRAPH_POINTS.map((point) => (
                                <motion.circle
                                    key={point.id}
                                    cx={point.cx} cy={point.cy} r={activePoint === point.id ? 8 : 6}
                                    fill={point.color}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: point.delay, type: "spring" }}
                                    className="cursor-pointer hover:stroke-white hover:stroke-2 transition-all duration-300"
                                    onMouseEnter={() => setActivePoint(point.id)}
                                    onMouseLeave={() => setActivePoint(null)}
                                />
                            ))}

                            {/* HIT TARGETS (Invisible large circles for easier hovering) */}
                            {GRAPH_POINTS.map((point) => (
                                <circle
                                    key={`hit-${point.id}`}
                                    cx={point.cx} cy={point.cy} r={24}
                                    fill="transparent"
                                    className="cursor-pointer"
                                    onMouseEnter={() => setActivePoint(point.id)}
                                    onMouseLeave={() => setActivePoint(null)}
                                />
                            ))}
                        </svg>

                        {/* Mapped Labels */}
                        {GRAPH_POINTS.map((point) => (
                            <motion.div
                                key={point.id}
                                className="absolute cursor-pointer hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    ...point.labelPos,
                                    zIndex: 10
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: activePoint === point.id ? 1 : 1, y: 0 }}
                                animate={{ opacity: activePoint && activePoint !== point.id ? 0.3 : 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: point.delay + 0.1 }}
                                onMouseEnter={() => setActivePoint(point.id)}
                                onMouseLeave={() => setActivePoint(null)}
                            >
                                <p className="font-bold text-sm" style={{ color: point.color }}>{point.label}</p>
                                <p className="text-white/40 text-xs text-nowrap">{point.subLabel}</p>
                            </motion.div>
                        ))}

                        {/* Tooltip Popup */}
                        <AnimatePresence>
                            {activePoint && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute z-50 p-4 bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl max-w-xs pointer-events-none"
                                    style={{
                                        left: GRAPH_POINTS.find(p => p.id === activePoint)?.cx! > 500 ? 'auto' : (GRAPH_POINTS.find(p => p.id === activePoint)?.cx! / 10 + '%'),
                                        right: GRAPH_POINTS.find(p => p.id === activePoint)?.cx! > 500 ? '10%' : 'auto', // Flip side if on right
                                        top: '20%' // Approximate center vertical
                                    }}
                                >
                                    {(() => {
                                        const p = GRAPH_POINTS.find(p => p.id === activePoint)!;
                                        return (
                                            <>
                                                <h3 className="text-sm font-bold mb-1" style={{ color: p.color }}>{p.tooltip.title}</h3>
                                                <p className="text-xs text-white/80 leading-relaxed">{p.tooltip.body}</p>
                                            </>
                                        );
                                    })()}
                                </motion.div>
                            )}
                        </AnimatePresence>
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
            <section className="py-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.15)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none" />
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">The 3 <span className="text-red-500">Growth Traps</span></h2>
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
                <div className="absolute inset-0 bg-[url('/roadmap-bg-clean.png')] bg-cover bg-center opacity-30 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-blue-500/50 to-transparent dashed opacity-20" />

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold mb-4 border border-green-500/20">THE FIX</div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Your Roadmap to $2M</h2>
                        <p className="text-white/50">Execute these 3 steps, and you'll be ready for us.</p>
                    </div>

                    <RoadmapInteractive />

                    <div className="mt-24 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl text-center max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold mb-4">Are you already here?</h3>
                        <p className="text-white/60 mb-8">If you have a CRM, a sales team, and &gt;$2M revenue, you are ready for fuel.</p>
                        <a href="/verify" className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors">
                            Verify My Territory <ArrowRight className="w-4 h-4" />
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
        <div className="p-8 bg-[#0a0a0a] border border-white/5 hover:border-red-500/50 transition-all duration-300 rounded-2xl group hover:shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="text-4xl font-mono font-bold text-white/10 mb-6 group-hover:text-red-500 transition-colors duration-300">{number}</div>
            <h3 className="text-xl font-bold mb-4 group-hover:text-red-400 transition-colors">{title}</h3>
            <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">{desc}</p>
        </div>
    )
}


