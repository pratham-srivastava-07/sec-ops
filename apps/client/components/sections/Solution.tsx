"use client"

import { motion } from "framer-motion"

export function ProblemSolutionSection() {
  return (
    <motion.section
      className="py-20 px-6 bg-muted/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-foreground">Incidents are</span> <span className="text-red-500">chaotic</span>. <span className="text-foreground">CIRCL brings{" "}</span>
          <span className="text-green-500">clarity</span>.
        </motion.h2>
        <motion.p
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Poor coordination and delayed responses cost valuable time. CIRCL provides real-time collaboration and
          structured incident management for technical teams.
        </motion.p>
      </div>
    </motion.section>
  )
}
