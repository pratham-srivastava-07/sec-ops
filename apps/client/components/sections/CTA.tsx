"use client"

import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-purple-500/10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-12 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/20" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                  <Zap className="w-8 h-8" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to transform your incident response?
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Join 500+ teams who have reduced their incident resolution time by 45% with CIRCL's real-time collaboration platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100 group">
                    <span className="group-hover:-translate-x-1 transition-transform">Start Free Trial</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    Schedule Demo
                  </Button>
                </div>
                <div className="mt-8 text-sm opacity-75">
                  14-day free trial • No credit card required • Setup in 5 minutes
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
