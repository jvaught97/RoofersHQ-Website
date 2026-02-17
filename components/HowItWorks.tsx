"use client";

import { motion, useInView } from "framer-motion";
import { Radar, UserCheck, Filter, Zap } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// Local cn utility
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

export default function HowItWorks() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            number: "01",
            icon: Radar,
            title: "Detect Intent Signals",
            description: "We monitor 200+ commercial property data sources in real-time. When a facility manager searches for roof specs or visits a competitor's site, we capture that signal.",
            color: "from-blue-500 to-cyan-500",
            image: "/how-it-works/step-1-real.png"
        },
        {
            number: "02",
            icon: UserCheck,
            title: "Verify Decision-Maker",
            description: "Anonymous traffic becomes a real person. We resolve IP addresses to Facility Managers, CFOs, and Property Owners with verified contact information.",
            color: "from-purple-500 to-pink-500",
            image: "/how-it-works/step-2-real.png"
        },
        {
            number: "03",
            icon: Filter,
            title: "Filter by Territory",
            description: "Only properties in your exclusive zone that match your building type (Industrial, Multi-Family, or Retail) make it through. No wasted calls.",
            color: "from-[#CA8A04] to-orange-500",
            image: "/how-it-works/step-3-real.png"
        },
        {
            number: "04",
            icon: Zap,
            title: "Instant Delivery",
            description: "Qualified leads hit your CRM within minutes. Your sales team strikes while the need is fresh.",
            color: "from-green-500 to-emerald-500",
            image: "/how-it-works/step-4-real.png"
        }
    ];

    return (
        <section className="relative bg-[#0f0f0f] text-white py-24 md:py-32">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-6">
                        <span className="text-white/80 text-sm font-bold tracking-widest uppercase">The Process</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        How It Works
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto">
                        Automated intelligence. Verified results.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 relative">
                    {/* Left Column: Sticky Visuals (Desktop Only) */}
                    <div className="hidden lg:block w-1/2 h-[600px] sticky top-32">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: activeStep === index ? 1 : 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    {/* High-Quality Generated Image */}
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover"
                                        priority={index === 0} // Load first image immediately
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Scrollable Content */}
                    <div className="w-full lg:w-1/2 flex flex-col pt-0 pb-[10vh]">
                        {steps.map((step, index) => (
                            <StepItem
                                key={index}
                                step={step}
                                index={index}
                                setActiveStep={setActiveStep}
                                activeStep={activeStep}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function StepItem({ step, index, setActiveStep, activeStep }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveStep(index);
        }
    }, [isInView, index, setActiveStep]);

    const isActive = activeStep === index;

    // Use window fork for mobile check or just sticky CSS
    // Mobile Layout: Sticky Image at top, text scrolls below.
    return (
        <div
            ref={ref}
            className="group min-h-[50vh] flex flex-col justify-center py-12 px-4 md:px-8 border-l border-white/10 transition-colors duration-500 hover:border-white/30"
        >
            <div className={cn(
                "transition-all duration-500 ease-out",
                isActive ? "opacity-100 translate-x-4" : "opacity-40 translate-x-0"
            )}>
                <span className={cn(
                    "font-mono text-sm mb-4 block tracking-wider",
                    isActive ? "text-[#CA8A04]" : "text-white/40"
                )}>
                    {step.number}
                </span>

                <h3 className={cn(
                    "text-3xl md:text-4xl font-bold mb-6 transition-colors",
                    isActive ? "text-white" : "text-white/60"
                )}>
                    {step.title}
                </h3>

                <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                    {step.description}
                </p>

                {/* Mobile visual: Just the clean image, no icons */}
                <div className="relative mt-8 lg:hidden rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-lg">
                    <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
