"use client";

import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, MapPin, Building, Ruler, Briefcase, DollarSign, Activity, AlertCircle, Lock, Server, ScanLine, ChevronDown, Check, User, Mail } from "lucide-react";

// Suspense wrapper for search params
function VerificationContent() {
    const searchParams = useSearchParams();
    const source = searchParams.get("source") || "direct_traffic";

    // Form State
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // CRM Dropdown State
    const [crmSearch, setCrmSearch] = useState("");
    const [showCrmDropdown, setShowCrmDropdown] = useState(false);
    const crmOptions = ["JobNimbus", "AccuLynx", "HubSpot", "Salesforce", "Roofer Intel", "Other"];
    const crmWrapperRef = useRef<HTMLDivElement>(null);

    const marketOptions = {
        "ALABAMA": ["Birmingham"],
        "ALASKA": ["Anchorage"],
        "ARIZONA": ["Phoenix"],
        "ARKANSAS": ["Little Rock"],
        "CALIFORNIA": ["Los Angeles", "San Francisco", "San Diego"],
        "COLORADO": ["Denver"],
        "CONNECTICUT": ["Hartford"],
        "DELAWARE": ["Wilmington"],
        "FLORIDA": ["Miami", "Orlando", "Tampa", "Jacksonville"],
        "GEORGIA": ["Atlanta"],
        "HAWAII": ["Honolulu"],
        "IDAHO": ["Boise"],
        "ILLINOIS": ["Chicago"],
        "INDIANA": ["Indianapolis"],
        "IOWA": ["Des Moines"],
        "KANSAS": ["Wichita"],
        "KENTUCKY": ["Louisville"],
        "LOUISIANA": ["New Orleans"],
        "MAINE": ["Portland"],
        "MARYLAND": ["Baltimore"],
        "MASSACHUSETTS": ["Boston"],
        "MICHIGAN": ["Detroit"],
        "MINNESOTA": ["Minneapolis"],
        "MISSISSIPPI": ["Jackson"],
        "MISSOURI": ["St. Louis", "Kansas City"],
        "MONTANA": ["Billings"],
        "NEBRASKA": ["Omaha"],
        "NEVADA": ["Las Vegas"],
        "NEW HAMPSHIRE": ["Manchester"],
        "NEW JERSEY": ["Newark"],
        "NEW MEXICO": ["Albuquerque"],
        "NEW YORK": ["New York City", "Buffalo"],
        "NORTH CAROLINA": ["Charlotte", "Raleigh"],
        "NORTH DAKOTA": ["Fargo"],
        "OHIO": ["Columbus", "Cleveland", "Cincinnati"],
        "OKLAHOMA": ["Oklahoma City", "Tulsa"],
        "OREGON": ["Portland"],
        "PENNSYLVANIA": ["Philadelphia", "Pittsburgh"],
        "RHODE ISLAND": ["Providence"],
        "SOUTH CAROLINA": ["Charleston"],
        "SOUTH DAKOTA": ["Sioux Falls"],
        "TENNESSEE": ["Nashville", "Memphis"],
        "TEXAS": ["Dallas", "Houston", "Austin", "San Antonio"],
        "UTAH": ["Salt Lake City"],
        "VERMONT": ["Burlington"],
        "VIRGINIA": ["Richmond", "Virginia Beach"],
        "WASHINGTON": ["Seattle"],
        "WEST VIRGINIA": ["Charleston"],
        "WISCONSIN": ["Milwaukee"],
        "WYOMING": ["Cheyenne"]
    };

    // Form Data
    const [formData, setFormData] = useState({
        contactName: "",
        companyName: "",
        email: "",
        centerpoint: "",
        preferredMarket: "",
        buildingClass: "Industrial",
        whaleThreshold: "20000",
        specialization: [] as string[],
        crm: "",
        revenue: "",
        source: source
    });

    // Handle clicking outside CRM dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (crmWrapperRef.current && !crmWrapperRef.current.contains(event.target as Node)) {
                setShowCrmDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSpecializationChange = (initial: string) => {
        setFormData(prev => {
            if (prev.specialization.includes(initial)) {
                return { ...prev, specialization: prev.specialization.filter(s => s !== initial) };
            } else {
                return { ...prev, specialization: [...prev.specialization, initial] };
            }
        });
    };

    // Update source when search params change
    useEffect(() => {
        const currentSource = searchParams.get("source");
        if (currentSource && currentSource !== formData.source) {
            setFormData(prev => ({ ...prev, source: currentSource }));
        }
    }, [searchParams]);

    // Loading State
    const [progress, setProgress] = useState(0);
    const [loadingTextIndex, setLoadingTextIndex] = useState(0);

    const loadingSteps = [
        "Calibrating 50-mile geographic centerpoint...",
        "Querying Category 1-3 Intent Signal Database...",
        `Filtering for ${formData.buildingClass} density...`,
        "Cross-referencing Tier 3 Monopoly lockdowns...",
        "Initializing Market Availability Report..."
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setProgress(0);
        setLoadingTextIndex(0);

        const webhookUrl = "https://joe97.app.n8n.cloud/webhook-test/roofershq-audit";

        // Debug Log
        console.log("Submitting Form Data to Webhook:", formData);

        // Fire webhook (fire and forget)
        fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }).catch(err => console.error("Webhook Error:", err));

        // 5-Second Timer Logic
        const totalDuration = 5000;
        const intervalTime = 50;
        const stepsCount = loadingSteps.length;
        const stepDuration = totalDuration / stepsCount;

        let elapsed = 0;

        const timer = setInterval(() => {
            elapsed += intervalTime;

            // Update Progress (Linear)
            const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
            setProgress(newProgress);

            // Update Text Step
            const currentStep = Math.floor(elapsed / stepDuration);
            if (currentStep < stepsCount) {
                setLoadingTextIndex(currentStep);
            }

            // Complete
            if (elapsed >= totalDuration) {
                clearInterval(timer);
                setIsSubmitting(false);
                setIsComplete(true);
            }
        }, intervalTime);
    };

    if (isComplete) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto bg-[#0A0A0A] border border-green-500/30 p-12 rounded-3xl text-center shadow-[0_0_50px_rgba(34,197,94,0.1)]"
            >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4 font-display">Data Received</h2>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                    Our engineers are currently generating your Market Availability Report. Due to the high demand for territory locks, expect a response within <span className="text-green-400 font-bold">24 hours</span>.
                </p>
                <div className="bg-white/5 p-4 rounded-xl inline-block border border-white/10">
                    <p className="text-sm text-white/60">
                        Status: <span className="text-white font-medium">Scanning 50-mile radius for active intent signals...</span>
                    </p>
                </div>
                <p className="mt-8 text-sm text-white/40 italic">
                    If a slot is available, you will have 48 hours to claim it.
                </p>
            </motion.div>
        );
    }

    if (isSubmitting) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#121212] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden h-[600px] flex flex-col justify-center items-center text-center"
            >
                {/* Live Status Indicator */}
                <div className="absolute top-8 right-8 flex items-center gap-2">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </div>
                    <span className="text-green-500 text-[10px] font-bold tracking-widest uppercase">
                        SYSTEM STATUS: ANALYZING RADIUS
                    </span>
                </div>

                {/* Radar Pulse Visual */}
                <div className="relative w-40 h-40 mb-12 flex items-center justify-center">
                    <div className="absolute inset-0 border border-green-500/20 rounded-full animate-[ping_3s_linear_infinite]" />
                    <div className="absolute inset-4 border border-green-500/30 rounded-full animate-[ping_3s_linear_infinite_1s]" />
                    <div className="absolute inset-8 border border-green-500/40 rounded-full animate-[ping_3s_linear_infinite_2s]" />
                    <ScanLine className="w-10 h-10 text-green-500 animate-pulse relative z-10" />
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-sm mb-8">
                    <div className="flex justify-between text-xs font-mono text-green-500/60 mb-2">
                        <span>PROGRESS</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Cycling Log Text */}
                <div className="h-12 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={loadingTextIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-lg font-mono text-white/80"
                        >
                            <span className="text-green-500 mr-2">{`>`}</span>
                            {loadingSteps[loadingTextIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
            {/* Form Header */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                <div>
                    <span className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-2 block">
                        SECURE ENVIRONMENT
                    </span>
                    <h2 className="text-2xl font-bold font-display">Territory Verification</h2>
                </div>
                <Lock className="w-6 h-6 text-white/20" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Hidden Source Field */}
                <input type="hidden" name="source" value={formData.source} />

                {/* Step 1: Territory & Contact */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="flex items-center gap-3 text-sm font-medium text-white/80">
                            <User className="w-4 h-4 text-blue-500" />
                            Contact Name
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            value={formData.contactName}
                            onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="flex items-center gap-3 text-sm font-medium text-white/80">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            Company Name
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="Company Name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            value={formData.companyName}
                            onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="flex items-center gap-3 text-sm font-medium text-white/80">
                        <Mail className="w-4 h-4 text-blue-500" />
                        Work Email Address
                    </label>
                    <input
                        required
                        type="email"
                        placeholder="name@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="space-y-4">
                    <label className="flex items-center gap-3 text-sm font-medium text-white/80">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Territory Centerpoint (Address/City)
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="e.g. 123 Industrial Blvd, Dallas, TX"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        value={formData.centerpoint}
                        onChange={e => setFormData({ ...formData, centerpoint: e.target.value })}
                    />
                </div>

                {/* Preferred Market */}
                <div className="space-y-4">
                    <label className="flex items-center gap-3 text-sm font-medium text-white/80">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Preferred Market
                    </label>
                    <div className="relative">
                        <select
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                            value={formData.preferredMarket}
                            onChange={e => setFormData({ ...formData, preferredMarket: e.target.value })}
                        >
                            <option value="">Select a Major Commercial Hub...</option>
                            {Object.entries(marketOptions).map(([state, cities]) => (
                                <optgroup
                                    key={state}
                                    label={state}
                                    className="font-bold underline text-blue-400 bg-[#0A0A0A]"
                                >
                                    {cities.map(city => (
                                        <option key={city} value={city} className="text-white font-normal no-underline bg-[#121212]">
                                            {city}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Building Class */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-3 text-sm font-medium text-white/80">
                            <Building className="w-4 h-4 text-blue-500" />
                            Target Building Class
                        </label>
                        <select
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                            value={formData.buildingClass}
                            onChange={e => setFormData({ ...formData, buildingClass: e.target.value })}
                        >
                            <option value="Industrial">Industrial / Warehouse</option>
                            <option value="Multi-Family">Multi-Family</option>
                            <option value="Retail">Retail / Commercial</option>
                            <option value="Institutional">Institutional / Gov</option>
                        </select>
                    </div>

                    {/* Whale Threshold */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-3 text-sm font-medium text-white/80">
                            <Ruler className="w-4 h-4 text-blue-500" />
                            Min. Sq. Ft. Threshold
                        </label>
                        <select
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                            value={formData.whaleThreshold}
                            onChange={e => setFormData({ ...formData, whaleThreshold: e.target.value })}
                        >
                            <option value="10000">10,000+ sq. ft.</option>
                            <option value="20000">20,000+ sq. ft. (Recommended)</option>
                            <option value="50000">50,000+ sq. ft.</option>
                            <option value="100000">100,000+ sq. ft.</option>
                        </select>
                        {/* High Contrast Recommendation */}
                        {formData.whaleThreshold === "20000" && (
                            <p className="text-blue-400 text-xs font-bold tracking-wide uppercase pl-1 animate-pulse">
                                ★ Recommended "Whale" Threshold
                            </p>
                        )}
                    </div>
                </div>

                {/* Specialization */}
                <div className="space-y-4">
                    <label className="flex items-center gap-3 text-sm font-medium text-white/80">
                        <Activity className="w-4 h-4 text-blue-500" />
                        Crew Specialization (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        {['TPO', 'EPDM', 'Metal', 'Built-Up'].map((spec) => (
                            <label key={spec} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.specialization.includes(spec) ? 'bg-blue-500 border-blue-500' : 'border-white/20 group-hover:border-white/40'}`}>
                                    {formData.specialization.includes(spec) && <CheckCircle2 className="w-3 h-3 text-white" />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={formData.specialization.includes(spec)}
                                    onChange={() => handleSpecializationChange(spec)}
                                />
                                <span className="text-white/70 group-hover:text-white transition-colors">{spec}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Searchable CRM Dropdown */}
                    <div className="space-y-4 relative" ref={crmWrapperRef}>
                        <label className="flex items-center gap-3 text-sm font-medium text-white/80">
                            <Server className="w-4 h-4 text-blue-500" />
                            Current CRM
                        </label>
                        <div className="relative">
                            <input
                                required
                                type="text"
                                placeholder="Select or type..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                value={crmSearch}
                                onFocus={() => setShowCrmDropdown(true)}
                                onChange={e => {
                                    setCrmSearch(e.target.value);
                                    setFormData({ ...formData, crm: e.target.value });
                                    setShowCrmDropdown(true);
                                }}
                            />
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                        </div>

                        {/* Dropdown Options */}
                        <AnimatePresence>
                            {showCrmDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full left-0 w-full mt-2 bg-[#111] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
                                >
                                    {crmOptions.filter(opt => opt.toLowerCase().includes(crmSearch.toLowerCase())).map(opt => (
                                        <button
                                            key={opt}
                                            type="button"
                                            className="w-full text-left px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white transition-colors flex items-center justify-between"
                                            onClick={() => {
                                                setCrmSearch(opt);
                                                setFormData({ ...formData, crm: opt });
                                                setShowCrmDropdown(false);
                                            }}
                                        >
                                            {opt}
                                            {crmSearch === opt && <Check className="w-4 h-4 text-blue-500" />}
                                        </button>
                                    ))}
                                    {crmOptions.filter(opt => opt.toLowerCase().includes(crmSearch.toLowerCase())).length === 0 && (
                                        <div className="px-4 py-3 text-white/40 italic text-sm">
                                            Type to add custom CRM...
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Revenue */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-3 text-sm font-medium text-white/80">
                            <DollarSign className="w-4 h-4 text-blue-500" />
                            Annual Revenue
                        </label>
                        <select
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                            value={formData.revenue}
                            onChange={e => setFormData({ ...formData, revenue: e.target.value })}
                        >
                            <option value="">Select Revenue Range...</option>
                            <option value="<1M">Under $1M</option>
                            <option value="1M-3M">$1M - $3M</option>
                            <option value="3M-10M">$3M - $10M</option>
                            <option value="10M+">$10M+</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#CA8A04] hover:bg-[#EAB308] text-black font-bold uppercase tracking-widest py-5 rounded-xl transition-all shadow-[0_0_30px_rgba(202,138,4,0.2)] hover:shadow-[0_0_50px_rgba(202,138,4,0.4)] hover:-translate-y-1"
                >
                    Run Market Audit
                </button>
            </form>
        </motion.div>
    );
}

export default function VerifyPage() {
    return (
        <main className="bg-[#050505] min-h-screen text-white selection:bg-blue-500/30">
            <Navbar />

            <section className="relative pt-40 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Logic & Context */}
                        <div className="space-y-12">
                            <div>
                                <span className="inline-block py-1 px-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold tracking-widest uppercase mb-6">
                                    LIVE STATUS: ONLINE
                                </span>
                                <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight mb-6">
                                    Market Analysis & <br />
                                    <span className="text-blue-500">Territory Verification</span>
                                </h1>
                                <p className="text-xl text-white/60 leading-relaxed font-light">
                                    Our "Whale" data is territory-locked. Before we release our live intent signals or pricing modules, we must verify your 50-mile radius is currently eligible for new partnership.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="pl-6 border-l-2 border-white/10">
                                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-blue-500" /> Exclusivity Check
                                    </h3>
                                    <p className="text-white/50">We cross-reference your location against existing Tier 3 Monopoly and Apex Dominance lockdowns.</p>
                                </div>
                                <div className="pl-6 border-l-2 border-white/10">
                                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-blue-500" />
                                        Intent Scan
                                        {/* Live Pulse Icon */}
                                        <span className="relative flex h-3 w-3 ml-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                    </h3>
                                    <p className="text-white/50">We run a 30-day lookback on Category 1, 2, and 3 intent signals in your specific geography.</p>
                                </div>
                                <div className="pl-6 border-l-2 border-white/10">
                                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-blue-500" /> Saturation Report
                                    </h3>
                                    <p className="text-white/50">We identify where your competitors are currently bidding and where the "Clear Space" opportunities exist.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: High-Authority Form */}
                        <Suspense fallback={<div className="text-white">Loading Verification System...</div>}>
                            <VerificationContent />
                        </Suspense>
                    </div>
                </div>
            </section>
        </main>
    );
}
