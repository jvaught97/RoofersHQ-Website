"use client";

import VideoHero from "@/components/VideoHero";
import CTASection from "@/components/CTASection";
import Navbar from "@/components/Navbar";
import GrievanceWall from "@/components/GrievanceWall";
import SolutionGrid from "@/components/SolutionGrid";
import HowItWorks from "@/components/HowItWorks";
import FoundingPartners from "@/components/FoundingPartners";
import AvatarQualifier from "@/components/AvatarQualifier";
import TechnicalEdge from "@/components/TechnicalEdge";
import TerritoryChecker from "@/components/TerritoryChecker";
import ZeroWasteOffer from "@/components/ZeroWasteOffer";
import { useScrollTracking } from "@/hooks/useAnalytics";
import { motion } from "framer-motion";

export default function Home() {
    // Automatically track scroll depth
    useScrollTracking();

    return (
        <main className="bg-[#050505] min-h-screen selection:bg-[#CA8A04] selection:text-white">

            {/* Hero Section - Standard Scroll */}
            <div className="relative z-10 bg-[#050505]">
                <VideoHero />
            </div>

            {/* CTA Section - Sticky for Card Deck Effect */}
            <div className="sticky top-0 z-0 h-screen flex items-center justify-center bg-[#050505]">
                <div className="w-full">
                    <CTASection />
                </div>
            </div>

            {/* Grievance Wall - Slides over CTA */}
            <div className="relative z-20 bg-[#050505] rounded-t-[3rem] border-t border-white/10 shadow-[0_-50px_100px_rgba(0,0,0,0.8)] pb-12">
                <GrievanceWall />
            </div>

            {/* Remove overflow-hidden to fix sticky behavior in HowItWorks */}
            <div className="relative z-20 bg-[#050505]">
                {/* Solution Grid - 3D Slide In */}
                <motion.div
                    initial={{ opacity: 0, x: -100, rotateY: 20 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    style={{ perspective: 1000 }}
                >
                    <SolutionGrid />
                </motion.div>

                {/* How It Works - Simple Fade to preserve Sticky */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <HowItWorks />
                </motion.div>

                {/* Founding Partners - Skew Up Reveal */}
                <motion.div
                    initial={{ opacity: 0, y: 100, skewY: 5 }}
                    whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <FoundingPartners />
                </motion.div>

                {/* Avatar Qualifier - Zoom Out Effect */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <AvatarQualifier />
                </motion.div>

                {/* Technical Edge - Card Flip Reveal */}
                <motion.div
                    initial={{ opacity: 0, rotateX: -30, transformOrigin: "top" }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                    style={{ perspective: 1000 }}
                    className="relative z-10 py-12"
                >
                    <TechnicalEdge />
                </motion.div>

                {/* Territory Checker - Elastic Slide from Left */}
                <motion.div
                    initial={{ opacity: 0, x: -200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <TerritoryChecker />
                </motion.div>

                {/* Zero Waste Offer - Slow Rise */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <ZeroWasteOffer />
                </motion.div>
            </div>
        </main>
    );
}
