"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@ops/ui"

const stats = [
  { number: "99.9%", label: "Uptime", description: "Reliable incident tracking" },
  { number: "2.3min", label: "Avg Response", description: "Faster than industry standard" },
  { number: "500+", label: "Teams", description: "Trust CIRCL daily" },
  { number: "10k+", label: "Incidents", description: "Successfully resolved" },
]

export function StatsSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-purple-500/10">
      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="text-center border-0 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-orange-500 mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: "spring" }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
