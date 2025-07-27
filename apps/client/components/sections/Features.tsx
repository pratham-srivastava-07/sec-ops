"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { features } from "@/constants/data"

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6 bg-muted/50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
          {features.map((feature, index) => (
            <div
              key={index}
              className="transform transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02]"
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-orange-500 mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
