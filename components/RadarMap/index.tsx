"use client";

import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { useState } from "react";

const MapInstance = dynamic(() => import("./MapInstance"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-[#050505] text-white/20 font-mono">
            [INITIALIZING SAT-LINK...]
        </div>
    ),
});

// TOP 10 COMMERCIAL ROOFING MARKETS
const TERRITORY_DATA = [
    { label: "Dallas, TX", coords: [32.7767, -96.7970] },
    { label: "Atlanta, GA", coords: [33.7490, -84.3880] },
    { label: "Miami, FL", coords: [25.7617, -80.1918] },
    { label: "Phoenix, AZ", coords: [33.4484, -112.0740] },
    { label: "Denver, CO", coords: [39.7392, -104.9903] },
    { label: "Chicago, IL", coords: [41.8781, -87.6298] },
    { label: "Tampa, FL", coords: [27.9506, -82.4572] },
    { label: "Oklahoma City, OK", coords: [35.4676, -97.5164] },
    { label: "Charlotte, NC", coords: [35.2271, -80.8431] },
    { label: "Nashville, TN", coords: [36.1627, -86.7816] },
];

export default function RadarMap() {
    const [selectedTerritory, setSelectedTerritory] = useState(TERRITORY_DATA[0]);
    const [centerCoords, setCenterCoords] = useState<[number, number]>([32.7767, -96.7970]);

    const handleTerritoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const territory = TERRITORY_DATA.find(t => t.label === e.target.value);
        if (territory) {
            setSelectedTerritory(territory);
            setCenterCoords(territory.coords as [number, number]);
        }
    };

    return (
        <div className="w-full h-[600px] relative rounded-2xl overflow-hidden border border-white/10 group">
            {/* Territory Selector Overlay */}
            <div className="absolute top-6 left-6 z-[1000] w-full max-w-sm">
                <div className="relative">
                    <select
                        value={selectedTerritory.label}
                        onChange={handleTerritoryChange}
                        className="w-full bg-black/90 border border-white/20 text-white text-sm font-mono py-3 pl-10 pr-4 rounded-lg focus:outline-none focus:border-red-500/50 backdrop-blur-md appearance-none cursor-pointer hover:bg-white/5 transition-colors"
                    >
                        {TERRITORY_DATA.map((t) => (
                            <option key={t.label} value={t.label} className="bg-black text-white">
                                {t.label.toUpperCase()} // ACTIVE
                            </option>
                        ))}
                    </select>

                    {/* Icons */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Search className="w-4 h-4 text-white/40" />
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="flex gap-2 items-center">
                            <div className="text-[10px] text-red-500 font-bold animate-pulse">LIVE</div>
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* The Map */}
            <div className="w-full h-full z-0 relative">
                <MapInstance centerCoords={centerCoords} />
            </div>

            {/* Overlay Grid/HUD Effects */}
            <div className="absolute inset-0 pointer-events-none z-[500] border-2 border-white/5 rounded-2xl">
                {/* Crosshairs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/10 rounded-full opacity-50 flex items-center justify-center">
                    <div className="w-1 h-1 bg-red-500/50 rounded-full" />
                </div>

                {/* Corner decorations */}
                <div className="absolute top-4 right-4 text-[10px] font-mono text-white/30 text-right">
                    <p>TERRITORY // {selectedTerritory.label.toUpperCase()}</p>
                    <p>SAT-LINK: CONNECTED</p>
                </div>
                <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/30">
                    <p>GRID: 844-X-ALPHA</p>
                    <p>LAT: {centerCoords[0].toFixed(4)} // LNG: {centerCoords[1].toFixed(4)}</p>
                </div>
            </div>
        </div>
    );
}
