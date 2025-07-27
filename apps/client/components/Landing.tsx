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
import { IntegrationsSection } from "@/components/sections/IntegrationsSetion"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { useState, useEffect } from "react"

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
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark" : ""}`}>
      <AuroraBackground fullPage={true} className="w-full overflow-x-hidden">
        <div className="sticky top-0 z-50 w-full">
          <Navbar isDark={isDark} onThemeToggle={handleThemeToggle} />
        </div>

        <main className="w-full">
          <HeroSection />

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <CustomerLogosSection />
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <ProblemSolutionSection />
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <StatsSection />
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <LivePreviewSection activeIncident={activeIncident} />
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <FeaturesSection />
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <HowItWorksSection />
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <IntegrationsSection />
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <WhyCIRCLSection />
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <PricingSection />
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <SecuritySection />
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <TestimonialSection />
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <RoadmapSection />
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <FAQSection />
            </div>
          </section>

          <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <CTASection />
            </div>
          </section>
        </main>

        <footer className="w-full">
          <Footer />
        </footer>
      </AuroraBackground>
    </div>
  )
}
