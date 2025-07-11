"use client"

import { motion } from "framer-motion"
import { steps } from "@/constants/data"

export function HowItWorksSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-foreground"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div key={index} className="text-center" variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <motion.div
                className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto text-foreground"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {step.step}
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
