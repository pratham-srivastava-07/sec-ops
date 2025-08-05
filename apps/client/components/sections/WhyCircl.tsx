"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@ops/ui"

export function WhyCIRCLSection() {
  const traditionalItems = [
    "Email chains and scattered communication",
    "Manual status updates",
    "No real-time collaboration",
    "Delayed incident resolution",
  ]

  const circlItems = [
    "Centralized incident tracking",
    "Live updates and collaboration",
    "Developer-friendly interface",
    "Faster incident resolution",
  ]

  return (
    <section className="py-20 px-6 bg-muted/50">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why CIRCL?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-red-400">Traditional Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {traditionalItems.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                      <span className="text-muted-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-green-400">With CIRCL</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {circlItems.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
