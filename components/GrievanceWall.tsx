"use client";

import { motion } from "framer-motion";
import {
    AlertTriangle,
    Users,
    Ghost,
    FileWarning,
    Ban,
    Clock,
    RefreshCcw,
    TrendingDown
} from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function GrievanceWall() {
    const { shouldReduceMotion } = useReducedMotion();
    const painPoints = [
        {
            icon: Users,
            title: "Sold to You & 5 Others",
            description: "You aren't buying a lead; you're buying a ticket to a price war. By the time you call, they've already been low-balled by three other contractors."
        },
        {
            icon: Ban,
            title: "\"Commercial\" Means a 1-Story House",
            description: "You asked for industrial. They sent you a residential shingle repair. Your crew, your equipment, and your pricing are all wrong for the job."
        },
        {
            icon: Ghost,
            title: "The Bad Data Black Hole",
            description: "Your sales team spends more time dialing dead numbers than talking to decision-makers. You're paying for data that doesn't exist."
        },
        {
            icon: RefreshCcw,
            title: "The Refund Runaround",
            description: "You prove the lead was bad. The agency argues with you. You spend hours fighting for a $150 refund instead of closing a $150,000 deal."
        },
        {
            icon: Clock,
            title: "Stuck Talking to the Secretary",
            description: "You get a name, but it's never the owner or facility manager. You can't get past the front desk to the person who actually signs the checks."
        }
    ];

    // Duplicate content for seamless loop
    const loopedPoints = [...painPoints, ...painPoints];

    return (
        <section className="relative bg-[#050505] text-white pt-24 pb-8 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-[#050505] to-[#050505] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 mb-4">
                <motion.div
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 50 }}
                    whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-10%" }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-display uppercase">
                        The Commercial Lead Gen Model is <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.4)]">
                            Broken.
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
                        Stop paying for the same shared leads that <span className="text-red-400 font-medium">12 other roofers</span> are calling right now.
                    </p>
                </motion.div>
            </div>

            <div className="relative w-full overflow-hidden group py-20">
                <style jsx>{`
                    @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-scroll {
                        animation: scroll 60s linear infinite;
                    }
                    .animate-scroll:hover {
                        animation-play-state: paused;
                    }
                `}</style>

                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

                <div className="flex gap-8 px-8 w-max animate-scroll">
                    {loopedPoints.map((point, i) => (
                        <GrievanceCard
                            key={i}
                            icon={point.icon}
                            title={point.title}
                            description={point.description}
                            delay={0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function GrievanceCard({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) {
    return (
        <div
            className="group/card relative h-[320px] w-[280px] md:w-[380px] p-6 rounded-3xl bg-white/[0.02] backdrop-blur-sm border border-white/5 hover:border-red-500/50 transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(239,68,68,0.25)] cursor-pointer flex flex-col justify-between"
        >
            {/* Hover Gradient Bloom */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 group-hover/card:from-red-500/10 group-hover/card:to-transparent transition-all duration-500 opacity-0 group-hover/card:opacity-100 rounded-3xl" />

            <div>
                {/* Icon Wrapper */}
                <div className="relative mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 group-hover/card:border-red-500/40 group-hover/card:bg-red-500/10 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-white/70 group-hover/card:text-red-400 transition-colors duration-300" />
                </div>

                <h3 className="relative text-xl md:text-2xl font-bold mb-3 text-white group-hover/card:text-red-50 transition-colors leading-tight">
                    {title}
                </h3>
            </div>

            <p className="relative text-sm md:text-base text-white/50 leading-relaxed font-light group-hover/card:text-white/80 transition-colors">
                {description}
            </p>
        </div>
    );
}
