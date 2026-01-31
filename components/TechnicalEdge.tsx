"use client";

import { motion } from "framer-motion";

export default function TechnicalEdge() {
    return (
        <section className="bg-[#02040a] py-32 relative overflow-hidden text-white">
            {/* Cyber Intelligence Background */}
            <div className="absolute inset-0 bg-[url('/cyber-bg.png')] bg-cover bg-center opacity-20 pointer-events-none mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#02040a] via-transparent to-[#02040a] pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">

                <div className="w-full md:w-1/2">

                    <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                        The Technical Edge: <br />
                        <span className="text-blue-500">Data Warfare</span>
                    </h2>
                    <p className="text-xl text-white/60 mb-8 leading-relaxed">
                        We don't guess. We track digital footprints. Our system monitors commercial property intent signals across the web in real-time.
                    </p>

                    <div className="space-y-8">
                        <EdgeFeature
                            title="Behavioral Tracking"
                            desc="We de-anonymize decision-makers visiting manufacturing spec sites, commercial insurance portals, and roofing material supplier pages."
                        />
                        <EdgeFeature
                            title="Firmographic Filtering"
                            desc="We filter targets by building square footage (20k sq ft+), specific industries (Warehousing, Retail), and localized intent."
                        />
                        <EdgeFeature
                            title="Instant Attribution"
                            desc="You know exactly which URL triggered the lead, giving your sales team the 'Why Now' context to open the conversation."
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2 relative bg-blue-900/5 border border-blue-500/20 rounded-xl p-8 h-auto md:h-[500px] flex flex-col overflow-hidden backdrop-blur-sm group hover:border-blue-500/40 transition-colors duration-500">
                    {/* Visual Abstraction of Data Stream */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(59,130,246,0.05)_50%,transparent_100%)] animate-scan pointer-events-none" />

                    <div className="font-mono text-xs text-blue-300/70 space-y-2 relative z-10">
                        <TypedTerminalLine text="> DETECTED: 50,000 SQ FT WAREHOUSE" delay={0} />
                        <TypedTerminalLine text='> INTENT SIGNAL: "TPO REPAIR ESTIMATE"' delay={1.5} />
                        <TypedTerminalLine text="> DE-ANONYMIZING IP: 192.168.X.X" delay={3} />
                        <TypedTerminalLine text="> MATCH FOUND: FACILITIES MANAGER [VERIFIED]" delay={4.5} />
                        <TypedTerminalLine text="> PUSHING TO CRM... SUCCESS" delay={6} className="text-blue-400 font-bold" />
                    </div>

                    <div className="mt-8 md:mt-12 bg-black/80 backdrop-blur-md border border-blue-500/30 p-6 rounded-lg relative z-20 shadow-2xl shadow-blue-900/20 group-hover:shadow-blue-500/20 transition-all duration-500">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm text-gray-400">Lead Source</div>
                            <div className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded animate-pulse">HIGH INTENT</div>
                        </div>
                        <div className="text-lg font-bold text-white">Industrial Properties LLC</div>
                        <div className="text-sm text-gray-500 mb-2">Manufacturing • 120k sq ft</div>
                        <div className="flex gap-2 items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                            <div className="text-sm text-gray-300">John Doe (Facility Director)</div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

function TypedTerminalLine({ text, delay, className = "" }: { text: string, delay: number, className?: string }) {
    return (
        <motion.p
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`border-r-2 border-transparent animate-blink ${className}`}
        >
            {text}
        </motion.p>
    );
}

function EdgeFeature({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="pl-6 border-l-2 border-blue-900 hover:border-blue-500 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}
