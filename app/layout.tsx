import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WebVitals } from "@/components/WebVitals";
import { NetworkProvider } from "@/contexts/NetworkContext";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RooferHQ - Commercial Roofing Market Intelligence",
  description: "Stop paying for shared leads. Get exclusive, verified commercial roofing appointments injected into your CRM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NetworkProvider>
          <Navbar />
          <WebVitals />
          {children}
        </NetworkProvider>
      </body>
    </html>
  );
}
