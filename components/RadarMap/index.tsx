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



export default function RadarMap() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [centerCoords, setCenterCoords] = useState<[number, number]>([32.7767, -96.7970]); // Default Dallas

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery) return;

        setIsSearching(true);
        try {
            // Enhanced query logic for US-centric results
            const isZipCode = /^\d{5}(-\d{4})?$/.test(searchQuery.trim());

            let url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us`;

            if (isZipCode) {
                url += `&postalcode=${encodeURIComponent(searchQuery.trim())}`;
            } else {
                url += `&q=${encodeURIComponent(searchQuery)}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                setCenterCoords([lat, lon]);
            } else {
                console.warn("Location not found");
            }
        } catch (error) {
            console.error("Geocoding failed", error);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="w-full h-[600px] relative rounded-2xl overflow-hidden border border-white/10 group">
            {/* Search Bar Overlay */}
            <div className="absolute top-6 left-6 z-[1000] w-full max-w-sm">
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder="ENTER ZIP CODE OR CITY..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-black/90 border border-white/20 text-white text-sm font-mono py-3 pl-10 pr-4 rounded-lg focus:outline-none focus:border-red-500/50 backdrop-blur-md transition-colors"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="flex gap-1">
                            <span className={`w-2 h-2 rounded-full ${isSearching ? 'bg-yellow-500 animate-ping' : 'bg-red-500 animate-pulse'}`} />
                        </div>
                    </div>
                </form>
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
                    <p>LIVE FEED // ACTIVE</p>
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
