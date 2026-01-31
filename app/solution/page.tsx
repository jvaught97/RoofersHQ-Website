"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Search,
    Siren,
    Scale,
    Hammer,
    ArrowRight,
    Database,
    ShieldCheck,
    MapPin,
    FileSearch,
    Building2
} from "lucide-react";

export default function SolutionPage() {
    return (
        <main className="bg-[#050505] min-h-screen text-white selection:bg-orange-500/30">
            <Navbar />

            {/* SECTION 1: HERO (Fixed the Engineering) */}
            <section className="relative pt-48 pb-24 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
                            The Solution
                        </span>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-display leading-[1.1]">
                            We Didn’t Just Change the Model. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                                We Fixed the Engineering.
                            </span>
                        </h1>

                        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/70 leading-relaxed font-light mb-12">
                            Stop chasing shared, unvetted data. RoofersHQ provides a real-time intelligence pipeline that identifies, vets, and injects commercial <span className="text-white font-medium">"Whales"</span> directly into your sales workflow.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: THE THREE STRATEGIC FAUCETS */}
            <section className="py-24 relative border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Faucet 1 */}
                        <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl hover:border-blue-500/30 transition-all group">
                            <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <LayoutDashboard className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 font-display">
                                Category 1 <br />
                                <span className="text-blue-400">The Owned Pixel</span>
                            </h3>
                            <p className="text-white/60 leading-relaxed">
                                Identify the "silent 97%" of your own website visitors. Turn anonymous traffic into verified decision-maker dossiers. We tell you WHO is visiting your site before they fill out a form.
                            </p>
                        </div>

                        {/* Faucet 2 */}
                        <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl hover:border-blue-500/30 transition-all group">
                            <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Search className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 font-display">
                                Category 2 <br />
                                <span className="text-blue-400">Keyword Intent Engine</span>
                            </h3>
                            <p className="text-white/60 leading-relaxed">
                                Capture decision-makers actively researching commercial roof repairs, TPO costs, and industrial replacements across the open web in real-time.
                            </p>
                        </div>

                        {/* Faucet 3 */}
                        <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl hover:border-blue-500/30 transition-all group">
                            <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Siren className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 font-display">
                                Category 3 <br />
                                <span className="text-blue-400">The Competitor Intercept</span>
                            </h3>
                            <p className="text-white/60 leading-relaxed">
                                The ultimate advantage. Get alerted the moment a prospect visits a competitor’s site or a manufacturer’s warranty page. Intercept the deal before the first bid is even requested.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: LEAD ENGINEERING (Whale Validator) */}
            <section className="py-32 bg-[#020202] relative overflow-hidden">
                {/* Tech background element */}
                <div className="absolute left-0 bottom-0 w-1/2 h-full bg-blue-900/5 blur-3xl pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <div className="inline-block text-blue-500 text-sm font-bold tracking-widest mb-4">
                            AUTOMATED VETTING
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-display">
                            Lead Engineering & <br />
                            <span className="text-blue-500">The "Whale Validator"</span>
                        </h2>
                        <div className="space-y-10">
                            <div className="flex gap-6">
                                <div className="mt-1">
                                    <Scale className="w-8 h-8 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Square Footage Filter</h3>
                                    <p className="text-white/50 leading-relaxed">
                                        Every signal is cross-referenced against property tax data to ensure the building meets your "Whale" threshold (e.g., &gt;20,000 sq. ft.). No more backyards.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="mt-1">
                                    <Hammer className="w-8 h-8 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Material Matching</h3>
                                    <p className="text-white/50 leading-relaxed">
                                        We identify the primary roof material (TPO, Metal, EPDM) to ensure the lead matches your crew's specialization.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="mt-1">
                                    <Database className="w-8 h-8 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Direct CRM Injection</h3>
                                    <p className="text-white/50 leading-relaxed">
                                        Eliminate manual entry. Verified opportunities are pushed directly into your CRM (JobNimbus, AccuLynx, etc.) via automated n8n workflows.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual: Data Validator */}
                    <div className="w-full md:w-1/2">
                        <div className="relative bg-[#0F0F0F] border border-blue-500/20 rounded-2xl p-8 shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="font-mono text-sm space-y-4 text-blue-300">
                                <div className="flex justify-between border-b border-blue-500/20 pb-2">
                                    <span>STATUS</span>
                                    <span className="text-green-400 animate-pulse">VALIDATING...</span>
                                </div>
                                <div className="space-y-2 opacity-80">
                                    <p>[Checking Property Tax Records]... <span className="text-green-400">MATCH</span></p>
                                    <p>Building Size: <span className="text-white font-bold">45,000 SQ FT</span></p>
                                    <p>Roof Type: <span className="text-white font-bold">TPO / FLAT</span></p>
                                    <p>Owner Info: <span className="text-white font-bold">LLC PIERCED (John Smith)</span></p>
                                    <p>Permit History: <span className="text-red-400">LAST REPLACED 1998</span> (26 Years Old)</p>
                                </div>
                                <div className="pt-4 border-t border-blue-500/20 flex justify-between items-center">
                                    <span className="text-white/50">DESTINATION</span>
                                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded text-xs font-bold">PUSH TO JOBNIMBUS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: THE PROPERTY INTELLIGENCE DOSSIER */}
            <section className="py-24 bg-[#080808] border-y border-white/5">
                <div className="container mx-auto px-6 text-center mb-16">
                    <span className="text-orange-500 text-sm font-bold tracking-widest uppercase mb-4 block">
                        Tier 3 / Apex Feature
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">
                        The Property Intelligence Dossier
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        We provide deep-dive intelligence that your competitors simply don't have access to.
                    </p>
                </div>

                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-[#111] p-8 rounded-2xl border border-white/10 text-center">
                            <Building2 className="w-10 h-10 text-orange-500 mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-2">LLC Piercing</h3>
                            <p className="text-white/50 text-sm">We find the human being behind the anonymous holding company.</p>
                        </div>
                        <div className="bg-[#111] p-8 rounded-2xl border border-white/10 text-center">
                            <FileSearch className="w-10 h-10 text-orange-500 mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-2">Permit History</h3>
                            <p className="text-white/50 text-sm">We know exact roof age by pulling historical municipal permit data.</p>
                        </div>
                        <div className="bg-[#111] p-8 rounded-2xl border border-white/10 text-center">
                            <MapPin className="w-10 h-10 text-orange-500 mx-auto mb-6" />
                            <h3 className="text-xl font-bold mb-2">Mortgage Maturity</h3>
                            <p className="text-white/50 text-sm">Predicting the next refinance or sale event for perfect timing.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: THE INTEGRITY PROTOCOL */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-4xl font-bold font-display mb-8">
                            The Integrity Protocol
                        </h2>
                        <p className="text-white/60">
                            We removed the risk so you can focus on selling.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="bg-gradient-to-br from-white/5 to-transparent p-10 rounded-[2rem] border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-20">
                                <span className="text-8xl font-bold text-white">2:1</span>
                            </div>
                            <ShieldCheck className="w-12 h-12 text-green-500 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">The 2-for-1 Guarantee</h3>
                            <p className="text-white/60 leading-relaxed">
                                If a lead is verified as inaccurate or non-commercial, it is automatically replaced by TWO verified "Whales" in your pipeline.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-white/5 to-transparent p-10 rounded-[2rem] border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-20">
                                <span className="text-8xl font-bold text-white">50</span>
                            </div>
                            <MapPin className="w-12 h-12 text-blue-500 mb-8" />
                            <h3 className="text-2xl font-bold mb-4">The 50-Mile Moat</h3>
                            <p className="text-white/60 leading-relaxed">
                                When you lock a territory, you own the signals. We do not sell your data to any other contractor in your 50-mile radius.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: FINAL PIVOT & CTA */}
            <section className="py-32 bg-[#CA8A04] text-black text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 font-display uppercase">
                        Your Market is Talking. <br />
                        <span className="opacity-90">Are You Listening?</span>
                    </h2>

                    <a href="/verify?source=solution_page" className="bg-black text-white px-12 py-6 text-xl font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 mx-auto group inline-flex">
                        Run My Market Audit
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <p className="mt-8 font-medium opacity-70">
                        Stop buying leads. Start installing intelligence.
                    </p>
                </div>
            </section>

        </main>
    );
}
