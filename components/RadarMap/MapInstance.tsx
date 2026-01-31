"use client";

import { useMap, TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { X, Lock, AlertTriangle, Building2, TrendingUp, Info } from "lucide-react";

interface GhostSignal {
    id: string;
    lat: number;
    lng: number;
    bldgClass: string;
    sqFt: number;
    signal: typeof INTENT_SIGNALS[0];
    timestamp: number;
}

// INTENT SIGNAL CATALOG
const INTENT_SIGNALS = [
    { label: "CapEx Trigger", context: "50k+ sq ft Corporate HQ", tech: "Detected filing for property tax depreciation or roof-life cycle expiration." },
    { label: "Storm Damage Signature", context: "Industrial Warehouse", tech: "AI-analyzed weather data matched with localized hail/wind velocity impact." },
    { label: "Search Intent: Spec-Match", context: "Multi-Family Complex", tech: "IP-resolved search for \"TPO Warranty Repair\" or \"Commercial Roofing Estimates.\"" },
    { label: "Permit Lapse Alert", context: "Retail Strip Mall", tech: "Detected a 5-year+ gap since last structural maintenance filing." },
    { label: "Supply Chain Inquiry", context: "Cold Storage Facility", tech: "Decision-maker IP detected on Firestone/GAF/Carlisle material spec pages." },
    { label: "Asset Transfer Intel", context: "Mixed-Use Commercial", tech: "Property recently moved to \"Due Diligence\" phase in a pending sale." },
    { label: "Facility Manager Shift", context: "Manufacturing Plant", tech: "New Facility Director hired; history of immediate vendor restructuring." },
    { label: "Infrared Thermal Leak", context: "Large-Scale Distribution", tech: "Detected thermal anomalies suggesting insulation saturation." },
];

const BUILDING_CLASSES = ["Industrial", "Retail", "Multi-Family", "Office", "Mixed-Use"];

// Custom Pulse Icon
const createPulseIcon = () => {
    return L.divIcon({
        className: "custom-pulse-icon",
        html: `<div class="w-4 h-4 bg-red-500/80 rounded-full relative">
                 <div class="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                 <div class="absolute -inset-4 border border-red-500/30 rounded-full animate-pulse"></div>
               </div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -10],
    });
};

export default function MapInstance() {
    return (
        <MapContainer
            center={[32.7767, -96.7970]}
            zoom={11}
            scrollWheelZoom={false}
            className="w-full h-full z-0"
            zoomControl={false}
        >
            <RadarMapLogic />
        </MapContainer>
    );
}

function RadarMapLogic() {
    const map = useMap();
    const [signals, setSignals] = useState<GhostSignal[]>([]);
    const [selectedSignal, setSelectedSignal] = useState<GhostSignal | null>(null);
    const [isRestrictedModalOpen, setIsRestrictedModalOpen] = useState(false);

    // Initial positioning
    useEffect(() => {
        map.setView([32.7767, -96.7970], 11); // Default to Dallas (Central)
        generateSignals(32.7767, -96.7970);
    }, [map]);

    const generateSignals = (lat: number, lng: number) => {
        const newSignals: GhostSignal[] = [];
        for (let i = 0; i < 12; i++) {
            const latOffset = (Math.random() - 0.5) * 0.15;
            const lngOffset = (Math.random() - 0.5) * 0.15;
            newSignals.push({
                id: Math.random().toString(36).substr(2, 9),
                lat: lat + latOffset,
                lng: lng + lngOffset,
                bldgClass: BUILDING_CLASSES[Math.floor(Math.random() * BUILDING_CLASSES.length)],
                sqFt: Math.floor(Math.random() * (150000 - 25000) + 25000),
                signal: INTENT_SIGNALS[Math.floor(Math.random() * INTENT_SIGNALS.length)],
                timestamp: Math.floor(Math.random() * 12) + 1, // 1-12 hours ago
            });
        }
        setSignals(newSignals);
    };

    const handleSignalClick = (signal: GhostSignal) => {
        setIsRestrictedModalOpen(true);
        setSelectedSignal(signal);
    };

    return (
        <>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {signals.map((signal) => (
                <Marker
                    key={signal.id}
                    position={[signal.lat, signal.lng]}
                    icon={createPulseIcon()}
                    eventHandlers={{
                        click: () => handleSignalClick(signal),
                        mouseover: (e) => e.target.openPopup(),
                        mouseout: (e) => e.target.closePopup(),
                    }}
                >
                    <Popup
                        closeButton={false}
                        className="custom-leaflet-popup"
                    >
                        <div className="bg-black/90 border border-red-500/30 p-4 rounded-md shadow-2xl text-xs font-mono text-white min-w-[300px] backdrop-blur-md">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                                <span className="text-red-500 font-bold">[SIGNAL DETECTED]</span>
                                <span className="text-white/40">#{signal.id.toUpperCase()}</span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-white/60">CLASS:</span>
                                    <span className="text-white font-bold">{signal.bldgClass.toUpperCase()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/60">EST. SQ FT:</span>
                                    <span className="text-white font-bold">{signal.sqFt.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/60">INTENT:</span>
                                    <span className="text-red-400 font-bold">{signal.signal.label.toUpperCase()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/60">STATUS:</span>
                                    <span className="text-red-600 animate-pulse font-bold">LOCKED - ACCESS RESTRICTED</span>
                                </div>
                            </div>
                            <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-white/50 leading-tight">
                                {signal.signal.tech}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* RESTRICTED MODAL */}
            {isRestrictedModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#0A0A0A] border border-red-500/30 rounded-2xl max-w-lg w-full relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.2)]">
                        {/* Header */}
                        <div className="bg-red-950/30 p-6 border-b border-red-500/20 flex items-start gap-4">
                            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                                <Lock className="w-6 h-6 text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">ACCESS DENIED</h3>
                                <p className="text-red-400 text-sm font-mono">[!] INFRASTRUCTURE THRESHOLD NOT MET</p>
                            </div>
                            <button
                                onClick={() => setIsRestrictedModalOpen(false)}
                                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8 space-y-6">
                            <p className="text-white/70 text-sm leading-relaxed">
                                You are viewing live market inventory signals in your territory. However, your current account is not yet <strong className="text-white">'Service Ready.'</strong>
                            </p>

                            <div className="space-y-4">
                                <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Requirements to Unlock:</p>
                                <div className="flex items-center gap-3 text-white/80 text-sm">
                                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                    <span>$2M+ Annual Gross Revenue</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/80 text-sm">
                                    <Building2 className="w-4 h-4 text-blue-500" />
                                    <span>Verified Sales Infrastructure (SDR/Closer)</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                <button className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    I'm already at $2M - Run Audit
                                </button>
                                <button className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                    Download 'Road to $2M' Blueprint
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
