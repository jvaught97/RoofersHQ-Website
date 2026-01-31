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

// FULL COMMERCIAL ROOFING MARKETS (VERIFICATION LIST)
const TERRITORY_DATA: Record<string, Array<{ label: string, coords: [number, number] }>> = {
    "ALABAMA": [{ label: "Birmingham", coords: [33.5207, -86.8025] }],
    "ALASKA": [{ label: "Anchorage", coords: [61.2181, -149.9003] }],
    "ARIZONA": [{ label: "Phoenix", coords: [33.4484, -112.0740] }],
    "ARKANSAS": [{ label: "Little Rock", coords: [34.7465, -92.2896] }],
    "CALIFORNIA": [
        { label: "Los Angeles", coords: [34.0522, -118.2437] },
        { label: "San Francisco", coords: [37.7749, -122.4194] },
        { label: "San Diego", coords: [32.7157, -117.1611] }
    ],
    "COLORADO": [{ label: "Denver", coords: [39.7392, -104.9903] }],
    "CONNECTICUT": [{ label: "Hartford", coords: [41.7637, -72.6851] }],
    "DELAWARE": [{ label: "Wilmington", coords: [39.7391, -75.5398] }],
    "FLORIDA": [
        { label: "Miami", coords: [25.7617, -80.1918] },
        { label: "Orlando", coords: [28.5383, -81.3792] },
        { label: "Tampa", coords: [27.9506, -82.4572] },
        { label: "Jacksonville", coords: [30.3322, -81.6556] }
    ],
    "GEORGIA": [{ label: "Atlanta", coords: [33.7490, -84.3880] }],
    "HAWAII": [{ label: "Honolulu", coords: [21.3069, -157.8583] }],
    "IDAHO": [{ label: "Boise", coords: [43.6189, -116.2150] }],
    "ILLINOIS": [{ label: "Chicago", coords: [41.8781, -87.6298] }],
    "INDIANA": [{ label: "Indianapolis", coords: [39.7910, -86.1480] }],
    "IOWA": [{ label: "Des Moines", coords: [41.6195, -93.5980] }],
    "KANSAS": [{ label: "Wichita", coords: [37.6979, -97.3148] }],
    "KENTUCKY": [{ label: "Louisville", coords: [38.3287, -85.7648] }],
    "LOUISIANA": [{ label: "New Orleans", coords: [29.9547, -90.0751] }],
    "MAINE": [{ label: "Portland", coords: [43.6800, -70.3104] }],
    "MARYLAND": [{ label: "Baltimore", coords: [39.2904, -76.6122] }],
    "MASSACHUSETTS": [{ label: "Boston", coords: [42.3611, -71.0571] }],
    "MICHIGAN": [{ label: "Detroit", coords: [42.3314, -83.0458] }],
    "MINNESOTA": [{ label: "Minneapolis", coords: [44.9778, -93.2650] }],
    "MISSISSIPPI": [{ label: "Jackson", coords: [32.2988, -90.1848] }],
    "MISSOURI": [
        { label: "St. Louis", coords: [38.6270, -90.1994] },
        { label: "Kansas City", coords: [39.0997, -94.5783] }
    ],
    "MONTANA": [{ label: "Billings", coords: [45.7876, -108.4893] }],
    "NEBRASKA": [{ label: "Omaha", coords: [41.2572, -95.9951] }],
    "NEVADA": [{ label: "Las Vegas", coords: [36.1750, -115.1370] }],
    "NEW HAMPSHIRE": [{ label: "Manchester", coords: [43.0087, -71.4544] }],
    "NEW JERSEY": [{ label: "Newark", coords: [40.7357, -74.1724] }],
    "NEW MEXICO": [{ label: "Albuquerque", coords: [35.1068, -106.6292] }],
    "NEW YORK": [
        { label: "New York City", coords: [40.7128, -74.0060] },
        { label: "Buffalo", coords: [42.8802, -78.8787] }
    ],
    "NORTH CAROLINA": [
        { label: "Charlotte", coords: [35.2271, -80.8431] },
        { label: "Raleigh", coords: [35.7877, -78.6443] }
    ],
    "NORTH DAKOTA": [{ label: "Fargo", coords: [46.8772, -96.7898] }],
    "OHIO": [
        { label: "Columbus", coords: [39.9833, -82.9833] },
        { label: "Cleveland", coords: [41.4993, -81.6944] },
        { label: "Cincinnati", coords: [39.1031, -84.5120] }
    ],
    "OKLAHOMA": [
        { label: "Oklahoma City", coords: [35.4676, -97.5164] },
        { label: "Tulsa", coords: [36.1540, -95.9928] }
    ],
    "OREGON": [{ label: "Portland", coords: [45.5152, -122.6784] }],
    "PENNSYLVANIA": [
        { label: "Philadelphia", coords: [39.9526, -75.1652] },
        { label: "Pittsburgh", coords: [40.4406, -79.9959] }
    ],
    "RHODE ISLAND": [{ label: "Providence", coords: [41.8252, -71.4189] }],
    "SOUTH CAROLINA": [{ label: "Charleston", coords: [32.7766, -79.9309] }],
    "SOUTH DAKOTA": [{ label: "Sioux Falls", coords: [43.5364, -96.7317] }],
    "TENNESSEE": [
        { label: "Nashville", coords: [36.1627, -86.7816] },
        { label: "Memphis", coords: [35.1493, -90.0576] }
    ],
    "TEXAS": [
        { label: "Dallas", coords: [32.7767, -96.7970] },
        { label: "Houston", coords: [29.7499, -95.3584] },
        { label: "Austin", coords: [30.2667, -97.7333] },
        { label: "San Antonio", coords: [29.4243, -98.4911] }
    ],
    "UTAH": [{ label: "Salt Lake City", coords: [40.7587, -111.8762] }],
    "VERMONT": [{ label: "Burlington", coords: [44.4759, -73.2121] }],
    "VIRGINIA": [
        { label: "Richmond", coords: [37.5413, -77.4348] },
        { label: "Virginia Beach", coords: [36.8631, -76.0158] }
    ],
    "WASHINGTON": [{ label: "Seattle", coords: [47.6080, -122.3352] }],
    "WEST VIRGINIA": [{ label: "Charleston", coords: [38.3498, -81.6326] }],
    "WISCONSIN": [{ label: "Milwaukee", coords: [43.0389, -87.9065] }],
    "WYOMING": [{ label: "Cheyenne", coords: [41.1611, -104.8054] }]
};

export default function RadarMap() {
    // Flatten data for initial state finding
    const allTerritories = Object.values(TERRITORY_DATA).flat();
    const [selectedTerritory, setSelectedTerritory] = useState(allTerritories.find(t => t.label === "Dallas") || allTerritories[0]);
    const [centerCoords, setCenterCoords] = useState<[number, number]>(selectedTerritory.coords);

    const handleTerritoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const territory = allTerritories.find(t => t.label === e.target.value);
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
                        {Object.entries(TERRITORY_DATA).map(([state, cities]) => (
                            <optgroup key={state} label={state} className="bg-[#0A0A0A] text-blue-500 font-bold">
                                {cities.map((city) => (
                                    <option key={city.label} value={city.label} className="bg-[#121212] text-white font-normal">
                                        {city.label.toUpperCase()}
                                    </option>
                                ))}
                            </optgroup>
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
