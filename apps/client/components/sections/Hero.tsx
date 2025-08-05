"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Shield, Users, Zap } from "lucide-react"
import { Button } from "@ops/ui"
import Link from "next/link"
import { useUser } from "@/hooks/useUser"

export function HeroSection() {
  const user = useUser()

  const features = [
    { icon: Shield, text: "Enterprise Security" },
    { icon: Users, text: "Team Collaboration" },
    { icon: Zap, text: "Real-time Response" },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="text-center max-w-5xl mx-auto"
      >

        {/* Main Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="text-white dark:text-white">Bringing Security Teams</span>
          <br />
          <motion.span
            className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Together
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-300 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          CIRCL empowers security teams to collaborate in real-time, respond faster to incidents, and resolve threats
          together with unprecedented efficiency.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            >
              <feature.icon className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-white">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link href={user ? "/dashboard" : "/signup"}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group text-base"
            >
              <motion.span whileHover={{ x: -2 }} transition={{ duration: 0.2 }} className="flex items-center gap-2">
                Get Started Free
                <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.span>
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-full transition-all duration-300 group text-base"
          >
            <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold"
                >
                  {String.fromCharCode(65 + i)}
                </motion.div>
              ))}
            </div>
            <span className="text-sm">Trusted by 500+ security teams</span>
          </div>

          <div className="hidden sm:block w-px h-4 bg-gray-600"></div>

          <div className="flex items-center gap-4 text-sm">
            <span>⚡ 99.9% Uptime</span>
            <span>🔒 SOC 2 Compliant</span>
            <span>🌍 Global CDN</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
