"use client";

import ScrollSequence from "@/components/ScrollSequence";
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

export default function Home() {
  // Automatically track scroll depth
  useScrollTracking();

  return (
    <main className="bg-[#050505] min-h-screen">
      <Navbar />
      <ScrollSequence />
      <GrievanceWall />
      <SolutionGrid />
      <HowItWorks />
      <FoundingPartners />
      <AvatarQualifier />
      <TechnicalEdge />
      <TerritoryChecker />
      <ZeroWasteOffer />
    </main>
  );
}
