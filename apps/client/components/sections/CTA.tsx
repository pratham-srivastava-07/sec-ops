"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-purple-500/10">
      <div className="container mx-auto">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-12 text-center relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/20"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(251,146,60,0.2) 0%, rgba(239,68,68,0.2) 100%)",
                    "linear-gradient(45deg, rgba(239,68,68,0.2) 0%, rgba(251,146,60,0.2) 100%)",
                    "linear-gradient(45deg, rgba(251,146,60,0.2) 0%, rgba(239,68,68,0.2) 100%)",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Zap className="w-8 h-8" />
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to transform your incident response?</h2>

                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Join 500+ teams who have reduced their incident resolution time by 45% with CIRCL's real-time
                  collaboration platform.
                </p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100 group">
                    <motion.span whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
                      Start Free Trial
                    </motion.span>
                    <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.div>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                  >
                    Schedule Demo
                  </Button>
                </motion.div>

                <motion.div
                  className="mt-8 text-sm opacity-75"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.75 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  14-day free trial • No credit card required • Setup in 5 minutes
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
