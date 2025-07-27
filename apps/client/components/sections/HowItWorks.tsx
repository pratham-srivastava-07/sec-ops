"use client"

import { steps } from "@/constants/data"

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-foreground">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center transform transition-transform duration-200 hover:scale-105"
            >
              <div
                className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto text-foreground transition-transform duration-500 hover:rotate-[360deg]"
              >
                {step.step}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
