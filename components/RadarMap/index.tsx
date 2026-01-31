"use client";

import dynamic from "next/dynamic";
import { Search } from "lucide-react";

const MapInstance = dynamic(() => import("./MapInstance"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-[#050505] text-white/20 font-mono">
            [INITIALIZING SAT-LINK...]
        </div>
    ),
});



export default function RadarMap() {
    return (
        <div className="w-full h-[600px] relative rounded-2xl overflow-hidden border border-white/10 group">
            {/* Search Bar Overlay */}
            <div className="absolute top-6 left-6 z-[1000] w-full max-w-sm">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="ENTER ZIP CODE OR CITY..."
                        className="w-full bg-black/90 border border-white/20 text-white text-sm font-mono py-3 pl-10 pr-4 rounded-lg focus:outline-none focus:border-red-500/50 backdrop-blur-md"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* The Map */}
            {/* The Map */}
            <div className="w-full h-full z-0 relative">
                <MapInstance />
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
                    <p>LAT: 32.7767 // LNG: -96.7970</p>
                </div>
            </div>
        </div>
    );
}
