"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Target, TrendingUp, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function RoadmapInteractive() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            id: 0,
            step: "01",
            title: "Digitize Content & Ops",
            desc: "Stop using paper folders. Implement a CRM (JobNimbus/HubSpot). If it's not in the CRM, it didn't happen.",
            icon: Target,
            image: "/roadmap-digitize-real.jpg",
            color: "text-blue-400",
            glow: "shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)]"
        },
        {
            id: 1,
            step: "02",
            title: "Hire The First Seller",
            desc: "This is the hardest hire. Not an estimator—a hunter. Pay them a base + comms. Get off the roof.",
            icon: TrendingUp,
            image: "/roadmap-hire.png",
            color: "text-indigo-400",
            glow: "shadow-[0_0_50px_-10px_rgba(99,102,241,0.3)]"
        },
        {
            id: 2,
            step: "03",
            title: "Standardize The Bid",
            desc: "Your proposals should look identical regardless of who sends them. Speed wins.",
            icon: CheckCircle2,
            image: "/roadmap-standardize-real.jpg",
            color: "text-emerald-400",
            glow: "shadow-[0_0_50px_-10px_rgba(16,185,129,0.3)]"
        }
    ];

    return (
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch h-[600px]">
            {/* LEFT COLUMN: Dynamic Image Display */}
            <div className="hidden lg:block relative h-full w-full group">
                {/* Ambient Background Glow based on active step */}
                <div className={`absolute inset-0 opacity-20 transition-all duration-700 blur-3xl rounded-full ${steps[activeStep].glow.replace('shadow-[', 'bg-[')}`} />

                <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)", transition: { duration: 0.4 } }}
                            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={steps[activeStep].image}
                                alt={steps[activeStep].title}
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Cinematic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-90" />

                            {/* Floating Context Label on Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="absolute bottom-8 left-8 right-8"
                            >
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-mono mb-2 ${steps[activeStep].color}`}>
                                    {(() => {
                                        const ActiveIcon = steps[activeStep].icon;
                                        return <ActiveIcon className="w-3 h-3" />;
                                    })()}
                                    <span>STEP {steps[activeStep].step}</span>
                                </div>
                                <h4 className="text-xl font-bold text-white max-w-sm">{steps[activeStep].title}</h4>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* RIGHT COLUMN: Interactive List */}
            <div className="flex flex-col justify-between h-full">
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        onMouseEnter={() => setActiveStep(index)}
                        className="relative group cursor-pointer flex-1 flex items-center"
                    >
                        {/* Mobile Image (Visible only on small screens) */}
                        <div className={`lg:hidden mb-4 relative aspect-video rounded-xl overflow-hidden ${activeStep === index ? 'block' : 'hidden'} w-full`}>
                            <Image
                                src={steps[index].image}
                                alt={steps[index].title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>

                        {/* Active Background Pill with LayoutID for Morphing Effect */}
                        {activeStep === index && (
                            <motion.div
                                layoutId="roadmap-active-bg"
                                className="absolute inset-0 bg-white/[0.03] border border-white/10 rounded-2xl"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}

                        <div className="relative p-6 px-8 flex items-start gap-6 z-10 w-full transition-transform duration-300">
                            {/* Animated Number */}
                            <div className={`mt-1 font-mono text-sm font-bold transition-colors duration-300 ${activeStep === index ? step.color : "text-white/30"}`}>
                                {step.step}
                            </div>

                            <div className="flex-1">
                                <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${activeStep === index ? "text-white" : "text-white/50"}`}>
                                    {step.title}
                                </h3>
                                <p className={`text-sm leading-relaxed transition-all duration-300 ${activeStep === index ? "text-white/70" : "text-white/30"}`}>
                                    {step.desc}
                                </p>
                            </div>

                            {/* Icon Indicator */}
                            <div className={`hidden sm:flex items-center justify-center transition-all duration-300 ${activeStep === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}>
                                <ArrowRight className={`w-5 h-5 ${step.color}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
