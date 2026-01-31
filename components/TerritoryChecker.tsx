"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { useAnalytics, useSectionTracking } from "@/hooks/useAnalytics";

interface SlotAvailability {
    buildingType: string;
    available: number;
    total: number;
    status: "available" | "limited" | "full";
}

export default function TerritoryChecker() {
    const { trackEvent } = useAnalytics();
    useSectionTracking('territory-checker');

    const [zipCode, setZipCode] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [results, setResults] = useState<SlotAvailability[] | null>(null);
    const [error, setError] = useState("");

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate ZIP code
        if (!/^\d{5}$/.test(zipCode)) {
            setError("Please enter a valid 5-digit ZIP code");
            setResults(null);
            return;
        }

        // Track territory check event
        trackEvent('territory_check', {
            zip_code: zipCode,
            source: 'territory_checker_component'
        });

        setError("");
        setIsChecking(true);

        // Simulate API call with mock data
        setTimeout(() => {
            // Mock results based on ZIP code (for demo purposes)
            const mockResults: SlotAvailability[] = [
                {
                    buildingType: "Industrial",
                    available: parseInt(zipCode.slice(-1)) % 3 + 1,
                    total: 3,
                    status: parseInt(zipCode.slice(-1)) % 3 + 1 <= 1 ? "limited" : "available"
                },
                {
                    buildingType: "Multi-Family",
                    available: parseInt(zipCode.slice(-2, -1)) % 3 + 1,
                    total: 3,
                    status: parseInt(zipCode.slice(-2, -1)) % 3 + 1 <= 1 ? "limited" : "available"
                },
                {
                    buildingType: "Retail",
                    available: parseInt(zipCode.slice(-3, -2)) % 4,
                    total: 3,
                    status: parseInt(zipCode.slice(-3, -2)) % 4 === 0 ? "full" : parseInt(zipCode.slice(-3, -2)) % 4 <= 1 ? "limited" : "available"
                }
            ];

            setResults(mockResults);
            setIsChecking(false);
        }, 1500);
    };

    return (
        <section id="territory-checker" className="relative bg-[#111111] text-white py-32 overflow-hidden">
            {/* Background Image - Commercial Roofing Aerial */}
            <div className="absolute inset-0 bg-[url('/commercial-bg.png')] bg-cover bg-center opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-transparent to-[#111111] pointer-events-none" />

            {/* Animated Background */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#CA8A04]/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#CA8A04]/10 border border-[#CA8A04]/30 px-6 py-2 rounded-full mb-6">
                            <MapPin className="w-4 h-4 text-[#CA8A04]" />
                            <span className="text-[#CA8A04] text-sm font-bold tracking-widest uppercase">Territory Availability</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Check Your Market
                        </h2>
                        <p className="text-xl md:text-2xl text-white font-light">
                            See which exclusive slots are still available in your territory.
                        </p>
                    </motion.div>

                    {/* Input Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleCheck} className="mb-12">
                            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                                <div className="flex-grow relative">
                                    <input
                                        type="text"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                                        placeholder="Enter ZIP Code (e.g., 75201)"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 md:py-5 text-lg md:text-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#CA8A04]/50 focus:border-[#CA8A04] transition-all text-center font-mono tracking-widest uppercase"
                                        disabled={isChecking}
                                    />
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isChecking || zipCode.length !== 5}
                                    className="px-10 py-5 bg-gradient-to-r from-[#CA8A04] to-[#EAB308] text-black font-bold rounded-xl hover:scale-105 transition-all duration-300 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(202,138,4,0.3)] hover:shadow-[0_0_50px_rgba(202,138,4,0.5)] whitespace-nowrap"
                                >
                                    {isChecking ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            Checking...
                                        </span>
                                    ) : (
                                        "Check Availability"
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Error Message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="max-w-2xl mx-auto mb-8"
                                >
                                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Results */}
                        <AnimatePresence mode="wait">
                            {results && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-6"
                                >
                                    {/* Location Header */}
                                    <div className="text-center mb-8">
                                        <p className="text-white mb-2">Results for ZIP Code</p>
                                        <h3 className="text-3xl font-bold text-[#CA8A04]">{zipCode}</h3>
                                        <p className="text-white text-sm mt-2">50-mile radius coverage</p>
                                    </div>

                                    {/* Slot Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {results.map((slot, index) => (
                                            <SlotCard key={index} slot={slot} delay={index * 0.1} />
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        className="text-center mt-12"
                                    >
                                        <a
                                            href={`/verify?source=territory_check&zip=${zipCode}`}
                                            className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl group"
                                        >
                                            CLAIM YOUR SLOT NOW
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                        <p className="mt-4 text-white text-sm">
                                            Founding Partner pricing ends soon
                                        </p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function SlotCard({ slot, delay }: { slot: SlotAvailability, delay: number }) {
    const statusColors = {
        available: {
            bg: "from-green-500/20 to-emerald-500/20",
            border: "border-green-500/30",
            text: "text-green-400",
            icon: "text-green-400"
        },
        limited: {
            bg: "from-orange-500/20 to-yellow-500/20",
            border: "border-orange-500/30",
            text: "text-orange-400",
            icon: "text-orange-400"
        },
        full: {
            bg: "from-red-500/20 to-pink-500/20",
            border: "border-red-500/30",
            text: "text-red-400",
            icon: "text-red-400"
        }
    };

    const colors = statusColors[slot.status];
    const statusLabel = slot.status === "full" ? "SOLD OUT" : slot.status === "limited" ? "ALMOST GONE" : "AVAILABLE";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay }}
            className="group"
        >
            <div className={`relative bg-[#0a0a0a] bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-2xl`}>
                {/* Status Badge */}
                <div className="absolute -top-3 -right-3">
                    <div className={`bg-[#0a0a0a] ${colors.bg} ${colors.border} border px-4 py-1 rounded-full shadow-lg`}>
                        <span className={`text-xs font-bold ${colors.text}`}>{statusLabel}</span>
                    </div>
                </div>

                {/* Icon */}
                <div className="mb-4">
                    {slot.status === "full" ? (
                        <AlertCircle className={`w-10 h-10 ${colors.icon}`} />
                    ) : (
                        <CheckCircle2 className={`w-10 h-10 ${colors.icon}`} />
                    )}
                </div>

                {/* Building Type */}
                <h4 className="text-2xl font-bold mb-4 text-white">{slot.buildingType}</h4>

                {/* Availability */}
                <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-bold ${colors.text}`}>
                            {slot.available}
                        </span>
                        <span className="text-white/60">/ {slot.total} slots</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(slot.available / slot.total) * 100}%` }}
                            transition={{ duration: 0.8, delay: delay + 0.2 }}
                            className={`h-full bg-gradient-to-r ${colors.bg.replace('/20', '')}`}
                        />
                    </div>

                    <p className="text-white/50 text-sm mt-3">
                        {slot.status === "full"
                            ? "Join waitlist"
                            : `${slot.available} ${slot.available === 1 ? 'slot' : 'slots'} remaining`}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
