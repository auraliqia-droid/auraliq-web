"use client";

import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useSmartNav } from "@/hooks/useSmartNav";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { BenefitsGrid } from "@/components/sections/BenefitsGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { Company } from "@/components/sections/Company";
import { FAQ } from "@/components/sections/FAQ";
import { BookingSection } from "@/components/sections/BookingSection";
import { Footer } from "@/components/layout/Footer";

export function LandingPage() {
  const containerRef = useScrollAnimations();
  useSmartNav();

  return (
    <div ref={containerRef} className="bg-background text-foreground">
      {/* Scroll progress bar */}
      <div className="scroll-progress-bar" id="scrollProgressBar" style={{ transform: "scaleX(0)" }} />

      <Navbar />
      <Hero />

      <SocialProof />
      <div className="glow-divider max-w-7xl mx-auto" />

      <ServicesGrid />
      <BenefitsGrid />
      <div className="glow-divider max-w-7xl mx-auto" />

      <HowItWorks />
      <div className="glow-divider max-w-7xl mx-auto" />

      <Testimonials />
      <div className="glow-divider max-w-7xl mx-auto" />

      <Company />
      <div className="glow-divider max-w-7xl mx-auto" />

      <FAQ />
      <div className="glow-divider max-w-7xl mx-auto" />

      <BookingSection />
      <Footer />
    </div>
  );
}
