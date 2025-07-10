import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import {
    Github,
    ArrowRight,
  } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function HeroSection() {
    return (
        <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-orange-500">Real-Time</span> Incident
              <br />
              <motion.span
                className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Collaboration
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Report, respond, and resolve incidents — together, in real time.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 group">
                <motion.span whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
                  Try the Demo
                </motion.span>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.div>
              </Button>

              <Button size="lg" variant="outline" className="group bg-transparent">
                <Github className="w-5 h-5 mr-2" />
                Login with GitHub
              </Button>
            </motion.div>

            <motion.div
              className="mt-12 flex items-center justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="flex -space-x-2">
                {["JD", "SM", "AL", "KR"].map((initials, index) => (
                  <motion.div
                    key={initials}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                  >
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                ))}
              </div>
              <span className="text-muted-foreground">Trusted by 500+ security teams</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
}