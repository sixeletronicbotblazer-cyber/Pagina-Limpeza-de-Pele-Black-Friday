"use client";

import dynamic from "next/dynamic";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/sections/Hero";
import Pains from "@/components/sections/Pains";
import Gallery from "@/components/sections/Gallery";
import Mechanism from "@/components/sections/Mechanism";
import Simulation from "@/components/sections/Simulation";
import Audience from "@/components/sections/Audience";
import Collection from "@/components/sections/Collection";
import Expert from "@/components/sections/Expert";
import Offer from "@/components/sections/Offer";
import Faq from "@/components/sections/Faq";
import Closing from "@/components/sections/Closing";
import Footer from "@/components/sections/Footer";

// Notificações de compra só no cliente (usa Math.random + timers).
const PurchaseNotifications = dynamic(
  () => import("@/components/PurchaseNotifications"),
  { ssr: false },
);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      <main className="flex-1">
        <Hero />
        <Pains />
        <Gallery />
        <Mechanism />
        <Simulation />
        <Audience />
        <Collection />
        <Expert />
        <Offer />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <PurchaseNotifications />
    </div>
  );
}
