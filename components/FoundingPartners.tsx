"use client";

import { motion } from "framer-motion";
import { Check, Zap, Shield, TrendingUp, ArrowRight } from "lucide-react";
import { useAnalytics, useSectionTracking } from "@/hooks/useAnalytics";

export default function FoundingPartners() {
    const { trackEvent } = useAnalytics();
    useSectionTracking('founding-partners');

    const handleCTAClick = () => {
        trackEvent('cta_click', {
            cta_name: 'founding_partners_apply',
            cta_location: 'founding_partners_section',
            cta_text: 'APPLY FOR FOUNDING PARTNER STATUS'
        });
    };

    return (
        <section id="founding-partners" className="relative bg-[#080808] text-white py-32 overflow-hidden border-t border-white/5">
            {/* Luxury Executive Background */}
            <div className="absolute inset-0 bg-[url('/executive-bg.png')] bg-cover bg-center opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808] pointer-events-none" />

            {/* Animated Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#CA8A04]/20 blur-[150px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#CA8A04]/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-[#CA8A04]/10 border border-[#CA8A04]/30 px-6 py-2 rounded-full mb-6">
                        <div className="w-2 h-2 bg-[#CA8A04] rounded-full animate-pulse" />
                        <span className="text-[#CA8A04] text-sm font-bold tracking-widest uppercase">Limited Opportunity</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-display">
                        Founding Partners
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#CA8A04] animate-gradient">
                            Program
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed">
                        Help us prove the model. Get lifetime preferential pricing and exclusive territory access before we go to market.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto mb-16">
                    {/* Left: Why Join */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <div className="w-1 h-8 bg-gradient-to-b from-[#CA8A04] to-transparent" />
                                Why Launch with Us?
                            </h3>
                            <div className="space-y-4">
                                <BenefitItem
                                    icon={<Zap className="w-5 h-5" />}
                                    title="Pay Only for Qualified Leads"
                                    description="No monthly fees. No retainers. Pay per verified commercial lead we deliver."
                                />
                                <BenefitItem
                                    icon={<Shield className="w-5 h-5" />}
                                    title="Lock Your Territory Forever"
                                    description="Secure 50-mile exclusivity. Once you're in, no competitor can access your market."
                                />
                                <BenefitItem
                                    icon={<TrendingUp className="w-5 h-5" />}
                                    title="Grandfathered Pricing"
                                    description="Founding partners pay 40% less than future subscribers. Your rate never increases."
                                />
                                <BenefitItem
                                    icon={<Check className="w-5 h-5" />}
                                    title="Direct Input on Features"
                                    description="Your feedback shapes the platform. Tell us what you need, we build it."
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Program Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#CA8A04] to-[#EAB308] rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                        <div className="relative bg-[#0a0a0a] border border-[#CA8A04]/30 rounded-3xl p-10 backdrop-blur-sm">
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <h3 className="text-3xl font-bold text-[#CA8A04] mb-2">Pilot Pricing</h3>
                                    <p className="text-white/50 text-sm">Available for limited time</p>
                                </div>
                                <div className="bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full">
                                    <span className="text-red-400 text-sm font-bold">5 SLOTS LEFT</span>
                                </div>
                            </div>

                            <div className="space-y-6 mb-8">
                                <PricingDetail
                                    label="Per Qualified Lead"
                                    value="$75"
                                    note="vs. $125 post-launch"
                                />
                                <PricingDetail
                                    label="Bad Lead Replacement"
                                    value="2-for-1"
                                    note="Industry-first guarantee"
                                />
                                <PricingDetail
                                    label="Setup Fee"
                                    value="$0"
                                    note="Waived for founding partners"
                                />
                                <PricingDetail
                                    label="Minimum Commitment"
                                    value="None"
                                    note="Cancel anytime, no contracts"
                                />
                            </div>

                            <div className="border-t border-white/10 pt-8">
                                <h4 className="text-lg font-bold mb-4 text-white/90">What You Get:</h4>
                                <ul className="space-y-3 text-sm text-white/70">
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-[#CA8A04] mt-0.5 flex-shrink-0" />
                                        <span>Direct-dial numbers for facility managers, CFOs, and property owners</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-[#CA8A04] mt-0.5 flex-shrink-0" />
                                        <span>Verified commercial properties 20k+ sq ft in your territory</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-[#CA8A04] mt-0.5 flex-shrink-0" />
                                        <span>Instant CRM injection (JobNimbus, AccuLynx, HubSpot)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-[#CA8A04] mt-0.5 flex-shrink-0" />
                                        <span>Weekly performance reports and lead attribution data</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <div className="inline-block">
                        <a
                            href="/verify?source=founding_partners"
                            onClick={handleCTAClick}
                            className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-[#CA8A04] to-[#EAB308] text-black px-12 py-6 rounded-full font-bold text-lg tracking-wider hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(202,138,4,0.4)] hover:shadow-[0_0_60px_rgba(202,138,4,0.6)]"
                        >
                            <span>APPLY FOR FOUNDING PARTNER STATUS</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </a>
                        <p className="mt-6 text-sm text-white/40 font-medium tracking-wide">
                            We review applications within 24 hours • Onboarding takes 48 hours
                        </p>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </section>
    );
}

function BenefitItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="flex gap-4 group cursor-default">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#CA8A04]/10 border border-[#CA8A04]/20 flex items-center justify-center text-[#CA8A04] group-hover:bg-[#CA8A04]/20 group-hover:border-[#CA8A04]/40 transition-all duration-300">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-lg mb-1 text-white group-hover:text-[#CA8A04] transition-colors">{title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

function PricingDetail({ label, value, note }: { label: string, value: string, note: string }) {
    return (
        <div className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
            <div>
                <div className="text-white/70 text-sm mb-1">{label}</div>
                <div className="text-white/40 text-xs">{note}</div>
            </div>
            <div className="text-2xl font-bold text-[#CA8A04]">{value}</div>
        </div>
    );
}
