"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ZeroWasteOffer() {
    return (
        <section className="bg-[#CA8A04] text-black py-32 text-center relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 relative z-10"
            >
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 uppercase">
                    Zero Waste Pipeline
                </h2>
                <p className="text-xl md:text-3xl font-medium mb-12 max-w-3xl mx-auto opacity-80">
                    Secure your 50-mile exclusive territory before your competitor does.
                </p>

                <a href="/verify?source=footer_check" className="bg-black text-white px-12 py-6 text-lg font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl flex items-center gap-3 mx-auto group inline-flex">
                    Check Territory Availability <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>

                <p className="mt-8 text-sm opacity-60 font-mono">
                    LIMITED SLOTS AVAILABLE PER REGION
                </p>
            </motion.div>
        </section>
    );
}
