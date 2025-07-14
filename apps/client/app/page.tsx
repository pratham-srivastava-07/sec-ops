"use client"

import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { FeaturesSection } from "@/components/sections/Features"
import { HeroSection } from "@/components/sections/Hero"
import { HowItWorksSection } from "@/components/sections/HowItWorks"
import { LivePreviewSection } from "@/components/sections/LivePreview"
import { RoadmapSection } from "@/components/sections/Roadmap"
import { ProblemSolutionSection } from "@/components/sections/Solution"
import { TestimonialSection } from "@/components/sections/Testimonials"
import { WhyCIRCLSection } from "@/components/sections/WhyCircl"
import { StatsSection } from "@/components/sections/Stats"
import { PricingSection } from "@/components/sections/Pricing"
import { SecuritySection } from "@/components/sections/Security"
import { FAQSection } from "@/components/sections/FAQ"
import { CTASection } from "@/components/sections/CTA"
import { CustomerLogosSection } from "@/components/sections/CustomerLogos"
import { useState, useEffect } from "react"
import { IntegrationsSection } from "@/components/sections/IntegrationsSetion"

export default function CIRCLLanding() {
  const [isDark, setIsDark] = useState(true)
  const [activeIncident, setActiveIncident] = useState(0)

  // Simulate live incident updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIncident((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleThemeToggle = () => {
    setIsDark(!isDark)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-gray-900" : "bg-white"}`}>
      <Navbar isDark={isDark} onThemeToggle={handleThemeToggle} />
      <HeroSection />
      <CustomerLogosSection />
      <ProblemSolutionSection />
      <StatsSection />
      <LivePreviewSection activeIncident={activeIncident} />
      <FeaturesSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <WhyCIRCLSection />
      <PricingSection />
      <SecuritySection />
      <TestimonialSection />
      <RoadmapSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}
